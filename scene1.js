var Breakout = new Phaser.Class({

  Extends: Phaser.scene1,

  initialize:

  function Breakout ()
  {
      Phaser.Scene.call(this, { key: 'breakout' });

      this.bricks;
      this.paddle;
      this.ball;
  },

  preload: function ()
  {
      this.load.atlas('assets', 'assets/atlasArkanoid.png', 'assets/atlasArkanoid.json');
  },

  create: function ()
  {

    this.starfield =  this.add.tileSprite( 400,350,500, 350, 'assets', 'fondo2').setScale(2);
      //  Enable world bounds, but disable the floor
      this.physics.world.setBoundsCollision(true, true, true, false);

      //  Create the bricks in a 10x6 grid
      this.bricks = this.physics.add.staticGroup({
        setScale: {x: 1, y: 1 },
          key: 'assets', frame: [ /*'bloqueRojo2', 'bloqueVerde2', 'bloqueAmarillo2', 'bloqueGris2',*/ 'bloqueVioleta2' ],
          frameQuantity: 8,
          gridAlign: { width: 8, height: 6, cellWidth: 80, cellHeight: 40, x: 100, y: 100 }
        
      });
            

      this.ball = this.physics.add.image(400, 525, 'assets', 'bola').setCollideWorldBounds(true).setBounce(1).setScale(.2);
      this.ball.setData('onPaddle', true);

      this.paddle = this.physics.add.image(400, 550, 'assets', 'barra').setImmovable().setScale(0.2);

      //  Our colliders
      this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
      this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

      //  Input events
      this.input.on('pointermove', function (pointer) {

          //  Keep the paddle within the game
          this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

          if (this.ball.getData('onPaddle'))
          {
              this.ball.x = this.paddle.x;
          }

      }, this);

      this.input.on('pointerup', function (pointer) {

          if (this.ball.getData('onPaddle'))
          {
              this.ball.setVelocity(-75, -300);
              this.ball.setData('onPaddle', false);
          }

      }, this);
  },

  hitBrick: function (ball, brick)
  {
      brick.disableBody(true, true);

      if (this.bricks.countActive() === 0)
      {
        this.scene.start('scene2');
      }
  },

  resetBall: function ()
  {
      this.ball.setVelocity(0);
      this.ball.setPosition(this.paddle.x, 525);
      this.ball.setData('onPaddle', true);
  },

  resetLevel: function ()
  {
      this.resetBall();

      this.bricks.children.each(function (brick) {

          brick.enableBody(false, 0, 0, true, true);

      });
  },

  hitPaddle: function (ball, paddle)
  {
      var diff = 0;

      if (ball.x < paddle.x)
      {
          //  Ball is on the left-hand side of the paddle
          diff = paddle.x - ball.x;
          ball.setVelocityX(-10 * diff);
      }
      else if (ball.x > paddle.x)
      {
          //  Ball is on the right-hand side of the paddle
          diff = ball.x -paddle.x;
          ball.setVelocityX(10 * diff);
      }
      else
      {
          //  Ball is perfectly in the middle
          //  Add a little random X to stop it bouncing straight up!
          ball.setVelocityX(2 + Math.random() * 8);
      }
  },

  update: function ()
  {
      if (this.ball.y > 600)
      {
          this.resetBall();
      }
  }

});

var config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  parent: 'phaser-example',
  scene: [ Breakout ],
  physics: {
      default: 'arcade',
        arcade: {
          debug: false
  }
}
};

var game = new Phaser.Game(config);