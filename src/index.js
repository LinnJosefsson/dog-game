import Phaser from 'phaser';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';

let titleScene = new TitleScene();
let gameScene = new GameScene();

let config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
};

let game = new Phaser.Game(config);
game.scene.add('TitleScene', titleScene);
game.scene.add('GameScene', gameScene);
game.scene.start('TitleScene');
