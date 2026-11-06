# 🎂 Happy Birthday Appu! 🎂❤️

A cute, colorful birthday website for Appu, built with **HTML, CSS, and JavaScript** (with Bootstrap for layout and modals). Its pink-and-purple theme includes floating balloons, hearts and stars, an interactive cake, a surprise gift, a photo gallery, confetti, fireworks, and optional synthesized birthday music.

---

## 🌟 Key Features

### 1. Birthday Welcome
- Animated heading: **"Happy Birthday Appu! 🎂❤️"**
- A live celebration timer and quick links to the cake, gift, and birthday note
- **Live Celebration / Countdown Timer**: Displays Days, Hours, Minutes, and Seconds
- Quick action CTA buttons with smooth scrolling

### 2. Interactive 3D Birthday Cake
- Multi-tier pastel birthday cake with strawberry cream, frosting drips, and candle wicks
- Flickering candle flames with realistic glow
- **Interactive Blow Action**: Click/tap the cake or button to blow out the candles
- Candle flames vanish into realistic drifting smoke particles
- Celebratory confetti & fireworks explosion
- Secret wish banner slides into view with a loving birthday wish for Appu
- "Relight Candles" button to repeat the fun

### 3. Emotional Birthday Messages & Wishes
- 4 interactive glassmorphic cards:
  - 🌟 **Your Radiant Smile**: Celebrating her warmth
  - 🕊️ **Your Gentle Heart**: Honoring her kindness
  - ⭐ **Limitless Dreams**: Inspiring her future
  - 👑 **Endless Joy**: Wishing her happiness
- Interactive "Love" heart counter on each card
- Romantic centerpiece quote banner

### 4. Memories & Polaroid Photo Gallery
- Polaroid-style photo cards with washi tape accents, dates, and sweet titles
- Category filter pills: *All Memories*, *Sweet Smiles*, *Celebrations*, *Special Moments*
- Interactive heart like buttons on each memory
- **Lightbox Preview**: Click any photo to enlarge in full view with romantic caption
- The included SVG pictures are placeholders. Use **Choose Photos to Add** to preview personal photos in the browser.

### 5. Surprise 3D Gift Box
- 3D gift box wrapped with golden bow and satin ribbon
- Wiggles playfully on hover
- Click to untie ribbons and pop open the lid with an audio fanfare, fireworks, and confetti blast!
- Opens a hidden birthday message modal with heartfelt vows and birthday privileges

### 6. Interactive Birthday Note
- Open the pastel envelope to read the personal message for Appu

### 7. Celebration Playground
- Interactive instant fun triggers:
  - 🎊 **Confetti Cannon**: Multi-colored heart & pastel confetti bursts
  - 🎆 **Sky Fireworks**: Full-screen pastel firework bursts
  - 🎈 **Release Balloons**: Floats a flock of 12+ pastel balloons
  - 💖 **Shower Hearts**: Cascading emoji hearts down the screen

### 8. Optional Birthday Music
- Built using **Web Audio API** (100% reliable across all modern browsers, no broken 404 links or CORS errors)
- Synthesizes a gentle music-box version of "Happy Birthday" in a loop; use the music button to play or pause
- Harmonic chord accompaniment for an emotional, dreamy vibe
- Interactive sound effects:
  - Candle blowing wind puff & magic chime chord
  - Gift unwrapping harp sweep
  - Envelope paper rustle & chime
  - Bubble pop sound effects
- Floating music control button + navbar mini-player with animated equalizer bars

### 9. Grand Finale: "You are Special! ❤️"
- Giant 3D beating heart with glowing pink-purple aura
- Heartfelt birthday wishes for Appu
- "Copy Birthday Wish" button with instant toast notification
- "Replay The Magic" smooth scroll button

### 10. Ambient Animations & Visual Polish
- Floating pastel balloons drifting upwards from the background (click to pop them!)
- Ambient canvas with twinkling stars and soft floating hearts
- Cursor / Touch heart sparkle trails that follow finger or mouse movement
- 100% Responsive layout optimized for mobile, tablet, and desktop

---

## 📁 Folder Structure

```
bdy/
├── index.html              # Main HTML webpage
├── README.md               # Documentation and customization guide
├── css/
│   ├── style.css           # Primary theme styling, pastel palette & layout
│   └── animations.css      # 3D cake, gift box, envelope, balloons & keyframes
├── js/
│   ├── audio.js            # Web Audio API music box engine & sound effects
│   ├── confetti-fireworks.js # Canvas fireworks, ambient particles & balloons
│   └── script.js           # Main interaction controller & event handlers
└── assets/
    └── images/             # Vector memory illustrations & photo assets
        ├── memory-1.svg    # Fairy Tale Moments
        ├── memory-2.svg    # Sweetest Blooms
        ├── memory-3.svg    # Sweetest Treats
        ├── memory-4.svg    # Starry Wishes
        ├── memory-5.svg    # Floating Dreams
        └── memory-6.svg    # Warm & Cherished
```

---

## 🚀 How to Run the Website

### Option 1: Direct File Open (Easiest)
Simply double-click **`index.html`** in your file explorer, or right-click `index.html` and choose **Open with > Chrome / Edge / Firefox / Safari**.

### Option 2: Local Web Server (Optional)
If you have VS Code:
1. Open the folder `bdy` in VS Code.
2. Install the **Live Server** extension.
3. Click **"Go Live"** in the bottom status bar.

---

## 🛠️ Personalization & Customization Guide

1. **Add Appu's Photos**:
   - Use **Choose Photos to Add** in the Memories section to preview local photos. To make photos permanent, replace the SVG placeholders in `assets/images/` and update their image paths in `index.html`.
2. **Change the Music Melody or Tempo**:
   - In `js/audio.js`, adjust `this.tempo = 110` to make the music faster or slower.
3. **Edit the Birthday Note**:
   - In `index.html`, edit the text inside `<div class="letter-paper">`.

---

## 💖 Made with Love for Appu
Wishing Appu the happiest, sweetest, and most memorable birthday ever! 🎂🌸✨
