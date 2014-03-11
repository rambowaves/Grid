/* 
 * @ABroadwell
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Initialize num of rows and cols to use as the game grid
var numCols = 12;
var numRows = 12;

//set avatar location to be in the center of the bottom row
var avatar = numRows.toString() + "_" + Math.floor(numCols / 2).toString();
var avatarX;
var avatarY;
var avatarIsPlaced = false;
var shooting = false;
menu();
//sets up the game grid 
//puts id's for outer and locations to be used when shooting to test if avatar and laser are in the same row/col
function game () {
document.write('<link rel="stylesheet" type="text/css" href="laserGate.css"/><img id="thing" src="http://1.bp.blogspot.com/-VfEiU_WCC0Q/UInN6IcUTDI/AAAAAAAAAH0/HRik5VIq7Y4/s1600/b001.png"><h1 id="test">Laser Gate</h1><div class="laserGate"><table id="grid" border="0" cellspacing = "0" cellpadding = "0" id="a" align = "center">');
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
document.write('</table>');


//get cellWidth and cellHeight to be used in placement and in overlap test
var cellWidth = document.getElementById("0_0").offsetWidth / 2;
var cellHeight = document.getElementById("0_0").offsetHeight / 2;

//used to mock a level 
level1();
function level1() {
    //place lasers
    $("#0_0").text("laser").addClass("laser");
    $("#6_0").text("laser").addClass("laser");
    $("#3_" + numCols + "").text("laser").addClass("laser");
    $("#" + numRows + "_10").text("laser").addClass("laser");
    
    //place boxes
    //TODO: create an array of boxes
    $("#5_5").attr("id", "box");
    $("#box").addClass("unHit");
    
    //set avatar location
    $("#" + avatar + "").addClass("avatar");
    var pos = getElementPosition(avatar);
    console.log("position " + pos.left + "  " + pos.top);
    avatarX = pos.left + cellWidth;
    avatarY = pos.top + cellHeight;
    console.log("avatar location " + avatarX + "   " + avatarY);
    $("#thing").css({
        left: avatarX,
        top: avatarY
    });
    
    avatarIsPlaced = true;
    $("#thing").show();
}

//used to get element position 
//@param of id
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
};

var grid = document.getElementById("grid");
for (i = 0; i <= numRows; i++) {
    for (j = 0; j <= numCols; j++) {
        grid.rows[i].cells[j].onclick = function(e) {
            if ($(this).hasClass("outer") && !shooting) {

                //get top and left coordinates of the new clicked position
                var currentPosition = $(this).attr("id");
                var position = getElementPosition(currentPosition);
                var xPosition = position.left + cellWidth;
                var yPosition = position.top + cellHeight;
                $("#whereami").text("Current Location: " + xPosition + ", " + yPosition);
                $("#whereami").text("shooting: " + shooting);

                if ($(this).hasClass("laser") && avatarIsPlaced) {
                    shooting = true;
                    $("#thing").show();
                    $("#whereami").text("shooting: " + shooting);

                    //get dimensions of box
                    var boxPos = getElementPosition("box");
                    var boxDim = {
                        left: boxPos.left,
                        top: boxPos.top,
                        right: boxPos.left + cellWidth,
                        bottom: boxPos.top + cellHeight
                    };

                    //Shoot!
                    var theThing = document.querySelector("#thing");
                    theThing.style.left = xPosition + "px";
                    theThing.style.top = yPosition + "px";

                    //check for any collisions 
                    var testCollision = setInterval(function() {
                        //get the necessary location of the thing at that moment
                        var thingEl = document.getElementById("thing");
                        var thingPosition = getElementPosition("thing");
                        var thingLeft = thingPosition.left;
                        var thingTop = thingPosition.top;
                        var thingRight = thingLeft + thingEl.width;
                        var thingBottom = thingTop + thingEl.height;

                        //test if the laser collides with any boxes
                        xOverlap = collides(boxDim.left, thingLeft, thingRight) || collides(thingLeft, boxDim.left, boxDim.right);
                        yOverlap = collides(boxDim.top, thingTop, thingBottom) || collides(thingTop, boxDim.top, boxDim.bottom);
                        if (xOverlap && yOverlap) {
                            $("#box").removeClass("unhit");
                            $("#box").addClass("hit");
                            console.log("overlap");
                            setTimeout(function() {
                                //we will have to reconfigure this once we decide what happens when we hit a box
                                document.getElementById("box").style.backgroundColor = "transparent";
                            }, 1000);
                        }
                    }, 1);
                    setTimeout(function() {
                        clearInterval(testCollision);
                    }, 1000);

                    //after done shooting, reset the avatar
                    setTimeout(function() {
                        $("#thing").hide();
                        theThing.style.left = avatarX + "px";
                        theThing.style.top = avatarY + "px";
                        setTimeout(function() {
                            shooting = false;
                            $("#whereami").text("shooting in timeout: " + shooting);
                            $("#thing").show();
                        }, 1000);
                    }, 1000);


                } else {
                    avatarPlaced = false;
                    shooting = true;
                    $("#" + avatar + "").removeClass("avatar");
                    $(this).addClass("avatar");
                    avatar = currentPosition;
                    avatarX = xPosition;
                    avatarY = yPosition;

                    $("#thing").hide();
                    $("#thing").css({
                        left: avatarX,
                        top: avatarY
                    });
                    setTimeout(function() {
                        avatarPlaced = true;
                        shooting = false;
                        $("#thing").show();
                    }, 1000);
                }
            }
        }
        ;
    }
}
function collides(value, min, max) {
    return (value >= min) && (value <= max);
};

};

function menu() { //this will bring the user back to the level screen so he can pick the next level
            document.write('<link rel="stylesheet" type="text/css" href="laserGate.css"/><div class="menu"><h1>Laser Gate</h1><table id="selector" cellspacing = "15" cellpadding = "10" id="a" align = "center">');
            var numRows = 6;
            var numColmns = 5;
            var blockId = 1;
            for(i = 0; i < numRows; i++) { //the menu table
               document.write('<tr id="row"' + i + '>');

               for(j = 0; j < numColmns; j++){
                   document.write("<td id= '" + blockId.toString() + "'>" + blockId.toString() + "</td>");
                   blockId++;
               };
               document.write('</tr>');
            };
            document.write('</table></div>');

         $('#selector td').click(function() { //when you click on a <td> element it will get the id and use that to correlate with the level desired
             var id = $(this).attr('id');
             console.log("go to level " + id + "");
             $('.menu').html(''); //remove everything
             $('div').removeClass("menu"); 
             game(); //game(id) will be used with a next level function when there is a variety of levels
         });

    }
