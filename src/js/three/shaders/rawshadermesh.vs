precision mediump float;
precision mediump int;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 position;
attribute vec2 uv;

// varying vec2 vUv;

void main(void) {

    // vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);

}