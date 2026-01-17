import { useEffect, useRef, useState } from "react";
import { type Mesh, type ShaderMaterial } from "three";
import { useCappedFrame } from "~/hooks/useCappedFrame";

// @ts-expect-error shader files
import fragmentShader from "./fragment.glsl"
// @ts-expect-error shader files
import vertexShader from "./vertex.glsl"

/**
 * Arc Reactor Sphere - Iron Man inspired 3D element
 * A glowing icosahedron with fresnel shader effect
 */
export default function ArcReactorSphere() {
	const [isHovered, setIsHovered] = useState(false);
	const meshRef = useRef<Mesh>(null);
	const shaderRef = useRef<ShaderMaterial>(null);

	// Animation targets (0-1 range)
	const themeTarget = useRef(1); // 1 = dark (default)
	const hoverTarget = useRef(0);
	const themeCurrent = useRef(1);
	const hoverCurrent = useRef(0);

	const uniforms = useRef({
		uTime: { value: 0 },
		uTheme: { value: 1 },
		uHover: { value: 0 }
	});

	useEffect(() => {
		const body = document.body;
		if (isHovered) {
			body.style.cursor = "pointer";
			hoverTarget.current = 1;
		} else {
			body.style.cursor = "default";
			hoverTarget.current = 0;
		}
	}, [isHovered]);

	// Smooth interpolation helper
	const lerp = (current: number, target: number, speed: number) => {
		return current + (target - current) * speed;
	};

	useCappedFrame(() => {
		if (!meshRef.current || !shaderRef.current) return;

		// Rotate the sphere
		meshRef.current.rotation.x += 0.02;
		meshRef.current.rotation.y -= 0.02;

		// Smooth transitions
		themeCurrent.current = lerp(themeCurrent.current, themeTarget.current, 0.05);
		hoverCurrent.current = lerp(hoverCurrent.current, hoverTarget.current, 0.1);

		// Update shader uniforms
		shaderRef.current.uniforms.uTime.value += 1;
		shaderRef.current.uniforms.uTheme.value = themeCurrent.current;
		shaderRef.current.uniforms.uHover.value = hoverCurrent.current;

		// JARVIS theme detection - 0=light, 0.5=joy, 1=dark
		const theme = localStorage.getItem("theme") || "dark";
		if (theme === "dark") {
			themeTarget.current = 1;
		} else if (theme === "joy") {
			themeTarget.current = 0.5;
		} else {
			themeTarget.current = 0;
		}
	}, 30);

	return (
		<group>
			<mesh
				ref={meshRef}
				onPointerOver={() => setIsHovered(true)}
				onPointerOut={() => setIsHovered(false)}
			>
				<icosahedronGeometry args={[1, 1]} />
				<shaderMaterial
					ref={shaderRef}
					fragmentShader={fragmentShader}
					vertexShader={vertexShader}
					uniforms={uniforms.current}
				/>
			</mesh>
		</group>
	);
}
