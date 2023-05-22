window.addEventListener("DOMContentLoaded", () => {
  
  const limitTime = 20;
  
  let currentQuestionIndex = 0;
  let time = limitTime;
  let score = 0;
  let interval;
  
  const alertContainer = document.querySelector('.alert-container');
  const question = document.querySelector('.question');
  const listContainer = document.querySelector('.list-container');
  const totalQuestion = document.querySelector('.total-question');
  const nextBtn = document.querySelector('.btn-next');
  const timer = document.querySelector('.timer');
  
  function fetchData() {
    return fetch('assets/js/questions.json')
      .then(response => {
        if (response.status === 404) throw new Error('File not found!');
        return response.json();
      })
      .then(response => response.data)
      .catch(error => {
        throw new Error(error);
      });
  }
  
  async function startQuizGame() {
    try {
      const data = await fetchData();
      currentQuestionIndex = 0;
      score = 0;
      nextBtn.textContent = 'Next Question';
      nextBtn.style.display = 'none';
      showQuestions(data);
    } catch (error) {
      const box = document.querySelector('.box');
      box.innerHTML = setAlert('danger', error.message);
    }
  }
  
  startQuizGame();
  
  function showQuestions(questions) {
    resetState();
    const data = questions[currentQuestionIndex];
    question.textContent = `${currentQuestionIndex + 1}. ${data.question}`;
    totalQuestion.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
    nextBtn.style.display = 'none';
    time = limitTime;
    timer.textContent = time;
    setButton(data.answers);
    setTimer();
  }
  
  function setButton(answers) {
    answers.forEach(answer => {
      const button = create('button', 'list btn-answer', answer.text, true);
      button.setAttribute('data-explanation', answer.explanation);
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
    showAlert(target.dataset.correct == "true" ? 'success' : 'danger', target.dataset.explanation);
    const buttons = listContainer.querySelectorAll('.btn-answer');
    buttons.forEach(button => {
      if (button.dataset.correct == "true") button.classList.add('correct');
      button.setAttribute('disabled', true);
      nextBtn.style.display = 'block';
    });
  }
  
  nextBtn.addEventListener('click', nextStep);
  
  async function nextStep() {
    const data = await fetchData();
    currentQuestionIndex++;
    if (currentQuestionIndex < data.length) {
      showQuestions(data);
    } else if (currentQuestionIndex == data.length) {
      showScore(data);
      nextBtn.textContent = 'Play Again';
      nextBtn.style.display = 'block';
      clearInterval(interval);
      time = 0;
      timer.textContent = time;
    } else {
      startQuizGame();
    }
  }
  
  function showScore(questions) {
    resetState();
    question.textContent = `You Scored ${score} Out Of ${questions.length} Questions`;
  }
  
  function setTimer() {
    clearInterval(interval);
    interval = setInterval(() => {
      time--;
      timer.textContent = time;
      if (time == 0) nextStep();
    }, 1000);
  }
  
  function showAlert(type, message) {
    alertContainer.innerHTML = setAlert(type, message);
  }
  
  function setAlert(type, message) {
    return `
      <div class="alert ${setTypeAlert(type.toLowerCase())}">
        <span>${message}</span>
      </div>
    `;
  }
  
  function setTypeAlert(type) {
    if (type === 'success') return 'alert-success';
    if (type === 'danger') return 'alert-danger';
    return false;
  }
  
  function resetState() {
    alertContainer.innerHTML = '';
    listContainer.innerHTML = '';
  }
  
});
