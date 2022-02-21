

export class ActiveQuestion {
  constructor(data) {
    this.category = data.category
    this.correct_answer = data.correct_answer
    this.difficulty = data.difficulty
    this.incorrect_answers = data.incorrect_answers
    this.question = data.question
    this.type = data.type
  }


  get Template() {
    return `
            <p>This is a ${this.difficulty} question in the ${this.category} category.</p>
            <p>${this.question}</p>
            <p>Answers:
            <ul>
              ${this.Answers}
            </ul>
            </p>
    `
  }

  get Answers() {
    let template = ''
    let allAnswers = [...this.incorrect_answers]
    if (allAnswers.length == 1) {
      allAnswers = ['True', 'False']
    } else {
      let randIndex = Math.floor(Math.random() * 4)
      allAnswers.splice(randIndex, 0, this.correct_answer)
    }


    allAnswers.forEach(a => template += `
    <button class="btn btn-success m-2" onclick="app.questionsController.guess('${a}')">${a}</button>
    `)
    return template
  }

}