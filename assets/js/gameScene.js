const gameState = {};
const PlayerDirections = {
    UP: { 
        id: 0, 
        idleKey: 'player-up-idle',
        biking: 'player-biking-up',
        bikingIdle: 'player-biking-up-idle',
        key: 'player-up' 
    },
    DOWN: { 
        id: 1, 
        idleKey: 'player-down-idle', 
        bikingIdle: 'player-biking-down-idle',
        biking: 'player-biking-down',
        key: 'player-down' 
    },
    LEFT: { 
        id: 2, 
        idleKey: 'player-horizontal-idle', 
        key: 'player-horizontal',
        bikingIdle: 'player-biking-horizontal-idle',
        biking: 'player-biking-horizontal',
        flipX: true 
    },
    RIGHT: { 
        id: 3, 
        idleKey: 'player-horizontal-idle', 
        key: 'player-horizontal',
        biking: 'player-biking-horizontal',
        bikingIdle: 'player-biking-horizontal-idle',
        flipX: false
    }
};

class GameScene extends Phaser.Scene {
    constructor(){
        super({ key: 'GameScene'});
        this.pressed = false;
        this.useBike = false;
        this.velocity = 1;
    }

    preload(){
        this.load.image('background','/img/bg.png');
        this.load.spritesheet('player','/img/player-female.png',{
            frameWidth: 45,
            frameHeight: 45
        });
        this.load.spritesheet('pikachu','/img/pikachu.png',{frameWidth: 45, frameHeight: 45});
        this.load.spritesheet('bulbasaur','/img/bulbasaur.png',{frameWidth: 45, frameHeight: 40});
        this.load.spritesheet('squirtle','/img/squirtle.png',{frameWidth: 45, frameHeight: 42});
        this.load.spritesheet('charmander','/img/charmander.png',{frameWidth: 45, frameHeight: 41});
        this.load.audio('opening','/sounds/opening.mp3');
    }
    create(){
        //Config
        gameState.active = true;
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.bikeKey = this.input.keyboard.addKey('B');
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
        this.anims.create({
            key: PlayerDirections.DOWN.biking,
            frames: this.anims.generateFrameNumbers('player',{start:12,end:15}),
            frameRate:5,
            repeat: -1
        });
        this.anims.create({
            key: PlayerDirections.DOWN.bikingIdle,
            frames: this.anims.generateFrameNumbers('player',{start:12,end:12}),
            frameRate:5,
            repeat: -1
        });
        this.anims.create({
            key: PlayerDirections.UP.biking,
            frames: this.anims.generateFrameNumbers('player',{start:16,end:19}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: PlayerDirections.UP.bikingIdle,
            frames: this.anims.generateFrameNumbers('player',{start:16,end:16}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: PlayerDirections.LEFT.biking,
            frames: this.anims.generateFrameNumbers('player',{start:20,end:23}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: PlayerDirections.LEFT.bikingIdle,
            frames: this.anims.generateFrameNumbers('player',{start:20,end:20}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: PlayerDirections.RIGHT.biking,
            frames: this.anims.generateFrameNumbers('player',{start:20,end:23}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: PlayerDirections.RIGHT.bikingIdle,
            frames: this.anims.generateFrameNumbers('player',{start:20,end:20}),
            frameRate: 5,
            repeat: -1
        });

        //Pokemons
        gameState.pokemons = this.physics.add.staticGroup();
        gameState.pikachu = gameState.pokemons.create(50,150,'pikachu').setScale(.8);
        gameState.bulbasaur = gameState.pokemons.create(150,350,'bulbasaur').setScale(.8);
        gameState.squirtle = gameState.pokemons.create(350,75,'squirtle').setScale(.8);
        gameState.charmander = gameState.pokemons.create(275,200,'charmander').setScale(.8);
        gameState.pikachu.setInteractive();
        gameState.pikachu.on('pointerover',() => {
            gameState.pikachu.setBlendMode(Phaser.BlendModes.SCREEN);
            this.game.canvas.style.cursor = "pointer";
        });
        gameState.pikachu.on('pointerout',() => {
            gameState.pikachu.setBlendMode(Phaser.BlendModes.NORMAL);
            this.game.canvas.style.cursor = "default";
        });

        gameState.bulbasaur.setInteractive();
        gameState.bulbasaur.on('pointerover',() => {
            gameState.bulbasaur.setBlendMode(Phaser.BlendModes.SCREEN);
            this.game.canvas.style.cursor = "pointer";
        });
        gameState.bulbasaur.on('pointerout',() => {
            gameState.bulbasaur.setBlendMode(Phaser.BlendModes.NORMAL);
            this.game.canvas.style.cursor = "default";
        });

        gameState.squirtle.setInteractive();
        gameState.squirtle.on('pointerover',() => {
            gameState.squirtle.setBlendMode(Phaser.BlendModes.SCREEN);
            this.game.canvas.style.cursor = "pointer";
        });
        gameState.squirtle.on('pointerout',() => {
            gameState.squirtle.setBlendMode(Phaser.BlendModes.NORMAL);
            this.game.canvas.style.cursor = "default";
        });

        gameState.charmander.setInteractive();
        gameState.charmander.on('pointerover',() => {
            gameState.charmander.setBlendMode(Phaser.BlendModes.SCREEN);
            this.game.canvas.style.cursor = "pointer";
        });
        gameState.charmander.on('pointerout',() => {
            gameState.charmander.setBlendMode(Phaser.BlendModes.NORMAL);
            this.game.canvas.style.cursor = "default";
        });
        
        this.anims.create({
            key: 'pikachu-idle',
            frames: this.anims.generateFrameNumbers('pikachu',{start:0,end:5}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'bulbasaur-idle',
            frames: this.anims.generateFrameNumbers('bulbasaur',{start:0,end:3}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'squirtle-idle',
            frames: this.anims.generateFrameNumbers('squirtle',{start:0,end:5}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'charmander-idle',
            frames: this.anims.generateFrameNumbers('charmander',{start:0,end:2}),
            frameRate: 4,
            repeat: -1
        });
        //Colliders and Overlaps
        this.physics.add.collider(gameState.player,gameState.pokemons);
        gameState.pikachu.anims.play('pikachu-idle',true);
        gameState.bulbasaur.anims.play('bulbasaur-idle',true);
        gameState.squirtle.anims.play('squirtle-idle',true);
        gameState.charmander.anims.play('charmander-idle',true);
        gameState.openingAudio.play();
    }
    update(){
        if(gameState.active){
            if (gameState.bikeKey.isDown) {
                this.useBike = !this.useBike;
                this.velocity = this.useBike ? 1.5 : 1;
            } else if(gameState.cursors.right.isDown){
                gameState.lastDirection = PlayerDirections.RIGHT;
                gameState.player.setVelocityY(0);
                gameState.player.setVelocityX(150 * this.velocity);
                const key = this.useBike ? gameState.lastDirection.biking : gameState.lastDirection.key;
                gameState.player.anims.play(key,true);
                gameState.player.flipX = gameState.lastDirection.flipX;
            }else if(gameState.cursors.left.isDown){
                gameState.lastDirection = PlayerDirections.LEFT;
                gameState.player.setVelocityY(0);
                gameState.player.setVelocityX(-150 * this.velocity);
                const key = this.useBike ? gameState.lastDirection.biking : gameState.lastDirection.key;
                gameState.player.anims.play(key,true);
                gameState.player.flipX = gameState.lastDirection.flipX;
            }else if(gameState.cursors.down.isDown){
                gameState.lastDirection = PlayerDirections.DOWN;
                gameState.player.setVelocityX(0);
                gameState.player.setVelocityY(150 * this.velocity);
                const key = this.useBike ? gameState.lastDirection.biking : gameState.lastDirection.key;
                gameState.player.anims.play(key, true);
            }else if(gameState.cursors.up.isDown){
                gameState.lastDirection = PlayerDirections.UP;
                gameState.player.setVelocityX(0);
                gameState.player.setVelocityY(-150 * this.velocity);
                const key = this.useBike ? gameState.lastDirection.biking : gameState.lastDirection.key;
                gameState.player.anims.play(key,true);
            }else{
                if(gameState.lastDirection){
                    const key = this.useBike ? gameState.lastDirection.bikingIdle : gameState.lastDirection.idleKey;
                    gameState.player.anims.play(key,true);
                }
                gameState.player.setVelocity(0);
            }
        }
    }
}