var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = window.createjs;

  window.opspark.runLevelInGame = function (game){
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    window.levelData = levelData;

    for (var i = 0; i < levelData.gameItems.length; i++) {
      var eachItem = levelData.gameItems[i];
      if (eachItem.type === "sawBlade") {
        createSawBlade(550, 350);
          createSawBlade(340, 500);
          createSawBlade(600, 700);
          createSawBlade(800, 450);
        }
      if (eachItem.type === "brokenHeart") {
        brokenHeart(400, 350);
        brokenHeart(500, 400);
      }
      if (eachItem.type === "enemy") {
        createEnemy(800, groundY - 500);
        createEnemy(1500, groundY - 450);
        createEnemy(2000, groundY - 400);
      }
      if (eachItem.type === "reward") {
        createReward(700, groundY - 450);
        createReward(2000, groundY - 400);
      }
    };

    var levelData = {
      name: "Robot Romp",
      number: 1,
      speed: -3,
      gameItems: [
        { type: "sawBlade", x: 550, y: 350 },
        { type: "sawBlade", x: 340, y: 500 },
        { type: "sawBlade", x: 600, y: 700 },
        { type: "brokenHeart", x: 400, y: 350 },
        { type: "brokenHeart", x: 500, y: 400 },
        { type: "enemy", x: 800, groundY: - 500 },
        { type: "enemy", x: 1500, groundY: - 450 },
        { type: "enemy", x: 2000, groundY: - 400 },
        { type: "reward", x: 700, groundY: - 450 },
        { type: "reward", x: 2000, groundY: - 400 },
      ],
    };

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x, y) {

      var hitZoneSize = 25; 
      var damageFromObstacle = 10; 
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);

      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);

      var obstacleImage = draw.bitmap("img/sawblade.png");
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.x = -25;
      obstacleImage.y = -25;

    }
    createSawBlade (550, 350);
    createSawBlade (340, 500);
    createSawBlade (600, 700);
    createSawBlade (800, 450);

    function brokenHeart (x, y) {
      var hitZoneSize= 25; 
      var damageFromObstacle = 15;
      var brokenHeartHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);

      brokenHeartHitZone.x = x;
      brokenHeartHitZone.y = y;
      game.addGameItem(brokenHeartHitZone);

      var obstacleImage = draw.bitmap("img/brokenheart.png");
      brokenHeartHitZone.addChild(obstacleImage);
      obstacleImage.x = -25;
      obstacleImage.y = -25;

    }

    brokenHeart (400, 350);
    brokenHeart (500, 400);

    function createEnemy (x, y) {
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.bitmap("img/patrick.png");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);

      enemy.x = x;
      enemy.y = groundY - y;

      game.AddGameItem(enemy);

      enemy.velocityX = -1;
      enemy.rotationVelocity = 2;

      enemy.onPlayerCollision = function () {

        game.changeIntegrity(-10)
      };

      enemy.onProjectCollision = function () {

        game.increaseScore(100);
        enemy.fadeOut();
      }
      
    }

      createEnemy(800, groundY - 500);
      createEnemy(1500, groundY - 450);
      createEnemy(2000, groundY - 400);

    function createReward (x, y) { 

      var reward = game.createGameItem("enemy", 25);
      var kitty = draw.bitmap("img/chococat.png");
      kitty.x = -25;
      kitty.y = -25;
      reward.addChild(kiity);

      reward.x = x;
      reward.y = groundY - y;

      game.addGameItem(reward);

      reward.velocityX = -1;
      reward.rotationVelocity = 2;

      reward.onPlayerCollision = function() {
        
        game.changeIntegrity(+50)
        game.increaseScore(500);
        reward.fadeOut();
      };
    }

    createReward(700, groundY - 450);
    createReward(2000, groundY - 400);
    
    function startLevel() {
      
      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
