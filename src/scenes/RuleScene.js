import Phaser from 'phaser';

class RuleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'RuleScene' });
  }

  preload() {
    this.load.image('park', 'src/assets/park.png');
    this.load.image('strawberry-sm', 'src/assets/strawberry-sm.png');
  }

  create() {
    const park = this.add.image(0, 0, 'park');
    park.setOrigin(0, 0);

    this.add.image(580, 130, 'strawberry-sm');
    let flipped = this.add.image(785, 130, 'strawberry-sm');
    flipped.flipX = true;

    let title = this.add.text(600, 100, 'Rules', {
      font: '54px Arial Black',
      fill: '#f6d55c',
    });
    title.stroke = '#173f5f';
    title.strokeThickness = 16;
    title.setShadow(2, 2, '#333333', 2, true, true);

    let startText = this.add.text(930, 700, 'Back to main', {
      font: '32px Arial Black',
      fill: '#f6d55c',
      backgroundColor: '#173f5f',
      padding: 10,
    });

    startText.setInteractive({ useHandCursor: true });
    startText.on('pointerdown', () => this.backToMain());

    let ruleText =
      'Collect as many fruits and vegetables as you can\nAvoid vacuum cleaners\nTry space for double jump';
    this.add.text(250, 300, ruleText, {
      font: '28px Arial Black',
      fill: '#173f5f',
      backgroundColor: '#f6d55c',
      padding: 15,
    });
  }

  backToMain() {
    this.scene.switch('TitleScene');
  }
}

export default RuleScene;
