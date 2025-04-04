function sleep(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms)); 
}

async function animateText(text, delay = 50) { 
    let animatedText = ""; 
    for (let char of text) { 
        animatedText += char; 
        console.clear();
        console.log(animatedText); 
        await sleep(delay); 
    } 
    console.log();
}

async function singLyric(lyric, delay, speed) { 
    await sleep(delay); 
    await animateText(lyric, speed);
}

async function singSong() { 
    const lyrics = [ 
        { text: "Hold my hands, dont-dont tell your friends", speed: 60 }, 
        { text: "Cerita kemaren, ku ingat permanen", speed: 80 }, 
        { text: "Manis mu kaya permen, I hope this never end", speed: 80 }, 
        { text: "Oh can you be my Gwen? and ill be the Spiderman", speed: 60 }, 
        { text: "Sakit dadaku, ku mulai merindu", speed: 90 }, 
        { text: "Ku bayangkan jika kamu tidur di sampingku", speed: 70 }, 
        { text: "Di malam yang semu", speed: 80 }, 
        { text: "Pejamkan mataku", speed: 70 }, 
        { text: "Ku bayangkan tubuhmu jika di pelukanku", speed: 70 } 
    ];

    const delays = [100, 250, 500, 800, 500, 780, 750, 710, 500];

    for (let i = 0; i < lyrics.length; i++) {
        await singLyric(lyrics[i].text, delays[i], lyrics[i].speed);
    }
}

module.exports = { singSong };