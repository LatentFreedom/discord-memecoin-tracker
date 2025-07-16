# Discord Memecoin Market Cap Tracker

A Discord bot that displays real-time memecoin market cap in your Discord status. Built with Node.js and Discord.js.

## Features

- 🚀 Real-time market cap tracking from DexScreener API
- 📊 Smart formatting (K/M/B suffixes) for readability
- 🔄 Auto-updates every 30 seconds
- 🛡️ Robust error handling and graceful fallbacks
- ⚡ Lightweight and efficient

## Prerequisites

- Node.js (v16 or higher)
- Discord Bot Token
- Solana memecoin DEX pair ID

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd discord-memecoin-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DISCORD_TOKEN=your_discord_bot_token_here
   MEMECOIN_ADDRESS=your_memecoin_address_here
   MEMECOIN_DEX_PAIR_ID=your_dex_pair_id_here
   ```

4. **Run the bot**
   ```bash
   node index.js
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_TOKEN` | Your Discord bot token from Discord Developer Portal | ✅ |
| `MEMECOIN_ADDRESS` | The memecoin contract address | ✅ |
| `MEMECOIN_DEX_PAIR_ID` | DexScreener pair ID for the token | ✅ |

## Getting Your Discord Bot Token

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to "Bot" section
4. Create a bot and copy the token
5. Enable "Presence Intent" in Bot settings

## Finding Your DEX Pair ID

1. Visit [DexScreener](https://dexscreener.com)
2. Search for your memecoin
3. Click on the trading pair
4. Copy the pair ID from the URL (e.g., `https://dexscreener.com/solana/PAIR_ID`)

## Usage

Once running, the bot will:
- Display the current market cap in your Discord status
- Update automatically every 30 seconds
- Show formatted values (e.g., "$1.23M" instead of "$1234567")
- Handle API errors gracefully with fallback status

## Error Handling

The bot includes comprehensive error handling:
- Invalid API responses
- Network timeouts
- Missing environment variables
- Discord connection issues

When errors occur, the bot will show "MC Loading..." status and continue attempting updates.

## Dependencies

- `discord.js` - Discord API wrapper
- `axios` - HTTP client for API requests
- `dotenv` - Environment variable management

## License

MIT License - feel free to use and modify as needed.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues or questions, please open an issue on GitHub. 