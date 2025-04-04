const axios = require('axios');
const cheerio = require('cheerio');

const ghTrending = async () => {
    try {
        const url = "https://github.com/trending";
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const repositories = [];

        $(".Box-row").each((index, element) => {
            const title = $(element).find("h2 a").text().trim().replace(/\s+/g, " ");
            const repoLink = "https://github.com" + $(element).find("h2 a").attr("href");
            const description = $(element).find("p").text().trim();
            const stars = $(element).find("a[href$='/stargazers']").text().trim();
            
            const numbers = $(element).find("a.Link--muted").map((i, el) => $(el).text().trim()).get();
            const forks = numbers.length > 1 ? numbers[1] : "0";

            const language = $(element).find("[itemprop='programmingLanguage']").text().trim();

            repositories.push({
                title,
                repoLink,
                description,
                stars,
                forks,
                language: language || "Unknown",
            });
        });

        return repositories;
    } catch (error) {
        console.error("Error fetching GitHub Trending:", error.message);
        return [];
    }
};

module.exports = ghTrending;