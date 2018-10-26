import { PlaneBufferGeometry, RawShaderMaterial, Mesh, Math as _Math, Vector2 } from 'three';


import vertexShader from '../shaders/vertex.vs';
import fragmentShader from '../shaders/fragment.fs';


export default class RawShaderMesh {
    constructor( width, height ) {

        /**
         *
         * @type {{time: {type: string, value: number}}}
         */
        this.uniforms = {
            time: {
                type: 'f',
                value: 0
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

        this.uniforms.resolution.value.x = 1;
        this.uniforms.resolution.value.y = 1;
    }

    /**
     *
     * @param cnt {number}
     */
    update( cnt ) {
        this.uniforms.time.value = _Math.degToRad( cnt );
    }
}