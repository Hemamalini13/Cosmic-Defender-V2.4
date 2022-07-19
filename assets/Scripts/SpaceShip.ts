import Enemy from "./Enemy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    SpaceShip = cc.Class({
        
    });

    left = 0;
    right = 0;
    projectile = 0;

    canShoot = true;
    time: number;

    @property(cc.Prefab)
    projectilePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    enemyPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    live1Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    live2Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    live3Prefab: cc.Prefab = null;

    // @property(cc.Class)
    // enemy: Enemy = null;

    @property(cc.Label)
    score: cc.Label = null;

    @property(cc.Label)
    gameOver: cc.Label = null;

    @property(cc.Label)
    gameWon: cc.Label = null;

    lives: Array<cc.Node> = [];
    playersLife = 3;
    l = 0;

    move(event: KeyboardEvent) {
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                this.left = 1;
                break;
            case cc.macro.KEY.right:
                this.right = 1;
                break;
            case cc.macro.KEY.space:
                this.projectile = 1;
                break;
        }
    }

    stop(event: KeyboardEvent) {
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                this.left = 0;
                break;
            case cc.macro.KEY.right:
                this.right = 0;
                break;
            case cc.macro.KEY.space:
                this.projectile = 0;
                break;
        }
    }

    start () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.move, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.stop, this);
        this.createEnemy();

        cc.director.preloadScene('GamePlay');
        
        cc.director.getCollisionManager().enabled = true;
    }

    update (dt) {
        var getScore = this.node.parent.getComponentInChildren('Enemy').addScore;
        this.score.string = "Score: " + getScore.toString();

        var currentTime = cc.director.getTotalTime();
        var dTime = currentTime - this.time;
        if (dTime >= 500)
            this.canShoot = true;
        
        if (this.left == 1) {
            if (this.node.position.x <= -450)
                this.node.setPosition(-450, this.node.position.y);
            else
                this.node.setPosition(this.node.position.x -= 300*dt, this.node.position.y);
        }
        else if (this.right == 1) {
            if (this.node.position.x >= 450)
                this.node.setPosition(450, this.node.position.y);
            else
                this.node.setPosition(this.node.position.x += 300*dt, this.node.position.y);
        }
        else if (this.projectile == 1) {
            if (this.canShoot)
                this.createProjectile();
        }
    }

    createProjectile() {
        this.canShoot = false;
        this.time = cc.director.getTotalTime();
        var shoot = cc.instantiate(this.projectilePrefab);
        shoot.setPosition(this.node.position.x, -220);
        this.node.parent.addChild(shoot);
    }

    createEnemy() {
        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 12; j++) {
                var enemies = cc.instantiate(this.enemyPrefab);
                if(j==0) {
                    var posX = -440;
                    var posY = 270;
                    enemies.setPosition(posX, posY += 100*i);
                } else {
                    enemies.setPosition(posX += 80, posY);
                }
                this.node.parent.addChild(enemies);
            }
        }
        var lives1 = cc.instantiate(this.live1Prefab);
        var lives2 = cc.instantiate(this.live2Prefab);
        var lives3 = cc.instantiate(this.live3Prefab);

        this.node.parent.addChild(lives1);
        this.node.parent.addChild(lives2);
        this.node.parent.addChild(lives3);
        this.lives = [lives1, lives2, lives3];
    }

    //TAGS
    //  1 - Space Ship
    //  2 - Projectile
    //  3 - Enemy
    //  4 - Enemy Projectile

    onCollisionEnter(otherCollider: cc.Collider, selfCollider: cc.Collider) {
        if(otherCollider.tag == 3 || otherCollider.tag == 4) {
            otherCollider.node.destroy();
            this.playersLife--;
            this.lives[this.l].destroy();
            this.l++;
            if(this.playersLife < 1) {
                this.gameOver.enabled = true;
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.move, this);
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.stop, this);
                cc.director.loadScene('GamePlay');
            }
        }
    }
}
