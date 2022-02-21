import { ProxyState } from "../AppState.js";
import { questionsService } from "../Services/QuestionsService.js";
import { Pop } from "../Utils/Pop.js";

function _draw() {
  let template = ''
  ProxyState.activeQuestion.forEach(q => template += q.Template)
  document.getElementById('questions').innerHTML = template
}

export class QuestionsController {
  constructor() {
    ProxyState.on('activeQuestion', _draw)
    this.getQuestions()
  }

  async getQuestions() {
    try {
      await questionsService.getQuestions()
    } catch (error) {
      console.error(error);
      Pop.toast(error.message, 'error')
    }
  }
  guess(guessedAnswer) {
    try {
      questionsService.guess(guessedAnswer)
    } catch (error) {
      console.error(error);
      Pop.toast(error.message, 'error')
    }
  }


}