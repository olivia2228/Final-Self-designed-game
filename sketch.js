var bg, bgImage, bgImage2, gameState;
var marilyn, goal, goalImage;
var obstacleImage;
var wallGroup
var input, button, playerName
var edges
var marilynImg

function preload() {
  bgImage = loadImage("images/bg.gif");
  bgImage2 = loadImage("images/bg2.gif");
  goalImage = loadImage("images/goal.gif");
  obstacleImage = loadImage("images/obstacle.gif");
  marilynImg = loadImage("images/marilyn.png");
}

function setup() {
  createCanvas(400, 400);
  edges = createEdgeSprites()
  bg = createSprite(200, 200, 400, 400);
  bg.addImage("background", bgImage);
  bg.addImage("background2", bgImage2);
  bg.scale = 0.63;


  obstacleGroup = createGroup()
  wallGroup = createGroup()



  gameState = "start";

  input = createInput("").attribute("placeholder", "Enter your name");
  input.position(500, 200)
  button = createButton("SUBMIT")
  button.position(549, 240)
  button.class("startButton")

}

function draw() {
  background("yellow");

  button.mousePressed(() => {
    marilyn = createSprite(200, 380, 10, 10);
    marilyn.addImage("marilyn", marilynImg)
    marilyn.scale = 0.15
    marilyn.debug = true
    goal = createSprite(200, 30, 10, 10);
    goal.addImage("goal", goalImage);
    goal.scale = 0.1;
    //debugging required
    createObstacles();

    button.hide()
    input.hide()
    gameState = "play"
    playerName = input.value()

  })


  if (gameState === 'play') {
    if (marilyn.isTouching(obstacleGroup)) {
      gameState = "end";
    }
    text(playerName, 100, 100)
    if (marilyn.isTouching(goal)) {
      gameState = "world1";
      marilyn.x = 200;
      marilyn.y = 390;
    }
  }

  if (gameState === 'world1') {
    if (marilyn.isTouching(wallGroup)) {
      gameState = "end";
    }
    
  
  }

  drawSprites();

  if (gameState === "play" || gameState === "world1") {
    //debugging required
    textSize(15)
    fill("red")
    text(playerName, marilyn.x-30, marilyn.y - 30)
    marilynMovement();

  }

  if (gameState === "end") {
    textSize(30)
    fill("red")
    text("GAME OVER", 200-50, 200);
  }



  if (gameState === "world1") {
    bg.changeImage("background2", bgImage2);
    bg.scale = 2;
    obstacleGroup.destroyEach();
    textSize(50)
    createMazeWalls();
  }
}

//l45 (sketch)
//l58 (sketch)
//one more world to be added
//speed reduces in world1
//font positioning and size