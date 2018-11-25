export default class Question {
  constructor(id, correctAnswer = null, imageUrl = null) {
    this.id = id;
    this.correctAnswer = correctAnswer;
    this.imageUrl = imageUrl;
    this.answer = "";
    this.isAnswerVisible = false;
    this.isCorrect = false;
  }

  setAnswer(answer) {
    this.answer = answer;
  }

  showAnswer() {
    this.isAnswerVisible = true;
  }

  checkAnswer() {
      const answer = this.answer.toLowerCase().trim();
      const correctAnswer = this.correctAnswer.toLowerCase().trim();

      this.isCorrect = answer === correctAnswer;
  }
}
