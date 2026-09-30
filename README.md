# WebGL Lighting Lab
screenshots:
<img width="536" height="550" alt="Screenshot 2026-09-29 at 9 34 14 PM" src="https://github.com/user-attachments/assets/f9a7f3b6-12c9-4315-a077-afd825d06279" />
<img width="560" height="555" alt="Screenshot 2026-09-29 at 9 34 23 PM" src="https://github.com/user-attachments/assets/c8d5fe36-9c59-4d38-a0da-a73bc703994d" />
<img width="526" height="508" alt="Screenshot 2026-09-29 at 9 34 29 PM" src="https://github.com/user-attachments/assets/0bdcfb4c-de5b-43c6-97ac-fd185b1a87bd" />
<img width="531" height="675" alt="Screenshot 2026-09-29 at 9 34 34 PM" src="https://github.com/user-attachments/assets/3c74fadd-959d-48c5-aaa9-7b82c4b51ee4" />
<img width="533" height="554" alt="Screenshot 2026-09-29 at 9 34 45 PM" src="https://github.com/user-attachments/assets/91370675-6c59-4613-89ad-2ceb55212738" />


Reflection Questions:
1) What is ambient lighting? 
    A uniform base level of light applied to all surfaces in a scene to simulate indirect light scattering off the environment.
2) What is diffuse lighting? 
    Directional light that scatters when it hits a surface. It appears brightest when the surface is directly facing the light source and darker as the surface angles away.
3) Why do we need normal vectors? 
    Normal vectors define the exact perpendicular facing direction of a surface. They are mathematically required to determine the angle between the incoming light ray and the 3D object.
4) What role does the dot product play in lighting calculations? 
    It calculates the cosine of the angle between the surface normal and the light direction vector. This provides a multiplier (from 0.0 to 1.0) determining exactly how much direct light strikes that pixel.

5) How does changing light direction affect a 3D object? 
    It shifts the highlights and shadows, which is necessary for the human eye to perceive 3D shape, volume, and depth on a 2D screen.

6) How does changing light color affect realism? 
    Light color provides environmental context and mood (e.g., warm orange for sunsets, cool blue for moonlight, harsh white for sterile bulbs).

7) Which modification produced the most interesting result? 
    Combining animated color and animated direction (Disco Cube) produced the most visually engaging result by constantly shifting the visual state.

8) Why do game engines automate lighting calculations? 
    Calculating vector normalization, dot products, and multi-channel light scattering per-pixel is computationally heavy. Game engines provide optimized, hardware-accelerated rendering pipelines so developers don't have to write lower-level GLSL math from scratch.
