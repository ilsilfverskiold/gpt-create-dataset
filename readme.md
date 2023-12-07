# Create Dataset with GPT-4 Turbo

**Notes:** the code needs to be tweaked if you're using something else than a 'text' field.

## Overview
This script processes a CSV file containing any field(s) that you set and uses the OpenAI GPT-4 API to create new fields. It is useful to generate a dataset for fine-tuning. I.e. using a text field to generate summaries, keywords or other to another field with a custom system template.

The script reads the CSV, processes the specified text fields, and appends the extracted information as new fields in the CSV with the help of GPT-4. The final output is a new CSV file with these enriched data fields that you can use to fine-tune a model.

### Example Result

A CSV file like this

```markdown
| Text     | 
|----------|
| "text 1" | 
| "text 2" |
```

Will loop through the text fields and make API calls (batched by 10) to GPT-4 Trubo that will return keywords (or whatever field you want it to return), the script collects them and at the end generates a new CSV file that looks like this and saves it in your root folder.

```markdown
| Text     | Keywords | 
|----------|----------|
| "text 1" | "key 1"  | 
| "text 2" | "key 2"  |
```

This is based on what you ask GPT-4 to do with the fields. See the system template to make sure it generates the correct fields. See example test.csv file and the output csv file processedData.csv.

## Requirements
- Node.js
- OpenAI API key
- CSV file with at least one text field

## Setup
1. **Node.js**: Ensure Node.js is installed.
2. **Clone the Repository:** If you haven't already, clone the repository to your local machine:
    ```
    git clone https://github.com/ilsilfverskiold/gpt-create-dataset.git
    ```
3. **Navigate to the Directory:** Once cloned, navigate to the project directory:
    ```
    cd gpt-create-dataset
    ```
4. **Dependencies**: Run `npm install` to install required packages.
5. **API Key**: Place your OpenAI API key in a `.env` file as `OPENAI_API_KEY=your_api_key`.
6. **CSV File**: Add in your csv file in the root folder and make sure the index.js script has the correct path.
7. **Tweak the System Template**: Tweak the system template to enable you to get the results you want.

## Configuration
- **Model**: Default is "gpt-4-1106-preview". Modify as needed.
- **Batch Size**: Adjust the batch size based on performance needs.
- **CSV Path**: Set the path of your CSV in the script.
- **Input Field**: Default is 'text'. Change to match your CSV column name.

## System Template Customization (important!)
Modify `system_template.js` to fit your data extraction needs. This template guides the GPT model for extracting relevant information from your texts.

## Output
Generates a new CSV file processedData_<timestamp>.csv with original and new fields.
