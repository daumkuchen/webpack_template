precision mediump float;
precision mediump int;

uniform float time;
uniform vec2 resolution;

#pragma glslify: fbm = require("./glslify/noise/fbm/3d")

void main() {

	vec2 uv = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
	uv *= 5.;
	float r = fbm(vec3(uv.x, uv.y, time * .5), 8);
	float g = fbm(vec3(uv.x, uv.y, time * .5), 8);
	float b = fbm(vec3(uv.x, uv.y, time * .5), 8);
	vec3 color = vec3(r, g, b);
	gl_FragColor = vec4(color, 1.);
	
}