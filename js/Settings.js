import { Quiz } from "./quiz.js";

export class Settigns {
    constructor (){
        this.Category = document.getElementById('category');
        this.difficulty = document.getElementsByName('difficulty');
        this.numOfQ = document.getElementById('numberOfQuestions');
        this.startButton = document.getElementById('startBtn')
        this.numOfQValue = 0;
        
        //------------------------------------------------------------
        // i puted this event here because i want to make it happened just when i get instance from this class
        this.startButton.onclick = ()=>{
            this.getInputsValue();
            if(this.numOfQValue <= 0) {
                if(document.getElementById('numOfQValueWarning') === null){
                    let warnignMessage =document.createElement('p');
                    let textMessage = document.createTextNode("Pls , Enter number of questions");
                    warnignMessage.append(textMessage);
                    warnignMessage.classList.add('text-danger' , 'ps-2')
                    warnignMessage.setAttribute('id' , 'numOfQValueWarning')
        
                    this.startButton.before(warnignMessage);
                }
    
                return;
            }


            this.startButton.setAttribute('disabled' , 'disabled');
            $('#setting').fadeOut(500, ()=>{
            $('#quiz').fadeIn(500); 
            })
        

            

        }
        //lw 3mltha b el 4kl da m7tag t3ml binding ben el function w el this
        // this.startButton.addEventListener('click' , this.getInputsValue.bind(this))
        //------------------------------------------------------------

    }

    async getInputsValue() {
        let CategoryValue = this.Category.value
        let difficultyChecked = [...this.difficulty].filter((el)=> el.checked)
        let difficultyValue = difficultyChecked[0].value;
        this.numOfQValue = this.numOfQ.value

        if(this.numOfQValue > 0) {
              //i got the API results and send it to Quiz class 
            let results = await this.getFetchResults(CategoryValue,difficultyValue,this.numOfQValue);
            //make sure we have QS to show it
            if(results.length >= 1) {
                new Quiz(results);
            }  
        }
        
    }
    //https://opentdb.com/api.php?amount=10&category=26&difficulty=easy&type=multiple
    async getFetchResults(CategoryValue,difficultyValue,numOfQValue) {
        return await fetch(`https://opentdb.com/api.php?amount=${numOfQValue}&category=${CategoryValue}&difficulty=${difficultyValue}&type=multiple`)
        .then((apiResponse)=> apiResponse.json())
        .then((apiRsults)=> apiRsults.results)
    }   
    
}
