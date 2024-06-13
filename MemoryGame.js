const levels = [
    [
        'https://i.pinimg.com/564x/2c/d0/76/2cd076de1e3f4de5aa86ea506656496d.jpg',
        'https://i.pinimg.com/564x/47/5b/f9/475bf96866c10d79a1d244bea2c84e06.jpg',
        'https://i.pinimg.com/564x/d2/ca/e1/d2cae1236d9b8e684b4a7cf65f8be46f.jpg',
        'https://i.pinimg.com/564x/a8/ee/46/a8ee46db1a0483d7d8438c938d9b7afc.jpg',
    ],
    [
        'https://i.pinimg.com/564x/cb/ab/36/cbab3668111326924649e6214dae92e1.jpg',
        'https://i.pinimg.com/564x/eb/98/9e/eb989e824ff06ee2d403873e4964ff72.jpg',
        'https://i.pinimg.com/564x/8d/d6/9e/8dd69e80c1e431064cca037f4c80d3c0.jpg',
        'https://i.pinimg.com/564x/6e/32/7d/6e327d3e65df63d56866dfb3282fb34a.jpg',
        'https://i.pinimg.com/564x/1d/86/a7/1d86a7742e95c493bd22a0ebcfe4c3a6.jpg',
        'https://i.pinimg.com/736x/80/63/8a/80638aef5495c6427e56b16d10d0b0ac.jpg'
    ],
    [
        'https://i.pinimg.com/564x/e8/97/3f/e8973f5d2ad973affccc127ca8e5a741.jpg',
        'https://i.pinimg.com/564x/b5/e5/9e/b5e59e7c698a0a6f94ac71e8edcb86ea.jpg',
        'https://i.pinimg.com/564x/fc/ef/20/fcef207c38b18647b396d3ebe707819f.jpg',
        'https://i.pinimg.com/564x/da/9c/54/da9c54bcea7b444f8f600b4c192002cd.jpg',
        'https://i.pinimg.com/564x/2b/d2/a0/2bd2a022761cfaf540720090ae6459ff.jpg',
        'https://i.pinimg.com/564x/8d/d6/9e/8dd69e80c1e431064cca037f4c80d3c0.jpg',
        'https://i.pinimg.com/564x/6e/32/7d/6e327d3e65df63d56866dfb3282fb34a.jpg',
        'https://i.pinimg.com/564x/2c/d0/76/2cd076de1e3f4de5aa86ea506656496d.jpg',

    ]
];

let currentLevel = 0;
let score = 0;
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

document.addEventListener("DOMContentLoaded", function() {
    const gameBoard = document.getElementById('gameBoard');
    const resetButton = document.getElementById('resetButton');
    const nextLevelButton = document.getElementById('nextLevelButton');
    const levelElement = document.getElementById('level');
    const scoreElement = document.getElementById('score');

    function createBoard(level) {
        const images = [...levels[level], ...levels[level]];
        shuffle(images);
        images.forEach((image) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.image = image;

            const cardImage = document.createElement('img');
            cardImage.src = image;

            card.appendChild(cardImage);
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        if (firstCard.dataset.image === secondCard.dataset.image) {
            disableCards();
            score += 10;
            scoreElement.textContent = score;
            if (checkIfLevelComplete()) {
                setTimeout(nextLevel, 1000);
            }
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function checkIfLevelComplete() {
        return document.querySelectorAll('.card:not(.flipped)').length === 0;
    }

    function nextLevel() {
        currentLevel++;
        if (currentLevel < levels.length) {
            resetGame();
        } else {
            alert('Congratulations! You have completed all levels!');
            resetButton.style.display = 'none';
            nextLevelButton.style.display = 'none';
        }
    }

    function resetGame() {
        gameBoard.innerHTML = '';
        createBoard(currentLevel);
        levelElement.textContent = currentLevel + 1;
        scoreElement.textContent = score;
    }

    resetButton.addEventListener('click', function() {
        currentLevel = 0;
        score = 0;
        resetButton.style.display = 'block';
        nextLevelButton.style.display = 'block';
        resetGame();
    });

    nextLevelButton.addEventListener('click', function() {
        nextLevel();
    });

    resetGame();
});
