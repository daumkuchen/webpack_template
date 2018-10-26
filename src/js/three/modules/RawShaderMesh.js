import { PlaneBufferGeometry, RawShaderMaterial, Mesh, Math as _Math } from 'three';


import vertexShader from '../shaders/vertex.vs';
import fragmentShader from '../shaders/fragment.fs';


export default class RawShaderMesh {
    constructor( width, height ) {

        /**
         *
         * @type {{time: {type: string, value: number}}}
         */
        this.uniforms = {
            uTime: {
                type: 'f',
                value: 0
            }
        };

        /**
         *
         * @type {PlaneBufferGeometry}
         */
        this.geometry = new PlaneBufferGeometry( width, height, 1 );

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
        this.material = new RawShaderMaterial( {
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: this.uniforms
        } );

        this.mesh = new Mesh( this.geometry, this.material );
    }

    /**
     *
     * @param cnt {number}
     */
    update( cnt ) {
        this.uniforms.uTime.value = _Math.degToRad( cnt );
    }
}