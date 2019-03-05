import * as dat from 'dat.gui';

export default class Dat {
    constructor() {

        /**
         *
         * @type {Dat}
         */
        this.dat = null;

    }

    setup() {

        this.dat = new dat.GUI();

        this._setColor();

    }

    _setColor() {

        let controls = new function() {
            this.R = 1;
            this.G = 1;
            this.B = 1;
        };

        let folder = this.dat.addFolder('color');

        folder.add(controls, 'R', 0, 1, 0.01).onChange((value) => {
            window._develop.stage.fx.uniforms.color_r.value = value;
        });

        folder.add(controls, 'G', 0, 1, 0.01).onChange((value) => {
            window._develop.stage.fx.uniforms.color_g.value = value;
        });

        folder.add(controls, 'B', 0, 1, 0.01).onChange((value) => {
            window._develop.stage.fx.uniforms.color_b.value = value;
        });

        folder.open();

    }

}