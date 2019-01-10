var strikeSound;
var correctAnswerSound;
var cheerSound;
var strikeNum = 0;
var teamPointsDict = {};
var teamName = "";
var teamsDecided = false;
var wCanvas = 900;
var hCanvas = 600;
var answerArrayTF = [false, false, false, false, false, false, false, false];;
var answerArrayWords;
var scoreArray = [100, 70, 50, 30, 20, 15, 10, 5];
var teamIncScore = -1;
var questionNum = 0;
var questionAnswerArray = [["Java", "Python", "C", "C++", "PHP", "Javascipt", "Ruby", "C#"],
                          ["Apple", "Amazon", "Alphabet", "Microsoft", "Facebook", "Alibaba"],
                          ["Drake", "Post Malone", "Ed Sheeran", "Taylor Swift", "Cardi B", "XXXTentacion", "Imagine Dragons", "BTS"],
                          ["Youtube", "Instagram", "Snapchat", "Amazon", "Messenger", "TikTok", "Gmail", "Facebook"],
                          ["Youtube Rewind", "Baby", "It's Everyday Bro", "Call of Duty Trailer", "Can This Video Get 1Million Dislikes?", "Despacito", "Friday"],
                          ["Business Administration", "Mechanical Engineering", "Biology", "Animal Science", "Civil Engineering", "Architecture"], 
                          ["Mandarin Chinese", "Spanish", "English", "Hindi", "Arabic", "Portugese", "Bengali", "Russian"],
                          ["English Language", "US History", "English Literature", "Calculus AB", "US Government", "Psychology", "World History", "Biology"],
                          ["Facebook", "Youtube", "Amazon", "Gmail", "Google", "Ebay", "Yahoo", "Craigslist"],
                          ["the", "be", "to", "of", "and", "a", "in", "that"],
                          ["China", "India", "USA", "Indonesia", "Brazil", "Pakistan"],
                          ["Crayons", "Beads", " French Fries", "Fingers", "Marbles", "Tissues", "Cheerios", "Legos"],
                          ["Hydrogen", "Helium", "Oxygen", "Carbon", "Neon", "Iron", "Nitrogen", "Silicon"],
                          ["Mexico", "Colombia", "Spain", "Argentina", "USA", "Venezuela", "Peru", "Chile"],
                          ["Toyota", "General Motors", "Voltswagon", "Nissan", "Hyundai-Kia", "Ford"],
                          ["New York", "LA", "Chicago", "Houston", "Philadelphia", "Phoenix", "San Antonio", "San Diego"],
                          ["Guitar", "Drum", "Bass", "Piano", "Saxophone", "Synthesizer", "Harmonica"],
                          ["The Lion King", "Beauty and the Beast", "Aladdin", "The Little Mermaid", "Toy Story", "Finding Nemo", "Pirates of the Caribbean", "Up"],
                          ["Elephant", "Rhinoceros", "Hippopotamus", "Giraffe", "Walrus", "Crocodile", "Buffalo"],
                          ["Jacob", "Joshua", "Joseph", "James", "John", "Jonathan", "Justin", "Jose"]
                          ];

function preload() {
  strikeSound = loadSound("StrikeSFX.mp3");
  correctAnswerSound = loadSound("CorrectSFX.mp3");
  cheerSound = loadSound("CheerSFX.mp3");
}

function setup() {
  noLoop();
  answerArrayWords = questionAnswerArray[0];
  var canvas = createCanvas(wCanvas, hCanvas+500);
  canvas.parent("q1");
  drawBackground(false);
  drawAnswersBoard(answerArrayTF);
  drawTeamScores(teamPointsDict);
  textAlign(CENTER, CENTER);

  // Prompts for Team Names
  fill(255);
  stroke(0);
  strokeWeight(1);
  rect(wCanvas/2, hCanvas/2, 520, 60);
  textSize(30);
  fill(100);
  textAlign(CENTER, CENTER);
  text("Type Team Name", wCanvas/2, hCanvas/2);
}

