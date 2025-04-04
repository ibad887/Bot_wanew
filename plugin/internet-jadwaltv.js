const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

let handler = async (m, { text, prefix, command }) => {
    try {
        if (!text) {
            return m.reply(`📺 *Cara Penggunaan:*\n➤ ${prefix + command} <nama_channel>\n\n📌 *Contoh:*\n ${prefix + command} MNCTV`);
        }

        let res = await getJadwalTV(text);
        if (!res.result.length) {
            return m.reply(`⚠️ Jadwal tidak ditemukan untuk channel *${text}*.`);
        }

        // Format teks menggunakan operator +=
        let txt = `📺 *Jadwal TV ${res.channel}*\n\n`;
        res.result.forEach(v => {
            txt += `🕒 [${v.jam.replace("WIB", " WIB")}] ${v.acara}\n`;
        });

        m.reply(txt);
    } catch (err) {
        console.error(err);
        m.reply("⚠️ Terjadi kesalahan, coba lagi nanti.");
    }
};

// Daftar perintah
handler.help = ["jadwaltv"].map(cmd => `${cmd} *[info jadwal tv]*`);
handler.tags = ["internet"];
handler.command = ["jadwaltv"];

module.exports = handler;

// Fungsi untuk mengambil jadwal TV berdasarkan nama channel
async function getJadwalTV(channelName) {
    try {
        let list = JSON.parse(fs.readFileSync("./src/jadwaltv.json", "utf-8"));
        let data = list.find(v => new RegExp(channelName, "gi").test(v.channel));

        if (!data) {
            let availableChannels = list.map(v => v.channel).sort().join("\n");
            throw `📡 *Daftar Channel yang Tersedia:*\n\n${availableChannels}`;
        }

        // Fetch halaman jadwal TV
        let url = `https://www.jadwaltv.net/${data.isPay ? "jadwal-pay-tv/" : ""}${data.value}`;
        let html = (await axios.get(url)).data;
        let $ = cheerio.load(html);

        let result = [];
        $("div > table.table").find("tbody > tr").slice(1).each(function () {
            let jam = $(this).find("td").eq(0).text().trim();
            let acara = $(this).find("td").eq(1).text().trim();
            if (!/Jadwal TV|Acara/gi.test(acara)) {
                result.push({ jam, acara });
            }
        });

        return { channel: data.channel.toUpperCase(), result };
    } catch (error) {
        console.error("Error fetching TV schedule:", error);
        return { channel: channelName.toUpperCase(), result: [] };
    }
}
