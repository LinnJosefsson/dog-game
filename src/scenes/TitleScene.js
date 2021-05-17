import Phaser from 'phaser';

class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  preload() {
    this.load.image('park', 'src/assets/park.png');
    this.load.audio('bg-music', 'src/assets/music/music-bg.mp3');
    this.load.image('note', 'src/assets/music/note.png');
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
    //this.bgMusic.play(musicConfig);
    const park = this.add.image(0, 0, 'park');
    park.setOrigin(0, 0);

    let musicOff = this.add.text(1050, 10, 'Music off', {
      font: '18px Arial Black',
      fill: '#f6d55c',
      backgroundColor: '#173f5f',
      padding: 15,
    });

    musicOff.setInteractive({ useHandCursor: true });
    musicOff.on('pointerdown', () => this.stopMusic());

    let title = this.add.text(20, 310, 'Welcome to the park', {
      font: '54px Arial Black',
      fill: '#f6d55c',
    });
    title.stroke = '#173f5f';
    title.strokeThickness = 16;
    title.setShadow(2, 2, '#333333', 2, true, true);

    this.add.text(10, 10, "Enter dog's name:", {
      font: '26px Arial Black',
      fill: '#173f5f',
      backgroundColor: '#f6d55c',
      padding: 15,
    });

    let dogName = this.add.text(300, 10, '', {
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

    let startText = this.add.text(680, 600, 'Click to start', {
      font: '36px Arial Black',
      fill: '#173f5f',
      backgroundColor: '#f6d55c',
      padding: 15,
    });

    startText.setInteractive({ useHandCursor: true });
    startText.on('pointerdown', () => this.startGame());

    let ruleText = this.add.text(1100, 700, 'Rules', {
      font: '18px Arial Black',
      fill: '#f6d55c',
      backgroundColor: '#173f5f',
      padding: 10,
    });

    ruleText.setInteractive({ useHandCursor: true });
    ruleText.on('pointerdown', () => this.startRules());
  }

  startGame() {
    this.scene.switch('GameScene');
  }

  startRules() {
    this.scene.switch('RuleScene');
  }

  stopMusic() {
    this.bgMusic.stop();
  }
}

export default TitleScene;
