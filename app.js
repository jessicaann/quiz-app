// the State's objective is to keep all the possible variables. 
var state = {
	questions: [ //state.questions.question[0]
	{	question: "1/5: What is the name of the group that Beyoncé was a member of?", 
		answer: "Destiny's Child", 
		choices: ["SWV", "TLC", "Black Eyed Peas", "Destiny's Child"],
		correct: true
	}, 
	{	question: "2/5: What is Beyoncé’s full legal name?", 
		answer: "Beyoncé Giselle Knowles",
		choices: ["Beyoncé Angelique Knowles", "Beyoncé Giselle Knowles", "Beyoncé Jessica Knowles", "Beyoncé Lacelle Knowles"],
		correct: true
	},
	{	question: "3/5: What is the title of Beyoncé's first album?", 
		answer: "Dangerously In Love", 
		choices: ["Unforgettable Love", "IV", "Dangerously In Love", "Just Bey"],
		correct: true
	},
	{	question: "4/5: Where was Beyoncé born?", 
		answer: "Houston, Texas",
		choices: ["Houston, Texas", "Miami, Florida", "New Orleans, Louisiana", "Queens, New York"],
		correct: true
	},
	{	question: "5/5: What is Beyoncé’s sign?", 
		answer: "Virgo",
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
	if (questions.length > currentQuestion) {
		if (answer === questions[currentQuestion].answer) {
			//increase the score
			score++;
			//go to the next question
			currentQuestion++;
		} else { questions[currentQuestion].correct = false; }
	};
}
//Render Functions
function renderQuizBody(state, element) {
	renderQuestion(state, element.find('.js-question-text'));
	renderChoices(state, element.find('.choices'));
}
function renderQuestion(state, element) {
	var currentQuestion = state.questions[state.currentQuestion].question;
	element.text(currentQuestion.text);
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
	if (questions[currentQuestion].correct === false) {
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

	//render the current question - you'll need some buttons, 
	//and a button that moves to the next question - the if part at the top
	//the submit will listen to the value of the thing, then do the comparison
	//after the comparison update the scope, after you click next question, you'll do current question ++.

//Event Listeners
function startQuiz() {
	$('.startButton').click(function(event) {
		console.log('hello');
		$('.quiz-body').removeClass('hidden');
		$('.start').addClass('hidden');
		renderQuizBody(state, $('.quiz-body'));
	});
}
function handleAnswerSubmit() {
	$('form').submit(function(event) {
		event.preventDefault();
		var userAnswer = $("input{name='user-answer']:checked").val();
		compareAnswers(state, userAnswer);
		renderResponse(state, $('.js-response'));
	}
}
//make a function for the next button? what would it do?

$(function() {
	startQuiz();
	handleAnswerSubmit();

});