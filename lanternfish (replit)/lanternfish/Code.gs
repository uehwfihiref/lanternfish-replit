
// Code.gs
const OPENAI_KEY = PropertiesService.getScriptProperties().getProperty('OPENAI_KEY');

function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('Index')
    .setTitle('ChatGPT Embed')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Called from the client to get a ChatGPT response.
 */
function chat(prompt) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const payload = {
    model: 'gpt-4.1',
    messages: [{ role: 'user', content: prompt }]
  };
  
  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + OPENAI_KEY },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  const data = JSON.parse(response.getContentText());
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data.choices[0].message.content;
}
