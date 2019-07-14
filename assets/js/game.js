const config = {
    type: Phaser.AUTO,
    width: 500,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            enableBody: true
        }
    },
    scene: [GameScene]
};

const game = new Phaser.Game(config);
