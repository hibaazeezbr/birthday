/**
 * script.js - Main Application Logic for Appu's Birthday Wish Website
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initCountdownTimer();
    initInteractiveCake();
    initSurpriseGift();
    initLoveLetterEnvelope();
    initGalleryFiltersAndLikes();
    initPhotoUploadPreview();
    initMusicControls();
    initCelebrationControls();
    initShareWish();
});

/* ===================================================
   1. NAVBAR SCROLL EFFECT
   =================================================== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar-floating');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ===================================================
   2. BIRTHDAY COUNTDOWN / CELEBRATION TIMER
   =================================================== */
function initCountdownTimer() {
    const daysEl = document.getElementById('countDays');
    const hoursEl = document.getElementById('countHours');
    const minsEl = document.getElementById('countMinutes');
    const secsEl = document.getElementById('countSeconds');
    const labelEl = document.getElementById('countdownLabelText');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    // Set celebration date: If today is Appu's birthday, celebrate!
    // Or calculate countdown to today / next birthday
    const now = new Date();
    // Default celebration target: today's date forward
    let targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    function updateTimer() {
        const current = new Date();
        let diff = targetDate - current;

        // If target has passed today, keep it in "Celebration Mode"
        if (diff <= 0) {
            if (labelEl) {
                labelEl.innerHTML = '🎉 CELEBRATING APPU\'S SPECIAL MOMENT! 🎉';
            }
            // Count active celebration hours of the day
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
            const celebrationElapsed = current - startOfDay;
            const hours = Math.floor((celebrationElapsed / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((celebrationElapsed / (1000 * 60)) % 60);
            const seconds = Math.floor((celebrationElapsed / 1000) % 60);

            daysEl.textContent = '00';
            hoursEl.textContent = String(hours).padStart(2, '0');
            minsEl.textContent = String(minutes).padStart(2, '0');
            secsEl.textContent = String(seconds).padStart(2, '0');
        } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minsEl.textContent = String(minutes).padStart(2, '0');
            secsEl.textContent = String(seconds).padStart(2, '0');
        }
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* ===================================================
   3. INTERACTIVE BIRTHDAY CAKE & CANDLE BLOWING
   =================================================== */
function initInteractiveCake() {
    const cakeContainer = document.getElementById('cakeContainer');
    const flames = document.querySelectorAll('.flame');
    const smokes = document.querySelectorAll('.smoke');
    const wishBanner = document.getElementById('cakeWishBanner');
    const blowButton = document.getElementById('blowCandlesBtn');
    const relightBtn = document.getElementById('relightCandlesBtn');
    let candlesBlown = false;

    function blowOutCandles() {
        if (candlesBlown) return;
        candlesBlown = true;

        // Play blowing sound effect & magical chime
        if (window.birthdayAudio) {
            window.birthdayAudio.playCandleBlow();
        }

        // Extinguish flames
        flames.forEach(flame => flame.classList.add('blown'));

        // Drift smoke particles
        smokes.forEach(smoke => {
            smoke.classList.add('active');
            setTimeout(() => smoke.classList.remove('active'), 2000);
        });

        // Launch celebratory confetti and fireworks
        if (window.BirthdayCelebration) {
            window.BirthdayCelebration.fireGrandExplosion();
        }

        // Reveal wish banner
        if (wishBanner) {
            setTimeout(() => {
                wishBanner.style.display = 'block';
            }, 600);
        }

        if (blowButton) {
            blowButton.innerHTML = '✨ Wish Made! ✨';
            blowButton.style.opacity = '0.7';
            blowButton.style.pointerEvents = 'none';
        }
    }

    function relightCandles() {
        candlesBlown = false;
        flames.forEach(flame => flame.classList.remove('blown'));
        if (wishBanner) {
            wishBanner.style.display = 'none';
        }
        if (blowButton) {
            blowButton.innerHTML = '🎂 Blow the Candles';
            blowButton.style.opacity = '1';
            blowButton.style.pointerEvents = 'auto';
        }
        if (window.birthdayAudio) {
            window.birthdayAudio.playPop();
        }
    }

    if (cakeContainer) {
        cakeContainer.addEventListener('click', blowOutCandles);
    }
    if (blowButton) {
        blowButton.addEventListener('click', blowOutCandles);
    }
    if (relightBtn) {
        relightBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            relightCandles();
        });
    }
}

/* ===================================================
   4. SURPRISE GIFT BOX WITH HIDDEN MESSAGE
   =================================================== */
function initSurpriseGift() {
    const giftBox = document.getElementById('surpriseGiftBox');
    const hiddenMsgModal = new bootstrap.Modal(document.getElementById('hiddenMessageModal'), {
        keyboard: true
    });

    if (!giftBox) return;

    let isOpened = false;

    function openGift() {
        if (!isOpened) {
            isOpened = true;
            giftBox.classList.add('opened');

            // Play gift unwrap harp sound
            if (window.birthdayAudio) {
                window.birthdayAudio.playGiftFanfare();
            }

            // Fire grand fireworks and confetti
            if (window.BirthdayCelebration) {
                window.BirthdayCelebration.fireGrandExplosion();
            }

            // Show hidden message modal after a delightful animation delay
            setTimeout(() => {
                hiddenMsgModal.show();
            }, 900);
        } else {
            // Already opened: reopen the message modal directly
            hiddenMsgModal.show();
        }
    }

    giftBox.addEventListener('click', openGift);
    giftBox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openGift();
        }
    });
}

