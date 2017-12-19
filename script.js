//variables
var food = 100; //Food will drain over time
var totalexp = 0; //EXP goes up with each forage
var exptnl = 5; //EXP to next level
var currentlevel = 1; //Level will go up with EXP gains
var money = 0;
var gas = 0;
var nos = 0;
var moneypersecond = 0; //wood gain per tick
var gaspersecond = 0; //stone **
var autoharvestcost = 1; //the cost of this should increase exponentially
var upgrade_speed = 0; //the level of the speed up upgrade
var click_rate = 1000; //ms between each autoclick
var interval_auto; //storing our interval here so we can update it
var moneyperclick = 1;
var gasperclick = 0;


//functions
function update_total_resources() { //updates the number of clicks
  var e = document.getElementById("total_money");
  e.innerHTML = wood;
  var e2 = document.getElementById("total_gas");
  e2.innerHTML = stone;
  var e3 = document.getElementById("moneyperclick");
  e3.innerHTML = currentlevel;
  var e4 = document.getElementById("gasperclick");
  e4.innerHTML = Math.round(currentlevel / 10);
  var e5 = document.getElementById("total_nos");
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

function buy_with_money(c, button) {
  if (money < c) {
    button.className = 'btn btn-danger btn-lg btn-block';
    setTimeout(function() {
      var e = document.getElementsByClassName("btn-danger")[0];
      e.className = 'btn btn-warning btn-lg btn-block';
    }, 1000);
    return false;
  }
  money -= c;
  return true;
}

function buy_with_gas(c, button) {
  if (gas < c) {
    button.className = 'btn btn-danger';
    setTimeout(function() {
      var e = document.getElementsByClassName("btn-danger")[0];
      e.className = 'btn btn-success';
    }, 1000);
    return false;
  }
  gas -= c;
  return true;
}



function update_workers() {

  clearInterval(interval_auto);
  interval_auto = setInterval(function() {
    money += moneypersecond;
    gas += gaspersecond;
    update_total_resources();
  }, click_rate);
}

function foragegas() {
  var e = Math.round(currentlevel / 10);
  money = money + currentlevel;
  gas = gas + e;
  totalexp++;
  update_total_exp();
  update_total_resources();
}

function update_money_per_second() {
  var e4 = document.getElementById("wps");
  var num = (1000*moneypersecond/click_rate);
  var n = num.toFixed(2);
  e4.innerHTML = '+' + n;
}

function burnmoney() {
  nos++;
  totalexp = totalexp + 10;
  update_total_exp();
  update_total_resources();
}

//click events
document.getElementById("Forage").onclick = function() {
  foragegas();
};

document.getElementById("Burn").onclick = function() {
  if (!buy_with_money(100, this)) return;
  burnmoney();
};

document.getElementById("autoharvest").onclick = function() {
  if (!buy_with_gas(autoharvestcost, this)) return;
  moneypersecond++;
  autoharvestcost = Math.pow(2, moneypersecond); //new cost
  update_total_exp();
  update_total_resources()

  var e2 = document.getElementById("autoharvest");
  e2.innerHTML = autoharvestcost + ' Gas';
  var e3 = document.getElementById("autoclicker_level");
  e3.innerHTML = 'lvl  ' + moneypersecond;
  update_money_per_second();
};

document.getElementById("harvestupgrade_speed").onclick = function() {
  var upgrade_cost = (Math.pow(3, upgrade_speed)) * 30;
  if (!buy_with_gas(upgrade_cost, this)) return;
  upgrade_speed++;
  click_rate = click_rate * .90;
  update_workers();
  update_total_exp();
  update_total_resources()
  var e2 = document.getElementById("harvestupgrade_speed");
  e2.innerHTML = ((Math.pow(3, upgrade_speed)) * 30) + ' Gas';
  var e3 = document.getElementById("speed_level");
  e3.innerHTML = 'lvl  ' + upgrade_speed;
  update_money_per_second();
};


//start our autoclickers
update_workers();
