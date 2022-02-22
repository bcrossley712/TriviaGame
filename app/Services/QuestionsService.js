import { ProxyState } from "../AppState.js";
import { Question } from "../Models/Question.js";
import { Pop } from "../Utils/Pop.js";



class QuestionsService {
  async getQuestions() {
    // @ts-ignore
    const res = await axios.get('https://opentdb.com/api.php?amount=10')
    console.log('get results', res.data);
    let questions = res.data.results.map(q => new Question(q))
    ProxyState.questions = questions
    ProxyState.activeQuestion = [ProxyState.questions.shift()]
    console.log(ProxyState.activeQuestion);
    console.log(ProxyState.questions);
  }
  async guess(guessedAnswer) {
    let correctAnswer = ProxyState.activeQuestion.find(q => guessedAnswer == q.correct_answer);
    if (correctAnswer) {
      await Pop.confirm('Great Job!', '', 'success', 'Continue')
      this.newQuestion()
      // if there are more questions in ProxyState.questions, shift the next off to be the active question
      // or getQuestions()
    } else {
      Pop.toast('Wrong!', 'error')
      setTimeout(this.newQuestion, 3000)
    }
  }
  newQuestion() {
    if (ProxyState.questions.length >= 1) {
      ProxyState.activeQuestion = [ProxyState.questions.shift()]
    } else {
      questionsService.getQuestions()
    }
  }
}

export const questionsService = new QuestionsService()