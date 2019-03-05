precision mediump float;
precision mediump int;

uniform float time;
uniform float alpha;
uniform float dpr;
uniform vec2 resolution;
uniform vec2 mouse;
uniform sampler2D texture;

uniform float color_r;
uniform float color_g;
uniform float color_b;
uniform float power;

varying vec2 vUv;

void main() {

    vec4 tex = texture2D(texture, vUv * power);
    vec3 color = vec3(tex.r * color_r, tex.g * color_g, tex.b * color_b);
    vec4 dest = vec4(color, tex.a);
    gl_FragColor = dest;

}