function drawBackground(lightsTF) {

  background(100, 150, 255);

  // Small Repeated Circle Lights
  strokeWeight(1);
  fill(255, 255, 0);
  for (x=0; x<wCanvas; x+=20) {
    for (y=0; y<hCanvas; y+=20) {
      if (inCircle(wCanvas/2, 3*hCanvas/4, 470, x, y)){
        strokeWeight(2);
        stroke(155, 50, 0);
        if (lightsTF) {
          strokeWeight(4);
          stroke(255, 255, 0);
        }
        ellipse(x, y, 6);
      }
    }
  }

  // Outer Circle Frame
  noFill();
  strokeWeight(2);
  stroke(100, 20, 100);
  arc(wCanvas/2, 3*hCanvas/4, 1030, 930, PI, 0);
  strokeWeight(12);
  stroke(150, 110, 100);
  arc(wCanvas/2, 3*hCanvas/4, 1017, 917, PI, 0);

  stroke(255, 255, 0);
  arc(wCanvas/2, 3*hCanvas/4, 992, 892, PI, 0);
  strokeWeight(2);
  stroke(100, 20, 0);
  arc(wCanvas/2, 3*hCanvas/4, 1005, 905, PI, 0);

  strokeWeight(15);
  stroke(150, 110, 100);
  arc(wCanvas/2, 3*hCanvas/4, 965, 865, PI, 0);
  strokeWeight(2);
  stroke(100, 20, 0);
  arc(wCanvas/2, 3*hCanvas/4, 980, 880, PI, 0);
  stroke(100, 20, 0);
  arc(wCanvas/2, 3*hCanvas/4, 949, 849, PI, 0);

  // Small Rectangle Frame
  rectMode(CENTER);
  stroke(100, 20, 100);
  fill(150, 110, 100);
  rect(wCanvas/2, 7*hCanvas/38, 215, 140, 15)
  noStroke();
  fill(40, 70, 255);
  rect(wCanvas/2, 7*hCanvas/38, 195, 120, 15)
  drawQuestionNum();


  // Large Rectangle Frame
  stroke(100, 20, 100);
  fill(150, 110, 100);
  rect(wCanvas/2, 13*hCanvas/20, 710, 410, 20)
  fill(255, 255, 0);
  rect(wCanvas/2, 13*hCanvas/20, 700, 400, 20)
  fill(150, 110, 100);
  rect(wCanvas/2, 13*hCanvas/20, 680, 380, 20)
  fill(0);
  noStroke();
  rect(wCanvas/2, 13*hCanvas/20, 650, 350);

  // Help Button
  fill(250);
  ellipse(wCanvas-30, 30, 30);
  fill(0);
  textSize(20);
  text("?", wCanvas-30, 30);
}

function checkWin() {
  var answerNum = 0;
  while (answerArrayTF[answerNum] && answerNum <= answerArrayWords.length) {
    answerNum++;
  }
  if (answerNum >= answerArrayWords.length) {
    // fix bug with new question causing cheers
    cheerSound.play();
    drawBackground(true);
    drawAnswersBoard(answerArrayTF);
    drawTeamScores(teamPointsDict);
  }
}

