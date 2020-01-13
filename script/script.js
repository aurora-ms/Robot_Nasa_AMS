﻿var canvas = document.getElementById("micanvas");
var ctx = canvas.getContext("2d");

var plataforma = 5;
var control = 0;
var instValue = [];
var resultX = 60;
var resultY = 61;


var direct = document.getElementById("selectDirection");
var robot = document.getElementById("robot");
var asigBut = document.getElementById("asigBut");


var cordX = "";
var cordY = "";
var directFinal = "";
var posicion = "";

asigBut.addEventListener("click", function () {

  cordX = parseInt(document.getElementById("corX").value);
  cordY = parseInt(document.getElementById("corY").value);
  directFinal = direct.innerHTML;
  posicion = cordX + " " + cordY + " " + directFinal;

  if (isNaN(cordX) === false && cordX >= 1 && cordX <= 5 && isNaN(cordY) === false && cordY >= 1 && cordY <= 5) {

    switch (cordX) {
      case 1:
        var finalResultX = -resultX - resultX;
        robot.style.left = finalResultX + "px";
        break;
      case 2:
        var finalResultX = -resultX;
        robot.style.left = finalResultX + "px";
        break;
      case 3:
        var finalResultX = 0;
        robot.style.left = finalResultX + "px";
        break;
      case 4:
        var finalResultX = resultX;
        robot.style.left = finalResultX + "px";
        break;
      case 5:
        var finalResultX = resultX + resultX;
        robot.style.left = finalResultX + "px";
        break;
    }

    switch (cordY) {
      case 1:
        var finalResultY = -resultY;
        robot.style.top = finalResultY + "px";
        break;
      case 2:
        var finalResultY = -resultY * 2;
        robot.style.top = finalResultY + "px";
        break;
      case 3:
        var finalResultY = -resultY * 3;
        robot.style.top = finalResultY + "px";
        break;
      case 4:
        var finalResultY = -resultY * 4;
        robot.style.top = finalResultY + "px";
        break;
      case 5:
        var finalResultY = -resultY * 5;
        robot.style.top = finalResultY + "px";
        break;
    }

    control = 1;
  }
  else if (isNaN(cordX) === true || isNaN(cordY) === true) {
    alert("Debes introducir un numero entre 1 y 5");
    control = 0;
  }
  else if (cordX < 0 || cordX > 5 || cordY < 0 || cordY > 5) {
    alert("Debes introducir un numero entre 1 y 5");
    control = 0;
  }



  switch (directFinal) {
    case "N":
      robot.style.transform = "rotate(0deg)";
      break
    case "O":
      robot.style.transform = "rotate(270deg)";
      break
    case "E":
      robot.style.transform = "rotate(90deg)";
      break
    case "S":
      robot.style.transform = "rotate(180deg)";
      break
  }
})


document.getElementById("initRobot").addEventListener("click", function () {
  if (control === 1) {

    var instDates = document.getElementById("instruct").value;

    for (var i = 0; i < instDates.length; i++) {
      instValue.push(instDates.slice(i, i + 1));
    }

    initRobot(plataforma, posicion, instValue)
  }
})


/**
 * @param  {number} plataforma - Platform dimension
 * @param  {string} posicion - Robot´s initial position 
 * @param  {object} instValue - Robot´s instructions
 */

function initRobot(plataforma, posicion, instValue) {

  var cordX = parseInt(posicion.split(' ')[0]);
  var cordY = parseInt(posicion.split(' ')[1]);
  var direct = posicion.split(' ')[2];
  var aviso = document.getElementById("aviso");
  var exit = true;

  for (var i of instValue) {
    if (exit === true) {
      if (i === "M") {
        switch (direct) {
          case "N":
            if (cordY + 1 <= plataforma) {
              cordY++
              robot.style.top = resultY * -cordY + "px";
            }
            else {
              aviso.innerText = "El robot se caería de la plataforma";
              exit = false;
            }
            break;
          case "S":
            if (cordY - 1 >= 1) {
              cordY--
              robot.style.top = resultY * -cordY + "px";
            }
            else {
              aviso.innerText = "El robot se caería de la plataforma";
              exit = false;
            }
            break;
          case "E":
            if (cordX + 1 <= plataforma) {
              robot.style.left = (resultX * cordX) - 120 + "px";
              cordX++
            }
            else {
              aviso.innerText = "El robot se caería de la plataforma";
              exit = false;
            }
            break;

          case "O":
            if (cordX - 1 <= plataforma && cordX - 1 > 0) {
              cordX--
              robot.style.left = (resultX * -cordX) + 60 + "px";
            }
            else {
              aviso.innerText = "El robot se caería de la plataforma";
              exit = false;
            }
            break;
        }
      }

      if (i === "R") {
        switch (direct) {
          case "N":
            robot.style.transform = 'rotate(90deg)';
            direct = "E";
            break;
          case "S":
            robot.style.transform = 'rotate(270deg)';
            direct = "O";
            break;
          case "E":
            robot.style.transform = 'rotate(180deg)';
            direct = "S";
            break;

          case "O":
            robot.style.transform = 'rotate(0deg)';
            direct = "N";
            break;
        }
      }

      if (i === "L") {
        switch (direct) {
          case "N":
            robot.style.transform = 'rotate(270deg)';
            direct = "O";
            break;
          case "S":
            robot.style.transform = 'rotate(90deg)';
            direct = "E";
            break;
          case "E":
            robot.style.transform = 'rotate(0deg)';
            direct = "N";
            break;

          case "O":
            robot.style.transform = 'rotate(180deg)';
            direct = "S";
            break;
        }
      }
    }
  }


}




var instruct = document.getElementById("instruct");

document.getElementById("left").addEventListener("click", function () {
  instruct.value = instruct.value + "L";
})

document.getElementById("rect").addEventListener("click", function () {
  instruct.value = instruct.value + "M";
})


document.getElementById("rigth").addEventListener("click", function () {
  instruct.value = instruct.value + "R";
})





document.getElementById("nord").addEventListener("click", function () {
  direct.innerHTML = "N";
})

document.getElementById("oest").addEventListener("click", function () {
  direct.innerHTML = "O";
})

document.getElementById("est").addEventListener("click", function () {
  direct.innerHTML = "E";
})

document.getElementById("sur").addEventListener("click", function () {
  direct.innerHTML = "S";
})




for (var x = 0; x <= 300; x = x + 60) {
  ctx.moveTo(x, 0);
  ctx.lineTo(x, 300);
}
for (var y = 0; y <= 300; y = y + 60) {
  ctx.moveTo(0, y);
  ctx.lineTo(300, y);
}

ctx.strokeStyle = "#f00";
ctx.stroke();

