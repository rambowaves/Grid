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

$(function() {

//SWIPING FUNCTIONALITY FOR AVATAR
//    //Enable swiping...
//    $("table").swipe({
//        //Generic swipe handler for all directions
//        swipe: function(event, direction, distance, duration, fingerCount) {
////            $('#grid').text("You swiped " + direction + " for " + distance + " pixels");
//            var start = $(".avatar").attr("id");
//            var moveSquares = Math.floor(distance / 75);
//            var end = parseInt(start, 10);
//            row = Math.floor(end / 10);
//            col = end % 10;
////            $("h1").text("row " + row + " col " + col + " " + Math.floor(end / 10) + "   " + end % 10 + "  " + end);
//
//            var end = parseInt(start, 10);
//            if ($("#" + start + "").hasClass('right') && direction === 'right'.toString()) {
//                col = (moveSquares + col > numCols) ? numCols.toString() : (col + moveSquares);
//            }
//            else if ($("#" + start + "").hasClass('left') && direction === 'left'.toString()) {
//                col = (col - moveSquares < 0) ? '0' : (col - moveSquares);
//            }
//            else if ($("#" + start + "").hasClass('up') && direction === 'up'.toString()) {
//                row = (row - moveSquares < 0) ? '0' : (row - moveSquares);
//            }
//            else if ($("#" + start + "").hasClass('down') && direction === 'down'.toString()) {
//                row = (row + moveSquares > numRows) ? numRows.toString() : (row + moveSquares);
//            }
//            end = row.toString() + col.toString();
////            $("h1").text(Math.floor(end / 10) + "   " + end % 10 + "  " + end);
//            $("#" + start + "").removeClass('avatar');
//            $("#" + end + "").addClass('avatar');
//            $('#grid').text("You are currently in box " + end + " you swiped " + direction + " for " + distance + " pixels");
//        },
//        //Default is 75px, set to 0 for demo so any distance triggers swipe
//        threshold: 0
//    });
////    $("table").on("click", function() {
////        alert("Level 1");
////        $("#00").text("laser").addClass("laser");
////        $("#60").text("laser").addClass("laser");
////        $("#38").text("laser").addClass("laser");
////        $("#84").addClass("avatar");
////    });

});