function keyPressed() {
  // s -> strike
  // e -> back to board
  // > -> next question
  // < -> previous question

  // Deciding team names in beginning
    // Enter -> Indicating end of team name
    // ; -> Finalize all team names / Start game
  if (!teamsDecided) {
    if (key == "Enter") {
      teamPointsDict[teamName] = 0;
      teamName = "";
      drawBackground(false);
      drawAnswersBoard(answerArrayTF);
      drawTeamScores(teamPointsDict);
      // Draws box to print name in
      fill(255);
      stroke(0);
      strokeWeight(1);
      rect(wCanvas/2, hCanvas/2, 520, 60);
    }
    else if (key == ";") {
      teamsDecided = true;
      drawBackground(false);
      drawAnswersBoard(answerArrayTF);
      drawTeamScores(teamPointsDict);
    }
    else {
      // Updates team name
      if (key == "Backspace") {
        teamName = teamName.substring(0, teamName.length - 1);
      }
      else if (key != "Shift"){
        teamName += key;
      }


      drawBackground(false);
      drawAnswersBoard(answerArrayTF);
      drawTeamScores(teamPointsDict);
      // Draws box to print name in
      fill(255);
      stroke(0);
      strokeWeight(1);
      rect(wCanvas/2, hCanvas/2, 520, 60);
      // Writes team name out
      textSize(40);
      fill(0);
      textAlign(CENTER, CENTER);
      text(teamName, wCanvas/2, hCanvas/2);
    }
    if (teamName.length == 0 && key != ";") {
      textSize(30);
      fill(100);
      textAlign(CENTER, CENTER);
      text("Type Team Name", wCanvas/2, hCanvas/2);
    }
  }

  else {
    if ("12345678".includes(key) && teamIncScore == -1) {
      correctAnswerSound.play();
    }
    if (teamIncScore == -1) {
      switch(key) {
        case "s":
          strikeNum += 1;
          printStrikes(strikeNum%4);
          strikeSound.play();
          break;
        case "e":
          drawBackground(false);
          drawAnswersBoard(answerArrayTF);
          drawTeamScores(teamPointsDict);
          break;
        case ">":
          questionNum += 1;
          if (questionNum >= questionAnswerArray.length){
            drawWinners(teamPointsDict);
            exit();
          }
          strikeNum = 0;
          answerArrayTF = [false, false, false, false, false, false, false, false];
          answerArrayWords = questionAnswerArray[questionNum];
          drawBackground(false);
          drawAnswersBoard(answerArrayTF);
          drawTeamScores(teamPointsDict);
          break;
        case "<":
          questionNum -= 1;
          strikeNum = 0;
          answerArrayTF = [false, false, false, false, false, false, false, false];
          answerArrayWords = questionAnswerArray[questionNum];
          drawBackground(false);
          drawAnswersBoard(answerArrayTF);
          drawTeamScores(teamPointsDict);
          break;
        case "1":
          answerArrayTF[0] = !answerArrayTF[0];
          drawAnswersBoard(answerArrayTF);
          break;
        case "2":
          answerArrayTF[1] = !answerArrayTF[1];
          drawAnswersBoard(answerArrayTF);
          break;
        case "3":
          answerArrayTF[2] = !answerArrayTF[2];
          drawAnswersBoard(answerArrayTF);
          break;
        case "4":
          answerArrayTF[3] = !answerArrayTF[3];
          drawAnswersBoard(answerArrayTF);
          break;
        case "5":
          answerArrayTF[4] = !answerArrayTF[4];
          drawAnswersBoard(answerArrayTF);
          break;
        case "6":
          answerArrayTF[5] = !answerArrayTF[5];
          drawAnswersBoard(answerArrayTF);
          break;
        case "7":
          answerArrayTF[6] = !answerArrayTF[6];
          drawAnswersBoard(answerArrayTF);
          break;
        case "8":
          answerArrayTF[7] = !answerArrayTF[7];
          drawAnswersBoard(answerArrayTF);
          break;
        default:
          break;
      }
      if ("12345678".includes(key) && teamIncScore == -1){
        checkWin();
      }
    }
    else {
      // add points according to what team
      var numToScoreDict = {"1":100, "2":70, "3":50, "4":30, "5":20, "6":15, "7":10, "8":5};
      if ("12345678".includes(key)){
        teamPointsDict[teamIncScore] += numToScoreDict[key];
      }
      else if (key == "`") {
        teamIncScore = -1;
      }
      drawTeamScores(teamPointsDict);
    }

    var addPointsKeys = "!@#$%^&*()_+";
    var subPointsKeys = "QWERTYUIOP{}";

    // Signal Increase Score
    if (addPointsKeys.includes(key)) {
      var idxAdd = 0;
      teamIncScore = true;
      // Decide which team to increase score of
      for (var team in teamPointsDict) {
        if (key == addPointsKeys[idxAdd]) {
          teamIncScore = team;
        }
        idxAdd++;
      }
      drawTeamScores(teamPointsDict);
    }

    // Decrease Score
    else if (subPointsKeys.includes(key)) {
      var idxSub = 0;
      for (var team in teamPointsDict) {
        if (key == subPointsKeys[idxSub]) {
          teamPointsDict[team] -= 10;
        }
        idxSub++;
      }
      drawTeamScores(teamPointsDict);
    }


  }
  drawTeamNameCheat()
}

function mousePressed() {
  var questionButton = 30 > dist(mouseX, mouseY, wCanvas-30, 30);
  if (questionButton) {
    drawCheatSheet();
  }
}

function drawAnswersBoard(answerArrayTrueFalse) {
  stroke(150);
  strokeWeight(7);
  var posX = wCanvas/2-161;
  var posY = 9*hCanvas/20-10;
  for (i=0; i<answerArrayWords.length; i++) {
    if (i > 3) {
      posX = wCanvas/2+161;
    }
    if (i % 4 == 0) {
      posY = 9*hCanvas/20-10;
    }
    else if (i % 4 == 1) {
      posY = 12*hCanvas/20-14;
    }
    else if (i % 4 == 2) {
      posY = 15*hCanvas/20-18;
    }
    else if (i % 4 == 3) {
      posY = 18*hCanvas/20-22;
    }
    answerFill(posX, posY, answerArrayTrueFalse[i], i);
  }
}

