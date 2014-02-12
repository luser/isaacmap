/*
 * The Binding of Isaac Mapper
 * Written in 2014 by Ted Mielczarek <ted@mielczarek.org>
 *
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 *
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 */
function getRoom(x, y) {
  return document.getElementById("map").getElementsByTagName("tr")[y].childNodes[x];
}

var lastRoomClicked;

function setRoomType(e) {
  var val = e.currentTarget.className;
  if (val)
    lastRoomClicked.classList.add(val);
  document.getElementById("dropdown").style.visibility = "hidden";
}

function roomClicked(e) {
  var td = e.target;
  if (td.classList.length == 0) {
    td.classList.add("known");
  } else if (td.classList.contains("known")) {
    lastRoomClicked = td;
    var rect = td.getBoundingClientRect();
    var drop = document.getElementById("dropdown");
    drop.style.top = rect.top + "px";
    drop.style.left = rect.left + "px";
    drop.style.visibility = "visible";
  } else if (td.classList.contains("visited")) {
    td.classList.remove("visited");
  }
}

var x, y;

function moveTo(newX, newY) {
  if (x != undefined && y != undefined) {
    var old = getRoom(x, y);
    old.firstChild.textContent = String.fromCharCode(160);
  }
  var r = getRoom(newX, newY);
  r.classList.remove("known");
  r.classList.add("visited");
  r.firstChild.textContent = "i";
  x = newX;
  y = newY;
}

addEventListener("DOMContentLoaded", function() {
  moveTo(4, 2);
  var td = document.getElementsByTagName("td");
  for (var i=0; i < td.length; i++) {
    td[i].addEventListener("click", roomClicked);
  }
  var li = document.getElementsByTagName("li");
  for (i=0; i < li.length; i++) {
    li[i].addEventListener("click", setRoomType);
  }
});

addEventListener("keydown", function(e) {
  var code = e.charCode ? e.charCode : e.keyCode;
  var newX = x, newY = y;
  if (code == 37 && x > 0) {
    newX--;
    moved = true;
  } else if (code == 39 && x < 8) {
    newX++;
    moved = true;
  } else if (code == 38 && y > 0) {
    newY--;
    moved = true;
  } else if (code == 40 && y < 5) {
    newY++;
    moved = true;
  }
  if (x != newX || y != newY)
    moveTo(newX, newY);
});
