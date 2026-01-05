# Beats Marketplace - Setup Guide

## 🎵 How It Works

Your website now automatically loads beats from audio files and displays them as products.

## 📁 Adding Beats

### Step 1: Name Your Audio File Correctly
Format: `Title_BPMbpm_Key.mp3`

Examples:
- `TrapVibes_140bpm_Cm.mp3`
- `ChillBeats_90bpm_Am.mp3`
- `DrillEnergy_150bpm_Dm.mp3`

### Step 2: Place Audio File
Drop your audio file in:
```
demo/src/main/resources/audio-beats/
```

### Step 3: That's It!
The beat will automatically appear on your website:
- Title extracted from filename
- BPM and Key parsed
- Random genre assigned
- Random cover image from assets
- €27.00 price set automatically
- 40-second audio preview available

## 🎨 Cover Images Used
The system randomly picks from:
- Kesmo_Mezzanotte_29.jpg
- Kesmo_Mezzanotte_28.jpg
- Kesmo_Mezzanotte_14.jpg
- Kesmo_Mezzanotte_34.jpg
- Kesmo_Mezzanotte_33.jpg
- studio-img1.jpeg
- studio-img2.jpeg
- studio-img3.jpeg

## 💰 When Someone Buys

1. Beat is marked as SOLD in database
2. Email notification sent to: **info.nosaintz@gmail.com**
3. Audio file is **deleted** from audio-beats folder
4. Beat is **removed** from website
5. Buyer gets invoice with "EXCLUSIVE RIGHTS" label

## 📧 Email Notification Contains:
- Beat title, genre, BPM, key
- Purchase price
- Buyer's email
- Confirmation of exclusive rights transfer

## ⚠️ Important Notes

- **Audio Preview**: Currently plays full audio. To limit to 40 seconds, you need to:
  - Pre-process audio files to 40-second previews before uploading
  - OR implement server-side audio trimming (requires FFmpeg)

- **No Beats = No Section**: If audio-beats folder is empty, the Beats Section won't appear on the homepage

- **Supported Formats**: .mp3, .wav, .m4a

## 🔄 Sync Beats Manually

The system auto-syncs when users visit the beats page, but you can force sync:
```bash
curl -X POST http://localhost:5713/api/beats/sync
```

## 📊 Current Configuration

- **Price**: €27.00 (fixed for all beats)
- **Genres**: Trap, Hip-Hop, R&B, Drill, Lo-Fi, Boom Bap
- **Split**: 50/50 between Nicolò & Andrea
- **Exclusive**: Yes - beats are removed after purchase
