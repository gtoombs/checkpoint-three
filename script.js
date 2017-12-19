//variables
var food = 100; //Food will drain over time
var totalexp = 0; //EXP goes up with each forage
var exptnl = 5; //EXP to next level
var currentlevel = 1; //Level will go up with EXP gains
var wood = 0;
var stone = 0;
var coal = 0;
var woodpersecond = 0; //wood gain per tick
var stonepersecond = 0; //stone **
var autoharvestcost = 1; //the cost of this should increase exponentially
var upgrade_speed = 0; //the level of the speed up upgrade
var click_rate = 1000; //ms between each autoclick
var interval_auto; //storing our interval here so we can update it
var woodperclick = 1;
var stoneperclick = 0;


//functions
function update_total_resources() { //updates the number of clicks
  var e = document.getElementById("total_wood");
  e.innerHTML = wood;
  var e2 = document.getElementById("total_stone");
  e2.innerHTML = stone;
  var e3 = document.getElementById("woodperclick");
  e3.innerHTML = currentlevel;
  var e4 = document.getElementById("stoneperclick");
  e4.innerHTML = Math.round(currentlevel / 10);
  var e5 = document.getElementById("total_coal");
  e5.innerHTML = coal;
}

function update_total_exp() {
  var exppct = totalexp/exptnl;
  var e = document.getElementById("exptotal");
  e.innerHTML = totalexp;
  var e2 = document.getElementById("exptnl");
  e2.innerHTML = exptnl;
    if (totalexp > exptnl-1) {
    exptnl = exptnl * 2;
    currentlevel = currentlevel +1;
    }
  var e3 = document.getElementById("current_level");
  e3.innerHTML = currentlevel;
}
function buy_with_wood(c, button) {
  if (wood < c) {
    button.className = 'btn btn-danger btn-lg btn-block';
    setTimeout(function() {
      var e = document.getElementsByClassName("btn-danger")[0];
      e.className = 'btn btn-warning btn-lg btn-block';
    }, 1000);
    return false;
  }
  wood -= c;
  return true;
}

function buy_with_stone(c, button) {
  if (stone < c) {
    button.className = 'btn btn-danger';
    setTimeout(function() {
      var e = document.getElementsByClassName("btn-danger")[0];
      e.className = 'btn btn-success';
    }, 1000);
    return false;
  }
  stone -= c;
  return true;
}



function update_workers() {

  clearInterval(interval_auto);
  interval_auto = setInterval(function() {
    wood += woodpersecond;
    stone += stonepersecond;
    update_total_resources();
  }, click_rate);
}

function foragestone() {
  var e = Math.round(currentlevel / 10);
  wood = wood + currentlevel;
  stone = stone + e;
  totalexp++;
  update_total_exp();
  update_total_resources();
}

function update_wood_per_second() {
  var e4 = document.getElementById("wps");
  var num = (1000*woodpersecond/click_rate);
  var n = num.toFixed(2);
  e4.innerHTML = '+' + n;
}

function burnwood() {
  coal++;
  totalexp = totalexp + 10;
  update_total_exp();
  update_total_resources();
}

//click events
document.getElementById("Forage").onclick = function() {
  foragestone();
};

document.getElementById("Burn").onclick = function() {
  if (!buy_with_wood(100, this)) return;
  burnwood();
};

document.getElementById("autoharvest").onclick = function() {
  if (!buy_with_stone(autoharvestcost, this)) return;
  woodpersecond++;
  autoharvestcost = Math.pow(2, woodpersecond); //new cost
  update_total_exp();
  update_total_resources()

  var e2 = document.getElementById("autoharvest");
  e2.innerHTML = autoharvestcost + ' Stone';
  var e3 = document.getElementById("autoclicker_level");
  e3.innerHTML = 'lvl  ' + woodpersecond;
  update_wood_per_second();
};

document.getElementById("harvestupgrade_speed").onclick = function() {
  var upgrade_cost = (Math.pow(3, upgrade_speed)) * 30;
  if (!buy_with_stone(upgrade_cost, this)) return;
  upgrade_speed++;
  click_rate = click_rate * .90;
  update_workers();
  update_total_exp();
  update_total_resources()
  var e2 = document.getElementById("harvestupgrade_speed");
  e2.innerHTML = ((Math.pow(3, upgrade_speed)) * 30) + ' Stone';
  var e3 = document.getElementById("speed_level");
  e3.innerHTML = 'lvl  ' + upgrade_speed;
  update_wood_per_second();
};


//start our autoclickers
update_workers();
