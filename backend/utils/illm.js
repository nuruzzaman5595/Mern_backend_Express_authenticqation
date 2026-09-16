const axios = require('axios');

const callLLM = async ({ prompt, model = 'gpt-4o-mini', apiKey, baseURL }) => {
  if (!apiKey) {
    throw new Error('Missing LLM API key');
  }

  const endpoint = baseURL || 'https://api.openai.com/v1/chat/completions';

  const response = await axios.post(
    endpoint,
    {
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data?.choices?.[0]?.message?.content || '';
};

module.exports = {
  callLLM,
};
