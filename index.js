import OpenAI from "openai";
import fs from "fs";
import { parse, stringify } from "csv";
import { systemTemplate } from "./system_template.js";
import dotenv from 'dotenv';
dotenv.config();

const model =  "gpt-4-1106-preview" // set model here - set to GPT-4 turbo as default - recommended
const batchSize = 10; // set amount of batch for each api call
const csv_path = 'yourcsvpath.csv'; // set name of csv file that should get processed
const input_name = "text" // set input name here (i.e. the column in the csv file that will be used)

async function readCsv(filePath) {
  return new Promise((resolve, reject) => {
    let rows = [];
    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: ',', columns: true }))
      .on('data', (row) => rows.push(row))
      .on('end', () => resolve(rows))
      .on('error', reject);
  });
}

function escapeQuotes(str) {
  return str.replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

async function runOpenAIChat(rows, openai) {
  try {
    const system = escapeQuotes(systemTemplate);
    // will create a row of input_name: input_value \n x batch size
    const textInputs = rows.map((row, index) => `${input_name}: ${escapeQuotes(row.text)}`).join(' \n ');
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: system,
        },
        {
          role: "user",
          content: textInputs,
        },
      ],
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: { "type": "json_object" } // set to return a json object
    });
    const content = JSON.parse(response.choices[0].message.content);
    console.log(content)
    return content;
  } catch (error) {
    console.error("Error occurred:", error);
    return null;
  }
}

async function processCsv(filePath) {
    const rows = await readCsv(filePath);
    let allResults = [];
  
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  
    for (let i = 0; i < rows.length; i += batchSize) {
      const batchRows = rows.slice(i, i + batchSize);
      const batchResults = await runOpenAIChat(batchRows, openai);
  
      if (batchResults) {
        batchRows.forEach((row, index) => {
          const result = batchResults[`text${index + 1}`];
          if (result) {
            // dynamically add fields from the response
            Object.keys(result).forEach(key => {
              row[key] = result[key];
            });
          }
        });
        allResults.push(...batchRows);
      }
    }
  
    const outputFile = `processedData_${new Date().getTime()}.csv`;
    const csvStream = stringify(allResults, { header: true });
    const writableStream = fs.createWriteStream(outputFile);
    
    csvStream.pipe(writableStream);
  
    writableStream.on('finish', () => {
      console.log(`CSV updated and saved as '${outputFile}'`);
    });
  
    writableStream.on('error', (err) => {
      console.error('Error writing CSV file:', err);
    });
  }
  
processCsv(csv_path);