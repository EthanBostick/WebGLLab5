DISCO TIME:
<img width="506" height="467" alt="Screenshot 2026-10-06 at 10 02 56 AM" src="https://github.com/user-attachments/assets/cd48318b-8693-4df0-8897-b51163d758e1" />

pointlight:
<img width="562" height="467" alt="Screenshot 2026-10-06 at 10 05 33 AM" src="https://github.com/user-attachments/assets/9d1daa86-71da-4634-a577-03060be7c9f2" />




Activity 1: 
Ambient Light
What is ambient light? 
- Ambient light is a non-directional, uniform base level of light that illuminates all surfaces in a scene equally, regardless of surface orientation or position.
What happens when ambient light intensity increases? 
- The unlit shadow areas become brighter and softer, decreasing the contrast between lit and unlit sides.
Which intensity produces the brightest scene? 
- 1.0 produces the brightest scene.
Does ambient light create highlights or shadows?
- No. Ambient light does not have a specific origin or direction, so it cannot produce localized highlights or cast distinct shadows.
Activity 2: 
Directional Light
Which faces of the cube become brighter? 
- Faces whose normal vectors point directly toward the light source become the brightest.
Which faces become darker?
- Faces pointing perpendicular to or away from the light vector become darker.
Why does changing the light position affect visibility? 
- Diffuse lighting depends on the dot product of the surface normal and the light vector ($\mathbf{N} \cdot \mathbf{L}$). Changing the light position changes the angles at which light strikes each surface, redistributing which faces reflect light toward the camera.
Which direction produces the strongest lighting effect?
- Angled lighting (such as (1, 1, 1) or (1, 0.5, 0)) produces the strongest 3D depth effect because it strikes multiple visible faces at varying angles, creating clear contrast between bright, mid-tone, and shadowed surfaces.
Activity 3: 
Colored LightsWhich color creates the highest contrast? 
- Pure red (0xff0000) or pure blue (0x0000ff) against a dark background, or yellow (0xffff00) against dark shadows.
Which color appears brightest? 
- Yellow (0xffff00) appears visually brightest because it combines full red and full green spectral channels.
Why do dark areas remain dark even when the light color changes? 
- Dark areas receive minimal to no direct light from the directional source; their illumination comes purely from the ambient term, which is unaffected by directional diffuse color changes unless the ambient light itself is tinted.
Which color feels the most realistic? 
- A slightly warm, pale yellow or neutral soft white feels most realistic.
Which color creates the most dramatic effect? 
- Pure red or deep blue creates the most dramatic, stylized mood.
Activity 4: 
Animated Light
Why do the highlights move across the cube? 
- The light vector's orientation continuously orbits or oscillates relative to the cube's surfaces, changing the angle of incidence per frame.
Why do some faces become brighter over time?
- As a face rotates or the light orbits into closer alignment with that face's normal vector, the cosine of the angle approaches 1.0, maximizing diffuse reflectance.
Why does the cube appear different as it rotates? 
- Rotation constantly changes both the angle between the surfaces and the light, and the angle between the surfaces and the camera view.
How would animated lighting improve a video game scene? 
- It adds realism, immersion, and dynamic atmosphere—such as simulated day-night cycles, moving torches, swinging overhead lamps, or passing headlights.
Activity 5: 
Disco Cube
Implemented in mode '5'. Light direction, light color channels, and cube rotation update dynamically each frame while ambient light stays active.
Activity 6: 
Purple Light
What color code did you use? 
- Magenta/Purple code 0xff00ff (in WebGL/GLSL: vec3(1.0, 0.0, 1.0) or vec3(0.6, 0.1, 0.9)).Does your purple light appear exactly how you expected? 
- Yes, combining full red and blue channels while keeping green at zero creates a vibrant, neon violet/magenta illumination across the lit faces.
Activity 7: 
Random Color Light Show
How did you generate random colors? 
- Using continuous phase-offset sinusoidal functions (Math.abs(Math.sin(...))) or updating a vec3(Math.random(), Math.random(), Math.random()) via an interval/timer.
Which colors looked best? 
- Vibrant, saturated hues like cyan, magenta, and amber.
Did any colors make the cube difficult to see? 
- Very dark hues (colors where R, G, and B are all near zero) blend into the dark background, leaving only faint ambient outlines.
Activity 8: 
Point Light
How is a Point Light different from a Directional Light? 
- A directional light emits parallel rays from infinitely far away in a single uniform direction across the whole scene. A point light emits light outwards in all directions from a specific point in space, and its intensity falls off with distance.
Which light type resembles a light bulb? 
- Point light.
Which light type resembles sunlight? 
- Directional light.
What happens when the Point Light is moved closer to the cube?
- The illumination on nearby faces becomes dramatically brighter and the angle across adjacent vertices shifts noticeably.
What happens when it is moved farther away?
- The light becomes dimmer due to attenuation/falloff and distributes more evenly across the surface.
Activity 9: 
Two Point Lights
Which color dominates the scene? 
- Whichever point light has higher intensity or is positioned closer to the camera-facing surfaces.
What happens when lights overlap?
- Their color contributions add together additively (e.g., overlapping red and green yields yellow).
Does the object look more realistic with multiple lights?
- Yes, real-world scenes rely on multi-point lighting to define contours.

Reflection Questions
What is ambient lighting? 
- Ambient lighting is an omnidirectional, uniform base level of illumination applied equally across all objects in a scene, ensuring surfaces not directly hit by a light source remain visible.
What is directional lighting? 
- Directional lighting simulates a distant light source (like the sun) where all rays are parallel and travel in a single constant direction across the entire scene.
What is point lighting? 
- Point lighting represents a localized light source (like a bare light bulb or candle) located at specific 3D coordinates that radiates light outward in all 360 degrees, typically with distance attenuation.
Why do we need normals for lighting calculations? 
- Normal vectors define the perpendicular direction facing outward from each surface point, which is mathematically required to compute the angle at which incoming light hits that surface.
Why do some faces of an object appear brighter than others? 
- Surfaces that face directly toward a light source receive light rays at a steeper angle of incidence, concentrating more energy per unit area and yielding higher diffuse reflection values than surfaces angled away.
How does moving a light source affect a scene? 
- Moving a light shifts where highlights and shadows fall across geometry, changing depth perception and visual focus.
How does changing light color affect realism and mood? 
- Warm hues create cozy, daytime, or sunset atmospheres, while cool tones evoke night, sterile environments, or tension; unnatural vibrant primaries produce disco or sci-fi aesthetics.
Why does Three.js make lighting easier than raw WebGL? 
- Three.js automates shader compilation, matrix transformations, uniform bindings, attenuation math, and multi-light accumulation pipelines under high-level classes (THREE.DirectionalLight, THREE.PointLight), whereas raw WebGL requires manually implementing vector math in GLSL shaders and managing buffer bindings.
Which light type did you find most useful? 
- Directional lighting combined with a subtle ambient baseline is the most useful starting point because it clearly establishes overall scene depth and global orientation with minimal computational cost.
What was the most interesting thing you learned during this lab? 
- The most interesting takeaway was seeing how simple dot product mathematics between a normal vector and a light direction directly generates convincing 3D shading from flat polygons.
