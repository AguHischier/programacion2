class scene1 extends Phaser.Scene {
    constructor() {
        super('scene1');
    }


    
    preload() {
        this.load.image('ground_1x1'    , 'assets/ground_1x1.png');
        
        
        
        this.load.atlas('assets', './assets/atlasArkanoid.png', './assets/atlasArkanoid.json');


        this.load.tilemapTiledJSON('map', 'assets/tile.json');
      
    }

    create() {
       // creacion del mapa
        map = this.make.tilemap({ key: 'map' });
        var groundTiles = map.addTilesetImage('ground_1x1');
        
        
        map.createDynamicLayer('Background Layer', groundTiles, 0, 0);
        var groundLayer  = map.createDynamicLayer('Ground Layer', groundTiles, 0, 0);        
            
        var mapLayer   = map.createDynamicLayer('map Layer', groundTiles, 0, 0);        
      
        mapLayer.setCollisionBetween(1, 25);
        groundLayer.setCollisionBetween(1, 25);

        this.physics.world.setBoundsCollision(true, true, true, false);


        // grupo de bloques
        this.bricks = this.physics.add.staticGroup({
            setScale: {x: 1, y: 1 },
              key: 'assets', frame: [ 'bloqueRojo2', 'bloqueVerde2', 'bloqueAmarillo2' ],
              frameQuantity: 8,
              gridAlign: { width: 8, height: 6, cellWidth: 80, cellHeight: 40, x: 135, y: 100 }
            
          });

          // agregamos la bola y paleta
        this.ball = this.physics.add.image(400, 545, 'assets', 'bola').setCollideWorldBounds(true).setBounce(1).setScale(.2);
        this.ball.setData('onPaddle', true);

        this.paddle = this.physics.add.image(400, 575, 'assets', 'barra').setImmovable().setScale(0.2);
        

         //  Colisiones
         this.physics.add.overlap(this.ball, this.bricks, this.hitBrick, null, this);
         this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);
         this.physics.add.collider(this.ball, mapLayer);
         this.physics.add.collider(this.ball, groundLayer);
         this.physics.add.collider(this.paddle, groundLayer); // NO ME ANDA!


         //  Input events
         
         this.input.on('pointermove', function (pointer) {

        //  Keep the paddle within the game
        this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);


        // Comprobamos si la pelota esta en la paleta y hacemos que la siga
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



    // Score
    text = new puntaje ({scene:this, x:44, y: 30})
    text2 = new vidas ({scene:this, x:600, y: 30})
   
    }

  
    update()
    {

        // Comprobamos si la pelota se va del mapa
     if (this.ball.y > 600)
     {
         this.resetBall();
         scorevidas--;
         text2.setText('Vidas: ' + scorevidas);
     }

     // Cuando las vidas llegan a 0, se resetea el nivel
    if (scorevidas === 0){
        
        this.resetBall();

      this.bricks.children.each(function (brick) {

          brick.enableBody(false, 0, 0, true, true);

      });
      scorevidas = 3;
      text2.setText('Vidas: ' + scorevidas);
      score = 0;
      text.setText('Puntaje: ' + score);
    }

    }
    
    



// Funcion para romper el bloque
 hitBrick (ball, assets)
  {
      assets.disableBody(true, true);


      this.bricks.children.each(function (brick) {

        

    });
      
      
    score+=10;
          
    text.setText('Puntaje: ' + score);


    // Cuando no quedan bloques pasamos a la escena 2
      if (this.bricks.countActive() === 0)
      {
        //this.resetLevel();
        this.scene.start('scene2');
      }
  }
// Funcion de resetear la bola
 resetBall ()
  {
      this.ball.setVelocity(0);
      this.ball.setPosition(this.paddle.x, 545);
      this.ball.setData('onPaddle', true);
  }
// Funcion de resetear el nivel
 resetLevel ()
  {
      this.resetBall();

      this.bricks.children.each(function (brick) {

          brick.enableBody(false, 0, 0, true, true);

      });
  }
// Funcion para comprobar en que parte de la paleta pega la bola
 hitPaddle(ball, paddle)
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
  }


  
}