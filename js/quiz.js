export class Quiz {
    constructor(results) {
        //API
        this.apiResults = results;
        this.totalNumberOfQuestions = results.length;

        this.currentQuestion = 0;
        this.score = 0;

        //DOM
        this.quizSection = document.getElementById('quiz')
        this.finishSection = document.getElementById('finish')

        this.currentQuestionElement = document.getElementById('currentQuestion')
        this.totalNumberOfQuestionsElement = document.getElementById('totalNumberOfQuestions')

        this.questionName = document.getElementById('question')

        this.rowAnswer = document.getElementById('rowAnswer')
        this.inCorrect = document.getElementById('inCorrect')
        this.Correct = document.getElementById('Correct')

        this.submitButton = document.getElementById('next')
        
        

        //lets start with show the first q
        this.showQuestion(this.apiResults[this.currentQuestion]);


        ///------------------------------------------------------
        ///------------------------------------------------------
        ///------------------------------------------------------

        this.submitButton.onclick = () => {
            let userAnswer = this.getTheCheckedAnswer();
            if(userAnswer != undefined) {
                //------------------------------------------------------------------------ cheack user userAnswer and increment the score or not
                //because the increment (++) in the showQuestion (at line 28)
                let correctAnswer = results[this.currentQuestion - 1].correct_answer;

            
                if (userAnswer ===  correctAnswer) {
                    $(this.Correct).fadeIn(200, () => {
                        $(this.Correct).fadeOut(1500)
                    })
                    ++this.score;
                } else {
                    $(this.inCorrect).fadeIn(200, () => {
                        $(this.inCorrect).fadeOut(1500)
                    })
                }
                //------------------------------------------------------------------------ 
                //------------------------------------------------------------------------ 
                //------------------------------------------------------------------------ 
                //------------------------------------------------------------------------ if all Qs showed lets show the score
                if (this.currentQuestion >= this.totalNumberOfQuestions) {
                    document.getElementById('score').innerHTML = this.score;
                    $(this.quizSection).fadeOut(200, () => {
                        $(this.finishSection).fadeIn(500 , ()=>{
                            //TRY AGAIN BUTTON .... SHOW THE SITTING SECTION AND HIDE THE FINISH SECTION
                            document.getElementById('tryBtn').onclick = ()=>{
                                $(this.finishSection).fadeOut(200,()=>{
                                    document.getElementById('startBtn').removeAttribute('disabled')
                                    document.getElementById('numberOfQuestions').value = '';
                                    if(document.getElementById('numOfQValueWarning') != null){
                                        document.getElementById('numOfQValueWarning').remove();
                                    }
                                   
                                    $('#setting').fadeIn(200);
                                    
                                })
                            }
                        })
                    })
                } else {
                    this.showQuestion(this.apiResults[this.currentQuestion])
                }
            }
         

        }

    }

    showQuestion(question) {

        //get question info
        let questionName = question.question;
        let correctAnswer = question.correct_answer;
        let incorrectAnswers = question.incorrect_answers;



        //set the info to the DOM
        this.currentQuestionElement.innerHTML = this.currentQuestion + 1;//index start with zero
        this.questionName.innerHTML = questionName;
        this.totalNumberOfQuestionsElement.innerHTML = this.totalNumberOfQuestions;


        //send all answers to be shuffled
        let answersArr = this.setAnswersInRandomOrder(correctAnswer, ...incorrectAnswers);


        let rows = answersArr.map((e) => {
            return `<div class="">
            <input type="radio" name="answer" id="${e}"  class="" value="${e}" >
            <label for="${e}" class="ps-2">${e}</label>
             </div>`
        }).join("");

        this.rowAnswer.innerHTML = rows;
        this.currentQuestion++;
    }

    setAnswersInRandomOrder(...answers) {

        // lets get 2 elemnt one is predictable , and one by random index
        let currentIndex = answers.length, randomIndex;

        while (currentIndex != 0) {
            // *(length) currentIndex , to get this random index in the range 0 to the answers.length
            randomIndex = Math.floor(Math.random() * currentIndex);
            // -1 because last index is lenght - 1 
            currentIndex--;

            // lets swap them now
            [answers[currentIndex], answers[randomIndex]] = [answers[randomIndex], answers[currentIndex]];
        }

        return answers;
    }

    getTheCheckedAnswer() {
        let answerInputs = document.getElementsByName('answer');
        if([...answerInputs].filter((el) => el.checked)[0]){
            $('#alert').fadeOut(200)
            return [...answerInputs].filter((el) => el.checked)[0].value;
        }else {
            $('#alert').fadeIn(200);
            return undefined;
        }
       
    }

}