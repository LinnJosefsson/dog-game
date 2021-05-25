import Phaser from 'phaser';

class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  preload() {
    this.load.image('park', './assets/park.png');
    this.load.audio('bg-music', './assets/music/music-bg.mp3');
  }

  create() {
    this.bgMusic = this.sound.add('bg-music');
    var musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
    /*  this.bgMusic.play(musicConfig); */
    const park = this.add.image(0, 0, 'park');
    park.setOrigin(0, 0);

    let musicOff = this.add.text(1050, 10, 'Music off', {
      font: '18px Arial Black',
      fill: '#f6d55c',
      backgroundColor: '#173f5f',
      padding: 10,
    });

    musicOff.setInteractive({ useHandCursor: true });
    musicOff.on('pointerdown', () => this.bgMusic.stop());

    let title = this.add.text(20, 250, 'Feed the Corgi', {
      font: '54px Arial Black',
      fill: '#f6d55c',
    });
    title.stroke = '#173f5f';
    title.strokeThickness = 16;
    title.setShadow(3, 3, '#333333', 2, true, true);

    this.add.text(10, 10, "Enter dog's name:", {
      font: '26px Arial Black',
      fill: '#173f5f',
      backgroundColor: '#f6d55c',
      padding: 15,
    });

    let dogName = this.add.text(300, 10, name, {
      font: '26px Arial Black',
      fill: '#f6d55c',
      backgroundColor: '#173f5f',
      padding: 15,
    });

    this.input.keyboard.on('keydown', function (event) {
      if (event.keyCode === 8 && dogName.text.length > 0) {
        dogName.text = dogName.text.substr(0, dogName.text.length - 1);
      } else if (
        event.keyCode === 32 ||
        (event.keyCode >= 48 && event.keyCode < 90)
      ) {
        dogName.text += event.key;
      }
    });

    let startText = this.add.text(750, 550, 'Start game', {
      font: '36px Arial Black',
      fill: '#173f5f',
      backgroundColor: '#f6d55c',
      padding: 15,
    });

    startText.setInteractive({ useHandCursor: true });
    startText.on('pointerdown', () => this.scene.switch('GameScene'));

    let ruleText = this.add.text(1100, 650, 'Rules', {
      font: '18px Arial Black',
      fill: '#f6d55c',
      backgroundColor: '#173f5f',
      padding: 10,
    });

    ruleText.setInteractive({ useHandCursor: true });
    ruleText.on('pointerdown', () => this.scene.switch('RuleScene'));
  }
}

export default TitleScene;
