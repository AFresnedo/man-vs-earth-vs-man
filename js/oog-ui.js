// out-of-game-window UI
// "open shop" button (show money and quantities, allow purchases)

// setup event listeners on buttons
$(document).ready(function() {
  console.log('DOM and JQuery loaded');
  // wire buttons for displaying infos
  $('#instructions').click(showInstructions);
  $('#credits').click(showCredits);
  $('#shop').click(showShop);
  // wire purchase buttons
  $('#buy-chute').click(buyChute);
  $('#buy-shell').click(buyShell);
  $('#buy-mega').click(buyMega);
  $('#buy-ultra').click(buyUltra);
});

// display instructions
function showInstructions() {
  closeShop();
  showingShop = false;
  var instructions = $('#hidden-instructions');
  $('#show-info').html(instructions.html());
}

// display credits
function showCredits() {
  closeShop();
  showingShop = false;
  var credits = $('#hidden-credits');
  $('#show-info').html(credits.html());
}

// pre: it is a player's turn
// post: show shop for current player
function showShop() {
  // if shop is showing, need to redraw values but not structure
  if (gameOn && showingShop) {
    // use IDs to set values
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
  // else need to load the entire shop
  else if (gameOn) {
    showingShop = true;
    var shop = $('#hidden-shop');
    // create visible shop in info section
    $('#show-info').html(shop.html());
    // remove hidden shop before using IDs
    shop.empty();
    // use IDs to set values
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
    // show purchase buttons
    $('#purchases').toggleClass('hidden');
  }
  else {
    $('#show-info').html("<p>You don't have an inventory!</p>");
  }
}

function closeShop() {
  // only close shop if it is showing, otherwise will hide other info
  if (showingShop) {
    // change shop status to hidden
    showingShop = false;
    var info = $('#show-info');
    // restore hidden shop
    $('#hidden-shop').html(info.html());
    // empty info section
    info.empty();
    // hide purchase buttons
    $('#purchases').toggleClass('hidden');
  }
}

function buyChute() {
  if (currentPlayer.inventory.money >= 100 &&
      !currentPlayer.inventory.parachute) {
    console.log('bought chute');
    currentPlayer.inventory.money -= 100;
    currentPlayer.inventory.parachute = true;
  }
  else if (currentPlayer.inventory.money >= 100) {
    console.log('already have a chute');
  }
  else {
    console.log('not enough money for chute');
  }
}
function buyShell() {
  console.log('bought shell');
  currentPlayer.inventory.standardShot++;
}
function buyMega() {
  if (currentPlayer.inventory.money >= 100)
  {
    console.log('bought mega');
    currentPlayer.inventory.megaBomb++;
    currentPlayer.inventory.money -= 100;
  }
  else {
    console.log('not enough money for mega');
  }
}
function buyUltra() {
  if (currentPlayer.inventory.money >= 200)
  {
    console.log('bought ultra');
    currentPlayer.inventory.ultraBomb++;
    currentPlayer.inventory.money -= 200;
  }
  else {
    console.log('not enough money for ultra');
  }
}
