let questionNumber = 0;
let score = 0;

//generate question html
function generateQuestion () {
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
      <h2>${STORE[questionNumber].question}</h2>
      <form>
      <fieldset>
      <label class="answerOption">
      <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
      <span>${STORE[questionNumber].answers[0]}</span>
      </label>
      <label class="answerOption">
      <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
      <span>${STORE[questionNumber].answers[1]}</span>
      </label>
      <label class="answerOption">
      <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
      <span>${STORE[questionNumber].answers[2]}</span>
      </label>
      <label class="answerOption">
      <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
      <span>${STORE[questionNumber].answers[3]}</span>
      </label>
      <button type="submit" class="submitButton">Submit</button>
      </fieldset>
      </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
}

//increment question number
function changeQuestionNumber () {
  //if (questionNumber < STORE.length) {
    questionNumber ++;
  //}
  $('.questionNumber').text(questionNumber+1);
}

//increment score
function changeScore () {
  score ++;
}

//start quiz
//on startQuizButton click hide start div
//unhide quiz form div
function startQuiz () {
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
});
}

// render question in DOM
function renderQuestion () {
  $('.questionAnswerForm').html(generateQuestion());
}

//user selects answer on submit run user feedback
function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
  addPinkyBadge();
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
  addDarkBadge();
}

//user feedback for correct answer
function userAnswerFeedbackCorrect () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="correctAnspic.jpg" alt="Kokori is happy of your answer"/></div><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
}

function addPinkyBadge () {
    $('.col-4').append('<img src="successIcon.png" alt="that is a success icon" class="sakura"/>');
}

//user feedback for wrong answer
function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  // let iconImage = `${STORE[questionNumber].icon}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="failedQuestion.jpg" alt="Nike and Kokori are scared of your answer"/></div><p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function addDarkBadge () {
    $('.col-4').append('<img src="darkCircle.png" alt="that is an unsuccess icon" class="dark"/>');
}

//update score text
function updateScore () {
  changeScore();
  $('.score').text(score);
}

//when quiz is over this is the html for the page
function renderResults () { 
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You made it through the end!</h3><img src="endingImage.jpg" alt="Nike and Kokoki to the next adventure"/><p>You got ${score} / 10</p><p>Success or failure, is not easy to be a nerd.</p><button class="restartButton">Start again :)</button></div>`);
}

//what happens when the user clicks next
function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}

//restart quiz function - reloads page to start quiz over
function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

//run quiz functions
function createQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);
