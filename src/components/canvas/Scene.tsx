'use client'

import { AdaptiveDpr, Preload, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { isMobile } from 'react-device-detect'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { extend } from "@react-three/fiber"
import { useRef, useMemo } from 'react'

extend(THREE as any)

/**
 * Floating geometric shapes that respond to mouse
 */
function FloatingShapes() {
	const groupRef = useRef<THREE.Group>(null)
	const { pointer } = useThree()

	// Create random positions for shapes
	const shapes = useMemo(() => {
		return Array.from({ length: 8 }, (_, i) => ({
			position: [
				(Math.random() - 0.5) * 12,
				(Math.random() - 0.5) * 8,
				(Math.random() - 0.5) * 6 - 2
			] as [number, number, number],
			rotation: Math.random() * Math.PI,
			scale: 0.15 + Math.random() * 0.25,
			speed: 0.2 + Math.random() * 0.3,
			type: i % 4 // 0: box, 1: octahedron, 2: tetrahedron, 3: torus
		}))
	}, [])

	useFrame((state) => {
		if (!groupRef.current) return
		// Subtle rotation based on mouse
		groupRef.current.rotation.y = THREE.MathUtils.lerp(
			groupRef.current.rotation.y,
			pointer.x * 0.1,
			0.02
		)
		groupRef.current.rotation.x = THREE.MathUtils.lerp(
			groupRef.current.rotation.x,
			pointer.y * 0.05,
			0.02
		)
	})

	return (
		<group ref={groupRef}>
			{shapes.map((shape, i) => (
				<Float
					key={i}
					speed={shape.speed}
					rotationIntensity={0.5}
					floatIntensity={0.5}
					position={shape.position}
				>
					<mesh scale={shape.scale}>
						{shape.type === 0 && <boxGeometry args={[1, 1, 1]} />}
						{shape.type === 1 && <octahedronGeometry args={[1]} />}
						{shape.type === 2 && <tetrahedronGeometry args={[1]} />}
						{shape.type === 3 && <torusGeometry args={[1, 0.4, 8, 16]} />}
						<meshStandardMaterial
							color={['#60a5fa', '#a78bfa', '#f472b6', '#34d399'][shape.type]}
							transparent
							opacity={0.15}
							wireframe
						/>
					</mesh>
				</Float>
			))}
		</group>
	)
}

/**
 * Animated ring that pulses
 */
function PulsingRing({ position }: { position: [number, number, number] }) {
	const meshRef = useRef<THREE.Mesh>(null)

	useFrame((state) => {
		if (!meshRef.current) return
		const t = state.clock.elapsedTime
		meshRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1)
		meshRef.current.rotation.z = t * 0.2
		meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2
	})

	return (
		<mesh ref={meshRef} position={position}>
			<torusGeometry args={[1.5, 0.02, 16, 64]} />
			<meshStandardMaterial
				color="#60a5fa"
				emissive="#60a5fa"
				emissiveIntensity={0.5}
				transparent
				opacity={0.4}
			/>
		</mesh>
	)
}

/**
 * Orbiting particles around a point
 */
function OrbitingParticles({ center, count = 20, radius = 2 }: {
	center: [number, number, number]
	count?: number
	radius?: number
}) {
	const pointsRef = useRef<THREE.Points>(null)

	const particles = useMemo(() => {
		const positions = new Float32Array(count * 3)
		for (let i = 0; i < count; i++) {
			const angle = (i / count) * Math.PI * 2
			positions[i * 3] = Math.cos(angle) * radius
			positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5
			positions[i * 3 + 2] = Math.sin(angle) * radius
		}
		return positions
	}, [count, radius])

	useFrame((state) => {
		if (!pointsRef.current) return
		pointsRef.current.rotation.y = state.clock.elapsedTime * 0.3
		pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
	})

	return (
		<points ref={pointsRef} position={center}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					count={count}
					array={particles}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial
				size={0.05}
				color="#a78bfa"
				transparent
				opacity={0.8}
				sizeAttenuation
			/>
		</points>
	)
}

