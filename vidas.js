class vidas extends Phaser.GameObjects.Text {
    
    constructor(config)
    {
      super(config.scene, config.x, config.y, 'Vidas: 3', { fontSize: '32px', color: 'red' });
      config.scene.add.existing(this);
  
    }


           
  
}