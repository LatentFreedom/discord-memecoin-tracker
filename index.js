require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const axios = require('axios');

const TOKEN = process.env.DISCORD_TOKEN;
const MEMECOIN_ADDRESS = process.env.MEMECOIN_ADDRESS;
const MEMECOIN_DEX_PAIR_ID = process.env.MEMECOIN_DEX_PAIR_ID;
const API_URL = `https://api.dexscreener.com/latest/dex/pairs/solana/${MEMECOIN_DEX_PAIR_ID}`;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setInterval(updateStatus, 20000);
  updateStatus();
});

async function updateStatus() {
  try {
    const { data } = await axios.get(API_URL);
    console.log(data);
    const mcap = data.pair.fdv;
    client.user.setPresence({
      activities: [{ name: `MC: $${mcap}`, type: ActivityType.Watching }],
      status: 'online'
    });
  } catch (e) {
    console.error(e);
  }
}

client.login(TOKEN);
