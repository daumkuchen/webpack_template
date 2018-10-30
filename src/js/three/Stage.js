import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';

import RawShaderMesh from './modules/RawShaderMesh';

export default class Stage {
    constructor() {

        /**
         *
         * @type {number}
         * @private
         */
        this._rendering = null;

        /**
         *
         * @type {PerspectiveCamera}
         * @private
         */
        this._camera = new PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );

        /**
         *
         * @type {Scene}
         * @private
         */
        this._scene = new Scene();

        /**
         *
         * @type {WebGLRenderer}
         * @private
         */
        this._renderer = new WebGLRenderer( {
            antialias: true,
            alpha: true
        } );

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
        this._mousePos = {
            x: 0,
            y: 0
        };

        /**
         *
         * @type {{x: number, y: number}}
         * @private
         */
        this._mouseRatio = {
            x: 0.1,
            y: 0.1
        };

        /**
         *
         * @type {number}
         * @private
         */
        this._initWidth = window.innerWidth;

        //


        /**
         *
         * @type {RawShaderMesh}
         * @private
         */
        this._rawShaderMesh = new RawShaderMesh( 1, 1 );

    }

    /**
     *
     * @public
     */
    setup() {
        this._camera.position.y = 0;
        this._camera.position.z = 2;
        // this._camera.lookAt( 0, 0, 0 );
        // ==========================================
        this._renderer.setClearColor( 0x010c22, 0.0 );
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        this._renderer.setPixelRatio( window.devicePixelRatio );
        // ==========================================

        this._rawShaderMesh.setup();
        this._scene.add( this._rawShaderMesh.mesh );

        // ==========================================


        document.getElementById( 'stage' ).appendChild( this._renderer.domElement );

        window.addEventListener( 'resize', this.resize.bind( this ) );

        document.getElementById( 'stage' ).addEventListener( 'mousemove', e => {
            this._mouse = {
                x: (2 * e.clientX - window.innerWidth) / window.innerWidth,
                y: (-1 * (2 * e.clientY - window.innerHeight) / window.innerHeight)
            };
        } );

    }

    /**
     *
     * @private
     */
    update() {
        this._mousePos.x += (this._mouse.x - this._mousePos.x) * this._mouseRatio.x;
        this._mousePos.y += (this._mouse.y - this._mousePos.y) * this._mouseRatio.y;

        this._cnt += this._speed;
        this._cnt = this._cnt % 360;

        this._rawShaderMesh.update( this._cnt );
        this._rawShaderMesh.mouseMoved( this._mousePos.x, this._mousePos.y );
    }

    /**
     *
     * @public
     */
    render() {
        this.update();

        this._renderer.render( this._scene, this._camera );

        if ( this._rendering ) cancelAnimationFrame( this._rendering );
        this._rendering = requestAnimationFrame( this.render.bind( this ) );
    }


    /**
     * @public
     */
    resize() {

        if ( this._initWidth === window.innerWidth ) {
            return;
        }

        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize( window.innerWidth, window.innerHeight );

        this._rawShaderMesh.resize( window.innerWidth, window.innerHeight );
    }


    scroll(st) {
    }

}

window.Stage = Stage;