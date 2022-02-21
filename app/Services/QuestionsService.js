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
  guess(guessedAnswer) {
    const button = document.querySelector('button');
    button.addEventListener("click", () => {
      button.setAttribute('disabled', 'disabled')
    }, {
      once: true
    });
    let correctAnswer = ProxyState.activeQuestion.find(q => guessedAnswer == q.correct_answer)
    if (correctAnswer) {
      Pop.toast('Nailed it!', 'success')
      setTimeout(this.newQuestion, 3000)


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