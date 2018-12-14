import Quiz from "../entities/Quiz.js";

export default class ReviewQuizSessionUseCase {
  constructor(questionGateway) {
    this.gateway = questionGateway;
    this.viewDataChangeHandler = (data) => {
      // do nothing by default
    };
    this.createQuiz();
  }

  createQuiz() {
    const questions = this.gateway.allQuestions();
    this.quiz = new Quiz(questions);
    this.updateViewData();
  }

  onViewDataChange(callback) {
    this.viewDataChangeHandler = callback;
    this.updateViewData();
  }

  updateViewData() {
    this.viewDataChangeHandler(this.viewModel());
  }

  answerQuestion(questionId, answerText) {
    this.quiz.answerQuestion(questionId, answerText);
    this.updateViewData();
  }
  // case insensitive check of submitted answer against question’s answer
  // returns: ?
  checkAnswers() {
    this.quiz.submit();
    this.updateViewData();
  }

  // gets a new quiz with shuffled questions and no answers set
  // returns: ?
  reset() {
    this.createQuiz();
    this.updateViewData();
  }

  toggleAnswers() {
    this.quiz.toggleAnswers();
    this.updateViewData();
  }

  viewModel() {
    const questions = this.quiz.questions.map(question => {
      return {
        id: question.id,
        correctAnswer: question.correctAnswer,
        answer: question.answer,
        isCorrect: question.isCorrect,
        imageUrl: question.imageUrl,
        showAnswerStatus: false,
        readOnly: this.quiz.ended
      };
    });

    const session = {
      questions: questions,
      submitted: this.quiz.ended,
      showAnswers: this.quiz.showAnswers,
    };

    return session;
  }
}
