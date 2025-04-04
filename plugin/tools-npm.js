const fetch = require("node-fetch");

let handler = async (m, { text, prefix, command }) => {
    try {
        if (!text) {
            return m.reply(`📦 *Cara Penggunaan:*\n➤ ${prefix + command} <package_name>\n\n📌 *Contoh:*\n➤ ${prefix + command} express`);
        }

        // Fetch data dari NPM Registry
        let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`);
        let { objects } = await res.json();

        if (!objects.length) {
            return m.reply("❌ Paket NPM tidak ditemukan! Coba cari yang lain.");
        }

        // Format hasil pencarian
        let txt = `🔍 *Hasil Pencarian NPM untuk:* _"${text}"_\n\n`;
        objects.slice(0, 5).forEach(({ package: pkg }, index) => {
            txt += `🔹 *${pkg.name}* (v${pkg.version})\n`;
            txt += `📦 _${pkg.description || "Tidak ada deskripsi."}_\n`;
            txt += `🔗 ${pkg.links.npm}\n\n`;
        });

        m.reply(txt);
    } catch (err) {
        console.error(err);
        m.reply("⚠️ Terjadi kesalahan saat mengambil data, coba lagi nanti.");
    }
};

// Daftar perintah
handler.help = ["npmsearch", "npm"].map(cmd => `${cmd} *[package name]*`);
handler.tags = ["tools"];
handler.command = ["npmjs", "npmsearch"];

module.exports = handler;
