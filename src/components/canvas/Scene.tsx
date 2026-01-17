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
 * Floating geometric shapes dispersed across the viewport
 */
function FloatingShapes() {
	const groupRef = useRef<THREE.Group>(null)
	const { pointer } = useThree()

	// Pre-defined positions spread across corners and edges
	const shapes = useMemo(() => {
		const positions: [number, number, number][] = [
			[-8, 4, -3],    // Top left
			[8, 5, -4],     // Top right
			[-9, -3, -2],   // Mid left
			[9, -2, -3],    // Mid right
			[-7, -8, -4],   // Bottom left
			[7, -7, -3],    // Bottom right
			[-6, 8, -5],    // Far top left
			[6, 9, -4],     // Far top right
			[0, -10, -3],   // Bottom center
			[-10, 0, -4],   // Far left
			[10, 1, -3],    // Far right
			[0, 12, -5],    // Top center
		]
		return positions.map((position, i) => ({
			position,
			rotation: Math.random() * Math.PI,
			scale: 0.2 + Math.random() * 0.35,
			speed: 0.2 + Math.random() * 0.3,
			type: i % 4
		}))
	}, [])

	useFrame((state) => {
		if (!groupRef.current) return
		groupRef.current.rotation.y = THREE.MathUtils.lerp(
			groupRef.current.rotation.y,
			pointer.x * 0.05,
			0.01
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
							opacity={0.18}
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
 * Moving gradient sphere - multiple instances dispersed
 */
function GradientSphere({ position, color, size = 1.5 }: {
	position: [number, number, number]
	color: string
	size?: number
}) {
	const meshRef = useRef<THREE.Mesh>(null)
	const { pointer } = useThree()
	const offset = useMemo(() => Math.random() * Math.PI * 2, [])

	useFrame((state) => {
		if (!meshRef.current) return
		const t = state.clock.elapsedTime + offset

		meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.4
		meshRef.current.position.x = position[0] + Math.cos(t * 0.3) * 0.3

		meshRef.current.rotation.y = t * 0.1 + pointer.x * 0.1
		meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1
	})

	return (
		<mesh ref={meshRef} position={position}>
			<sphereGeometry args={[size, 32, 32]} />
			<meshStandardMaterial
				color={color}
				emissive={color}
				emissiveIntensity={0.2}
				transparent
				opacity={0.25}
				roughness={0.2}
				metalness={0.8}
			/>
		</mesh>
	)
}

/**
 * Floating code brackets decoration
 */
function FloatingBrackets({ position, color = "#f472b6", scale = 1 }: {
	position: [number, number, number]
	color?: string
	scale?: number
}) {
	const groupRef = useRef<THREE.Group>(null)
	const offset = useMemo(() => Math.random() * Math.PI * 2, [])

	useFrame((state) => {
		if (!groupRef.current) return
		const t = state.clock.elapsedTime + offset
		groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15
		groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.1
	})

	return (
		<Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
			<group ref={groupRef} position={position} scale={scale}>
				{/* Left bracket < */}
				<mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
					<boxGeometry args={[0.08, 1, 0.08]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.5} />
				</mesh>
				<mesh position={[-0.5, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
					<boxGeometry args={[0.08, 1, 0.08]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.5} />
				</mesh>

				{/* Right bracket > */}
				<mesh position={[0.5, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
					<boxGeometry args={[0.08, 1, 0.08]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.5} />
				</mesh>
				<mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
					<boxGeometry args={[0.08, 1, 0.08]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.5} />
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
			<pointLight position={[-10, -10, -5]} intensity={0.3} color="#a78bfa" />
			<pointLight position={[10, 10, -5]} intensity={0.2} color="#60a5fa" />

			{/* Background stars - spread wider */}
			<Stars
				radius={80}
				depth={80}
				count={1500}
				factor={3}
				saturation={0}
				fade
				speed={0.5}
			/>

			{/* Floating wireframe shapes - dispersed */}
			<FloatingShapes />

			{/* Gradient spheres - corners and edges */}
			<GradientSphere position={[8, 6, -5]} color="#3b82f6" size={1.8} />
			<GradientSphere position={[-9, -5, -4]} color="#8b5cf6" size={1.5} />
			<GradientSphere position={[7, -9, -6]} color="#06b6d4" size={1.2} />
			<GradientSphere position={[-8, 8, -5]} color="#ec4899" size={1.4} />

			{/* Code brackets - scattered */}
			<FloatingBrackets position={[-7, 3, -3]} color="#f472b6" scale={1} />
			<FloatingBrackets position={[8, -4, -4]} color="#60a5fa" scale={0.8} />
			<FloatingBrackets position={[-6, -8, -3]} color="#34d399" scale={1.2} />
			<FloatingBrackets position={[6, 10, -4]} color="#a78bfa" scale={0.9} />

			{/* Animated rings - spread across viewport */}
			<PulsingRing position={[-8, -2, -5]} />
			<PulsingRing position={[9, 4, -6]} />
			<PulsingRing position={[-5, 7, -5]} />
			<PulsingRing position={[5, -8, -6]} />
			<PulsingRing position={[0, -12, -5]} />

			{/* Orbiting particles - distributed */}
			<OrbitingParticles center={[9, -6, -4]} count={25} radius={2} />
			<OrbitingParticles center={[-8, 5, -5]} count={20} radius={1.8} />
			<OrbitingParticles center={[6, 8, -4]} count={18} radius={1.5} />
			<OrbitingParticles center={[-7, -7, -5]} count={22} radius={2.2} />
			<OrbitingParticles center={[0, 10, -4]} count={15} radius={1.2} />

			<Preload all />
		</Canvas>
	)
}
