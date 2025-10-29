<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/11U8BjjCfPySTqnDpw4e4qhGjQYpQ3S5j

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key (for future AI features)
3. Run the app:
   `npm run dev`

## Deploy to Vercel (Recommended)

Quick deploy in 2 minutes:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
npm run deploy
```

Or use the automated script:
```bash
./deploy.sh
```

📖 **Full guide:** See [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md) for complete instructions.

📖 **Quick guide:** See [DEPLOY-RAPIDO.md](DEPLOY-RAPIDO.md) for 3-step deployment.
