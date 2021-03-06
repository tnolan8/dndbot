"use strict";

require('dotenv').config();

const config = require('./config');

const Discord = require('discord.js');

const bot = new Discord.Client();

const morty = require('./utils/morty');

bot.login(config.default.TOKEN);
bot.on('ready', () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.info(`Logged in as ${bot.user.tag}!`);
});
bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.indexOf(config.default.prefix) !== 0) return;
  const args = message.content.slice(config.default.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLocaleLowerCase();

  if (command === 'roll') {
    // d20 3d20 d20+3
    const input = args.shift().toLocaleLowerCase();
    const numDice = input.split('d')[0];
    const dice = input.split('d').pop().split('+')[0];
    const modifier = input.split('+')[1];

    if (numDice === '') {
      const num = Math.floor(Math.random() * (dice - 1 + 1)) + 1;
      message.reply('```You rolled a ' + num + ' on a d' + dice + '```');
    } else {
      let result = 0;
      let num = 0;
      let rolls = [];

      for (let i = 0; i < numDice; i++) {
        num = Math.floor(Math.random() * (dice - 1 + 1)) + 1;
        result += num;
        rolls.push(num);
      }

      if (modifier) {
        result += Number(modifier);
        message.reply('```You rolled a ' + result + ' using ' + input + ' (' + rolls.join(' + ') + ') + ' + modifier + '```');
      } else {
        message.reply('```You rolled a ' + result + ' using ' + input + ' (' + rolls.join(' + ') + ')' + '```');
      }
    }
  } else if (command === 'help') {
    message.reply('```The following commands are available: \n > +roll: <num_of_dice><dice>+<modifier>```');
  } else if (command === 'mortyroll') {
    const num = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    const msg = morty.default[num];
    console.log(msg);
    message.reply('You rolled a: ' + msg);
  } else {
    message.reply('Jack');
  }
});