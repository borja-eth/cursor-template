# Problem 1: Missing detail
Don't assume AI will know all the details about the feature you are trying to create, instead, use AI reasoning models to fill the gaps in before we go to Cursor.

1. Tell your idea to a chatbot model.DO NOT TRY TO EXPLAIN 11 FEATURES, AI isn't a miracle worker. Work on one thing at a time, just add 1 feature/ui update at a time

2. We then paste the following prompt in:

"Your job is to create a detailed PRD (Product Requirements Document) explaining how to build this feature, read through every step, understand how these features / components work together. Think through ALL edge cases and potential errors that could be introduced when building this. Include instructions to add detailed error checks, comments and logging. Don't include models specifications, any code scope or technical definition. You are responsible only for the functional definition. Ensure you explain how every section of this feature works going into macro detail. Break these down into detailed numbered steps"

**Disclaimer:** This is just a general prompt, but will get you 70% off the way there.

3. Once you have the PRD, paste it into `documents/features` folder and name it with the following format: `{feature-name}.md`

4. Use Cursor Composer adding the document to the conversation context.

