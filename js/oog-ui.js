// TODO out-of-game-window UI
// "open shop" button (show money and quantities, allow purchases)
// instructions button
// credits button

// setup event listeners on buttons
$(document).ready(function() {
  console.log('DOM and JQuery loaded');
  $('#instructions').click(showInstructions);
  $('#credits').click(showCredits);
});

// display instructions
function showInstructions() {
  var instructions = $('#hidden-instructions');
  $('#show-info').html(instructions.html());
}

function showCredits() {
  $('#show-info').text('credits says hello');
}
