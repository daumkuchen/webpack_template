import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer, WebGLRenderTarget,
    NearestFilter, ClampToEdgeWrapping,
} from 'three';

import RawShaderMesh from 'js/three/modules/RawShaderMesh';
import Stats from 'js/three/modules/Stats';
import Dat from 'js/three/modules/Dat';

const OrbitControls = require('three-orbitcontrols');

export default class Stage {
    constructor() {

        /**
         *
         * @type {number}
         * @private
         */
        this._rendering = true;

        /**
         *
         * @type {PerspectiveCamera}
         * @private
         */
        this._camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);

        /**
         *
         * @type {Scene}
         * @private
         */
        this._scene = {
            base: new Scene(),
        };

        /**
         *
         * @type {WebGLRenderer}
         * @private
         */
        this._renderer = new WebGLRenderer( {
            antialias: true,
            alpha: true
        });

        /**
         *
         * @type {WebGLRenderTarget}
         * @private
         */
        this._renderer_target_elm = new WebGLRenderTarget(
            this.window_inner_width,
            this.window_inner_height,
            {
                magFilter: NearestFilter,
                minFilter: NearestFilter,
                wrapS: ClampToEdgeWrapping,
                wrapT: ClampToEdgeWrapping,
            }
        );

        this._renderer_target = {
            base: this._renderer_target_elm.clone(),
        }

        /**
         *
         * @type {Controls}
         * @private
         */
        this.controls = null;
        
        /**
         *
         * @type {number}
         * @private
         */
        this._cnt = 0;

        /**
         *
         * @type {number}
         * @private
         */
        this._speed = 1;

        /**
         *
         * @type {{x: number, y: number}}
         * @private
         */
        this._mouse = {
            x: 0,
            y: 0
        };
        /**
         *
         * @type {{x: number, y: number}}
         * @private
         */
        this._mouse_pos = {
            x: 0,
            y: 0
        };

        /**
         *
         * @type {{x: number, y: number}}
         * @private
         */
        this._mouse_ratio = {
            x: .1,
            y: .1
        };

        /**
         *
         * @type {RawShaderMesh}
         * @private
         */
        this._rawShaderMesh = new RawShaderMesh();

        /**
         *
         * @type {Stats}
         * @private
         */
        this.stats = new Stats();

        /**
         *
         * @type {Stats}
         * @private
         */
        this.dat = new Dat();

        /**
         *
         * @type {Common}
         * @private
         */
        this.window_inner_width = window.innerWidth;
        this.window_Inner_height = window.innerHeight;
        this.SWITCH_WIDTH = 768;

        /**
         *
         * @type {Dom}
         * @private
         */

        this.stage = document.getElementById('stage');

        /**
         *
         * @type {Status, Flag}
         * @private
         */


    }

    /**
     *
     * @public
     */
    setup() {

        this._camera.position.z = 2;
        // this._camera.lookAt(0, 0, 0);

        this._renderer.setClearColor(0x000000, 0.);
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setPixelRatio(window.devicePixelRatio || 1);

        this.controls = new OrbitControls(this._camera, this._renderer.domElement);

        this._rawShaderMesh.setup();
        this._scene.base.add(this._rawShaderMesh.mesh);

        this.stage.appendChild(this._renderer.domElement);

        window.addEventListener('resize', this.resize.bind(this));

        this.stage.addEventListener('mousemove', e => {
            this._mouse = {
                x: (2 * e.clientX - window.innerWidth) / window.innerWidth,
                y: (-1 * (2 * e.clientY - window.innerHeight) / window.innerHeight)
            };
        });

        this.stats.setup();
        this.dat.setup();

    }

    /**
     *
     * @private
     */
    update() {

        this._cnt += this._speed;
        this._cnt = this._cnt % 360;

        this._mouse_pos.x += (this._mouse.x - this._mouse_pos.x) * this._mouse_ratio.x;
        this._mouse_pos.y += (this._mouse.y - this._mouse_pos.y) * this._mouse_ratio.y;

        this._rawShaderMesh.update(this._cnt);
        this._rawShaderMesh.mouseMoved(this._mouse_pos.x, this._mouse_pos.y);

        this.stats.update();

    }

    /**
     *
     * @public
     */
    render() {

        this.update();

        this._renderer.render(this._scene.base, this._camera);

        window.addEventListener('keydown', (e) => {
            this._rendering = e.keyCode !== 27;
        }, false);
        if (this._rendering) requestAnimationFrame(this.render.bind(this));

    }


    /**
     * @public
     */
    resize() {

        this.window_inner_width = window.innerWidth;
        this.window_Inner_height = window.innerHeight;

        this._camera.aspect = this.window_inner_width / this.window_Inner_height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(this.window_inner_width, this.window_Inner_height);
        this._rawShaderMesh.resize(this.window_inner_width, this.window_Inner_height);

    }

    scroll(st) {
    }

}

window.Stage = Stage;