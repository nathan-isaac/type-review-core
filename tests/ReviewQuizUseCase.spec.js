import ReviewQuizSessionUseCase from '../index.js'
import InMemoryQuestionGateway from "../src/gateways/InMemoryQuestionGateway";
import Question from "../src/entities/Question";

describe('ReviewQuizSessionUseCase', () => {

    let viewData;
    let gateway;
    let useCase;

    function addQuestion(question) {
        gateway.addQuestion(question);
        useCase.createQuiz();
        // useCase = new ReviewQuizSessionUseCase(gateway);
        // or add a addQuestion method to the useCase
    }

    beforeEach(() => {
        viewData = {};
        gateway = new InMemoryQuestionGateway();
        useCase = new ReviewQuizSessionUseCase(gateway);

        useCase.onViewDataChange((data) => {
            viewData = data;
        });
    });

    describe('answer question', () => {
        it('should have a blank answer by default', () => {
            const question = new Question(1, 'Correct Answer');
            addQuestion(question);
            
            expect(viewData.questions[0].answer).toBe('');
        });

        it('should save answer', () => {
            const question = new Question(1, 'Correct Answer');
            addQuestion(question);

            useCase.answerQuestion(1, 'Some text');
            
            expect(viewData.questions[0].answer).toBe('Some text');
        });
    });



    // answer question
        // write input any answer
        // verify that the answer is saved in the data
    
    // check answers
        // set a blank answer
        // test that it’s wrong

        // set to a partial answer
        // test that it’s wrong
        
        // set to the correct answer
        // test to make sure it’s right
        
        // test case insensitivity
        // test any special characters?

        // once submitted field should be readonly
    // reset
        // answers are set
        // reset
        // answers aren’t set
        // shuffle?
    // toggle answers
        // show answers should be true
        // show answers should be false



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
