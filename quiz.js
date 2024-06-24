const questions = [
    {
        image: 'https://tse2.mm.bing.net/th?id=OIP.kQKTfdpXxf-fqTKEMsx5jAHaE4&pid=Api&P=0&h=180',
        answers: {
            a: 'Alat musik kecapi',
            b: 'Alat musik tifa',
            c: 'Alat musik keso',
            d: 'Alat musik cengceng'
        },
        correctAnswer: 'c'
    },
    {
        image: 'https://lenteramata.com/wp-content/uploads/2020/01/panting.jpg',
        answers: {
            a: 'Alat musik panting',
            b: 'Alat musik tifa',
            c: 'Alat musik talempong',
            d: 'Alat musik gamelan'
        },
        correctAnswer: 'a'
    },
    {
        image: 'https://3.bp.blogspot.com/-7DBSSblm3M0/W3q-ojGSK2I/AAAAAAAABdI/ttXFFSvH5eAfhAnXu8Ih9ENnO6Pch8UGgCLcBGAs/s1600/lado-lado.JPG',
        answers: {
            a: 'Alat musik tifa',
            b: 'Alat musik kecapi',
            c: 'Alat musik lado-lado',
            d: 'Alat musik gamelan'
        },
        correctAnswer: 'c'
    },
    {
        image: 'https://seringjalan.com/wp-content/uploads/2020/04/pakaianadat1-1.jpg',
        answers: {
            a: 'Pakaian adat Sangkarut',
            b: 'Pakaian adat King Baba dan King Tompang',
            c: 'Pakaian adat Kustin',
            d: 'Pakaian adat Ta`a dan Sapei Sapaq '
        },
        correctAnswer: 'd'
    },
    {
        image: 'https://i0.wp.com/tambahpinter.com/wp-content/uploads/2020/09/Baamar-Galung-Pancar-Matahari.jpg',
        answers: {
            a: 'Pakaian adat Babaju Kun Galung',
            b: 'Pakaian adat King Baba dan King Tompang',
            c: 'Pakaian adat Ulee Balang',
            d: 'Pakaian adat Ta`a dan Sapei Sapaq'
        },
        correctAnswer: 'a'
    },
    {
        image: 'https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/08/08/IMG_4769-193612050.jpeg',
        answers: {
            a: 'Pakaian adat Babaju Kun Galung',
            b: 'Pakaian adat King Baba dan King Tompang',
            c: 'Pakaian adat Ulee Balang',
            d: 'Pakaian adat Ta`a dan Sapei Sapaq'
        },
        correctAnswer: 'c'
    },
    {
        image: 'https://i.pinimg.com/564x/dd/6e/ac/dd6eac9f0cf595df7b8c1249dfc65f0b.jpg',
        answers: {
            a: 'Surabi',
            b: 'Bolu Paranggi',
            c: 'Bika Ambon',
            d: 'Pendap'
        },
        correctAnswer: 'c'
    },
    {
        image: 'https://i.pinimg.com/564x/97/e4/34/97e434de8cc80d46d77144d81f2a5cc9.jpg',
        answers: {
            a: 'Gulai Belacan',
            b: 'Udang Merah',
            c: 'Binte Biluhuta',
            d: 'Tinutuan'
        },
        correctAnswer: 'a'
    },
    {
        image: 'https://tse2.mm.bing.net/th?id=OIP.W7AbJ34y3lqgTWCg0fJLogHaE8&pid=Api&P=0&h=180',
        answers: {
            a: 'Rumah Betang',
            b: 'Rumah Panjang',
            c: 'Rumah Baloy',
            d: 'Rumah Rakit'
        },
        correctAnswer: 'a'
    },
    {
        image: 'https://asset.kompas.com/crops/hfIev8H9bbgU2R7IVxbGR32wOLo=/0x0:1200x800/750x500/data/photo/2021/09/04/61334e074bfbc.jpg',
        answers: {
            a: 'Rumah Jew',
            b: 'Mod Aki Aksa',
            c: 'Baileo',
            d: 'Rumah Honai'
        },
        correctAnswer: 'd'
    },
];

let currentLevel = 0;
let score = 0;
let time = 30;
let timer;

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    startTimer();

    document.getElementById('resetButton').addEventListener('click', resetGame);
    document.getElementById('nextLevelButton').addEventListener('click', nextLevel);
});

function loadQuestion() {
    const question = questions[currentLevel];
    document.getElementById('question-image').src = question.image;
    document.querySelectorAll('.option-button').forEach(button => {
        button.innerText = question.answers[button.dataset.answer];
        button.onclick = checkAnswer;
    });
    document.getElementById('level').innerText = `Level: ${currentLevel + 1}`;
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('timer').innerText = `Time: ${time}`;
}

function checkAnswer(event) {
    const selectedAnswer = event.target.dataset.answer;
    if (selectedAnswer === questions[currentLevel].correctAnswer) {
        score += 10;
    }
    if (currentLevel < questions.length - 1) {
        currentLevel++;
        loadQuestion();
        resetTimer();
    } else {
        endGame();
    }
}

function startTimer() {
    timer = setInterval(() => {
        time--;
        document.getElementById('timer').innerText = `Time: ${time}`;
        if (time <= 0) {
            endGame();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    time = 30;
    document.getElementById('timer').innerText = `Time: ${time}`;
    startTimer();
}

function endGame() {
    clearInterval(timer);
    alert(`Game over! Your score is ${score}.`);
}

function resetGame() {
    clearInterval(timer);
    currentLevel = 0;
    score = 0;
    time = 30;
    loadQuestion();
    startTimer();
}

function nextLevel() {
    if (currentLevel < questions.length - 1) {
        currentLevel++;
        loadQuestion();
        resetTimer();
    } else {
        alert('Congratulations! You have completed all levels!');
        document.getElementById('resetButton').style.display = 'none';
        document.getElementById('nextLevelButton').style.display = 'none';
    }
}
