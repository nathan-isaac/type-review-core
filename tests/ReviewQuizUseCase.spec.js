import ReviewQuizSessionUseCase from '../index.js'
import InMemoryQuestionGateway from "../src/gateways/InMemoryQuestionGateway";

describe('ReviewQuizSessionUseCase', function () {

    let viewData = {};
    let gateway = new InMemoryQuestionGateway();
    let useCase = new ReviewQuizSessionUseCase(gateway);

    beforeEach(() => {
        viewData = {};
        gateway = new InMemoryQuestionGateway();
        useCase = new ReviewQuizSessionUseCase(gateway);

        useCase.onViewDataChange((data) => {
            viewData = data;
        });
    });

    it('should test something', function () {
        // add question

        // useCase.answerQuestion(1, 'Arial');
        //
        // expect(viewData).toContain({
        //
        // });
    });
});

