#!/usr/bin/env node
const TeleBot = require('telebot');
// eosdac bot
const bot = new TeleBot({
    token:'',
    usePlugins: ['botan'],
    pluginConfig: {
        botan: ''
    }
});


const spb_miataclub_chat_id = -28715622;
const tech_chat_id = -1001145216568;
const miataclub_id = -1001095126053;
const test_bots_chat_id = -217181742;

const fs = require('fs');

function loadJsonFromFile(filename){
    let rawdata = fs.readFileSync(filename);  
    return JSON.parse(rawdata);
}

const snapshot = loadJsonFromFile("snapshot.json");

function checkEOSDac(msg,props){
    console.log(msg.text);
    console.log(snapshot['0xA872558C83Cdf4d3cCc4E040f9403c864dC2ef2e']);
    console.log(snapshot['123']);
    console.log(snapshot['111']);
    regexp = /\/check ([0-9a-zA-Z]+)/;
    match_result = msg.text.match(regexp);
    if (match_result){
        ether_address = match_result[1];
        console.log(ether_address);
        if (Object.prototype.hasOwnProperty.call(snapshot,ether_address)){
            return msg.reply.text(snapshot[ether_address]);
        }else{
            return msg.reply.text("ether address is not in snapshot");
        }
    }else{
        return msg.reply.text("/check your_ether_address");
    }
}

bot.on(/^\/check /, (msg,props) => checkEOSDac(msg,props));

bot.start();