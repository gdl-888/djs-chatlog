const fs = require('fs');
const inputReader = require('wait-console-input')

const Discord = require('discord.js');
const Constants = require('discord.js/src/util/Constants.js');

// Constants.DefaultOptions.ws.properties.$browser = `Discord Android`;
const client = new Discord.Client();

function print(x) {
	console.log(x);
}

function prt(x) {
	process.stdout.write(x);
}

function input(p) {
	prt(p);
	return inputReader.readLine('');
}

var chid = '12345678';
const fn = String(Math.floor(Math.random() * (99999999 - 10000000) + 10000000)) + ".CSV";

function appendFile(filename, content) {
	fs.appendFile(filename, content, 'utf-8', function(err) {
		if(err) {
			return;
		}
	}); 
}

appendFile(fn, `"사용자 번호","이름","메시지 번호","내용"\r\n`);

client.on('ready', () => {
	client.user.setPresence({
		status: "invisible"
	});
	
	var s = 1;
	
	for(server of client.guilds.array())
		{
			print(`[${s++}] ${server['name']}`);
		}
	
	var guildname = input("대상 서버: ");
	var guild = client.guilds.array()[Number(guildname) - 1];
	prt('\r\n');
	
	var c = 0;
	
	for(ch of guild.channels.array())
		{
			if(ch['type'] == 'category') { c++; continue; }
			if(ch['type'] == 'voice') { c++; continue; }
			print(`[${c++}] ${ch['name']}`);
		}
		
	var chname = input("대상 채널: ");
	var channel = guild.channels.array()[chname];
	
	chid = channel.id;
});

client.on('message', (msg) => {
	if(msg.channel.id == chid) {
		appendFile(fn, `"${msg.member.user.id}","${msg.member.user.username.replace(/["]/g, '""')}","${msg.id}","${msg.content.replace(/["]/g, '""')}"\r\n`)
	}
});

client.login("12233344455555666666777777778888888899999999910111111111112222222222223333333333334444444444444455555555555555555554444445444444445");
