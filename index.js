const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
  //response.sendFile(__dirname + '/site/index.html');
  
  //app.use(morgan('combined'))
});

app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
//const Colours = require("colors");

const Client = new Discord.Client();
const client = new Discord.Client();

//const token = process.env.TOKEN;
const prefix = "!";
const message = "";

var request = require('request');

var developerids = ["204669722094993417", "434866216528510986"]
var nullPlaceholder = "null";

var serverIP = "158.69.118.73";
var serverPort = "25615";
//var isOnline = "null";
client.on('ready',() => {
  console.log(`Logged in as: ${client.user.tag}!`);
  console.log(`Client Id: ${client.user.id}!`);
  console.log(`Is client Verified?: ${client.user.verified}!`);
  console.log(`Client Created on: ${client.user.createdAt}!`);
  
   //Gets Server Status
  
    request('https://mcapi.us/server/status?ip=' + serverIP + '&port=' + serverPort, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var importedJSON = JSON.parse(body);
                      
                      if(importedJSON.online == true) {
                        var isServerOnline = "Online";
                      } 
                      if(importedJSON.online == false) {
                        var isServerOnline = "Offline";
                      } 
                        
                    client.user.setActivity(isServerOnline + ' @ ' + serverIP + ':' + serverPort);
                    }
                })
    
  //hook.send('I am now alive!');
    
  //game(streamingGame);
});

client.on('message', message => {
    if (message.author === client.user) return;
    if(message.author.bot) return;

  //Help Message [Developer Help]
  if (message.content.startsWith(prefix + 'help')) {
    message.channel.sendMessage('The prefix for the bot is `' + prefix + '` \n _*Commands!*_ \n' +
                                '`help` = Shows this message. :question: \n' +
                                '`serverip` = Shows the ip of the Minecraft server! <:jtrent238_Head:303626623041798156> \n' +
                                '`status` = Shows the status of the server! :desktop:'
                            )
    message.channel.sendMessage('')}
     
  
  
  //if you mention the bot.
  if (message.content.startsWith(client.user)) {
    //message.channel.sendMessage('this is a help command for the bot.');
    message.channel.sendMessage('Use `' + prefix + 'help` for a list of commands!');}
  
    //Gets Server IP
  if (message.content.startsWith(prefix + 'serverip')) {
    message.channel.sendMessage('Server ip: ``' + serverIP + ':' + serverPort + '`` <:jtrent238_Head:303626623041798156>');
  }

  
    //Gets Server Status
  if (message.content.startsWith(prefix + "status")) {
    request('https://mcapi.us/server/status?ip=' + serverIP + '&port=' + serverPort, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var importedJSON = JSON.parse(body);
                      
                      if(importedJSON.online == true) {
                        var isOnline = "Online";
                      } 
                      if(importedJSON.online == false) {
                        var isOnline = "Offline";
                      } 
                        message.channel.sendMessage('Server Status\n' +
                                '-------------------------------\n' +
                                '• Server is: `' + isOnline + '`\n' +
                                '• Players Online: `' + importedJSON.players.now + ' / ' + importedJSON.players.max + '`\n' +
                                '• Server TPS: `' + nullPlaceholder + ' / ' + nullPlaceholder + '`\n' +
                                '• Server Time: `' + importedJSON.duration + '`\n'
                               );
                    //  message.channel.sendMessage('List of Players:\n'+
                    //            '---------------------------------\n' +
                    //            importedJSON.players
                    }
                  if(isOnline == false){
                    message.channel.sendMessage('Server last online: `' + importedJSON.last_online + '`');
                  }
                  if(importedJSON.error != ""){
                    message.channel.sendMessage(importedJSON.error)
                  }
                })
    
  }
  
  //Gets Server info
  if (message.content.startsWith(prefix + "mods")) {
    request('https://api.mcsrvstat.us/1/' + serverIP + ':' + serverPort, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var importedJSON = JSON.parse(body);
                      
                      if(importedJSON.online == true) {
                        var isOnline = "Online";
                      } 
                      if(importedJSON.online == false) {
                        var isOnline = "Offline";
                      } 
                        message.channel.sendMessage('Mods Installed on the server:\n' +
                                '-------------------------------\n' +
                            //for (int i = 0; i < importedJSON.mods.length; i++) {
                            //    '• ' + importedJSON.mods.names.i + '\n'
                            //}
                              'Work in progress!' 
                              );
                    }
                  if(isOnline == false){
                    message.channel.sendMessage('Server last online: `' + importedJSON.last_online + '`');
                  }
                  if(importedJSON.error != ""){
                    message.channel.sendMessage(importedJSON.error)
                  }
                })
    
  }
      //Information about the bot.
  //if (message.content.startsWith(prefix + 'info')) {
  //  message.channel.sendMessage('<:Logo:487381198218461214> Bot Version: ' + process.env.VERSION + ' ' + '(' + '_*' + process.env.SENTRY_VERSION + '*_' + ')' + '<:Logo:487381198218461214> \n<:Logo:487381198218461214> Bot made by: ' + process.env.AUTHOR + ' <:Logo:487381198218461214> \n<:Logo:487381198218461214> OreSpawn and DangerZone made by: ' + process.env.AUTHOR2 + ' <:Logo:487381198218461214>');
  //}
  
  //Information about the bot. [Developer Information]
  if (message.content.startsWith(prefix + 'devinfo')) {
    if(message.member.id == developerids) {
      console.log(`Yay, its a Developer!`);
      message.channel.sendMessage('<:Logo:487381198218461214> Bot Version: ' + process.env.VERSION + ' ' + '(' + '_*' + process.env.SENTRY_VERSION + '*_' + ')' + 
                                  '<:Logo:487381198218461214> \n<:Logo:487381198218461214> Bot made by: ' + process.env.AUTHOR + ' <:Logo:487381198218461214>' + '\n <:Logo:487381198218461214>' + 
                                  '<:Logo:487381198218461214> OreSpawn and DangerZone made by: ' + process.env.AUTHOR2 + ' <:Logo:487381198218461214>' +
                                  `Logged in as: ${client.user.tag}!` + '<:Logo:487381198218461214> \n <:Logo:487381198218461214>' + 
                                  `Client Id: ${client.user.id}!` + '<:Logo:487381198218461214> \n <:Logo:487381198218461214>' + 
                                  `Is client Verified?: ${client.user.verified}!` + '<:Logo:487381198218461214> \n <:Logo:487381198218461214>' + 
                                  `Client Created on: ${client.user.createdAt}!` + '<:Logo:487381198218461214>');
  console.log(`Logged in as: ${client.user.tag}!`);
  console.log(`Client Id: ${client.user.id}!`);
  console.log(`Is client Verified?: ${client.user.verified}!`);
  console.log(`Client Created on: ${client.user.createdAt}!`);
  
    }
    else {
      console.log(`Nope, noppers, nadda. (NOT a Developer!)`);
      message.channel.sendMessage('Sorry Only a Developer can use this command');
}
  }
  
});


client.login(process.env.TOKEN);