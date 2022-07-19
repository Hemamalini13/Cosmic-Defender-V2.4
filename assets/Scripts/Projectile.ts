import SpaceShip from "./SpaceShip";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Class)
    spaceShip: SpaceShip = null;
    
    start () {

    }

    update (dt) {
        this.node.setPosition(this.node.position.x, this.node.position.y += 50*dt);
        if(this.node.position.y > 320)
            this.node.destroy();
    }
}
