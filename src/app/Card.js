import View             from 'famous-creative/display/View';

const Curves         = FamousPlatform.transitions.Curves;

export class Card extends View {
    constructor(node, options) {
        super(node, options);

        this.model = options.model.verse;
        this.model.i = options.model.i;

        this.setSizeMode(0, 0);
        this.setProportionalSize(1, 1);

        this.setOrigin(.5, .5, .5);
        this.setMountPoint(.5, 0);
        this.setAlign(.5, 0);

        this.renderFront();
        this.renderBack();
        this.setEvents();
    }

    renderFront() {
        this.front = new View(this.node.addChild(), {});
        this.front.setSizeMode(0, 0);
        this.front.setProportionalSize(1, 1);
        this.front.setPositionZ(50);

        this.front.setOrigin(.5, .5, .5);
        this.front.setMountPoint(.5, 0);
        this.front.setAlign(.5, 0);

        this.front.createDOMElement({
            properties: {
                'border': '1px solid black',
                'backface-visibility': 'hidden',
                'z-index': 50,
                'background-color': 'white',
                'text-align': 'center',
                'border-radius': '4px'
            },
            classes: ['card-front'],
            content: `<h1>${this.model.location.book} ${this.model.location.chapter}:${this.model.location.verse.start}</h1>`
        });
    }

    renderBack() {
        this.back = new View(this.node.addChild(), {});
        this.back.setSizeMode(0, 0);
        this.back.setProportionalSize(1, 1);
        this.back.setPositionZ(25);

        this.back.setOrigin(.5, .5, .5);
        this.back.setMountPoint(.5, 0);
        this.back.setAlign(.5, 0);

        this.back.createDOMElement({
            properties: {
                'border': '1px solid black',
                'backface-visibility': 'hidden',
                'z-index': 25,
                'background-color': 'white',
                'border-radius': '4px',
                'padding': '25px',
                'box-sizing': 'border-box'
            },
            classes: ['card-back'],
            content: `<strong>${this.model.verse}<strong>`
        });

        this.back.setRotationY((Math.PI * 180) / 180);
    }

    setEvents() {
        this.on('mousedown', () => {
            this.haltRotation();
            let rotationDeg = (this.getRotationY() === 0) ? 180 : 0;

            this.setRotationY(Math.PI * rotationDeg / 180, {
                curve: Curves.inOutBack,
                duration: 1000
            });
        });
    }
}