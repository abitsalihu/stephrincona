uniform float opacity;

void main(){


    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;

    strength = strength * opacity;

    // gl_FragColor = vec4(1., 1., 1., strength);

    gl_FragColor = vec4(0.737,0.949,0.965, strength);
}