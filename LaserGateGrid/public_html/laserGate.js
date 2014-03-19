/* 
 * @ABroadwell
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Initialize num of rows and cols to use as the game grid
var numCols = 9;
var numRows = 13;

//set avatar location to be in the center of the bottom row
var avatar = numRows.toString() + "_" + Math.floor(numCols / 2).toString();
var avatarX;
var avatarY;
var avatarIsPlaced = false;
var shooting = false;
var boxes = new Array();
menu();
//sets up the game grid 
//puts id's for outer and locations to be used when shooting to test if avatar and laser are in the same row/col

function game() {
    document.write('<link rel="stylesheet" type="text/css" href="laserGate.css"/><img id="thing" src="http://1.bp.blogspot.com/-VfEiU_WCC0Q/UInN6IcUTDI/AAAAAAAAAH0/HRik5VIq7Y4/s1600/b001.png"><div class="laserGate"><h1 id="test">Laser Gate</h1><table id="grid" border="0" cellspacing = "0" cellpadding = "0" id="a" align = "center">');
//    $("#thing").hide();
    for (i = 0; i <= numRows; i++) {
        document.write("<tr class='row" + i + "'>");
        for (j = 0; j <= numCols; j++) {
            if (j === 0) {
                if (i === 0) {
                    document.write("<td id= '" + i.toString() + "_" + j.toString() + "' class='outer top left corner'></td>");
                }
                else if (i === numRows) {
                    document.write("<td id= '" + i.toString() + "_" + j.toString() + "' class='outer bottom left corner'></td>");
                }
                else {
                    document.write("<td id= '" + i.toString() + "_" + j.toString() + "' class = 'outer left '></td>");
                }
            }
            else if (j === numCols) {
                if (i === 0) {
                    document.write("<td id= '" + i.toString() + "_" + j.toString() + "' class='outer corner top right'></td>");
                }
                else if (i === numRows) {
                    document.write("<td id= '" + i.toString() + "_" + j.toString() + "' class='outer corner bottom right'></td>");
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
    document.write('</table><button id="menu" align="center">menu</button>');


//get cellWidth and cellHeight to be used in placement and in overlap test
    var cellWidth = document.getElementById("0_0").offsetWidth / 2;
    var cellHeight = document.getElementById("0_0").offsetHeight / 2;

    function Box(boxId) {
        this.boxId = boxId;
    }
    Box.prototype.getId = function() {
        return this.boxId;
    };

    Box.prototype.draw = function(id) {
        $("#" + id + "").addClass("unHit");
    };

    Box.prototype.boxDim = function(id) {
        var boxPos = getElementPosition(this.getId());
        return {
            left: boxPos.left,
            top: boxPos.top,
            right: boxPos.left + cellWidth,
            bottom: boxPos.top + cellHeight
        };
    };


//used to mock a level 
    level1();
    function level1() {
        //place lasers
        $("#0_0").text("L").addClass("laser");
        $("#6_0").text("L").addClass("laser");
        $("#0_3").text("L").addClass("laser");
        $("#3_" + numCols + "").text("L").addClass("laser");
        $("#" + numRows + "_7").text("L").addClass("laser");

        //place boxes
        //boxes is an array of box objects 
        var box0 = new Box("2_4");
        boxes[0] = box0;
        var box1 = new Box("6_2");
        boxes[1] = box1;
        var box2 = new Box("8_7");
        boxes[2] = box2;
        var box3 = new Box("7_7");
        boxes[3] = box3;
        var box4 = new Box("7_2");
        boxes[4] = box4;

        for (var i = 0; i < boxes.length; i++) {
            var box = boxes[i];
            box.draw(box.getId());
        }

        //set avatar location
        //  TODO abstraction for avatar and thing
        // give avatar id of grid location and move avatar and thing
        $("#" + avatar + "").addClass("avatar");
        var pos = getElementPosition(avatar);
        avatarX = setXLocation(avatar, pos);
        avatarY = setYLocation(avatar, pos);
        avatarIsPlaced = true;
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
    }
    ;

    var grid = document.getElementById("grid");
    for (i = 0; i <= numRows; i++) {
        for (j = 0; j <= numCols; j++) {
            grid.rows[i].cells[j].onclick = function(e) {
                if ($(this).hasClass("outer") && !shooting) {

                    //get top and left coordinates of the new clicked position
                    var currentPosition = $(this).attr("id");
                    var position = getElementPosition(currentPosition);

                    //set appropriate x and y coordinates of the new position
                    var xPosition = setXLocation(this, position);
                    var yPosition = setYLocation(this, position);

                    if ($(this).hasClass("laser") && avatarIsPlaced) {
                        if (checkLocation(currentPosition)) {
                            shooting = true;
                            
                            //fetch avatar location again just to be sure screen wasn't resized
                            var temp = getElementPosition(avatar);
                            avatarX = temp.left == avatarX? avatarX : setXLocation(avatar, temp);
                            avatarY = temp.top == avatarY? avatarY : setYLocation(avatar, temp);
                            
                            //set the thing to avatar location on a zero transition speed
                            var theThing = document.getElementById("thing");
                            theThing.style.transition = "left 0s ease-in, top 0s ease-in";
                            theThing.style.left = avatarX;
                            theThing.style.top = avatarY;
//                            
                            //make the thing visible and change transition speed back to 1s
                            setTimeout(function() {
//                                var theThing = document.getElementById("thing");
                                theThing.style.visibility = "visible";
                                theThing.style.transition = "left 1s ease-in, top 1s ease-in";
                            }, 1);

                            //set new location of the thing, in which it will show the transition to get there

                            setTimeout(function() {
                                var theThing = document.querySelector("#thing");
                                theThing.style.left = xPosition + "px";
                                theThing.style.top = yPosition + "px";
                            }, 1);


                            //check for collisions with box objects
                            var testCollision = setInterval(function() {
                                //get the necessary location of the thing at that moment
                                var thingEl = document.getElementById("thing");
                                var thingPosition = getElementPosition("thing");
                                var thingLeft = thingPosition.left;
                                var thingTop = thingPosition.top;
                                var thingRight = thingLeft + thingEl.width;
                                var thingBottom = thingTop + thingEl.height;

                                //test if the laser collides with any boxes
                                for (var i = 0; i < boxes.length; i++) {
                                    var box = boxes[i];
                                    var boxDim = box.boxDim(box.getId());
                                    xOverlap = collides(boxDim.left, thingLeft, thingRight) || collides(thingLeft, boxDim.left, boxDim.right);
                                    yOverlap = collides(boxDim.top, thingTop, thingBottom) || collides(thingTop, boxDim.top, boxDim.bottom);
                                    if (xOverlap && yOverlap) {
                                        $("#" + box.getId() + "").addClass("remove");
                                        boxes.splice(i, 1);
                                    }
                                }
                            }, 1);
                            setTimeout(function() {
                                clearInterval(testCollision);
                            }, 1000);

                            //after done shooting, hide the thing
                            //THING ABSTRACTION
                            setTimeout(function() {
//                                var theThing = document.getElementById("thing");
                                theThing.style.visibility = "hidden";
                                shooting = false;
                            }, 1000);
                        }
                    } else {
                        //AVATAR ABSTRACTION
                        avatarPlaced = false;
                        shooting = true;
                        $("#" + avatar + "").removeClass("avatar");
                        $(this).addClass("avatar");
                        avatar = currentPosition;
                        avatarX = xPosition;
                        avatarY = yPosition;
                        avatarPlaced = true;
                        shooting = false;
                    }
                }
            }
            ;
        }
    }
    function setXLocation(obj, position) {
        return $(obj).hasClass("left") ?
                            $(obj).hasClass("laser") ? position.left + cellWidth * 2 : position.left + cellWidth * 2 - $("#thing").width() :
                            $(obj).hasClass("right") ? position.left :
                            position.left + cellWidth - $("#thing").width() / 2;
    }
    
    function setYLocation(obj, position) {
        return $(obj).hasClass("top") ?
                            $(obj).hasClass("laser") ? position.top + cellHeight * 2 : position.top + cellHeight * 2 - $("#thing").height() :
                            $(obj).hasClass("bottom") ? position.top :
                            position.top + cellHeight - $("#thing").height() / 2;
    }
    function collides(value, min, max) {
        return (value >= min) && (value <= max);
    }
    function checkLocation(laser) {
        return ($("#" + laser + "").hasClass("left") && $(".avatar").hasClass("left")) ? false :
                ($("#" + laser + "").hasClass("right") && $(".avatar").hasClass("right")) ? false :
                ($("#" + laser + "").hasClass("top") && $(".avatar").hasClass("top")) ? false :
                ($("#" + laser + "").hasClass("bottom") && $(".avatar").hasClass("bottom")) ? false : true;
    }

    $("#menu").click(function() {
        menuOverlay();
    });

}
;

function menu() { //this will bring the user back to the level screen so he can pick the next level
    document.write('<link rel="stylesheet" type="text/css" href="laserGate.css"/><div class="menu"><h1>Laser Gate</h1><table id="selector" cellspacing = "15" cellpadding = "10" id="a" align = "center">');
    var numRows = 6;
    var numColmns = 5;
    var blockId = 1;
    for (i = 0; i < numRows; i++) { //the menu table
        document.write('<tr id="row"' + i + '>');

        for (j = 0; j < numColmns; j++) {
            document.write("<td id= '" + blockId.toString() + "'>" + blockId.toString() + "</td>");
            blockId++;
        }
        ;
        document.write('</tr>');
    }
    ;
    document.write('</table></div>');

    $('#selector td').click(function() { //when you click on a <td> element it will get the id and use that to correlate with the level desired
        var id = $(this).attr('id');
        console.log("go to level " + id + "");
        $('.menu').html(''); //remove everything
        $('div').removeClass("menu");
        game(); //game(id) will be used with a next level function when there is a variety of levels
    });

}

function menuOverlay() {
    document.write('<div class="menuOverlay"><center><div id="OverlayOptions" align="center"><a id="menuClick" align="center"><h1><u>menu</u></h1></a><br><a id="restart" align="center"><h1><u>restart</u></h1></a></div></center></div>');
    $('#menuClick').click(function() {
        //this deletes the game()
        $('.laserGate').html('');
        $('#thing').remove();
        $('div').removeClass('laserGate');
        //this deletes the menuOverlay
        $('.menuOverlay').html('');
        $('div').removeClass('menuOverlay');
        menu();
    });
    $('#restart').click(function() {
        //this deletes the game()
        avatar = numRows.toString() + "_" + Math.floor(numCols / 2).toString(); //reset the avatar
        $('.laserGate').html('');
        $('#thing').remove();
        $('div').removeClass('laserGate');
        //this deletes the menuOverlay
        $('.menuOverlay').html('');
        $('div').removeClass('menuOverlay');
        game();
    });
}
;
