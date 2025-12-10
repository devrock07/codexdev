# Uploadthing Setup Instructions

## Step 1: Create Uploadthing Account

1. Go to https://uploadthing.com
2. Sign up with GitHub or email
3. Create a new app

## Step 2: Get API Keys

1. In your Uploadthing dashboard, go to API Keys
2. Copy your `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID`

## Step 3: Add to Environment Variables

Add these to your `.env.local` file:

```env
UPLOADTHING_SECRET=sk_live_xxxxxxxxxxxxx
UPLOADTHING_APP_ID=xxxxxxxxxxxxx
```

## Step 4: Restart Dev Server

```bash
npm run dev
```

## Usage

1. Login to dashboard
2. Click "CDN Files" button
3. Upload images or ZIP files
4. Click "Copy URL" to get shareable link
5. Share link in Discord - embeds will work automatically!

## Features

- ✅ Upload images (PNG, JPG, GIF, WEBP)
- ✅ Upload ZIP files
- ✅ Max 16MB per file
- ✅ Discord embed support
- ✅ Direct download links
- ✅ Download counter
- ✅ Private - only accessible via direct link
