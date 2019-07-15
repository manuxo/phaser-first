const gameState = {};
const PlayerDirections = {
    UP: { 
        id: 0, 
        idleKey: 'player-up-idle', 
        key: 'player-up' 
    },
    DOWN: { 
        id: 1, 
        idleKey: 'player-down-idle', 
        key: 'player-down' 
    },
    LEFT: { 
        id: 2, 
        idleKey: 'player-horizontal-idle', 
        key: 'player-horizontal',
        flipX: true 
    },
    RIGHT: { 
        id: 3, 
        idleKey: 'player-horizontal-idle', 
        key: 'player-horizontal',
        flipX: false
    }
};

class GameScene extends Phaser.Scene {
    constructor(){
        super({ key: 'GameScene'});
        this.pressed = false;
    }

    preload(){
        this.load.image('background','/img/bg.png');
        this.load.spritesheet('player','/img/player-female.png',{
            frameWidth: 45,
            frameHeight: 45
        });
        this.load.spritesheet('pikachu','/img/pikachu.png',{frameWidth: 45, frameHeight: 45});
        this.load.audio('opening','/sounds/opening.mp3');
    }
    create(){
        //Config
        gameState.active = true;
        gameState.cursors = this.input.keyboard.createCursorKeys();
        //Assets
        gameState.openingAudio = this.sound.add('opening');
        this.add.image(0,0,'background').setOrigin(0,0);
        //Player
        gameState.player = this.physics.add.sprite(50,50,'player');
        gameState.player.setCollideWorldBounds(true);
        
        this.anims.create({
            key: PlayerDirections.DOWN.key,
            frames: this.anims.generateFrameNumbers('player',{start:0,end:3}),
            frameRate:5,
            repeat: -1
        });
        this.anims.create({
            key: PlayerDirections.DOWN.idleKey,
            frames: this.anims.generateFrameNumbers('player',{start:0,end:0}),
            frameRate:5,
            repeat: -1
        });
        this.anims.create({
            key: PlayerDirections.UP.key,
            frames: this.anims.generateFrameNumbers('player',{start:8,end:11}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: PlayerDirections.UP.idleKey,
            frames: this.anims.generateFrameNumbers('player',{start:8,end:8}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: PlayerDirections.RIGHT.key,
            frames: this.anims.generateFrameNumbers('player',{start:4,end:7}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: PlayerDirections.RIGHT.idleKey,
            frames: this.anims.generateFrameNumbers('player',{start:4,end:4}),
            frameRate: 5,
            repeat: -1
        });
        //Pokemons
        gameState.pokemons = this.physics.add.staticGroup();
        gameState.pikachu = gameState.pokemons.create(150,150,'pikachu').setScale(.8);
        gameState.pikachu.setInteractive();
        gameState.pikachu.on('pointerover',() => {
            gameState.pikachu.setBlendMode(Phaser.BlendModes.SCREEN);
        });
        gameState.pikachu.on('pointerout',() => {
            gameState.pikachu.setBlendMode(Phaser.BlendModes.NORMAL);
        });
        this.anims.create({
            key: 'pikachu-idle',
            frames: this.anims.generateFrameNumbers('pikachu',{start:0,end:5}),
            frameRate: 5,
            repeat: -1
        });
        //Colliders and Overlaps
        this.physics.add.collider(gameState.player,gameState.pokemons);
        gameState.pikachu.anims.play('pikachu-idle',true);
        gameState.openingAudio.play();
    }
    update(){
        if(gameState.active){
            if(gameState.cursors.right.isDown){
                gameState.lastDirection = PlayerDirections.RIGHT;
                gameState.player.setVelocityY(0);
                gameState.player.setVelocityX(150);
                gameState.player.anims.play(gameState.lastDirection.key,true);
                gameState.player.flipX = PlayerDirections.RIGHT.flipX;
            }else if(gameState.cursors.left.isDown){
                gameState.lastDirection = PlayerDirections.LEFT;
                gameState.player.setVelocityY(0);
                gameState.player.setVelocityX(-150);
                gameState.player.anims.play(gameState.lastDirection.key,true);
                gameState.player.flipX = PlayerDirections.LEFT.flipX;
            }else if(gameState.cursors.down.isDown){
                gameState.lastDirection = PlayerDirections.DOWN;
                gameState.player.setVelocityX(0);
                gameState.player.setVelocityY(150);
                gameState.player.anims.play(gameState.lastDirection.key,true);
            }else if(gameState.cursors.up.isDown){
                gameState.lastDirection = PlayerDirections.UP;
                gameState.player.setVelocityX(0);
                gameState.player.setVelocityY(-150);
                gameState.player.anims.play(gameState.lastDirection.key,true);
            }else{
                if(gameState.lastDirection){
                    gameState.player.anims.play(gameState.lastDirection.idleKey,true);
                }
                gameState.player.setVelocity(0);
            }
        }
    }
}