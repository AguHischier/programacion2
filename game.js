var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 200 },
            debug: false
        }
    },
    
    scene: [scene1, scene2]
};

var game = new Phaser.Game(config);

var map;
var cursors;

var scoretext;
var text;
var text2;



var bricks;
var ball;
var teclas;
var paddle1;

var score = 0;
var scorevidas = 3;