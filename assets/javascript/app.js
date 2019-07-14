$(document).ready(function(){
  
    $("#timeremain").hide();
    $("#startbtn").on('click', quiz.startGame);
    $(document).on('click' , '.option', quiz.guessChecker);
    
})
  
  var quiz = {
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    
    
    questions: {
      q1: 'The damsel in distress that Mario first rescued was Princess Peach.',
      q2: 'Mario has made many friends on his journeys. In Super Mario World, he made friends with a certain dinosaur. His name was:',
      q3: 'In which game did Mario first appear?',
      q4: 'Who can jump higher, Mario or Luigi?',
      q5: "Koopa Troopas who are bony, skeletal, dried out and undead.",
          
      
    },
    options: {
      q1: ['True', 'False'],
      q2: ['Birdo', 'Dino-Buddy', 'Yoshi', 'Bowser'],
      q3: ['Legend of Zelda', 'Mario Paint', 'Donkey Kong', 'Super Mario Bros.'],
      q4: ['Mario', 'Luigi'],
      q5: ['Dry Bones','Yoshi','Boo','Shy Guy'],
     
    },
    answers: {
      q1: 'True',
      q2: 'Yoshi',
      q3: 'Donkey Kong',
      q4: 'Luigi',
      q5: 'Dry Bones',
    },
    
    startGame: function(){
      
      quiz.currentSet = 0;
      quiz.correct = 0;
      quiz.incorrect = 0;
      quiz.unanswered = 0;
      clearInterval(quiz.timerId);
      
      
      $('#game').show();
      
      $('#total').html('');
    
      $('#timer').text(quiz.timer);
      
      $('#startbtn').hide();
  
      $('#timeremain').show();
      

    quiz.nextQuestion();
      
    },
    
        nextQuestion : function(){
      
      
            quiz.timer = 10;
            $('#timer').removeClass('last-seconds');
            $('#timer').text(quiz.timer);
      
     
            if(!quiz.timerOn){
            quiz.timerId = setInterval(quiz.timerRunning, 1000);
      
        }
      
    var questionContent = Object.values(quiz.questions)[quiz.currentSet];
        
        $('#question').text(questionContent);
      
    var questionOptions = Object.values(quiz.options)[quiz.currentSet];
      
        $.each(questionOptions, function(index, key){
        $('#choices').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
        
        })
      
    },
    
    timerRunning : function(){
      
      if(quiz.timer > -1 && quiz.currentSet < Object.keys(quiz.questions).length){
        $('#timer').text(quiz.timer);
        quiz.timer--;
          if(quiz.timer === 4){
            $('#timer').addClass('last-seconds');
        }
      }
      
      else if(quiz.timer === -1){
        quiz.unanswered++;
        quiz.result = false;
        clearInterval(quiz.timerId);
        totalId = setTimeout(quiz.guessResult, 1000);
            $('#total').html('<h3>You ran out of time! The answer is '+ Object.values(quiz.answers)[quiz.currentSet] +'</h3>');
      }
      
      else if(quiz.currentSet === Object.keys(quiz.questions).length){
        
    
        $('#total')
          .html('<h3>Til Next Time!</h3>'+
          '<p>Correct: '+ quiz.correct +'</p>'+
          '<p>Incorrect: '+ quiz.incorrect +'</p>'+
          '<p>Unaswered: '+ quiz.unanswered +'</p>'+
          '<p>Play Again!</p>');
        
       
        $('#game').hide();
        
        $('#startbtn').show();
      }
      
    },
   
    guessChecker : function() {
      
      var totalId;
     
      var currentAnswer = Object.values(quiz.answers)[quiz.currentSet];
      

      if($(this).text() === currentAnswer){
       
        $(this).addClass('btn-success').removeClass('btn-info');
        
        quiz.correct++;
        clearInterval(quiz.timerId);
        totalId = setTimeout(quiz.guessResult, 1000);
        $('#total').html('<h3>Correct!</h3>');
      }
      
      else{
        
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        quiz.incorrect++;
        clearInterval(quiz.timerId);
        totalId = setTimeout(quiz.guessResult, 1000);
        $('#total').html('<h3>Try Again! The answer is '+ currentAnswer +'</h3>');
      }
      
    },
    
    guessResult : function(){
      
      // increment to next question set
      quiz.currentSet++;
      
      // remove the options and results
      $('.option').remove();
      $('#total h3').remove();
      
      // begin next question
      quiz.nextQuestion();
       
    }
  
}