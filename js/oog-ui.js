// out-of-game-window UI
// "open shop" button (show money and quantities, allow purchases)

// setup event listeners on buttons
$(document).ready(function() {
  console.log('DOM and JQuery loaded');
  $('#instructions').click(showInstructions);
  $('#credits').click(showCredits);
  $('#shop').click(showShop);
});

// display instructions
function showInstructions() {
  showingShop = false;
  var instructions = $('#hidden-instructions');
  $('#show-info').html(instructions.html());
}

// display credits
function showCredits() {
  showingShop = false;
  var credits = $('#hidden-credits');
  $('#show-info').html(credits.html());
}

// pre: it is a player's turn
// post: show shop for current player
function showShop() {
  if (gameOn) {
    showingShop = true;
    var shop = $('#hidden-shop');
    $('#show-info').html(shop.html());
    $('#money-amt').text(currentPlayer.inventory.money);
    if (currentPlayer.inventory.parachute) {
      $('#chute-amt').text('1');
    }
    else {
      $('#chute-amt').text('0');
    }
    $('#shell-amt').text(currentPlayer.inventory.standardShot);
    $('#mega-amt').text(currentPlayer.inventory.megaBomb);
    $('#ultra-amt').text(currentPlayer.inventory.ultraBomb);
  }
  else {
    $('#show-info').html("<p>You don't have an inventory!</p>");
  }
}

function closeShop() {
  // only close shop if it is showing, otherwise will hide other info
  if (showingShop) {
    showingShop = false;
    var info = $('#show-info');
    info.empty();
  }
}
