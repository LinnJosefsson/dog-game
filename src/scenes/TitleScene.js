import Phaser from 'phaser';

class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  preload() {
    this.load.image('park', 'src/assets/park.png');
  }

  create() {
    const park = this.add.image(0, 0, 'park');
    park.setOrigin(0, 0);

    let title = this.add.text(20, 310, 'Welcome to the park', {
      font: '54px Arial Black',
      fill: '#f6d55c',
    });
    title.stroke = '#173f5f';
    title.strokeThickness = 16;
    title.setShadow(2, 2, '#333333', 2, true, true);

    let startText = this.add.text(680, 600, 'Click to start', {
      font: '36px Arial Black',
      fill: '#173f5f',
      backgroundColor: '#f6d55c',
      padding: 15,
    });

    startText.setInteractive({ useHandCursor: true });
    startText.on('pointerdown', () => this.clickButton());
  }

  clickButton() {
    this.scene.switch('GameScene');
  }
}

export default TitleScene;
