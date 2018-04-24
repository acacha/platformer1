var level1 = {
  preload: function() {
    console.log('PRELOAD')

    game.load.image('wall','assets/wall.png')
    game.load.image('ground','assets/ground.png')

    game.load.spritesheet('player','assets/player.png', 28, 22)

  },
  create: function() {
    this.cursor = game.input.keyboard.createCursorKeys()

    this.loadLevel()

    this.player = game.add.sprite(250,50,'player')
    game.physics.arcade.enable(this.player)
    this.player.body.gravity.y = 600;
    this.player.animations.add('idle',[3,4,5,4], 5, true)

  },
  update: function() {
    // console.log('update')
    game.physics.arcade.collide(this.player,this.level);

    this.inputs()

    this.player.animations.play('idle')

  },
  render: function() {
    // console.log('render')
  },
  loadLevel() {
    this.level = game.add.group()
    this.level.enableBody = true;

    game.add.sprite(90,200/2-50,'wall',0,this.level)
    game.add.sprite(390,200/2-50,'wall',0,this.level)
    game.add.sprite(500/2-160,200/2 + 30 ,'ground',0,this.level)
    this.level.setAll('body.immovable', true)

  },
  inputs: function() {
    if (this.cursor.left.isDown) {
      this.player.body.velocity.x = -200
      this.player.frame = 2
    } else if (this.cursor.right.isDown) {
      this.player.body.velocity.x = 200
      this.player.frame = 1
    } else {
      this.player.body.velocity.x = 0
    }

    if (this.cursor.up.isDown) {
      if (this.player.body.touching.down)
        this.player.body.velocity.y = -500
      }
    }
}

var game = new Phaser.Game(500,200,Phaser.AUTO,'game')

game.state.add('level1',level1)
game.state.start('level1')