/* ===================================================
   5. INTERACTIVE LOVE LETTER & WAX SEAL
   =================================================== */
function initLoveLetterEnvelope() {
    const envelopeContainer = document.getElementById('envelopeContainer');
    const waxSeal = document.getElementById('waxSeal');

    if (!envelopeContainer) return;

    function toggleLetter(e) {
        e.stopPropagation();
        const isOpen = envelopeContainer.classList.contains('opened');

        if (!isOpen) {
            envelopeContainer.classList.add('opened');
            if (window.birthdayAudio) {
                window.birthdayAudio.playLetterOpen();
            }
            if (window.BirthdayCelebration) {
                window.BirthdayCelebration.fireConfetti();
            }
        } else {
            envelopeContainer.classList.remove('opened');
            if (window.birthdayAudio) {
                window.birthdayAudio.playPop();
            }
        }
    }

    envelopeContainer.addEventListener('click', toggleLetter);
    if (waxSeal) {
        waxSeal.addEventListener('click', toggleLetter);
    }
}

/* ===================================================
   6. PHOTO GALLERY FILTERS, LIKES & LIGHTBOX
   =================================================== */
function initGalleryFiltersAndLikes() {
    // Filter pills
    const filterBtns = document.querySelectorAll('.btn-gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-col');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'slideDownFade 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });

            if (window.birthdayAudio) window.birthdayAudio.playPop();
        });
    });

    // Like buttons on Polaroid cards
    const likeButtons = document.querySelectorAll('.polaroid-like-btn, .card-heart-btn');
    likeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('liked');

            const icon = btn.querySelector('i');
            if (icon) {
                if (btn.classList.contains('liked')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                }
            }

            if (window.birthdayAudio) window.birthdayAudio.playPop();

            // Spawn floating hearts from button
            const rect = btn.getBoundingClientRect();
            spawnFloatingHeartAt(rect.left + rect.width / 2, rect.top);
        });
    });

    // Lightbox Modal for Polaroids
    const polaroidCards = document.querySelectorAll('.polaroid-card');
    const lightboxModalEl = document.getElementById('photoLightboxModal');
    const lightboxModal = new bootstrap.Modal(lightboxModalEl);
    const lightboxImg = document.getElementById('lightboxModalImg');
    const lightboxCaption = document.getElementById('lightboxModalCaption');

    polaroidCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('.polaroid-img');
            const title = card.querySelector('.polaroid-title');
            const date = card.querySelector('.polaroid-date');

            if (img && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
            }
            if (lightboxCaption) {
                lightboxCaption.innerHTML = `
                    <h4 class="font-handwriting mb-1" style="font-size: 2rem; color: var(--primary-pink);">${title ? title.textContent : ''}</h4>
                    <p class="text-muted small mb-0">${date ? date.textContent : ''}</p>
                `;
            }
            lightboxModal.show();
            if (window.birthdayAudio) window.birthdayAudio.playPop();
        });
    });
}

function spawnFloatingHeartAt(x, y) {
    const heart = document.createElement('div');
    heart.className = 'cursor-heart-trail';
    heart.textContent = '💖';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);

    setTimeout(() => {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
    }, 1000);
}

/* ===================================================
   7. CUSTOM PHOTO UPLOAD & PREVIEW FEATURE
   =================================================== */
