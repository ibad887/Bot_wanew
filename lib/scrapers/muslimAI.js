const axios = require('axios');
const { translate } = require('bing-translate-api');

const muslimai = async (query) => {
    const searchUrl = 'https://www.muslimai.io/api/search';
    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        const translatedQuery = await translate(query, 'id', 'en');
        const englishQuery = translatedQuery.translation;

        const searchData = { query: englishQuery };
        const searchResponse = await axios.post(searchUrl, searchData, { headers });
        const passages = searchResponse.data.map(item => item.content).join('\n\n');
        
        const answerUrl = 'https://www.muslimai.io/api/answer';
        const answerData = {
            prompt: `Use the following passages to answer the query to the best of your ability as a world class expert in the Quran. Do not mention that you were provided any passages in your answer: ${englishQuery}\n\n${passages}`
        };
        const answerResponse = await axios.post(answerUrl, answerData, { headers });

        const translatedAnswer = await translate(answerResponse.data, 'en', 'id');
     
        const translatedSources = await Promise.all(
            searchResponse.data.map(async (item) => {
                const translatedSource = await translate(item.content, 'en', 'id');
                return translatedSource.translation;
            })
        );

        const result = {
            answer: translatedAnswer.translation,
            source: translatedSources
        };

        return result;
    } catch (error) {
        console.error('Error occurred:', error.response ? error.response.data : error.message);
        throw new Error('Terjadi kesalahan saat mengambil data. Mohon coba lagi.');
    }
};

module.exports = muslimai;