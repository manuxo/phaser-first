const config = {
    type: Phaser.AUTO,
    width: 450,
    height: 400,
    parent: 'canvas-container',
    physics: {
        default: 'arcade',
        arcade: {
            enableBody: true
        }
    },
    scene: [GameScene]
};

const game = new Phaser.Game(config);
