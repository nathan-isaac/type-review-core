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

        beforeEach(() => {
            const question = new Question(1, 'Correct Answer');
            addQuestion(question);
        })

        it('should have a blank answer by default', () => {
            expect(viewData.questions[0].answer).toBe('');
        });

        it('should save answer', () => {
            useCase.answerQuestion(1, 'Some text');
            expect(viewData.questions[0].answer).toBe('Some text');
        });
    });

    
    describe('check answers', () => {

        // beforeEach(() => {

        // })

        // what about "nulls"?
        ['', 'incorrect', 'corr'].forEach((answer) => {
            it('says a blank answer is wrong', () => {
                const question = new Question(1, 'correct');
                addQuestion(question);
    
                useCase.answerQuestion(1, answer);
                useCase.checkAnswers();
    
                expect(viewData.questions[0].isCorrect).toBe(false);
            });
        })

        it('should answer the correct answer', () => {
            const question = new Question(1, 'Correct');
            addQuestion(question);

            useCase.answerQuestion(1, 'Correct');
            useCase.checkAnswers();

            expect(viewData.questions[0].isCorrect).toBe(true);
        });

        it('should answer a case-incorrect correct answer', () => {
            const question = new Question(1, 'Correct');
            addQuestion(question);

            useCase.answerQuestion(1, 'corRECT');
            useCase.checkAnswers();

            expect(viewData.questions[0].isCorrect).toBe(true);
        })

        it('should answer a special-character correct answer', () => {
            const question = new Question(1, '!/\\"\'&');
            addQuestion(question);

            useCase.answerQuestion(1, '!/\\"\'&');
            useCase.checkAnswers();

            expect(viewData.questions[0].isCorrect).toBe(true);
        })

        it('not-yet submitted field should be writable', () => {
            const question = new Question(1, 'Correct');
            addQuestion(question);

            expect(viewData.questions[0].readOnly).toBe(false);
        });
        
        it('once submitted field should be readonly', () => {
            const question = new Question(1, 'Correct');
            addQuestion(question);

            useCase.checkAnswers();

            expect(viewData.questions[0].readOnly).toBe(true);
        });
    })

    // reset
    describe('reset quiz', () => {
        // answers are set

        it('returns a new quiz object', () => {
            const original = useCase.quiz;
            useCase.reset();
            expect(original).not.toBe(useCase.quiz);
        });
        it('resets all values on a question when quiz is reset', () => {
            const question = new Question(1, 'Answer');
            addQuestion(question);

            useCase.answerQuestion(1, 'Answer1');
            useCase.checkAnswers();
            useCase.reset();

            // expect(viewData.questions[0]).toEqual({
            //     id: 1,
            //     correctAnswer: 'Answer',
            //     answer: '',
            //     isCorrect: false,
            //     imageUrl: null,
            //     showAnswerStatus: false,
            //     readOnly: false,
            // });
        });

        it('resets answers on all questions when quiz is reset', () => {

            const question1 = new Question(1, 'Answer1');
            const question2 = new Question(2, 'Answer2');
            const question3 = new Question(3, 'Answer3');
            
            addQuestion(question1);
            addQuestion(question2);
            addQuestion(question3);

            useCase.answerQuestion(1, 'Answer1');
            useCase.answerQuestion(2, 'invalid');
            // we don’t even answer question 3 here            

            useCase.checkAnswers();

            useCase.reset();            

            // expect(viewData.questions[0].answer).toEqual("");
            // expect(viewData.questions[1].answer).toEqual("");
            // expect(viewData.questions[2].answer).toEqual("");
        });
        // reset
        // answers aren’t set
        
        // shuffle?
    });
        
    describe('toggle answers', () => {
        // show answers should be true
        // show answers should be false
    });













    // it('has no questions', () => {
    //     expect(viewData.questions).toEqual([]);
    // });

    // it('should have a question', () => {
    //     gateway.addQuestion(new Question(1, 'Arial'));
    //     useCase.createQuiz();
    //     useCase.updateViewData();

    //     expect(viewData.questions[0]).toEqual({
    //         id: 1,
    //         correctAnswer: 'Arial',
    //         answer: "",
    //         isCorrect: false,
    //         imageUrl: null,
    //         showAnswerStatus: false,
    //     });
    // });

    // it('should answer question', () => {
    //     gateway.addQuestion(new Question(1, 'Arial'));
    //     useCase.createQuiz();
    //     useCase.updateViewData();

    //     useCase.answerQuestion(1, 'arial');

    //     expect(viewData.questions[0].answer).toEqual('arial');
    // });

    // it('should submit quiz with incorrect answer', () => {
    //     gateway.addQuestion(new Question(1, 'answer'));
    //     useCase.createQuiz();
    //     useCase.updateViewData();

    //     useCase.checkAnswers();

    //     expect(viewData.questions[0].isCorrect).toBe(false);
    // });

    // it('should submit quiz with correct answer', () => {
    //     gateway.addQuestion(new Question(1, 'correct'));
    //     useCase.createQuiz();
    //     useCase.updateViewData();

    //     useCase.answerQuestion(1, 'correct');

    //     useCase.checkAnswers();

    //     expect(viewData.questions[0].isCorrect).toBe(true);
    // });
});
