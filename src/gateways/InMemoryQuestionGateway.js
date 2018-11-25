export default class InMemoryQuestionGateway {
    constructor() {
        this.questions = [];
    }
    allQuestions() {
        return this.questions;
    }

    addQuestion(question) {
        this.questions.push(question);
    }
}