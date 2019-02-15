import {
    PlaneBufferGeometry,
    RawShaderMaterial,
    Mesh, Math as _Math,
    Vector2,
    DoubleSide
} from 'three';

import vertexShader from 'js/three/shaders/rawshadermesh.vs';
import fragmentShader from 'js/three/shaders/rawshadermesh.fs';

export default class RawShaderMesh {
    constructor() {

        /**
         *
         * @type {{time: {type: string, value: number}}}
         */
        this.uniforms = {
            time: {
                type: 'f',
                value: 0.
            },
            resolution: {
                type: 'v2',
                value: new Vector2()
            }
        };

        /**
         *
         * @type {PlaneBufferGeometry}
         */
        this.geometry = null;

        /**
         *
         * @type {RawShaderMaterial}
         */
        this.material = null;

        /**
         *
         * @type {Mesh}
         */
        this.mesh = null;

    }

    setup() {

        this.geometry = new PlaneBufferGeometry(1, 1, 1);

        this.material = new RawShaderMaterial( {
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: this.uniforms,
            side: DoubleSide,
        });

        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.material.dispose();
        this.mesh.geometry.dispose();
        
        this.uniforms.resolution.value.x = window.innerWidth;
        this.uniforms.resolution.value.y = window.innerHeight;

    }

    /**
     *
     * @param cnt {number}
     */
    update(cnt) {

        this.uniforms.time.value = _Math.degToRad(cnt);

    }

    /**
     *
     * @param width, height {number}
     */
    resize(width, height) {

        this.uniforms.resolution.value.x = width;
        this.uniforms.resolution.value.y = height;

    }

    /**
     *
     * @param x, y {number}
     */
    mouseMoved(x, y) {

        this.mesh.position.x = x * .1;
        this.mesh.position.y = y * .1;

    }

}