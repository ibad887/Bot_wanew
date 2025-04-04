const cheerio = require("cheerio");
const fetch = require("node-fetch");

let handler = async (m, { sock, text }) => {
    try {
        if (!text) return m.reply("⚠️ Masukkan link SnackVideo yang valid!");

        await sock.sendMessage(m.chat, {
            react: {
                text: "⏳",
                key: m.key,
            },
        });

        let res = await fetchSnackVideo(text);
        if (!res.media) return m.reply("⚠️ Gagal mendapatkan video. Pastikan link benar!");

        let caption = "🎥 *SnackVideo Downloader* 🎥\n\n";
        caption += `👤 *Username*: ${res.author}\n`;
        caption += `👍 *Like*: ${res.like}\n`;
        caption += `💬 *Komentar*: ${res.comment}\n`;
        caption += `🔄 *Share*: ${res.share}`;

        await sock.sendFile(m.chat, res.media, "", caption, m);
    } catch (err) {
        console.error(err);
        m.reply("⚠️ Terjadi kesalahan, coba lagi nanti.");
    }
};

handler.help = ["snackvideo [url]"];
handler.tags = ["downloader"];
handler.command = ["snackvideodl", "snackvideodownload"];

module.exports = handler;

async function fetchSnackVideo(url) {
    try {
        const res = await fetch(url);
        const body = await res.text();
        const $ = cheerio.load(body);

        const video = $("div.video-box").find("a-video-player");
        const author = $("div.author-info");
        const attr = $("div.action");

        return {
            title: $(author).find("div.author-desc > span").children("span").eq(0).text().trim(),
            thumbnail: $(video).parent().siblings("div.background-mask").children("img").attr("src"),
            media: $(video).attr("src"),
            author: $("div.author-name").text().trim(),
            authorImage: $(attr).find("div.avatar > img").attr("src"),
            like: $(attr).find("div.common").eq(0).text().trim(),
            comment: $(attr).find("div.common").eq(1).text().trim(),
            share: $(attr).find("div.common").eq(2).text().trim(),
        };
    } catch (error) {
        console.error("Error fetching SnackVideo:", error);
        return {};
    }
}
