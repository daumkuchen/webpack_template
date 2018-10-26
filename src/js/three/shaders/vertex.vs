precision mediump float;
precision mediump int;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 position;
attribute vec4 color;

void main()	{
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}