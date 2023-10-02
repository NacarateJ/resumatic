// Logic for the `api/hello` endpoint
export default async function handler(req, res) {
  try {
    // Sending a request to the OpenAI create chat completion endpoint
    const { promptText } = req.body;

    // Setting parameters for our request
    const createChatCompletionEndpointURL =
      "https://api.openai.com/v1/chat/completions";

    console.log('Prompt Text:', promptText);
    const createChatCompletionReqParams = {
      model: "gpt-3.5-turbo", // Model version to be used for generating the chat completion
      messages: [{ role: "user", content: promptText }], // User message with the specified role and content
    };

    console.log('Request Sent to OpenAI API:', createChatCompletionReqParams);

    // Sending our request to OpenAI API
    const createChatCompletionRes = await fetch(
      createChatCompletionEndpointURL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.OPENAI_API_KEY, // Including OpenAI API Key in the Authorization header
        },
        body: JSON.stringify(createChatCompletionReqParams), // Converting request parameters to JSON format

      }
    );

    // Processing the response body from OpenAI API
    const createChatCompletionResBody = await createChatCompletionRes.json();

    // Error handling for the OpenAI endpoint
    if (createChatCompletionRes.status !== 200) {
      let error = new Error("Create chat completion request was unsuccessful.");
      error.statusCode = createChatCompletionRes.status;
      error.body = createChatCompletionResBody;
      throw error; // Throw error if the response status is not 200
    }

    // Extracting information from the response body
    const completionText =
      createChatCompletionResBody.choices[0].message.content.trim(); // Extracting completed text from the OpenAI response
    const usage = createChatCompletionResBody.usage; // Extracting token usage information

    // Logging the results to console
    console.log(`Create chat completion request was successful. Results:
Completion: 

${completionText}

Token usage:
Prompt: ${usage.prompt_tokens}
Completion: ${usage.completion_tokens}
Total: ${usage.total_tokens}
`);

    // Sending a successful response for our endpoint with the generated completion text
    res.status(200).json({ completion: completionText });
  } catch (error) {
    // Error handling

    // Server-side error logging
    console.log(`${error.message} Thrown error:
Status code: ${error.statusCode}
Error: ${JSON.stringify(error.body)}
`);

    // Sending an unsuccessful response for our endpoint in case of errors
    res
      .status(error.statusCode || "500") // Use the provided status code or default to 500 (Internal Server Error)
      .json({ error: { message: "An error has occurred" } }); // Sending error response with a generic message
  }
}
