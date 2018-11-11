import ReviewQuizSessionUseCase from '../index.js'
import InMemoryQuestionGateway from "../src/gateways/InMemoryQuestionGateway";

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

    it('should test something', () => {
        // add question
        // ...

        // useCase.answerQuestion(1, 'Arial');
        //
        // expect(viewData).toContain({
        //
        // });
    });
});

