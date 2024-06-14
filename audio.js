document.addEventListener('DOMContentLoaded', () => {
    const hoverSound = document.getElementById('hover-sound');
    const hoverableElements = document.querySelectorAll('.button');
    hoverSound.playbackRate = 1.5; 

    hoverableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0; 
            hoverSound.play();
        });
    });
});