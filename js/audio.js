/**
 * audio.js - Romantic Music Box Synthesizer & Sound Effects
 * Uses Web Audio API for zero-dependency, 100% reliable sound across all devices.
 */

class BirthdayAudioEngine {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.isMuted = false;
        this.currentNoteIndex = 0;
        this.timer = null;
        this.tempo = 110; // BPM
        this.melody = [
            // [note, duration in beats]
            // Phrase 1: Happy Birthday to you
            { note: 'C4', dur: 0.75 },
            { note: 'C4', dur: 0.25 },
            { note: 'D4', dur: 1.0 },
            { note: 'C4', dur: 1.0 },
            { note: 'F4', dur: 1.0 },
            { note: 'E4', dur: 2.0 },
            { rest: true, dur: 0.5 },

            // Phrase 2: Happy Birthday to you
            { note: 'C4', dur: 0.75 },
            { note: 'C4', dur: 0.25 },
            { note: 'D4', dur: 1.0 },
            { note: 'C4', dur: 1.0 },
            { note: 'G4', dur: 1.0 },
            { note: 'F4', dur: 2.0 },
            { rest: true, dur: 0.5 },

            // Phrase 3: Happy Birthday dear Appu
            { note: 'C4', dur: 0.75 },
            { note: 'C4', dur: 0.25 },
            { note: 'C5', dur: 1.0 },
            { note: 'A4', dur: 1.0 },
            { note: 'F4', dur: 1.0 },
            { note: 'E4', dur: 1.0 },
            { note: 'D4', dur: 1.5 },
            { rest: true, dur: 0.5 },

            // Phrase 4: Happy Birthday to you
            { note: 'Bb4', dur: 0.75 },
            { note: 'Bb4', dur: 0.25 },
            { note: 'A4', dur: 1.0 },
            { note: 'F4', dur: 1.0 },
            { note: 'G4', dur: 1.0 },
            { note: 'F4', dur: 2.5 },
            { rest: true, dur: 1.5 }
        ];

        // Harmonic accompaniment arpeggios for romantic dreamy feel
        this.chords = [
            ['F3', 'A3', 'C4'],
            ['C3', 'G3', 'C4'],
            ['C3', 'G3', 'C4'],
            ['F3', 'A3', 'C4'],
            ['F3', 'A3', 'C4'],
            ['Bb3', 'D4', 'F4'],
            ['C3', 'G3', 'Bb3'],
            ['F3', 'C4', 'F4']
        ];
        this.chordStep = 0;

        this.noteFrequencies = {
            'C3': 130.81, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'Bb3': 233.08, 'B3': 246.94,
            'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
            'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00
        };
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Gentle music box chime generator
    playChime(freq, duration = 1.2, volume = 0.2, type = 'sine') {
        if (!this.ctx || this.isMuted) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const oscHarmonic = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        // Primary tone (warm chime)
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);

        // Gentle metallic chime overtone
        oscHarmonic.type = 'triangle';
        oscHarmonic.frequency.setValueAtTime(freq * 2.01, now);

        // Envelope: soft instant attack, long delicate decay
        gainNode.gain.setValueAtTime(0.001, now);
        gainNode.gain.exponentialRampToValueAtTime(volume, now + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gainNode);
        oscHarmonic.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start(now);
        oscHarmonic.start(now);

        osc.stop(now + duration);
        oscHarmonic.stop(now + duration);
    }

    // Play next note in sequence
    tick() {
        if (!this.isPlaying) return;

        const item = this.melody[this.currentNoteIndex];
        const beatSec = 60 / this.tempo;
        const durationSec = item.dur * beatSec;

        if (!item.rest && item.note) {
            const freq = this.noteFrequencies[item.note];
            this.playChime(freq, Math.max(durationSec * 1.5, 0.8), 0.25, 'sine');

            // Play background romantic soft arpeggio note every 2 melody notes
            if (this.currentNoteIndex % 2 === 0) {
                const chord = this.chords[this.chordStep % this.chords.length];
                const bgNote = chord[Math.floor(Math.random() * chord.length)];
                if (this.noteFrequencies[bgNote]) {
                    this.playChime(this.noteFrequencies[bgNote] * 0.5, 2.0, 0.08, 'triangle');
                }
                this.chordStep++;
            }
        }

        this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;

        // Schedule next note
        this.timer = setTimeout(() => {
            this.tick();
        }, durationSec * 1000);
    }

    startBgm() {
        this.init();
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.currentNoteIndex = 0;
        this.tick();
        this.updateUiState(true);
    }

    stopBgm() {
        this.isPlaying = false;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.updateUiState(false);
    }

    toggleBgm() {
        if (this.isPlaying) {
            this.stopBgm();
        } else {
            this.startBgm();
        }
    }

    updateUiState(playing) {
        const musicBtn = document.getElementById('musicToggleBtn');
        const visualizer = document.getElementById('musicVisualizer');
        const musicStatus = document.getElementById('musicStatusText');

        if (musicBtn) {
            if (playing) {
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                if (visualizer) visualizer.classList.add('active');
                if (musicStatus) musicStatus.textContent = 'Playing: Soft Birthday Melody 🎵';
            } else {
                musicBtn.classList.remove('playing');
                musicBtn.innerHTML = '<i class="fas fa-music"></i>';
                if (visualizer) visualizer.classList.remove('active');
                if (musicStatus) musicStatus.textContent = 'Tap to play Birthday Music 🎶';
            }
        }
    }

    // --- SOUND EFFECTS ---

    // Realistic candle blow puff followed by magical chime
    playCandleBlow() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        // Wind puff buffer
        const bufferSize = this.ctx.sampleRate * 0.5;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        // Lowpass filter for deep breath / puff
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.linearRampToValueAtTime(200, now + 0.5);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
        noise.stop(now + 0.5);

        // Magical sparkle chime chord after blowing
        setTimeout(() => {
            const sparkleNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
            sparkleNotes.forEach((f, i) => {
                setTimeout(() => {
                    this.playChime(f, 1.5, 0.18, 'sine');
                }, i * 100);
            });
        }, 350);
    }

    // Gift unwrap fanfare / harp sweep
    playGiftFanfare() {
        this.init();
        const harp = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
        harp.forEach((freq, idx) => {
            setTimeout(() => {
                this.playChime(freq, 1.2, 0.15, 'sine');
            }, idx * 60);
        });
    }

    // Cute soft click / heart tap pop
    playPop() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
    }

    // Letter open paper rustle & gentle chime
    playLetterOpen() {
        this.init();
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((freq, i) => {
            setTimeout(() => {
                this.playChime(freq, 1.0, 0.15, 'triangle');
            }, i * 120);
        });
    }
}

// Global audio engine instance
window.birthdayAudio = new BirthdayAudioEngine();
