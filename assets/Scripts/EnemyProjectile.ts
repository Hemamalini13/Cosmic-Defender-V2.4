const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    start () {

    }

    update (dt) {
        this.node.setPosition(this.node.position.x, this.node.position.y -= 30*dt);
        if(this.node.position.y < -320)
            this.node.destroy();
    }
}
