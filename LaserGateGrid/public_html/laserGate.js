/* 
 * @ABroadwell
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var numCols = 12;
var numRows = 12;
var avatar = numRows.toString() + "_" + Math.floor(numCols / 2).toString();
var avatarX;
var avatarY;
var avatarIsPlaced = false;

document.write('<img id="thing" src="http://1.bp.blogspot.com/-VfEiU_WCC0Q/UInN6IcUTDI/AAAAAAAAAH0/HRik5VIq7Y4/s1600/b001.png"><h1 id="test">Laser Gate</h1><div class="laserGate"><table id="grid" border="0" cellspacing = "0" cellpadding = "0" id="a" align = "center">');
$("#thing").hide();
for (i = 0; i <= numRows; i++) {
    document.write("<tr class='row" + i + "'>");
    for (j = 0; j <= numCols; j++) {
        if (j === 0) {
            if (i === 0) {
                document.write("<td id= '" + i.toString() + "_" + j.toString() + "' class='outer left corner'></td>");
            }
            else if (i === numRows) {
                document.write("<td id= '" + i.toString() + "_" + j.toString() + "' class='outer left corner'></td>");
            }
            else {
                document.write("<td id= '" + i.toString() + "_" + j.toString() + "' class = 'outer left '></td>");
            }
        }
        else if (j === numCols) {
            if (i === 0) {
                document.write("<td id= '" + i.toString() + "_" + j.toString() + "' class='outer corner right'></td>");
            }
            else if (i === numRows) {
                document.write("<td id= '" + i.toString() + "_" + j.toString() + "' class='outer corner right'></td>");
            }
            else {
                document.write("<td id= '" + i.toString() + "_" + j.toString() + "' class ='outer right'></td>");
            }
        }
        else {
            if (i === 0) {
                document.write("<td id= '" + i.toString() + "_" + j.toString() + "' class = 'outer top'></td>");
            }
            else if (i === numRows) {
                document.write("<td id= '" + i.toString() + "_" + j.toString() + "' class = 'outer bottom'></td>");
            }
            else {
                document.write("<td id= '" + i.toString() + "_" + j.toString() + "'></td>");

            }
        }
    }
    document.write('</tr></div>');
}
;

level1();
document.write('</table>');

var table = $("#table");
var cellWidth = document.getElementById("0_0").offsetWidth / 2;
var cellHeight = document.getElementById("0_0").offsetHeight / 2;

function level1() {
    $("#0_0").text("laser").addClass("laser");
    $("#6_0").text("laser").addClass("laser");
    $("#3_" + numCols + "").text("laser").addClass("laser");
    $("#" + numRows + "_10").text("laser").addClass("laser");
    $("#" + avatar + "").addClass("avatar");
    var pos = getElementPosition(avatar);
    avatarX = pos.left + cellWidth;
    avatarY = pos.top + cellHeight;

    $("#thing").css({
        left: avatarX,
        top: avatarY
    });
    avatarIsPlaced = true;
}
function getElementPosition(id) {
    var element = document.getElementById(id);
    var top = 0;
    var left = 0;

    while (element.tagName !== "BODY") {
        top += element.offsetTop;
        left += element.offsetLeft;
        element = element.offsetParent;
    }
    return {top: top, left: left};
}
;

var grid = document.getElementById("grid");
for (i = 0; i <= numRows; i++) {
    for (j = 0; j <= numCols; j++) {
        grid.rows[i].cells[j].onclick = function(e) {
            var currentPosition = $(this).attr("id");
            var position = getElementPosition(currentPosition);
            var xPosition = position.left + cellWidth;
            var yPosition = position.top + cellHeight;
            $("#whereami").text("Current Location: " + xPosition + ", " + yPosition);

            if ($(this).hasClass("laser") && avatarIsPlaced) {
                $("#whereami").text("LASER --- Current Location: " + xPosition + ", " + yPosition + " avatar: " + avatarX + "  " + avatarY);
                laserX = xPosition;
                laserY = yPosition;
                $("#thing").show();
                var theThing = document.querySelector("#thing");
                theThing.style.left = laserX + "px";
                theThing.style.top = laserY + "px";
                //Hide thing after it has finished it
                $("#thing").on('transitionend webkitTransitionEnd', function(e) {
                    $("#thing").hide();
                });
            }
            else if ($(this).hasClass("outer")) {
                $("#thing").hide();
                $("#" + avatar + "").removeClass("avatar");
                $(this).addClass("avatar");
                avatar = currentPosition;
                avatarX = xPosition;
                avatarY = yPosition;
                $("#thing").css({
                    left: avatarX,
                    top: avatarY
                });
                var transitionEnd = whichTransitionEvent();
                var theThing = document.getElementById("thing");
                theThing.addEventListener(transitionEnd, $("#thing").show(), false);
                
//                
//                $("#thing").on('transitionend webkitTransitionEnd', function(e) {
//                    $("#thing").show();
//                });
                
//                $("#thing").show();
//$("#thing").on('transitionend webkitTransitionEnd', function(e) {
//                    $("#thing").show();
//                });
                avatarIsPlaced = true;
            }
        };
    }
}

function complete() {
//    $("#thing").hide();
}

function whichTransitionEvent() {
    var t;
    var el = document.getElementById("thing");
    var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    };

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}

