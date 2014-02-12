/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

document.write('<h1>Laser Gate</h1><div class="laserGate"><table id="grid" border="0" cellspacing = "0" cellpadding = "0" id="a" align = "center">');
var numCols = 12;
var numRows = 12;
var avatar;
for (i = 0; i <= numRows; i++) {
    document.write("<tr id='row'" + i + ">");
    for (j = 0; j <= numCols; j++) {
        if (j === 0) {
            if (i === 0) {
                document.write("<td id= '" + i.toString() + j.toString() + "' class='outer down right'></td>");
            }
            else if (i === numRows) {
                document.write("<td id= '" + i.toString() + j.toString() + "' class='outer up right'></td>");
            }
            else {
                document.write("<td id= '" + i.toString() + j.toString() + "' class = 'outer up down'></td>");
            }
        }
        else if (j === numCols) {
            if (i === 0) {
                document.write("<td id= '" + i.toString() + j.toString() + "' class='outer down left'></td>");
            }
            else if (i === numRows) {
                document.write("<td id= '" + i.toString() + j.toString() + "' class='outer up left'></td>");
            }
            else {
                document.write("<td id= '" + i.toString() + j.toString() + "' class = 'outer up down'></td>");
            }
        }
        else {
            if (i === 0 | i === numRows) {
                document.write("<td id= '" + i.toString() + j.toString() + "' class = 'outer right left'></td>");
            }
            else {
                document.write("<td id= '" + i.toString() + j.toString() + "' ></td>");

            }
        }
    }
    document.write('</tr></div>');
}
;

level1();
document.write('</table>');

function level1() {
    $("#00").text("laser").addClass("laser");
    $("#60").text("laser").addClass("laser");
    $("#3" + numCols + "").text("laser").addClass("laser");
    $("#" + numRows + "10").text("laser").addClass("laser")
    avatar = numRows.toString() + Math.floor(numCols/2).toString();
    $("#" + avatar + "").addClass("avatar");

}
$("table").onclick = function getClickPosition(e) {
    var xPosition = e.clientX;
    var yPosition = e.clientY;
    alert(xPosition, yPosition);
};
var grid = document.getElementById("grid");
for (i = 0; i <= numRows; i++) {
    for (j = 0; j <= numCols; j++) {
        grid.rows[i].cells[j].onclick = function(e) {
//            if we want exact x,y locations
                var xPosition = e.clientX;
                var yPosition = e.clientY;
                $("#whereami").text("Current Location: " + xPosition + ", "+ yPosition);
            var currentPosition = $(this).attr("id");
//                alert(newAvatar);
            if ($(this).hasClass("laser")) {
                $("#whereami").text("LASER --- Current Location: " + xPosition + ", "+ yPosition);
            }
            else if ($(this).hasClass("outer")) {
                $("#" + avatar + "").removeClass("avatar");
                $(this).addClass("avatar");
                avatar = currentPosition;
            }
        };
    }
}