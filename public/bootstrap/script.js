$(document).ready(function() {
  var clicks = [];
  var userTurn = false;
  var red = $('#red-btn');
  var blue = $('#blue-btn');
  var green = $('#green-btn');
  var yellow = $('#yellow-btn');
  var clickCount = 0;
  var blueSound =  new Audio('http://torchcodelab.com/media/a_note.ogg');   //new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  var greenSound =  new Audio('http://torchcodelab.com/media/b_note.ogg');
  var yellowSound =  new Audio('http://torchcodelab.com/media/c_note.ogg');
  var redSound =  new Audio('http://torchcodelab.com/media/d_note.ogg');

  //setTimeout(function(){$('#red-btn').click();},4000);
  var computerClick = function() {
    selectRandomButton();
    console.log(clicks);
    startInterval();
   /** for (var i = 0; i < clicks.length; i++) {
      var curr = clicks[i];
      setTimeout(callback(i), 3000);
    }**/
    //userTurn = true;
  };
  computerClick();

  //NB: This is only when the user clicks. computer click has no ties here
  $('.color-btns').on('click', function() {
    var attr = $(this).attr('id');
    if (userTurn) {
      if (attr != clicks[clickCount]){ //ie the user misses the button sequence
        //TODO Error messages
        console.log("mistake");
        resetEverything();

      }
      else{
        playSound(attr);
        clickCount++;
        if (clickCount >= clicks.length) {
          clickCount = 0;
          userTurn = false;
          computerClick();
        }
      }
    }

  });

  function resetEverything(){  //clinton style
    clicks = [];
    userTurn = false;
    clickCount = 0;
    computerClick();

  }

  //selects a random button duh
  function selectRandomButton() {
    var buttons = ['yellow-btn', 'red-btn', 'blue-btn', ' green-btn'];
    var rand = buttons[Math.floor(Math.random() * buttons.length)];
    clicks.push(rand);
  }
  //Plays the sound accompayning click of button
  function playSound(buttonColor) {
    var soundSelection;
    console.log("played " + buttonColor);
    switch (buttonColor) {
      case 'yellow-btn':
      yellowSound.play();
      break;
      case 'blue-btn':
      blueSound.play();
      break;
      case 'green-btn':
      greenSound.play();
      break;
      case 'red-btn':
      redSound.play();
      break;
      default:
      break;
    }
  }

  //callback to handle setInterval's asyncronsity
  function callback(i){
    console.log('in callback');
    return function(){
     playSound(clicks[i]);
     console.log(clicks[i]);

   }
 }

 function startInterval(){
  var i = 0;
  myInterval = setInterval(function(){
    playSound(clicks[i]);
    console.log(clicks[i]);
    i++;
    if (i >= clicks.length){
      clearInterval(myInterval);
      userTurn = true;
    }

  }, 2000);
}

});