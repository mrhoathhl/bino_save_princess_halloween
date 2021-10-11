function gameStart() { }
var nAssets = 28;
var nLoaded = 0;
var sprMovementDemonImg = new Image(),
    sprMovementPlayer1Img = new Image(),
    sprTileMapImg = new Image(),
    sprBonusPointImg = new Image(),
    sprControllerImg = new Image(),
    sprFlowerEnemyImg = new Image(),
    sprBeetleEnemyImg = new Image(),
    sprImpactImg = new Image(),
    sprPlayerWeaponImg = new Image(),
    sprMovementPrincessImg = new Image(),
    sprBossImg = new Image(),
    sprDownloadNowImg = new Image(),
    sprSpringsImg = new Image(),
    sprMuteImg = new Image();
var isControllable = true,
    isTurnRight = false,
    isPlaygame = false,
    isJump = false,
    isFire = false;
var checkPoint = false;
var isUpgrade = false,
    isVentOpen = false,
    isRunning = true,
    isTap = false,
    isBossDead = false,
    isPlayerDead = false;
var bgSound, jumpSound, winSound, loseSound, attackSound, collectCoinSound, hitBonusBlockSound, killEnemySound, standOnEnemySound, flagSound, bossDeadSound;
var Sounds,
    boss,
    isMuted = false,
    disableBgSound,
    onZoomed = false,
    endGame = false;
var checkPipe = true;
class Preload extends Phaser.Scene {
    constructor() {
        super({ key: "Preload" });
    }

    preload() {
        this.load.tilemapTiledJSON('map', 'map.json');
    }

