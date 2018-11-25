import ReviewQuizSessionUseCase from '../index.js'
import InMemoryQuestionGateway from "../src/gateways/InMemoryQuestionGateway";
import Question from "../src/entities/Question";

describe('ReviewQuizSessionUseCase', () => {

    let viewData;
    let gateway;
    let useCase;

    beforeEach(() => {
        viewData = {};
        gateway = new InMemoryQuestionGateway();
        useCase = new ReviewQuizSessionUseCase(gateway);

        useCase.onViewDataChange((data) => {
            viewData = data;
        });
    });

    it('has no questions', () => {
        expect(viewData.questions).toEqual([]);
    });

    it('should have a question', () => {
        gateway.addQuestion(new Question(1, 'Arial'));
        useCase.createQuiz();
        useCase.updateViewData();

        expect(viewData.questions[0]).toEqual({
            id: 1,
            correctAnswer: 'Arial',
            answer: "",
            isCorrect: false,
            imageUrl: null,
            showAnswerStatus: false,
        });
    });

    it('should answer question', () => {
        gateway.addQuestion(new Question(1, 'Arial'));
        useCase.createQuiz();
        useCase.updateViewData();

        useCase.answerQuestion(1, 'arial');

        expect(viewData.questions[0].answer).toEqual('arial');
    });

    it('should submit quiz with incorrect answer', () => {
        gateway.addQuestion(new Question(1, 'answer'));
        useCase.createQuiz();
        useCase.updateViewData();

        useCase.checkAnswers();

        expect(viewData.questions[0].isCorrect).toBe(false);
    });

    it('should submit quiz with correct answer', () => {
        gateway.addQuestion(new Question(1, 'correct'));
        useCase.createQuiz();
        useCase.updateViewData();

        useCase.answerQuestion(1, 'correct');

        useCase.checkAnswers();

        expect(viewData.questions[0].isCorrect).toBe(true);
    });
});
