window.addEventListener("DOMContentLoaded", () => {
  
  const questions = [
    {
      question: 'Siapakah Presiden Indonesia Yang Ke-7?',
      answer: [
        { text: 'Soeharto', correct: false },
        { text: 'Soekarno', correct: false },
        { text: 'Gusdur', correct: false },
        { text: 'BJ Habibie', correct: false },
        { text: 'Joko Widodo', correct: true },
        { text: 'Susilo Bambang Yudoyono', correct: false }
      ]
    }, 
    {
      question: 'Dua Tiga Tutup Botol, Muka Kamu Kayak ...',
      answer: [
        { text: 'Kecap', correct: false },
        { text: 'Botol', correct: true },
        { text: 'Cendol', correct: false }
      ]
    },
    {
      question: 'Siapa Karakter Jahat Paling Kuat Di Naruto?',
      answer: [
        { text: 'Obito', correct: false },
        { text: 'Uciha Madara', correct: true },
        { text: 'Pain', correct: false },
        { text: 'Sakura', correct: false }
      ]
    },
    {
      question: 'Tanggal Berapa Negara Indonesia Merdeka?',
      answer: [
        { text: '17 Agustus 1945', correct: true },
        { text: '20 Mei 2004', correct: false },
        { text: '12 April 1500', correct: false },
        { text: '30 Desember 1745', correct: false }
      ]
    },
    {
      question: 'Anime Terbaik Sepanjang Masa?',
      answer: [
        { text: 'Naruto', correct: false },
        { text: 'One Piece', correct: true },
        { text: 'Jujutsu Kaisen', correct: false },
        { text: 'Dragon Ball', correct: false },
        { text: 'Boku No Pico', correct: false }
      ]
    }
  ];
  
  const limitTime = 10;
  let currentQuestionIndex = 0;
  let time = limitTime;
  let score = 0;
  let interval;
  
  const question = document.querySelector('.question');
  const listContainer = document.querySelector('.list-container');
  const totalQuestion = document.querySelector('.total-question');
  const nextBtn = document.querySelector('.btn-next');
  const timer = document.querySelector('.timer');
  
  function startQuizGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.textContent = 'Next Question';
    nextBtn.style.display = 'none';
    showQuestions();
  }
  
  startQuizGame();
  
  function showQuestions() {
    const data = questions[currentQuestionIndex];
    question.textContent = `${currentQuestionIndex + 1}. ${data.question}`;
    totalQuestion.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
    time = limitTime;
    timer.textContent = time;
    nextBtn.style.display = 'none';
    listContainer.innerHTML = '';
    setButton(data.answer);
    setTimer();
  }
  
  function setButton(answers) {
    answers.forEach(answer => {
      const button = create('div', 'list btn-answer', answer.text, true);
      button.setAttribute('data-correct', answer.correct);
      button.addEventListener('click', getAnswer);
      listContainer.appendChild(button);
    });
  }
  
  function create(name, classname, value, show = false) {
    const element = document.createElement(name);
    element.className = !classname ? '' : classname;
    if (show === true) {
      element.textContent = value;
      return element;
    }
    return element;
  }
  
  function getAnswer(event) {
    const target = event.target;
    if (target.dataset.correct == "true") {
      target.classList.add('correct');
      score++;
    } else {
      target.classList.add('incorrect');
    }
    clearInterval(interval);
    const buttons = listContainer.querySelectorAll('.btn-answer');
    buttons.forEach(button => {
      if (button.dataset.correct == "true") button.classList.add('correct');
      button.disabled = true;
      nextBtn.style.display = 'block';
    });
  }
  
  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    nextStep();
  });
  
  function nextStep() {
    if (currentQuestionIndex < questions.length) {
      showQuestions();
    } else if (currentQuestionIndex == questions.length) {
      showScore();
      nextBtn.textContent = 'Play Again';
      nextBtn.style.display = 'block';
      clearInterval(interval);
      time = 0;
      timer.textContent = time;
    } else {
      startQuizGame();
    }
  }
  
  function showScore() {
    listContainer.innerHTML = '';
    question.textContent = `You Scored ${score} Out Of ${questions.length} Questions`;
  }
  
  function setTimer() {
    clearInterval(interval);
    interval = setInterval(() => {
      time--;
      timer.textContent = time;
      if (time == 0) {
        currentQuestionIndex++;
        nextStep();
      }
    }, 1000);
  }
  
});