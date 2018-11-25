import shuffleArray from "../support/shuffleArray.js";

export default class Quiz {
  constructor(questions = []) {
    this.ended = false;
    this.showAnswers = false;
    this.questions = shuffleArray(questions);
  }

  addQuestion(question) {
    this.questions.push(question);
  }

  answerQuestion(questionId, answerText) {
    const question = this.questions.find(question => {
      return questionId === question.id;
    });

    question.setAnswer(answerText);
}

  submit() {
    this.questions.forEach(question => {
      question.checkAnswer();
    });
    this.showAnswers = true;
    this.ended = true;
  }

  toggleAnswers() {
    this.showAnswers = !this.showAnswers;
  }
}
