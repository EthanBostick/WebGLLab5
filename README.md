# WebGL Lighting Lab

Reflection Questions

    What is ambient lighting? 
    A uniform base level of light applied to all surfaces in a scene to simulate indirect light scattering off the environment.

    What is diffuse lighting? 
    Directional light that scatters when it hits a surface. It appears brightest when the surface is directly facing the light source and darker as the surface angles away.

    Why do we need normal vectors? 
    Normal vectors define the exact perpendicular facing direction of a surface. They are mathematically required to determine the angle between the incoming light ray and the 3D object.

    What role does the dot product play in lighting calculations? 
    It calculates the cosine of the angle between the surface normal and the light direction vector. This provides a multiplier (from 0.0 to 1.0) determining exactly how much direct light strikes that pixel.

    How does changing light direction affect a 3D object? 
    It shifts the highlights and shadows, which is necessary for the human eye to perceive 3D shape, volume, and depth on a 2D screen.

    How does changing light color affect realism? 
    Light color provides environmental context and mood (e.g., warm orange for sunsets, cool blue for moonlight, harsh white for sterile bulbs).

    Which modification produced the most interesting result? 
    Combining animated color and animated direction (Disco Cube) produced the most visually engaging result by constantly shifting the visual state.

    Why do game engines automate lighting calculations? 
    Calculating vector normalization, dot products, and multi-channel light scattering per-pixel is computationally heavy. Game engines provide optimized, hardware-accelerated rendering pipelines so developers don't have to write lower-level GLSL math from scratch.