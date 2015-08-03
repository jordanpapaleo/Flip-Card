//Famous Components
const DOMElement        = Famous.domRenderables.DOMElement;
const Rotation          = Famous.components.Rotation;
const Node              = Famous.core.Node;
const Opacity           = Famous.components.Opacity;
const Curves            = Famous.transitions.Curves;
const Position          = Famous.components.Position;
const Scale             = Famous.components.Scale;

export class Card extends Node {
    constructor(model = {}) {
        super();

        this.model = model;
        console.log('model',model);
        this
            .setSizeMode('relative', 'relative')
            .setProportionalSize(1, 1)
            .setAlign(.5, 0)
            .setMountPoint(.5, 0)
            .setOrigin(.5, .5);

        this.domEl = new DOMElement(this, {
            classes: ['card']
        });

        this.rotation = new Rotation(this);

        this.renderFront();
        this.renderBack();
        this.setEvents();
    }

    renderFront() {
        let front = new Node();
        front
            .setSizeMode('relative', 'relative')
            .setProportionalSize(1, 1)
            .setAlign(.5, 0)
            .setMountPoint(.5, 0)
            .setOrigin(.5, .5);

        front.position = new Position(front);

        front.domEl = new DOMElement(front, {
            properties: {
                'z-index': 10,
                'text-align': 'center'
            },
            classes: ['card-front'],
            content: `<h1>${this.model.location.book} ${this.model.location.chapter}:${this.model.location.verse.start}</h1>`
        });

        this.addChild(front)
    }

    renderBack() {
        let back = new Node();
        back
            .setSizeMode('relative', 'relative')
            .setProportionalSize(1, 1)
            .setAlign(.5, 0)
            .setMountPoint(.5, 0)
            .setOrigin(.5, .5);

        back.position = new Position(back);
        back.rotation = new Rotation(back);
        back.rotation.setY(Math.PI);

        back.domEl = new DOMElement(back, {
            properties: {
                'z-index': 9
            },
            classes: ['card-back'],
            content: `<strong>${this.model.verse}<strong>`
        });

        this.addChild(back);
    }

    setEvents() {
        this.addUIEvent('click');
        this.onReceive = (event, payload) => {
            switch(event) {
                case 'click':
                    this.rotation.halt();
                    let rotationDeg = (this.rotation.getY() === 0) ? 180 : 0;
                    this.rotation.setY(Math.PI * rotationDeg / 180, {
                        curve: Curves.inOutBack,
                        duration: 1500
                    });
                    break;
                case 'mouseover':
                    break;
                case 'mouseout':
                    break;
            }
        };
    }
}