function answerFill(positionX, positionY, answerGuessed, answerNum) {
  if (answerGuessed) {
    // Darker Rectangle
    fill(40, 70, 255);
    rect(positionX, positionY, 310, 73);

    // Answer Values
    fill(50, 90, 240);
    rect(positionX+118, positionY, 73, 73)
    if (answerArrayWords[answerNum].length > 24) {
      textSize(12);
    }
    else if (answerArrayWords[answerNum].length > 12) {
      textSize(20);
    }
    else {
      textSize(30);
    }
    fill(250);

    // Answer
    noStroke();
    text(answerArrayWords[answerNum], positionX-40, positionY+4);

    // Score
    textSize(30);
    stroke(100);
    strokeWeight(2);
    text(scoreArray[answerNum], positionX+118, positionY);
  }
  else {
    fill(70, 100, 255);
    rect(positionX, positionY, 310, 73);
  }
  stroke(150);
  strokeWeight(7);
}

function drawQuestionNum() {
  textAlign(CENTER, CENTER);
  textSize(60);
  fill(250);
  noStroke();
  text(questionNum+1, wCanvas/2, 7*hCanvas/38);
}

function printStrikes(numOfStrikes) {
  noFill();
  strokeWeight(12);
  stroke(255, 0, 0);
  textSize(350);
  if (numOfStrikes == 1) {
    rect(wCanvas/2, hCanvas/2, 250, 300);
    fill(255, 0, 0);
    text("X", wCanvas/2, hCanvas/2+30);
  }
  else if (numOfStrikes == 2) {
    rect(wCanvas/3, hCanvas/2, 250, 300);
    rect(2*wCanvas/3, hCanvas/2, 250, 300);
    fill(255, 0, 0);
    text("X", wCanvas/3, hCanvas/2+30);
    text("X", 2*wCanvas/3, hCanvas/2+30);
  }
  else if (numOfStrikes == 3) {
    rect(wCanvas/2, hCanvas/2, 250, 300);
    rect(wCanvas/4-50, hCanvas/2, 250, 300);
    rect(3*wCanvas/4+50, hCanvas/2, 250, 300);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    text("X", wCanvas/2, hCanvas/2+30);
    text("X", wCanvas/4-50, hCanvas/2+30);
    text("X", 3*wCanvas/4+50, hCanvas/2+30);
  }
}

// For lights in circle frame
function inCircle(cx, cy, radius, x, y) {
  var result = ((x-cx)*(x-cx) + (y-cy)*(y-cy)-radius*radius);
  if (result < 0) {
    return true;
  }
  else {
    return false;
  }
}

// Team Scores
function drawTeamScores(teamPoints) {
  noStroke();
  fill(150, 110, 100);
  rect(wCanvas/2, hCanvas+500, wCanvas, 1000);
  fill(255);
  textAlign(CENTER, CENTER);
  var xTextPos = wCanvas/4;
  var yTextPos = hCanvas+50;
  var teamNum = 0;
  var idx = 0;

  // Sort Teams by Point Amounts
  var orderedTeams = [];
  for (var key in teamPoints) {
    idx = 0;
    while (idx<=orderedTeams.length && !orderedTeams.includes(key)) {
      if (orderedTeams.length == 0) {
        orderedTeams.push(key);
      }
      else if (orderedTeams.length > idx && !orderedTeams.includes(key) && teamPoints[orderedTeams[idx]] < teamPoints[key]) {
        orderedTeams.splice(idx, 0, key);
      }
      else if (idx == orderedTeams.length) {
        orderedTeams.push(key);
      }
      idx++;
    }
  }

  // Print each team and score
  for (i=0; i<orderedTeams.length; i++) {
    textSize(20);
    // Sets X Position
    if (teamNum%3 == 0) {
      xTextPos = wCanvas/5;
    }
    else if (teamNum%3 == 1) {
      xTextPos = wCanvas/2;
    }
    else {
      xTextPos = 4*wCanvas/5;
    }

    // Sets Y Position
    if (teamNum%3 == 0 && i != 0) {
      yTextPos += 125;
    }

    text(orderedTeams[i], xTextPos, yTextPos);
    textSize(40);
    text(teamPoints[orderedTeams[i]], xTextPos, yTextPos+40);
    teamNum++;
  }
}

