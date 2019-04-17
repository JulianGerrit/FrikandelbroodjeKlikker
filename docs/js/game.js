/*
  Source code is also available at https://github.com/JulianGerrit/FrikandelbroodjeKlikker
  This project is licensed under the GNU General Public License v3.0 - see the https://github.com/JulianGerrit/FrikandelbroodjeKlikker/blob/master/LICENSE file for details.
*/

/*
  TODO LIST:
    - Styling
    - Link to images in media/
    - More upgrades
    - Animate when clicked in add()
*/

gameloop();

// Global variables here.
var count = 0;
var incr = 1;
var dps = 0;
// Prices below
pBonuskaart = 100;
pFiets = 300;
pHarry = 1000;

// Upgrade counters
Bonuskaarten = 0;
Fietsen = 0;
Harrys = 0;


// MAIN GAME LOOP
async function gameloop() 
{
  while (1) { // While (true) is for hipsters
    count += dps;
    await sleep(1000); // Sleep() is somewhere at the bottom of this file. Same sleep as in other languages.
    refreshes.refreshElements();
  }
}

function add()
{
  count += incr;
  refreshes.refreshElements();
}

function buy(item) {

  switch (item) {

    case "bonus_kaart":
      if (upgrades.clickermultiplier(pBonuskaart, 2)) {
        Bonuskaarten++;
        refreshes.refreshUpgrades();
      }
      break;

    case "fiets":
      if (upgrades.dpsaddition(pFiets, 20)) { // Proof of concept
        Fietsen++;
        refreshes.refreshUpgrades();
      }
      break;

    case "harry":
      if (upgrades.dpsaddition(pHarry, 500)) { // Proof of concept
        Harrys++;
        refreshes.refreshUpgrades();
      }
      break;

    default:
      alert("dit item bestaat niet");
      break;
  }
}

var refreshes = {
  refreshElements: function()
  {
    document.getElementById("counter").value = count;
    // Element.value = variable
    // Add each element containing a variable here.
  },

  refreshUpgrades: function()
  { 
    for (i = 0; i < Bonuskaarten; i++) {
      pBonuskaart = 100;
      pBonuskaart = pBonuskaart * 2;
    }

    for (i = 0; i < Fietsen; i++) {
      pFiets = 300;
      pFiets = pFiets * 2;
    }

    for (i = 0; i < Harrys; i++) {
      pHarry = 1000;
      pHarry = pHarry * 2;
    }

    document.querySelector("#bonus_kaart code").innerHTML = pBonuskaart;
    document.querySelector("#fiets code").innerHTML = pFiets;
    document.querySelector("#harry code").innerHTML = pHarry;

  }
}

var upgrades = {

  // amount per click getting multiplied.
  clickermultiplier: function(price, multiplier) 
  {
    if (count >= price) {
      incr = incr * multiplier; // =* is not valid for some reason.
      count -= price;
      return true;
    } else {
      alert("Heb jij geld, kankerboef?");
      return false;
    }
  },

  // more per second
  dpsaddition: function(price, addition)
  {
    if (count >= price) {
      dps += addition;
      count -= price;
      return true;
    } else {
      alert("Heb jij geld, kankerboef?");
      return false;
    }
  }

}


var storage = {

  save: function()
  {
    cookies.set("frikandelbroodjes", count.toString());
    cookies.set("clickerincr", incr.toString());
    cookies.set("dps", dps.toString());

    cookies.set("bonuskaarten", Bonuskaarten.toString());
    cookies.set("fietsen", Fietsen.toString());
    cookies.set("harrys", Harrys.toString());
  },

  load: function()
  {
    /* Spaghetti code translation: if the cookie is NaN..... Meaning there's no cookie.
    Checking all the cookies is redundant so I chose 1. */
    if (isNaN(parseInt(cookies.get("frikandelbroodjes")))) { 
      alert("Nothing to load...");
    } else {
      count = parseInt(cookies.get("frikandelbroodjes"));
      incr = parseInt(cookies.get("clickerincr"));
      dps = parseInt(cookies.get("dps"));

      Bonuskaarten = parseInt(cookies.get("bonuskaarten"));
      Fietsen = parseInt(cookies.get("fietsen"));
      Harrys = parseInt(cookies.get("harrys"));

      refreshes.refreshUpgrades();
      refreshes.refreshElements();
    }   
  },

  reset: function()
  {
    // Delete cookies or not??? tbd...
    count = 0;
    incr = 1;
    dps = 0;
    pBonuskaart = 100;
    pFiets = 300;
    pHarry = 1000;
    Bonuskaarten = 0;
    Fietsen = 0;
    Harrys = 0;

    refreshes.refreshElements();
    refreshes.refreshUpgrades();
  }

}


// Lovely functions from stackoverflow, making cookies less of a pain.
var cookies = {

  get: function(name)
  {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  },

  set: function(name, value, days)
  {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  },

  delete: function(name)
  {
    document.cookie = name+'=; Max-Age=-99999999;';
  }

}

// Sleep function used for the game loop.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}