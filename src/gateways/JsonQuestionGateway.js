import jsonData from "../../data/source-data.js";
import Question from "../entities/Question.js";

export default class JsonQuestionGateway {
  allQuestions() {
    return jsonData.map((question, index) => {
      return new Question(index, question.name, question.img);
    });
  }
}
