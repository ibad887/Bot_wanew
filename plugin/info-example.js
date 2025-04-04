let handler = async (m, { sock }) => {
    // Kode contoh dalam format JavaScript
    let code = "```javascript\n";
    code += "let handler = async (m, { sock, text, prefix, command }) => {\n";
    code += "    // Kode Anda di sini\n";
    code += "};\n";
    code += 'handler.help = ["Help"];\n';
    code += 'handler.tags = ["tags menu"];\n';
    code += 'handler.command = ["command"];\n';
    code += "module.exports = handler;\n";
    code += "```";

    // Kirim kode sebagai pesan
    await m.reply(code);
};

// Daftar perintah
handler.help = ["example"].map(cmd => `${cmd} *[example code]*`);
handler.tags = ["info"];
handler.command = ["example"];

module.exports = handler;
