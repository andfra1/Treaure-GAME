var startBttn = document.getElementById('start');
var mapsize = document.getElementById('mapsize');
var targetsize = document.getElementById('treasuresize');
var tryBttn = document.getElementById('tryagain');
var menuBttn = document.getElementById('menubttn');
var menu = document.getElementById('menu');
var endgame = document.getElementById('endgame');
var info = document.getElementById('info');
var x = document.getElementById('x');
var c = document.getElementById('click');
var map = document.getElementById('map');
var target = document.getElementById('treasure');
var xtremedesc = document.getElementById('levelxtreme');
var clicks = 0;
var xtremeMode = false;

mapsize.addEventListener("change", setMapSize);
targetsize.addEventListener("change", setTargetSize);

var targetSize, areaWidth, areaHeight, randX, randY;

startBttn.addEventListener("click", start);
menuBttn.addEventListener("click", showMenu);

function setMapSize() {
  switch (mapsize.value) {
    case "small":
      areaWidth = 200;
      areaHeight = 200;
      break;
    case "medium":
      areaWidth = 400;
      areaHeight = 400;
      break;
    case "big":
      areaWidth = window.innerWidth - 10;
      areaHeight = window.innerHeight - 100;
      break;
    default:
      areaWidth = 400;
      areaHeight = 400;
  }
}
setMapSize();

function setTargetSize() {
  switch (targetsize.value) {
    case "easy":
      targetSize = 80;
      xtremedesc.style = "";
      break;
    case "medium":
      targetSize = 40;
      xtremedesc.style = "";
      break;
    case "hard":
      targetSize = 4;
      xtremedesc.style = "";
      break;
    case "xtreme":
      targetSize = 4;
      xtremedesc.style = "display:block";
      xtremeMode = true;
      break;
    default:
      targetSize = 40;
      xtremedesc.style = "";
  }
}
setTargetSize();

function start() {
  c.innerHTML = "?";
  target.classList.remove('treasureFound');
  info.classList.add('infoShow');
  endgame.classList.remove('endgameOn');
  menu.classList.add('menuOff');
  setTimeout(function () {
    document.addEventListener("click", distance);
  }, 1000);
  map.style = "width:" + areaWidth + "px; height:" + areaHeight + "px";
  targetPoistion();
}

function targetPoistion() {
  randX = Math.floor(Math.random() * (areaWidth - targetSize));
  randY = Math.floor(Math.random() * (areaHeight - targetSize));
  target.style = "top: " + randY + "px; left:" + randX + "px;width:" + targetSize + "px;height:" + targetSize + "px";
  return [randX + targetSize / 2, randY + targetSize / 2];
}

function distance(e) {
  if (xtremeMode) {
    if (clicks % 10 === 0) {
      targetPoistion();
    }
  }
  e = event || window.event;

  var mX = e.pageX - map.offsetLeft + areaWidth / 2;
  var mY = e.pageY - map.offsetTop + areaHeight / 2;

  function checkDistance() {
    var checkX = mX - randX - targetSize / 2;
    var checkY = mY - randY - targetSize / 2;
    var y = Math.pow(checkX, 2) + Math.pow(checkY, 2);
    var yx = Math.floor(Math.sqrt(y));

    //success
    if (checkX >= -(targetSize) / 2 && checkX < (targetSize) / 2 && checkY >= -(targetSize) / 2 && checkY < (targetSize) / 2) {
      document.removeEventListener("click", distance);
      target.classList.add('treasureFound');
      endGame();
      return "You find it!";
      //still checking
    } else {
      x.style = "";
      x.style = "top: " + (mY - x.offsetHeight / 2) + "px; left:" + (mX - 10) + "px; animation-name: fadeInOut";
      clicks += 1;
      return [yx - (targetSize - 2) / 2, clicks];
    }
  }

  c.innerHTML = checkDistance();
}

function endGame() {
  tryBttn.addEventListener("click", start);
  endgame.classList.add('endgameOn');
  info.classList.remove('infoShow');
}

function showMenu() {
  endgame.classList.remove('endgameOn');
  menu.classList.remove('menuOff');
}