/**
 * Moving gradient sphere - positioned to not collide with content
 */
function GradientSphere() {
	const meshRef = useRef<THREE.Mesh>(null)
	const { pointer } = useThree()

	useFrame((state) => {
		if (!meshRef.current) return
		const t = state.clock.elapsedTime

		// Gentle floating motion
		meshRef.current.position.y = -2 + Math.sin(t * 0.5) * 0.3
		meshRef.current.position.x = 4 + Math.cos(t * 0.3) * 0.2

		// Respond to mouse
		meshRef.current.rotation.y = t * 0.1 + pointer.x * 0.2
		meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1 + pointer.y * 0.1
	})

	return (
		<mesh ref={meshRef} position={[4, -2, -3]}>
			<sphereGeometry args={[1.5, 32, 32]} />
			<meshStandardMaterial
				color="#3b82f6"
				emissive="#1d4ed8"
				emissiveIntensity={0.2}
				transparent
				opacity={0.3}
				roughness={0.2}
				metalness={0.8}
			/>
		</mesh>
	)
}

/**
 * Floating code brackets decoration
 */
function FloatingBrackets() {
	const groupRef = useRef<THREE.Group>(null)

	useFrame((state) => {
		if (!groupRef.current) return
		const t = state.clock.elapsedTime
		groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1
		groupRef.current.position.y = Math.sin(t * 0.5) * 0.2
	})

	return (
		<Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
			<group ref={groupRef} position={[-5, 1, -4]}>
				{/* Left bracket < */}
				<mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
					<boxGeometry args={[0.08, 1, 0.08]} />
					<meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.3} transparent opacity={0.5} />
				</mesh>
				<mesh position={[-0.5, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
					<boxGeometry args={[0.08, 1, 0.08]} />
					<meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.3} transparent opacity={0.5} />
				</mesh>

				{/* Right bracket > */}
				<mesh position={[0.5, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
					<boxGeometry args={[0.08, 1, 0.08]} />
					<meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.3} transparent opacity={0.5} />
				</mesh>
				<mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
					<boxGeometry args={[0.08, 1, 0.08]} />
					<meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.3} transparent opacity={0.5} />
				</mesh>
			</group>
		</Float>
	)
}

const defaultCanvasProps = {
	gl: {
		antialias: true,
		depth: true,
		stencil: false,
		alpha: true,
	},
	camera: {
		near: 0.01,
		far: 100,
		fov: 75,
		zoom: isMobile ? 0.75 : 1,
		position: new Vector3(0, 0, 8),
	},
	resize: { polyfill: ResizeObserver },
	dpr: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1,
}

export default function Scene() {
	return (
		<Canvas
			id='canvas'
			{...defaultCanvasProps}
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				pointerEvents: 'none',
			}}
			onCreated={(state) => {
				state.gl.toneMapping = THREE.ACESFilmicToneMapping
				state.gl.setClearColor(0x000000, 0)
			}}
		>
			<AdaptiveDpr pixelated />

			{/* Ambient and directional lighting */}
			<ambientLight intensity={0.4} />
			<directionalLight position={[5, 5, 5]} intensity={0.5} />
			<pointLight position={[-5, -5, -5]} intensity={0.3} color="#a78bfa" />

			{/* Background stars */}
			<Stars
				radius={50}
				depth={50}
				count={1000}
				factor={2}
				saturation={0}
				fade
				speed={0.5}
			/>

			{/* Main 3D elements - positioned away from center content */}
			<GradientSphere />
			<FloatingShapes />
			<FloatingBrackets />

			{/* Animated rings */}
			<PulsingRing position={[-4, -3, -5]} />
			<PulsingRing position={[5, 3, -6]} />

			{/* Orbiting particles */}
			<OrbitingParticles center={[4, -2, -3]} count={30} radius={2.5} />
			<OrbitingParticles center={[-4, 2, -4]} count={20} radius={1.5} />

			<Preload all />
		</Canvas>
	)
}
