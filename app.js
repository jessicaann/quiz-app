// the State's objective is to keep all the possible variables. 
var state = {
	questions: [ //state.questions.question[0]
	{	question: "1/5: What is the name of the group that Beyoncé was a member of?", 
		answer: "3", 
		choices: ["SWV", "TLC", "Black Eyed Peas", "Destiny's Child"],
		correct: true
	}, 
	{	question: "2/5: What is Beyoncé’s full legal name?", 
		answer: "1",
		choices: ["Beyoncé Angelique Knowles", "Beyoncé Giselle Knowles", "Beyoncé Jessica Knowles", "Beyoncé Lacelle Knowles"],
		correct: true
	},
	{	question: "3/5: What is the title of Beyoncé's first album?", 
		answer: "2", 
		choices: ["Unforgettable Love", "IV", "Dangerously In Love", "Just Bey"],
		correct: true
	},
	{	question: "4/5: Where was Beyoncé born?", 
		answer: "0",
		choices: ["Houston, Texas", "Miami, Florida", "New Orleans, Louisiana", "Queens, New York"],
		correct: true
	},
	{	question: "5/5: What is Beyoncé’s sign?", 
		answer: "1",
		choices: ["Pisces", "Virgo", "Libra", "Cancer"],
		correct: true
	}
	],
	currentQuestion: 0, //the first one in the array
	score: 0,
}

	//questions[currentQuestion].question = the actual question
//State Modifiers
function compareAnswers(state, answer) {
	if (state.questions.length > state.currentQuestion) {
		if (answer == state.questions[state.currentQuestion].answer) {
			//increase the score
			state.score++;
			//go to the next question
			
		} else { state.questions[state.currentQuestion].correct = false; }
	};
} 
//Render Functions
function renderQuizBody(state, element) {
	renderQuestion(state, element.find('.js-question-text'));
	renderChoices(state, element.find('.choices'));
}
function renderQuestion(state, element) {
	var currentQuestion = state.questions[state.currentQuestion].question;
	element.text(currentQuestion);
}
function renderChoices(state, element) {
	var currentQuestion = state.questions[state.currentQuestion];
	var choices = currentQuestion.choices.map(function(choice, index) {
		return (
			'<li>' +
        		'<input type="radio" name="user-answer" value="' + index + '" required>' +
        		'<label>' + choice + '</label>' +
      		'</li>'
			);
	});
	element.html(choices);
};
function renderResponse(state, element) {
	$('.quiz-body').addClass('hidden');
	$('.js-response').removeClass('hidden');
	if (state.questions[state.currentQuestion].correct === false) {
		var incorrectResponse = (
			'<h3>' + 'Not quite.' + '</h3>' +
			'<p>' + 'The Hive disapproves. Do better.' + '</p>' +
			'<div class="score">' + 'Your Score: ' + '<span class="js-score">'+ state.score + '</span>' + ' of 5' + '</div>'
			)
		element.html(incorrectResponse);
	} else {
		var correctResponse = (
			'<h3>' + "That's right!" + '</h3>' +
			'<p>' + 'Bey would be proud.' + '</p>' +
			'<div class="score">' + 'Your Score: ' + '<span class="js-score">'+ state.score + '</span>' + ' of 5' + '</div>'
			)
		element.html(correctResponse);
	}
}
function renderResetPage (state, element) {
	if (state.currentQuestion == 4) {
		$('.reset').removeClass('hidden');
	};
}

//Event Listeners
function startQuiz() {
	$('.startButton').click(function(event) {
		$('.quiz-body').removeClass('hidden');
		$('.start').addClass('hidden');
		renderQuizBody(state, $('.quiz-body'));
	});
}
function handleAnswerSubmit() {
	$('form').submit(function(event) {
		event.preventDefault();
		var userAnswer = $("input[name='user-answer']:checked").val();
		compareAnswers(state, userAnswer);
		renderResponse(state, $('.confused'));
		renderResetPage(state, $('.reset'));
	});
}
function nextQuestion() {
	$('.nextButton').click(function(event) {
		$('.quiz-body').removeClass('hidden');
		$('.js-response').addClass('hidden');
		state.currentQuestion++;
		renderQuizBody(state, $('.quiz-body'));
		console.log(state.currentQuestion, state.questions.length);
	});
}
function resetPage() {
	$('.resetButton').click(function(event) {
		state.currentQuestion = 0;
		state.score = 0;
		$('.quiz-body').removeClass('hidden');
		$('.start').addClass('hidden');
		renderQuizBody(state, $('.quiz-body'));
		$('.js-response').addClass('hidden');
		$('.resetButton').addClass('hidden');
	});
}
//AT THE LAST PAGE, INSTEAD OF NEXT BUTTON, RESTART QUIZ - I COULD MAKE THE NEXT BUTTON GO AWAY ACCORDING TO THE 
//LENGTH OF THE STATE.QUESTIONS IF IT IS GREATER THAN THE CURRENT QUESTION. HIDE AND SHOW THE BUTTONS. ALSO CHANGE 
//THE SCORE THEN IT SHOULD SET CURRENT QUESTION TO 0 AGAIN/
//
$(function() {
	startQuiz();
	handleAnswerSubmit();
	nextQuestion();
	resetPage();
});