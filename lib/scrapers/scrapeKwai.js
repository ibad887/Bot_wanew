const axios = require('axios');
const cheerio = require('cheerio');

const scrapeKwai = async (query) => {
    const url = `https://www.kwai.com/discover/${encodeURIComponent(query)}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const result = {
        title: $('title').text(),
        description: $('meta[name="description"]').attr('content'),
        keywords: $('meta[name="keywords"]').attr('content'),
        videos: []
    };

    const scriptData = $('script#ItemList').html();
    if (!scriptData) throw new Error('Data video tidak ditemukan di halaman');

    const videoItems = JSON.parse(scriptData).itemListElement;

    if (!Array.isArray(videoItems)) throw new Error('Format data video tidak valid.');

    videoItems.forEach(video => {
        result.videos.push({
            url: video.url,
            name: video.name,
            description: video.description,
            thumbnailUrl: video.thumbnailUrl[0],
            uploadDate: video.uploadDate,
            contentUrl: video.contentUrl,
            commentCount: video.commentCount,
            duration: video.duration
        });
    });

    return result;
};

module.exports = scrapeKwai;