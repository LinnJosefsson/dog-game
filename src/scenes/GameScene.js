import Phaser from 'phaser';

let score;
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
    super({ key: 'GameScene' });
    this.score = 0;
  }

  preload() {
    this.load.image('sky', 'src/assets/sky.png');
    this.load.image('mountain', 'src/assets/mountains.png');
    this.load.image('plateau', 'src/assets/plateau.png');
    this.load.image('ground', 'src/assets/ground.png');
    this.load.image('plant', 'src/assets/plant.png');
    this.load.image('carrot-sm', 'src/assets/carrot-sm.png');
    this.load.image('banana-sm', 'src/assets/banana-sm.png');
    this.load.image('strawberry-sm', 'src/assets/strawberry-sm.png');
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
    this.load.audio('jump', 'src/assets/music/jump.mp3');
    this.load.audio('eat', 'src/assets/music/ra.mp3');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 10; //width * width om vi vill göra det infinite
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0);
    this.jumpMusic = this.sound.add('jump');
    this.eatMusic = this.sound.add('eat');

    createLooped(this, totalWidth, 'mountain', 0.25);
    createLooped(this, totalWidth, 'plateau', 0.5);
    createLooped(this, totalWidth, 'ground', 1);
    createLooped(this, totalWidth, 'plant', 1.25);

    //Banana

    this.bananas = this.physics.add.group({
      key: 'banana-sm',
      repeat: 11,
      setXY: { x: 12, y: 635, stepX: 350 },
    });

    Phaser.Actions.Call(this.bananas.getChildren(), function (banana) {
      banana.body.allowGravity = false;
    });

    //Strawberry

    this.strawberry = this.physics.add.group({
      key: 'strawberry-sm',
      repeat: 11,
      setXY: { x: 80, y: 600, stepX: 600 },
    });

    Phaser.Actions.Call(this.strawberry.getChildren(), function (strawber) {
      strawber.body.allowGravity = false;
    });

    //Carrot

    this.carrots = this.physics.add.group({
      key: 'carrot-sm',
      repeat: 4,
      setXY: { x: 200, y: 450, stepX: 800 },
    });

    Phaser.Actions.Call(this.carrots.getChildren(), function (carrot) {
      carrot.body.allowGravity = false;
    });

    //Vacuum med static group

    /*  const vacuum = this.physics.add.staticGroup();
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
      .refreshBody(); */

    this.vacuumBig = this.add.image(3150, 500, 'vacuum');
    this.vacuumBig.setScale(0.13);
    this.vacuum2 = this.add.image(900, 650, 'vacuum');
    this.vacuum2.setScale(0.05);

    this.vacuum3 = this.add.image(1500, 650, 'vacuum');
    this.vacuum3.setScale(0.05);

    var tween2 = this.tweens.add({
      targets: this.vacuumBig,
      y: '-=128',
      duration: 3000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: 1000,
    });

    var tween = this.tweens.add({
      targets: this.vacuum2,
      y: '-=128',
      duration: 2500,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: 1000,
    });

    var tween3 = this.tweens.add({
      targets: this.vacuum3,
      y: '-=128',
      duration: 3000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: 1000,
    });

    //Corgi
    let player; 
    this.player = this.physics.add.sprite(width * 0.5, height * 0.5, 'dog');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 160);

    this.physics.add.overlap(
      this.player,
      this.bananas,
      this.collectBananas,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.strawberry,
      this.collectStrawberry,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.carrots,
      this.collectCarrots,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.vacuum,
      this.fuckingVacuumer,
      null,
      this
    );

    this.anims.create({
      key: 'idle',
      frames: [{ key: 'dog', frame: 2 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dogleft', { start: 0, end: 3 }),
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
      frames: this.anims.generateFrameNumbers('dog', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.cameras.main.setBounds(0, 0, width * 3, height);
    this.cameras.main.startFollow(this.player);

    let winterText = this.add.text(width * 2, 100, 'Winter Wonderland', {
      font: '25px Arial Black',
      fill: '#f6d55c',
      backgroundColor: '#173f5f',
      padding: 10,
    });

    winterText.setInteractive({ useHandCursor: true });
    winterText.on('pointerdown', () => this.clickButton());

    scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      font: '28px Arial Black',
      fill: '#173f5f',
      backgroundColor: '#f6d55c',
      padding: 15,
    });
    scoreText.setScrollFactor(0, 0);
  }

  clickButton() {
    this.scene.start('WinterScene', { totalScore: this.score });
  }

  fuckingVacuumer(player, vacuum) {
    score -= 10;
    scoreText.setText(`Score: ${score}`);
  }

  collectBananas(player, bananas) {
    bananas.destroy();
    this.score += 10;
    scoreText.setText(`Score: ${this.score}`);
    this.eatMusic.play();
  }

  collectStrawberry(player, strawberry) {
    strawberry.destroy();
    this.score += 5;
    scoreText.setText(`Score: ${this.score}`);
    this.eatMusic.play();
  }

  collectCarrots(player, carrots) {
    carrots.destroy();
    this.score += 15;
    scoreText.setText(`Score: ${this.score}`);
    this.eatMusic.play();
  }

  update() {
    const cam = this.cameras.main;
    const speed = 30;

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
      this.jumpMusic.play();
    } else if (this.cursors.space.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-260);
      this.jumpMusic.play();
    }
  }
}

export default GameScene;
