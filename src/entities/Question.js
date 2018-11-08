export default class Question {
  constructor(id, correctAnswer = null, imageUrl = null) {
    this.id = id;
    this.correctAnswer = correctAnswer;
    this.imageUrl = imageUrl;
    this.answer = "";
    this.isAnswerVisible = false;
  }

  setAnswer(answer) {
    this.answer = answer;
  }

  showAnswer() {
    this.isAnswerVisible = true;
  }

  isCorrect() {
    const answer = this.answer.toLowerCase().trim();
    const correctAnswer = this.correctAnswer.toLowerCase().trim();

    return answer === correctAnswer;
  }
}
