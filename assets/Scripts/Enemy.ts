import SpaceShip from "./SpaceShip";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {    

    Enemy = cc.Class();

    // @property(cc.Class)
    // spaceShip: SpaceShip = null;

    addScore = 0;

    start () {
        cc.director.getCollisionManager().enabled = true;
    }

    update (dt) {
        // var obj = new SpaceShip();
        // var scoreUpdate = this.addScore.toString();
        // obj.score.string = "Score: " + scoreUpdate;

        this.node.setPosition(this.node.position.x, this.node.position.y -= 20*dt);
        if(this.node.position.y < -320) {
            // obj.playersLife--;
            this.node.destroy();
        }
    }

    //TAGS
    //  1 - Space Ship
    //  2 - Projectile
    //  3 - Enemy
    //  4 - Enemy Projectile

    onCollisionEnter(otherCollider: cc.Collider, selfCollider: cc.Collider) {
        if(otherCollider.tag == 2) {
            this.node.destroy();
            otherCollider.node.destroy();
            this.addScore += 100;
        }
    }
}

