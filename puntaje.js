class puntaje extends Phaser.GameObjects.Text {
    
        constructor(config)
        {
          super(config.scene, config.x, config.y, 'Puntaje: 0', { fontSize: '32px', color: 'red' });
          config.scene.add.existing(this);
      
        }


               
      
}