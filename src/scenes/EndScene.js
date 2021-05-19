import Phaser from 'phaser';

class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EndScene' });
  }

  init(data) {
    this.score = data.endScore;
    console.log(data);
  }

  preload() {
    this.load.image('park', 'src/assets/park.png');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const park = this.add.image(0, 0, 'park');
    park.setOrigin(0, 0);
    park.setTint(0x6aa84f);

    let scoreText = this.add.text(
      width / 3,
      height / 2,
      'Your Score : ' + this.score,
      {
        font: '54px Arial Black',
        fill: '#f6d55c',
      }
    );
    scoreText.stroke = '#173f5f';
    scoreText.strokeThickness = 16;
    scoreText.setShadow(2, 2, '#333333', 2, true, true);
  }
}

export default EndScene;
