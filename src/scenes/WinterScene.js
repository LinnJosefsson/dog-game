import Phaser from 'phaser';

let scoreText;

const createLoopedScene = (scene, totalWidth, texture, scrollFactor) => {
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

class WinterScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WinterScene' });
  }

  init(data) {
    this.score = data.totalScore;
    console.log(data);
  }

  preload() {
    this.load.image('wintersky', './assets/wintersky.png');
    this.load.image('winterground', './assets/winterground.png');
    this.load.image('background', './assets/winterbg.png');
    this.load.image('peas', './assets/peas.png');
    this.load.image('clouds', './assets/clouds.png');
    this.load.image('chicken', './assets/chicken.png');
    this.load.image('blueberry', './assets/blueberry.png');
    this.load.image('vacuum2', './assets/vacuum2.png');
    this.load.image('vacuum2-sm', './assets/vacuum2-sm.png');
    this.load.spritesheet('dog', './assets/dog1.png', {
      frameWidth: 111,
      frameHeight: 103,
    });
    this.load.spritesheet('dogleft', './assets/dogleft.png', {
      frameWidth: 111,
      frameHeight: 103,
    });
    this.load.spritesheet('jump', './assets/jump.png', {
      frameWidth: 111,
      frameHeight: 103,
    });
    this.load.audio('jump', './assets/music/jump.mp3');
    this.load.audio('eat', './assets/music/ra.mp3');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 10;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(width * 0.5, height * 0.2, 'wintersky').setScrollFactor(0);
    this.add.image(width * 0.3, height * 0.1, 'clouds').setScrollFactor(0);
    this.add.image(width * 0.7, height * 0.2, 'clouds').setScrollFactor(0);
    this.jumpMusic = this.sound.add('jump');
    this.eatMusic = this.sound.add('eat');

    createLoopedScene(this, totalWidth, 'background', 0.8);

    createLoopedScene(this, totalWidth, 'winterground', 1);

    //vacuum

    this.vacuums = this.physics.add.group({
      key: 'vacuum2-sm',
      repeat: 2,
      setXY: { x: 500, y: 635, stepX: 800 },
    });

    Phaser.Actions.Call(this.vacuums.getChildren(), function (vacuum) {
      vacuum.body.allowGravity = false;
    });

    this.vacuumBig = this.add.image(3150, 580, 'vacuum2');
    this.vacuumBig.setScale(0.13);

    this.vacuum2 = this.add.image(900, 600, 'vacuum2');
    this.vacuum2.setScale(0.05);

    this.vacuum3 = this.add.image(2300, 600, 'vacuum2');
    this.vacuum3.setScale(0.05);

    var tweenBig = this.tweens.add({
      targets: this.vacuumBig,
      y: '-=128',
      duration: 3000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: 1000,
    });

    var tween2 = this.tweens.add({
      targets: this.vacuum2,
      x: '-=38',
      duration: 2500,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: 1000,
    });

    var tween3 = this.tweens.add({
      targets: this.vacuum3,
      x: '-=38',
      duration: 3000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: 1000,
    });

    //Chicken

    this.chicken = this.physics.add.group({
      key: 'chicken',
      repeat: 11,
      setXY: { x: 12, y: 450, stepX: 350 },
    });

    Phaser.Actions.Call(this.chicken.getChildren(), function (chicke) {
      chicke.body.allowGravity = false;
    });

    //Blueberry

    this.blueberry = this.physics.add.group({
      key: 'blueberry',
      repeat: 11,
      setXY: { x: 80, y: 635, stepX: 600 },
    });

    Phaser.Actions.Call(this.blueberry.getChildren(), function (blueber) {
      blueber.body.allowGravity = false;
    });

    //Peas

    this.peas = this.physics.add.group({
      key: 'peas',
      repeat: 4,
      setXY: { x: 200, y: 500, stepX: 800 },
    });

    Phaser.Actions.Call(this.peas.getChildren(), function (pea) {
      pea.body.allowGravity = false;
    });

    //Corgi
    let player;
    this.player = this.physics.add.sprite(width * 0.5, height * 0.5, 'dog');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.physics.world.setBounds(0, 0, width * 3, height - 50);

    this.physics.add.overlap(
      this.player,
      this.chicken,
      this.collectChicken,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.blueberry,
      this.collectBlueberry,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.peas,
      this.collectPeas,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.vacuums,
      this.hitByVacuum,
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

    let backText = this.add.text(width * 2, 100, 'Final Score', {
      font: '25px Arial Black',
      fill: '#173f5f',
      backgroundColor: '#f6d55c',
      padding: 10,
    });

    backText.setInteractive({ useHandCursor: true });
    backText.on('pointerdown', () => this.clickButton());

    scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      font: '28px Arial Black',
      fill: '#f6d55c',
      backgroundColor: '#173f5f',
      padding: 15,
    });
    scoreText.setScrollFactor(0, 0);
  }

  clickButton() {
    this.scene.start('EndScene', { endScore: this.score });
  }

  collectChicken(player, chicken) {
    chicken.destroy();
    this.score += 15;
    scoreText.setText(`Score: ${this.score}`);
    this.eatMusic.play();
  }

  collectBlueberry(player, blueberry) {
    blueberry.destroy();
    this.score += 5;
    scoreText.setText(`Score: ${this.score}`);
    this.eatMusic.play();
  }

  collectPeas(player, peas) {
    peas.destroy();
    this.score += 10;
    scoreText.setText(`Score: ${this.score}`);
    this.eatMusic.play();
  }

  hitByVacuum(player, vacuums) {
    this.score -= 1;
    scoreText.setText(`Score: ${this.score}`);
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
      this.player.setVelocityY(-250);
      this.jumpMusic.play();
    } else if (this.cursors.space.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-350);
      this.jumpMusic.play();
    }
  }
}

export default WinterScene;
