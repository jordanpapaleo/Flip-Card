import View             from 'famous-creative/display/View';
import Timeline         from 'famous-creative/animation/Timeline';
import Verses           from './data/Verses';
import {Card}           from './Card';

//Famous Components
const Curves         = FamousPlatform.transitions.Curves;

//Physics Components
const Gravity1D      = FamousPlatform.physics.Gravity1D;
const Gravity3D      = FamousPlatform.physics.Gravity3D;
const Vec3           = FamousPlatform.math.Vec3;
const Drag           = FamousPlatform.physics.Drag;

export class App extends View {
    constructor(node, options) {
        super(node, options);

        this.setAlign(.5, .5);
        this.setMountPoint(.5, .5);
        this.setSizeModeAbsolute();
        this.setAbsoluteSize(300, 200);

        this.cards = [];
        Verses.forEach((verse, i) => {
            if(i > 0) return;
            let card = new Card(this.node.addChild(), {
                model: { verse, i }
            });

            this.cards.push(card);
        });
    }
}

const rootNode  = FamousPlatform.core.Famous.createContext('body');
let camera      = new FamousPlatform.components.Camera(rootNode);
camera.setDepth(20000);

window.app = new App(rootNode.addChild(), {});