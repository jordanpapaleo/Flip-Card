import Verses           from './data/Verses';
import {Card}           from './Card';

//Famous Components
const Curves            = Famous.transitions.Curves;
const Node              = Famous.core.Node;

export class App extends Node {
    constructor() {
        super();

        this
            .setAbsoluteSize(300, 200)
            .setSizeMode('absolute', 'absolute')
            .setAlign(.5, .5)
            .setMountPoint(.5, .5)
            .setOrigin(.5, .5);

        this.viewed = [];
        this.queued = [];

        Verses.forEach((verse, i) => {
            let card = new Card(verse);
            this.queued.push(card);
            this.addChild(card);
        });

        this.setEvents();
    }

    setEvents() {
        document.onkeydown = (e) => {
            console.log('e',e);

            switch(e.keyCode) {
                case 37: //left
                    console.log('left');
                    break;
                case 38: //up
                    console.log('up');
                    break;
                case 39: //right
                    console.log('right');
                    break;
                case 40: //down
                    console.log('down');
                    break;
            }
        };
    }
}

const scene = Famous.core.FamousEngine.createScene('#app');
window.app  = scene.addChild(new App());
