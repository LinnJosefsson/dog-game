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

class WinterScene extends Phaser.Scene {
  constructor() {
    super('WinterScene');
  }

  preload() {
    this.load.image('wintersky', 'src/assets/wintersky.png');
    this.load.image('winterground', 'src/assets/winterground.png');
    this.load.image('background', 'src/assets/winterbg.png');
    this.load.image('peas', 'src/assets/peas.png');
    this.load.image('clouds', 'src/assets/clouds.png');
    this.load.image('chicken', 'src/assets/chicken.png');
    this.load.image('blueberry', 'src/assets/blueberry.png');
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
    const totalWidth = width * 10;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(width * 0.5, height * 0.2, 'wintersky').setScrollFactor(0);
    this.add.image(width * 0.3, height * 0.1, 'clouds').setScrollFactor(0);
    this.add.image(width * 0.7, height * 0.2, 'clouds').setScrollFactor(0);
    this.jumpMusic = this.sound.add('jump');
    this.eatMusic = this.sound.add('eat');

    createLooped(this, totalWidth, 'background', 0.8);

    createLooped(this, totalWidth, 'winterground', 1);

    //Chicken

    this.chicken = this.physics.add.group({
      key: 'chicken',
      repeat: 11,
      setXY: { x: 12, y: 550, stepX: 350 },
    });

    Phaser.Actions.Call(this.chicken.getChildren(), function (chicke) {
      chicke.body.allowGravity = false;
    });

    //Blueberry

    this.blueberry = this.physics.add.group({
      key: 'blueberry',
      repeat: 11,
      setXY: { x: 80, y: 735, stepX: 600 },
    });

    Phaser.Actions.Call(this.blueberry.getChildren(), function (blueber) {
      blueber.body.allowGravity = false;
    });

    //Peas

    this.peas = this.physics.add.group({
      key: 'peas',
      repeat: 4,
      setXY: { x: 200, y: 600, stepX: 800 },
    });

    Phaser.Actions.Call(this.peas.getChildren(), function (pea) {
      pea.body.allowGravity = false;
    });

    //Vacuum med static group

    const vacuum = this.physics.add.staticGroup();
    vacuum
      .create(width / 1.5, 735, 'vacuum')
      .setScale(0.05)
      .refreshBody();
    vacuum
      .create(width * 1.8, 735, 'vacuum')
      .setScale(0.04)
      .refreshBody();
    vacuum
      .create(width * 2.2, 735, 'vacuum')
      .setScale(0.02)
      .refreshBody();

    //Corgi
    let player;
    this.player = this.physics.add.sprite(width * 0.5, height * 0.5, 'dog');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 50);

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

    let backText = this.add.text(width * 2, 100, 'Back to main', {
      font: '25px Arial Black',
      fill: '#173f5f',
      backgroundColor: '#f6d55c',
      padding: 10,
    });

    backText.setInteractive({ useHandCursor: true });
    backText.on('pointerdown', () => this.clickButton());

    scoreText = this.add.text(16, 16, `Score: ${score}`, {
      font: '28px Arial Black',
      fill: '#f6d55c',
      backgroundColor: '#173f5f',
      padding: 15,
    });
    scoreText.setScrollFactor(0, 0);
  }

  clickButton() {
    this.scene.switch('TitleScene');
  }

  collectChicken(player, chicken) {
    chicken.destroy();
    score += 15;
    scoreText.setText(`Score: ${score}`);
    this.eatMusic.play();
  }

  collectBlueberry(player, blueberry) {
    blueberry.destroy();
    score += 5;
    scoreText.setText(`Score: ${score}`);
    this.eatMusic.play();
  }

  collectPeas(player, peas) {
    peas.destroy();
    score += 10;
    scoreText.setText(`Score: ${score}`);
    this.eatMusic.play();
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
      this.jumpMusic.play();
    } else if (this.cursors.space.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-250);
      this.jumpMusic.play();
    }
  }
}

export default WinterScene;
