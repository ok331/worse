document.addEventListener('DOMContentLoaded', () => {
    const enterScreen = document.querySelector('.enter-screen');
    const profileContainer = document.querySelector('.profile-container');
    const card = document.querySelector('.profile-card');
    let isHovering = false;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    // Handle enter screen click
    enterScreen.addEventListener('click', () => {
        // Fade out enter screen
        enterScreen.style.opacity = '0';
        
        setTimeout(() => {
            enterScreen.style.display = 'none';
            // Show and animate profile container
            profileContainer.classList.add('visible');
        }, 500);
    });

    // Custom cursor movement
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    function animate() {
        if (!isHovering) return;

        currentX += (targetX - currentX) * 0.4;
        currentY += (targetY - currentY) * 0.4;

        card.style.transform = `
            translate(-8%, -5%)
            rotateX(${currentY}deg)
            rotateY(${-currentX}deg)
            scale(1.035) /* Slightly increased scale */
        `;

        requestAnimationFrame(animate);
    }

    function updateMousePosition(e) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        targetX = (mouseX / rect.width) * 32;  // Slightly increased from 30
        targetY = (mouseY / rect.height) * 32; // Slightly increased from 30
    }

    function startMagneticEffect(e) {
        isHovering = true;
        updateMousePosition(e);
        requestAnimationFrame(animate);
    }

    function stopMagneticEffect() {
        isHovering = false;
        
        // Smooth return to original position
        const returnToPosition = () => {
            currentX *= 0.8; // Even faster return (was 0.85)
            currentY *= 0.8; // Even faster return (was 0.85)

            if (Math.abs(currentX) < 0.01 && Math.abs(currentY) < 0.01) {
                card.style.transform = 'translate(-8%, -5%) rotateX(0deg) rotateY(0deg) scale(1)';
                return;
            }

            card.style.transform = `
                translate(-8%, -5%)
                rotateX(${currentY}deg)
                rotateY(${-currentX}deg)
                scale(${1 + Math.max(Math.abs(currentX), Math.abs(currentY)) * 0.002})
            `;

            requestAnimationFrame(returnToPosition);
        };

        requestAnimationFrame(returnToPosition);
    }

    // Only enable magnetic effect on non-mobile devices
    if (window.matchMedia('(min-width: 850px)').matches) {
        card.addEventListener('mouseenter', startMagneticEffect);
        card.addEventListener('mouseleave', stopMagneticEffect);
        document.addEventListener('mousemove', (e) => {
            if (isHovering) {
                updateMousePosition(e);
            }
        });
    }

    const audio = document.getElementById('bgMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const seekBar = document.getElementById('seekBar');
    const currentTime = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');
    const musicPlayer = document.querySelector('.music-player');

    function updatePlayPauseIcon(isPlaying) {
        playIcon.style.display = isPlaying ? 'none' : 'block';
        pauseIcon.style.display = isPlaying ? 'block' : 'none';
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    audio.addEventListener('timeupdate', function() {
        const percent = (audio.currentTime / audio.duration) * 100;
        seekBar.style.setProperty('--seek-percent', `${percent}%`);
        seekBar.value = percent;
        currentTime.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', function() {
        seekBar.value = 0;
        durationSpan.textContent = formatTime(audio.duration);
    });

    seekBar.addEventListener('input', function() {
        const time = (seekBar.value / 100) * audio.duration;
        audio.currentTime = time;
    });

    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            updatePlayPauseIcon(true);
        } else {
            audio.pause();
            updatePlayPauseIcon(false);
        }
    });

    // Initial state - show play icon
    updatePlayPauseIcon(false);

    // First click anywhere
    document.body.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            updatePlayPauseIcon(true);
            musicPlayer.classList.add('visible'); // Show the music player
        }
    }, { once: true });
}); 