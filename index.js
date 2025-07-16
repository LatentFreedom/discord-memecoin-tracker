require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const axios = require('axios');

const TOKEN = process.env.DISCORD_TOKEN;
const MEMECOIN_ADDRESS = process.env.MEMECOIN_ADDRESS;
const MEMECOIN_DEX_PAIR_ID = process.env.MEMECOIN_DEX_PAIR_ID;
const API_URL = `https://api.dexscreener.com/latest/dex/pairs/solana/${MEMECOIN_DEX_PAIR_ID}`;

if (!TOKEN || !MEMECOIN_DEX_PAIR_ID) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

function formatMarketCap(mcap) {
  if (!mcap || isNaN(mcap)) return 'N/A';
  
  if (mcap >= 1e9) return `${(mcap / 1e9).toFixed(2)}B`;
  if (mcap >= 1e6) return `${(mcap / 1e6).toFixed(2)}M`;
  if (mcap >= 1e3) return `${(mcap / 1e3).toFixed(2)}K`;
  return mcap.toFixed(2);
}

async function updateStatus() {
  try {
    const { data } = await axios.get(API_URL, { timeout: 10000 });
    
    if (!data.pair || !data.pair.fdv) {
      console.warn('Invalid API response structure');
      return;
    }
    
    const mcap = data.pair.fdv;
    const formattedMcap = formatMarketCap(mcap);
    
    client.user.setPresence({
      activities: [{ name: `MC $${formattedMcap}`, type: ActivityType.Watching }],
      status: 'online'
    });
    
    console.log(`Updated status: MC $${formattedMcap}`);
  } catch (error) {
    console.error('Failed to update status:', error.message);
    client.user.setPresence({
      activities: [{ name: 'MC Loading...', type: ActivityType.Watching }],
      status: 'idle'
    });
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  updateStatus();
  setInterval(updateStatus, 30000); // 30s interval for better rate limiting
});

client.on('error', (error) => {
  console.error('Discord client error:', error);
});

process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

client.login(TOKEN);