// Print Cheat Sheet for which team is which
function drawTeamNameCheat() {
  var addPointsKeys = "!@#$%^&*()_+";
  var cheatNameString = "";
  var idx = 0;
  textSize(15);
  fill(250);
  noStroke();
  for (var team in teamPointsDict) {
    if (idx != 0) {
      cheatNameString += "      "
    }
    cheatNameString += (team+": "+addPointsKeys[idx])
    idx++;
  }

  text(cheatNameString, wCanvas/2, hCanvas+470);
}

function drawWinners(teamPoints) {
  fill(0);
  rect(wCanvas/2, hCanvas/2+250, wCanvas, hCanvas+500);

  // Sort Teams by Point Amounts
  var orderedTeams = [];
  for (var key in teamPoints) {
    idx = 0;
    while (idx<=orderedTeams.length && !orderedTeams.includes(key)) {
      if (orderedTeams.length == 0) {
        orderedTeams.push(key);
      }
      else if (orderedTeams.length > idx && !orderedTeams.includes(key) && teamPoints[orderedTeams[idx]] < teamPoints[key]) {
        orderedTeams.splice(idx, 0, key);
      }
      else if (idx == orderedTeams.length) {
        orderedTeams.push(key);
      }
      idx++;
    }
  }

  textAlign(CENTER, CENTER);
  fill(255, 255, 0);
  textSize(50);
  text("Part One Standings:", wCanvas/2, hCanvas/3-100);
  textSize(80);
  text("1. "+orderedTeams[0]+"  ["+teamPoints[orderedTeams[0]]+"]", wCanvas/2, hCanvas/3);

  textSize(60);
  text("2. "+orderedTeams[1]+"  ["+teamPoints[orderedTeams[1]]+"]", wCanvas/2, hCanvas/3+100);

  for(i=3; i<orderedTeams.length; i++) {
    textSize(60-i*5);
    text(i+". "+orderedTeams[i]+"   ["+teamPoints[orderedTeams[i]]+"]", wCanvas/2, hCanvas/3+25+i*50);
  }

}

function drawCheatSheet() {
  fill(250);
  noStroke();
  rect(wCanvas/2, 2*hCanvas/3-20, 600, 600, 30);
  fill(10, 40, 155);
  strokeWeight(2);
  stroke(0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("How to Play", wCanvas/2, hCanvas/4-10);
  noStroke();
  textSize(17);
  textAlign(LEFT, CENTER);
  text("Choosing Team Names:", wCanvas/5, 3*hCanvas/10+20);
  textSize(13);
  text("Type name out on keyboard. Press ENTER to type the next name.", wCanvas/4-20, 3*hCanvas/10+50);
  text("Press ';' to finalize teams.", wCanvas/4-20, 3*hCanvas/10+70);

  textSize(17);
  text("Answering and Strikes:", wCanvas/5, 4*hCanvas/10+50);
  textSize(13);
  text("Press numbers 1-8 to reveal the corresponsding answer.", wCanvas/4-20, 4*hCanvas/10+80);
  text("Press 's' to give a strike. Press 'e' to erase the strike from the screen.", wCanvas/4-20, 4*hCanvas/10+100);

  textSize(17);
  text("Awarding Points:", wCanvas/5, hCanvas/2+80);
  textSize(13);
  text("The symbol next to each team at the bottom indicates the key to press to award points.", wCanvas/4-20, hCanvas/2+110);
  text("Press the corresponding key then the answer number they guessed correctly.", wCanvas/4-20, hCanvas/2+130);
  text("The team will be awarding the corresponding points.", wCanvas/4-20, hCanvas/2+150);
  text("Signal you have finished awarding points for that team by pressing '`'.", wCanvas/4-20, hCanvas/2+170);
  text("The key on the keyboard directly to the lower right of the team symbol decreases score.", wCanvas/4-20, hCanvas/2+190);
  text("For example, the team corresponding to '#' will receive -5 points by pressing 'E'.", wCanvas/4-20, hCanvas/2+210);

  textSize(17);
  text("Navigating:", wCanvas/5, 8*hCanvas/10+70);
  textSize(13);
  text("Press '<' to go to the previous question.", wCanvas/4-20, 8*hCanvas/10+100);
  text("Press '>' to go to the next question.", wCanvas/4-20, 8*hCanvas/10+120);

  textAlign(CENTER, CENTER);
  text("Press 'e' to exit", wCanvas/2, hCanvas+40);
}