function initPhotoUploadPreview() {
    const uploadInput = document.getElementById('userPhotoInput');
    const galleryRow = document.getElementById('galleryRow');

    if (!uploadInput || !galleryRow) return;

    uploadInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        Array.from(files).forEach((file, index) => {
            if (!file.type.startsWith('image/')) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const col = document.createElement('div');
                col.className = 'col-lg-4 col-md-6 gallery-col';
                col.setAttribute('data-category', 'smiles');

                col.innerHTML = `
                    <div class="polaroid-card">
                        <div class="washi-tape"></div>
                        <div class="polaroid-img-wrapper">
                            <img src="${event.target.result}" alt="A beautiful memory of Appu" class="polaroid-img">
                        </div>
                        <div class="polaroid-caption">
                            <div class="polaroid-title">A Special Memory ✨</div>
                            <div class="polaroid-date">Added with love just now</div>
                        </div>
                        <button class="polaroid-like-btn liked" title="Like">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                `;

                // Insert at beginning of gallery
                galleryRow.insertBefore(col, galleryRow.firstChild);

                // Attach click handlers
                const newCard = col.querySelector('.polaroid-card');
                const newLikeBtn = col.querySelector('.polaroid-like-btn');
                const lightboxModal = bootstrap.Modal.getInstance(document.getElementById('photoLightboxModal')) || new bootstrap.Modal(document.getElementById('photoLightboxModal'));
                const lightboxImg = document.getElementById('lightboxModalImg');
                const lightboxCaption = document.getElementById('lightboxModalCaption');

                newLikeBtn.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    newLikeBtn.classList.toggle('liked');
                    if (window.birthdayAudio) window.birthdayAudio.playPop();
                });

                newCard.addEventListener('click', () => {
                    lightboxImg.src = event.target.result;
                    lightboxCaption.innerHTML = `
                        <h4 class="font-handwriting mb-1" style="font-size: 2rem; color: var(--primary-pink);">A Special Memory ✨</h4>
                        <p class="text-muted small mb-0">Added with love</p>
                    `;
                    lightboxModal.show();
                });
            };
            reader.readAsDataURL(file);
        });

        // Trigger confetti celebration on upload
        if (window.BirthdayCelebration) {
            window.BirthdayCelebration.fireConfetti();
        }
    });
}

/* ===================================================
   8. MUSIC CONTROLS & FIRST-GESTURE PLAY
   =================================================== */
function initMusicControls() {
    const musicBtn = document.getElementById('musicToggleBtn');
    const floatingMusicBtn = document.getElementById('floatingMusicBtn');

    function toggleAudio() {
        if (window.birthdayAudio) {
            window.birthdayAudio.toggleBgm();
        }
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', toggleAudio);
    }
    if (floatingMusicBtn) {
        floatingMusicBtn.addEventListener('click', toggleAudio);
    }

}

/* ===================================================
   9. CELEBRATION PLAYGROUND BUTTONS
   =================================================== */
function initCelebrationControls() {
    const confettiBtn = document.getElementById('btnCelebrationConfetti');
    const fireworksBtn = document.getElementById('btnCelebrationFireworks');
    const balloonsBtn = document.getElementById('btnCelebrationBalloons');
    const heartsBtn = document.getElementById('btnCelebrationHearts');
    const replayMagicBtn = document.getElementById('btnReplayMagic');

    if (confettiBtn) {
        confettiBtn.addEventListener('click', () => {
            if (window.BirthdayCelebration) window.BirthdayCelebration.fireGrandExplosion();
            if (window.birthdayAudio) window.birthdayAudio.playPop();
        });
    }

    if (fireworksBtn) {
        fireworksBtn.addEventListener('click', () => {
            if (window.fireworksEngine) window.fireworksEngine.launchBurst(6);
            if (window.birthdayAudio) window.birthdayAudio.playGiftFanfare();
        });
    }

    if (balloonsBtn) {
        balloonsBtn.addEventListener('click', () => {
            if (window.balloonManager) window.balloonManager.releaseMany(12);
            if (window.birthdayAudio) window.birthdayAudio.playPop();
        });
    }

    if (heartsBtn) {
        heartsBtn.addEventListener('click', () => {
            if (window.BirthdayCelebration) window.BirthdayCelebration.heartShower();
            if (window.birthdayAudio) window.birthdayAudio.playPop();
        });
    }

    if (replayMagicBtn) {
        replayMagicBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (window.BirthdayCelebration) window.BirthdayCelebration.fireGrandExplosion();
            if (window.birthdayAudio && !window.birthdayAudio.isPlaying) {
                window.birthdayAudio.startBgm();
            }
        });
    }
}

/* ===================================================
   10. SHARE / COPY BIRTHDAY WISH
   =================================================== */
function initShareWish() {
    const shareBtn = document.getElementById('btnShareWish');
    const toastEl = document.getElementById('shareWishToast');
    const toast = toastEl ? new bootstrap.Toast(toastEl) : null;

    if (!shareBtn) return;

    const wishMessage = `🎂 Happy Birthday Appu! 🎂❤️\nDear Appu, you are not just my sister, you are my happiness, my best friend and my forever support. May your life always be filled with love, happiness and success. Love you so much, Appu! ❤️`;

    shareBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(wishMessage).then(() => {
                if (toast) toast.show();
            }).catch(() => {
                promptCopyFallback(wishMessage);
            });
        } else {
            promptCopyFallback(wishMessage);
        }

        if (window.birthdayAudio) window.birthdayAudio.playPop();
        if (window.BirthdayCelebration) window.BirthdayCelebration.fireConfetti();
    });
}

function promptCopyFallback(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    const toastEl = document.getElementById('shareWishToast');
    if (toastEl) {
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
}
