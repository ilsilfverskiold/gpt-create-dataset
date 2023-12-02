export const systemTemplate = `
    
    I need you to extract keywords, topics and summaries from texts scraped from various software development forums and blogs.

    Further Instructions for Filtering Technical Terms:

    General Principle: When filtering a list for technical relevance, lean towards inclusion rather than exclusion. The cost of erroneously excluding a relevant term is likely higher than including a potentially irrelevant one.

    Tools & Platforms: Any term that appears to be a tool, software, platform, language or service (e.g., "Bubble", "AWS", "Docker", "Node.js", "Mongoose", "JavaScript") should be retained. Even if the term might seem generic in other contexts, consider its potential technical relevance. Here there might be a new tool trending so we need to be on the look out for these. 

    Exclude General Development Terms: Avoid general development terms unless they are unique identifiers of a technology or methodology. Terms like "user model", "controller", "module", "model", "services", "deploy to" should be excluded.

    Extract the keyword: Extract the tool, platform, company name so it is easily identified. I.e. "amazon bedrock playground" would be "Amazon, Amazon Bedrock" as Amazon is a company and Amazon Bedrock is a tool so the response is Amazon AND Amazon Bedrock. Same with "sign in with Apple" would be "Apple, Authentication"

    Specific Terminology: Retain words or phrases that indicate specific methodologies, concepts, or paradigms, even if they might be two or more words long (e.g., "low code", "no code", "neural network", "quantum computing", "finetuning", "fine tuning").

    Unique Feature Identification: Determine if the combination of terms points to a unique feature or characteristic of the tool/platform. For example, "GitHub Actions" is a specific feature of GitHub and should be included, whereas "Clone from GitHub" is a general action not unique so only Github would be included. 

    Simplified Topic Extraction: Define the topic in simple terms that capture the main technology or methodology trend. Topics should be separated by commas for texts covering multiple areas. Example: "Backend Web Development, Database Modeling".

    Contextual Importance: Include keywords that are crucial in the context, even if they are not traditional technical terms, but are significant for understanding the technology or methodology.

    Single Mention: Each keyword should be mentioned only once, irrespective of its frequency in the text.

    Exclude Non-important Terms: Omit words that are known to be non-important or too generic in technology discussions.

    Industry Terms and Acronyms: Include relevant industry terms and acronyms that have specific meanings in a tech context.

    Spelling and grammar: make sure you fix spelling mistakes and add the right acronyms when applicable. natural language processing would be "Natural Language Processing, NLP". aws would be "AWS".

    Output Format: Deliver your response in valid json format with the following keys: keywords, topics, summary. For keywords, list them in a comma-separated string within the "keywords" field. For topics, list them in a comma-separated string within the "topic" field. For summaries, create concise summaries of 3-5 words max.

    Example Input:

    text: "PartyRock With Leftovers! - As an early Beta tester for the PartyRock, an Amazon Bedrock Playground.”

    text: "The Smoking Gun: Adam DAngelo Has Side Deal Business Interest for POE And Now Wont Leave - The Irony of it All - TLDR Adam is the ringleader and was mad that Dev day caused POE to become instantly Obsolete."

    text: "In the right place - On thriving as a woman in a male-dominated environment"

    Example STRUCTURED Output object with the keywords, topic and summary for all texts provided:

    {
    text1: { 
        "keywords": "PartyRock, Amazon Bedrock, Amazon, Beta Testing",
        "topic": "AI Application Development, Cloud Services",
        "summary": "Beta testing PartyRock"
        },
    text2: { 
        "keywords": "Adam D’Angelo, POE, Dev day, OpenAI, Sam Altman",
        "topic": "Tech Industry News, Artificial Intelligence, Corporate Politics",
        "summary": "Adam DAngelo's POE conflict"
        },
    text3: { 
        "keywords": "Women in Tech, Male Dominated",
        "topic": "Women in Tech, Male Dominated Environments",
        "summary": "Coping in tech as female"
        }
    }`

    // Use ChatGPT or the GPT-4 playground to generate your system template. Cheaper to use ChatGPT to play around with it.