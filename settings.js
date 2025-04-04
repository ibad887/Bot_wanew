const fs = require("fs");
const chalk = require("chalk");

global.botName = "Kurumi AI";
global.ownerNumber = "6285726068247";
global.ownerName = "ユタ リズ タダクニ";
global.website = "https://api.whatsapp.com/send?phone=+6285726068247";
global.wagc = "https://chat.whatsapp.com/DOA56XOvpE1EeMnxUQuGlp";

global.packname = " KurumiAi";
global.author = "ユタ リズ タダクニ";
global.footer = "© 2025·ユタ リズ タダクニ";
global.creator = "6285726068247@s.whatsapp.net";
global.owner = ["6285726068247"];
global.premium = ["6285726068247"];
global.prefa = ".";
global.tempatDB = "database.json";

global.saluran = "120363380385933965@newsletter";
global.saluranName = "YutaRizzTadakuni_";
global.sessionName = "session";

global.panel = "-";
global.cred = "-";
global.apiuser = "-";
global.eggs = "15";
global.nets = "5";
global.location = "1";

global.CF_API_KEY = "kDVfZ8NWOFNCsloIA6ckd58duuYZ0nlXwysSnQi";
global.CF_ZONE_ID = "b9883610d0c1ecf9c83f0028978222008";
global.CF_DOMAIN = "your-domain.my.id";

global.APP_EMAIL = "cs.moraai@gmail.com";
global.APP_PASSWORD = "rwak vblz ttol ftdx";

global.typemenu = "v14";
global.typereply = "v6";
global.autoblocknumber = "62";
global.antiforeignnumber = "62";
global.welcome = false;
global.anticall = true;
global.autoswview = false;
global.adminevent = false;
global.groupevent = false;
global.notifRegister = false;
global.onlyRegister = false;

global.payment = {
    dana: "+6285726068247",
    gopay: "+6285726068247",
    ovo: "-",
    qris: "./media/QRIS.png",
    shopeePay: "+6285726068247",
    seabank: "-"
};

global.limit = {
    free: 20,
    premium: "Infinity",
    vip: "Infinity"
};

global.uang = {
    free: 10000,
    premium: 1000000000,
    vip: 1000000000
};

global.bot = {
    limit: 1,
    uang: 1
};

global.game = {
    suit: {},
    menfes: {},
    tictactoe: {},
    kuismath: {},
    tebakbom: {}
};

global.mess = {
    limit: "Batas penggunaan Anda telah tercapai. Silakan coba lagi nanti.",
    nsfw: "Konten NSFW saat ini dinonaktifkan di grup ini. Silakan hubungi administrator untuk mengaktifkannya.",
    done: "Operasi berhasil diselesaikan.",
    error: "Terjadi kesalahan. Silakan coba lagi.",
    success: "Permintaan berhasil diproses. Berikut hasilnya:",
    owner: "Perintah ini hanya tersedia untuk pemilik bot.",
    botAdmin: "Perintah ini memerlukan hak akses administrator bot.",
    admin: "Perintah ini hanya tersedia untuk administrator grup.",
    group: "Perintah ini hanya dapat digunakan di dalam grup.",
    private: "Perintah ini hanya dapat digunakan di chat pribadi.",
    bot: "Fitur ini hanya dapat diakses oleh bot.",
    wait: "Memproses permintaan Anda. Silakan tunggu...",
    premium: "Fitur ini hanya tersedia untuk pengguna premium.",
    banned: "Akses Anda ke bot ini telah dibatasi.",
    unban: "Akses Anda telah dipulihkan. Selamat datang kembali!",
    restrict: "Fitur ini tidak tersedia di grup ini karena pembatasan."
};

global.imageDonasi = "https://files.catbox.moe/4x5jd3.png";
global.imageUrl = "https://files.catbox.moe/ocbonp.jpg";
global.imageBuffer = fs.readFileSync("./media/imageBuffer.jpg");
global.videoBuffer = fs.readFileSync("./media/videoBuffer.mp4");
global.audioBuffer = fs.readFileSync("./media/audioBuffer.mp3");
global.audioBuffer2 = fs.readFileSync("./media/audioBuffer2.mp3");
global.audioBuffer3 = fs.readFileSync("./media/audioBuffer3.mp3");
global.audioBuffer4 = fs.readFileSync("./media/audioBuffer4.mp3");

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.yellow.bold(`\n⚠️ ${__filename} telah diperbarui! ⚠️`));
    console.log(chalk.green("🔄 Silakan restart bot untuk menerapkan perubahan.\n"));
    delete require.cache[file];
    require(file);
});