    createGameObjects() {
        this.anims.create({
            key: "sprMovementDemonMotion",
            frames: this.anims.generateFrameNumbers("sprMovementDemon", {
                start: 1,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "sprMovementPlayer1TurnMotion",
            frames: this.anims.generateFrameNumbers("sprMovementPlayer1", {
                start: 1,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "sprMovementDemonIdleMotion",
            frames: [{ key: "sprMovementDemon", frame: 0 }],
            frameRate: 23,
            repeat: 0,
        });
        this.anims.create({
            key: "sprMovementPlayer1IdleMotion",
            frames: [{ key: "sprMovementPlayer1", frame: 0 }],
            frameRate: 23,
            repeat: 0,
        });
        this.anims.create({
            key: "sprPrincessCryMotion",
            frames: this.anims.generateFrameNumbers("sprPrincessPlayer", {
                start: 0,
                end: 1,
            }),
            frameRate: 2,
            repeat: -1,
        });

        this.anims.create({
            key: "sprPrincessMoveMotion",
            frames: this.anims.generateFrameNumbers("sprPrincessPlayer", {
                start: 2,
                end: 11,
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: "sprMovementPlayer1DeadMotion",
            frames: [{ key: "sprMovementPlayer1", frame: 5 }],
            frameRate: 4,
            repeat: 0,
        });
        this.anims.create({
            key: "sprMovementPlayer1JumpMotion",
            frames: [{ key: "sprMovementPlayer1", frame: 4 }],
            frameRate: 4,
            repeat: 0,
        });

        this.anims.create({
            key: "sprBossDead",
            frames: [{ key: "sprBoss", frame: 41 }],
            frameRate: 4,
            repeat: 0,
        });

        this.anims.create({
            key: "sprBossIdleMotion",
            frames: this.anims.generateFrameNumbers("sprBoss", { start: 0, end: 13 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "sprBossDeadMotion",
            frames: this.anims.generateFrameNumbers("sprBoss", {
                start: 30,
                end: 41,
            }),
            frameRate: 10,
            repeat: 0,
        });

        this.anims.create({
            key: "sprBossAttackMotion",
            frames: this.anims.generateFrameNumbers("sprBoss", {
                start: 14,
                end: 29,
            }),
            frameRate: 15,
            repeat: 0,
        });

        this.anims.create({
            key: "sprFlowerEnemyMotion",
            frames: this.anims.generateFrameNumbers("sprFlowerEnemy", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "sprFlowerEnemyDeadMotion",
            frames: [{ key: "sprFlowerEnemy", frame: 0 }],
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "sprSpringsIdleMotion",
            frames: [{ key: "sprSprings", frame: 0 }],
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "sprSpringsPutMotion",
            frames: this.anims.generateFrameNumbers("sprSprings"),
            frameRate: 10,
            repeat: 0,
        });

        this.anims.create({
            key: "sprBonusPointMotion",
            frames: this.anims.generateFrameNumbers("sprBonusPoint", {
                start: 0,
                end: 3,
            }),
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: "sprCoinMotion",
            frames: this.anims.generateFrameNumbers("sprBonusPoint", {
                start: 5,
                end: 7,
            }),
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: "sprBeetleEnemyMotion",
            frames: this.anims.generateFrameNumbers("sprBeetleEnemy", {
                start: 0,
                end: 1,
            }),
            frameRate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: "sprBeetleEnemyDeadMotion",
            frames: [{ key: "sprBeetleEnemy", frame: 8 }],
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: "sprImpactMotion",
            frames: this.anims.generateFrameNumbers("sprImpact"),
            frameRate: 10,
            repeat: 0,
        });

        this.anims.create({
            key: "sprDownloadNowMotion",
            frames: this.anims.generateFrameNumbers("sprDownloadNow"),
            frameRate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: "sprPlayerWeaponMotion",
            frames: this.anims.generateFrameNumbers("sprPlayerWeapon"),
            frameRate: 10,
            repeat: -1,
        });

        this.cameras.main.fadeOut(0, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            window.gameReady && window.gameReady();
            this.scene.start("Scene1PlayGame");
        });
    }

    create() {
        this.textures.addBase64("sprLogoGame", sprLogoGameB64);
        nLoaded++;
        this.textures.addBase64("sprBackgroundChooseScene", sprBackgroundChooseSceneB64);
        nLoaded++;
        this.textures.addBase64("sprBoadChooseScene", sprBoadChooseSceneB64);
        nLoaded++;
        this.textures.addBase64("sprSelectChooseScene", sprSelectChooseSceneB64);
        nLoaded++;
        this.textures.addBase64("sprNotSelectChooseScene", sprNotSelectChooseSceneB64);
        nLoaded++;
        this.textures.addBase64("sprPlayButtonChooseScene", sprPlayButtonChooseSceneB64);
        nLoaded++;
        this.textures.addBase64("sprBackground", sprBackgroundB64);
        nLoaded++;
        this.textures.addBase64("sprTapToPlay", sprTapToPlayB64);
        nLoaded++;
        this.textures.addBase64("sprTileMap", sprTileMapB64);
        nLoaded++;
        this.textures.addBase64("sprGameOver", sprFailBattleB64);
        nLoaded++;
        this.textures.addBase64("sprGameWin", sprWinBattleB64);
        nLoaded++;
        this.textures.addBase64("sprBossWeapon", sprBossWeaponB64);
        nLoaded++;
        this.textures.addBase64("sprCase", sprCaseB64);
        nLoaded++;
        this.textures.addBase64("sprPipe", sprPipeB64);
        nLoaded++;
        Sounds = {
            bgSound: new Howl({
                src: backgroundSoundB64,
                loop: true,
            }),
            jumpSound: new Howl({
                src: jumpSoundB64,
            }),
            touchSound: new Howl({
                src: touchSoundB64,
            }),
            winSound: new Howl({
                src: winSoundB64,
            }),
            loseSound: new Howl({
                src: loseSoundB64,
            }),
            attackSound: new Howl({
                src: attackSoundB64,
            }),
            collectCoinSound: new Howl({
                src: collectCoinSoundB64,
            }),
            hitBonusBlockSound: new Howl({
                src: hitBonusBlockSoundB64,
            }),
            standOnEnemySound: new Howl({
                src: standOnEnemySoundB64,
            }),
            flagSound: new Howl({
                src: flagSoundB64,
            }),
            bossDeadSound: new Howl({
                src: bossDeadSoundB64,
            }),
        };
        nLoaded++;

        sprPlayerWeaponImg.onload = () => {
            this.textures.addSpriteSheet("sprPlayerWeapon", sprPlayerWeaponImg, {
                frameWidth: 32,
                frameHeight: 32,
            });
            nLoaded++;
        };
        sprPlayerWeaponImg.src = sprPlayerWeaponB64;

        sprDownloadNowImg.onload = () => {
            this.textures.addSpriteSheet("sprDownloadNow", sprDownloadNowImg, {
                frameWidth: 154,
                frameHeight: 50,
            });
            nLoaded++;
        };
        sprDownloadNowImg.src = sprDownloadNowB64;

        sprImpactImg.onload = () => {
            this.textures.addSpriteSheet("sprImpact", sprImpactImg, {
                frameWidth: 32,
                frameHeight: 32,
            });
            nLoaded++;
        };
        sprImpactImg.src = sprImpactB64;

        sprMuteImg.onload = () => {
            this.textures.addSpriteSheet("sprMute", sprMuteImg, {
                frameWidth: 48,
                frameHeight: 48,
            });
            nLoaded++;
        };
        sprMuteImg.src = sprMuteB64;

        sprBossImg.onload = () => {
            this.textures.addSpriteSheet("sprBoss", sprBossImg, {
                frameWidth: 280,
                frameHeight: 200,
            });
            nLoaded++;
        };
        sprBossImg.src = sprBossB64;

        sprSpringsImg.onload = () => {
            this.textures.addSpriteSheet("sprSprings", sprSpringsImg, {
                frameWidth: 32,
                frameHeight: 32,
            });
            nLoaded++;
        };
        sprSpringsImg.src = sprSpringsB64;

        sprControllerImg.onload = () => {
            this.textures.addSpriteSheet("sprController", sprControllerImg, {
                frameWidth: 64,
                frameHeight: 64,
            });
            nLoaded++;
        };
        sprControllerImg.src = sprControllerB64;

        sprMovementDemonImg.onload = () => {
            this.textures.addSpriteSheet("sprMovementDemon", sprMovementDemonImg, {
                frameWidth: 150,
                frameHeight: 128,
            });
            nLoaded++;
        };
        sprMovementDemonImg.src = sprMovementDemonB64;

        sprMovementPlayer1Img.onload = () => {
            this.textures.addSpriteSheet("sprMovementPlayer1", sprMovementPlayer1Img, {
                frameWidth: 128,
                frameHeight: 128,
            });
            nLoaded++;
        };
        sprMovementPlayer1Img.src = sprMovementPlayer1B64;

        sprMovementPrincessImg.onload = () => {
            this.textures.addSpriteSheet("sprPrincessPlayer", sprMovementPrincessImg, {
                frameWidth: 56,
                frameHeight: 100,
            });
            nLoaded++;
        };
        sprMovementPrincessImg.src = sprMovementPrincessB64;

        sprBeetleEnemyImg.onload = () => {
            this.textures.addSpriteSheet("sprBeetleEnemy", sprBeetleEnemyImg, {
                frameWidth: 45,
                frameHeight: 32,
            });
            nLoaded++;
        };
        sprBeetleEnemyImg.src = sprBeetleEnemyB64;

        sprFlowerEnemyImg.onload = () => {
            this.textures.addSpriteSheet("sprFlowerEnemy", sprFlowerEnemyImg, {
                frameWidth: 44.5,
                frameHeight: 64,
            });
            nLoaded++;
        };
        sprFlowerEnemyImg.src = sprFlowerEnemyB64;
        sprBonusPointImg.onload = () => {
            this.textures.addSpriteSheet("sprBonusPoint", sprBonusPointImg, {
                frameWidth: 34,
                frameHeight: 34,
            });
            nLoaded++;
            if (nLoaded >= nAssets) {
                var actualCreate = this.createGameObjects.bind(this);
                actualCreate();
            }
        };
        sprBonusPointImg.src = sprBlockCoinB64;
    }

    update() { }
}