precision mediump float;
precision mediump int;

uniform float uTime;

void main() {
	gl_FragColor = vec4( sin( uTime ), 0.0, 0.0, 1.0 );
}
