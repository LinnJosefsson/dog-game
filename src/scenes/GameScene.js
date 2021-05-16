import Phaser from 'phaser';

let score = 0;
let scoreText;

const createLooped = (scene, totalWidth, texture, scrollFactor) => {
  const w = scene.textures.get(texture).getSourceImage().width;

  const count = Math.ceil(totalWidth / w) * scrollFactor;

  let x = 0;
  for (let i = 0; i < count; ++i) {
    const m = scene.add
      .image(x, scene.scale.height, texture)
      .setOrigin(0, 1)
      .setScrollFactor(scrollFactor);

    x += m.width;
  }
};

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('sky', 'src/assets/sky.png');
    this.load.image('mountain', 'src/assets/mountains.png');
    this.load.image('plateau', 'src/assets/plateau.png');
    this.load.image('ground', 'src/assets/ground.png');
    this.load.image('plant', 'src/assets/plant.png');
    this.load.image('banana', 'src/assets/banana.png');
    this.load.image('banana-sm', 'src/assets/banana-sm.png');
    this.load.image('strawberry', 'src/assets/strawberry.png');
    this.load.image('vacuum', 'src/assets/vacuum-cleaner.png');
    this.load.spritesheet('dog', 'src/assets/dog1.png', {
      frameWidth: 111,
      frameHeight: 103,
    });
    this.load.spritesheet('dogleft', 'src/assets/dogleft.png', {
      frameWidth: 111,
      frameHeight: 103,
    });
    this.load.spritesheet('jump', 'src/assets/jump.png', {
      frameWidth: 111,
      frameHeight: 103,
    });
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 10; //width * width om vi vill göra det infinite
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0);

    createLooped(this, totalWidth, 'mountain', 0.25);
    createLooped(this, totalWidth, 'plateau', 0.5);
    createLooped(this, totalWidth, 'ground', 1);
    createLooped(this, totalWidth, 'plant', 1.25);

    //2 olika group: static eller inte, vilken ska vi ha?

    //Banana med group

    this.bananas = this.physics.add.group({
      key: 'banana-sm',
      repeat: 6,
      setXY: { x: 12, y: 635, stepX: 350 },
    });

    Phaser.Actions.Call(this.bananas.getChildren(), function (banana) {
      banana.body.allowGravity = false;
      banana.body.immovable = true;
    });

    //Strawberry med static group

    const strawberry = this.physics.add.staticGroup();
    strawberry
      .create(width / 7, 615, 'strawberry')
      .setScale(0.03)
      .refreshBody();
    strawberry
      .create(width * 1.5, 615, 'strawberry')
      .setScale(0.04)
      .refreshBody();
    strawberry
      .create(width * 2.5, 615, 'strawberry')
      .setScale(0.02)
      .refreshBody();

    //Vacuum med static group

    const vacuum = this.physics.add.staticGroup();
    vacuum
      .create(width / 1.5, 615, 'vacuum')
      .setScale(0.05)
      .refreshBody();
    vacuum
      .create(width * 1.8, 615, 'vacuum')
      .setScale(0.04)
      .refreshBody();
    vacuum
      .create(width * 2.2, 615, 'vacuum')
      .setScale(0.02)
      .refreshBody();

    //Corgi
    let player;
    this.player = this.physics.add.sprite(width * 0.5, height * 0.5, 'dog');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 160);

    this.anims.create({
      key: 'idle',
      frames: [{ key: 'dog', frame: 2 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dogleft', { start: 1, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dog', frame: 2 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dog', { start: 2, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    //skapade funktion isället

    /*  const m = this.add
      .image(0, height, "mountain")
      .setOrigin(0, 1)
      .setScrollFactor(0.25);

    this.add
      .image(m.width, height, "mountain")
      .setOrigin(0, 1)
      .setScrollFactor(0.25); 

    this.add.image(0, height, "plateau").setOrigin(0, 1).setScrollFactor(0.5);

    this.add.image(0, height, "ground").setOrigin(0, 1).setScrollFactor(1);
    this.add.image(0, height, "plant").setOrigin(0, 1).setScrollFactor(1.25);*/

    //this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);

    this.cameras.main.setBounds(0, 0, width * 3, height);
    this.cameras.main.startFollow(this.player);

    let backText = this.add.text(width * 2, 10, 'Back to main', {
      font: '25px Arial Black',
      fill: '#173f5f',
      backgroundColor: '#f6d55c',
      padding: 10,
    });

    backText.setInteractive({ useHandCursor: true });
    backText.on('pointerdown', () => this.clickButton());

    scoreText = this.add.text(16, 16, 'score: 0', {
      font: '25px Arial Black',
      fill: '#173f5f',
      backgroundColor: '#f6d55c',
      padding: 10,
    });
  }
  //kanske vi kan ha multiple levels?
  clickButton() {
    this.scene.switch('TitleScene');
  }

  update() {
    const cam = this.cameras.main;
    const speed = 10;

    if (this.cursors.left.isDown) {
      cam.scrollX -= speed;
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      cam.scrollX += speed;
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.stop(null, true);
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-150);
      this.player.anims.play('jump', true);
    } else if (this.cursors.space.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-250);
      this.player.anims.play('jump', true);
    }
  }
}

export default GameScene;
