'use client'

import { AdaptiveDpr, Preload, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { isMobile } from 'react-device-detect'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { extend } from "@react-three/fiber"
import { useRef, useMemo, useEffect, useState, createContext, useContext } from 'react'

extend(THREE as any)

// Global scroll state
const scrollState = { progress: 0, velocity: 0 }

// Global theme state
const themeState = { current: 'dark' as 'light' | 'dark' | 'joy' }

/**
 * Hook to access scroll state in 3D components
 */
function useScroll() {
	return scrollState
}

/**
 * Hook to track and access current theme
 */
function useThemeTracker() {
	const [theme, setTheme] = useState<'light' | 'dark' | 'joy'>('dark')

	useEffect(() => {
		const checkTheme = () => {
			const html = document.documentElement
			if (html.classList.contains('joy')) {
				setTheme('joy')
				themeState.current = 'joy'
			} else if (html.classList.contains('dark')) {
				setTheme('dark')
				themeState.current = 'dark'
			} else {
				setTheme('light')
				themeState.current = 'light'
			}
		}

		checkTheme()

		// Watch for class changes
		const observer = new MutationObserver(checkTheme)
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

		return () => observer.disconnect()
	}, [])

	return theme
}

/**
 * Glowing orb that follows mouse cursor via global event listener
 */
function MouseFollower() {
	const meshRef = useRef<THREE.Mesh>(null)
	const glowRef = useRef<THREE.Mesh>(null)
	const trailRef = useRef<THREE.Points>(null)
	const { viewport, camera } = useThree()

	// Track mouse position globally
	const mousePos = useRef({ x: 0, y: 0 })

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			// Convert to normalized device coordinates (-1 to 1)
			mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1
			mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1
		}

		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])

	// Store trail positions
	const trailPositions = useMemo(() => new Float32Array(30 * 3), [])

	useFrame((state) => {
		if (!meshRef.current) return

		// Convert mouse to world coordinates
		const targetX = (mousePos.current.x * viewport.width) / 2
		const targetY = (mousePos.current.y * viewport.height) / 2

		// Smooth follow with lerp
		meshRef.current.position.x = THREE.MathUtils.lerp(
			meshRef.current.position.x,
			targetX,
			0.08
		)
		meshRef.current.position.y = THREE.MathUtils.lerp(
			meshRef.current.position.y,
			targetY,
			0.08
		)

		// Pulsing scale
		const t = state.clock.elapsedTime
		const scale = 1 + Math.sin(t * 3) * 0.15
		meshRef.current.scale.setScalar(scale)

		// Rotate based on movement
		meshRef.current.rotation.x += 0.02
		meshRef.current.rotation.y += 0.01

		// Glow follows with slight delay
		if (glowRef.current) {
			glowRef.current.position.x = THREE.MathUtils.lerp(
				glowRef.current.position.x,
				targetX,
				0.05
			)
			glowRef.current.position.y = THREE.MathUtils.lerp(
				glowRef.current.position.y,
				targetY,
				0.05
			)
			glowRef.current.scale.setScalar(scale * 1.5)
		}

		// Update trail
		if (trailRef.current) {
			const positions = trailRef.current.geometry.attributes.position.array as Float32Array

			// Shift all positions back
			for (let i = positions.length - 3; i >= 3; i -= 3) {
				positions[i] = positions[i - 3]
				positions[i + 1] = positions[i - 2]
				positions[i + 2] = positions[i - 1]
			}

			// Add new position at front
			positions[0] = meshRef.current.position.x
			positions[1] = meshRef.current.position.y
			positions[2] = meshRef.current.position.z

			trailRef.current.geometry.attributes.position.needsUpdate = true
		}
	})

	// Don't render on mobile
	if (isMobile) return null

	return (
		<group>
			{/* Trail particles */}
			<points ref={trailRef}>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						count={30}
						array={trailPositions}
						itemSize={3}
					/>
				</bufferGeometry>
				<pointsMaterial
					size={0.08}
					color="#60a5fa"
					transparent
					opacity={0.4}
					sizeAttenuation
				/>
			</points>

			{/* Outer glow */}
			<mesh ref={glowRef} position={[0, 0, 2]}>
				<sphereGeometry args={[0.4, 16, 16]} />
				<meshStandardMaterial
					color="#60a5fa"
					emissive="#60a5fa"
					emissiveIntensity={0.3}
					transparent
					opacity={0.15}
				/>
			</mesh>

			{/* Main orb */}
			<mesh ref={meshRef} position={[0, 0, 2]}>
				<icosahedronGeometry args={[0.2, 1]} />
				<meshStandardMaterial
					color="#60a5fa"
					emissive="#3b82f6"
					emissiveIntensity={0.8}
					transparent
					opacity={0.7}
					wireframe
				/>
			</mesh>
		</group>
	)
}

/**
 * 3D Camera Icon - Photography passion
 */
function Camera3D({ position, color = "#f59e0b" }: { position: [number, number, number], color?: string }) {
	const groupRef = useRef<THREE.Group>(null)
	const scroll = useScroll()

	useFrame((state) => {
		if (!groupRef.current) return
		const t = state.clock.elapsedTime
		groupRef.current.rotation.y = t * 0.3 + scroll.progress * Math.PI
		groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.2
	})

	return (
		<Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.4}>
			<group ref={groupRef} position={position} scale={0.4}>
				{/* Camera body */}
				<mesh>
					<boxGeometry args={[1.2, 0.8, 0.6]} />
					<meshStandardMaterial color={color} transparent opacity={0.25} wireframe />
				</mesh>
				{/* Lens */}
				<mesh position={[0, 0, 0.4]}>
					<cylinderGeometry args={[0.3, 0.35, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]} />
					<meshStandardMaterial color={color} transparent opacity={0.3} wireframe />
				</mesh>
				{/* Viewfinder */}
				<mesh position={[0, 0.5, 0]}>
					<boxGeometry args={[0.3, 0.2, 0.25]} />
					<meshStandardMaterial color={color} transparent opacity={0.25} wireframe />
				</mesh>
			</group>
		</Float>
	)
}

/**
 * Arc Reactor - Iron Man signature
 */
function ArcReactor({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
	const groupRef = useRef<THREE.Group>(null)
	const scroll = useScroll()

	useFrame((state) => {
		if (!groupRef.current) return
		const t = state.clock.elapsedTime
		groupRef.current.rotation.z = t * 0.5
		// Pulse effect
		const pulse = 1 + Math.sin(t * 3) * 0.1 + scroll.velocity * 0.5
		groupRef.current.scale.setScalar(scale * pulse)
	})

	return (
		<Float speed={0.3} rotationIntensity={0.2} floatIntensity={0.3}>
			<group ref={groupRef} position={position}>
				{/* Outer ring */}
				<mesh>
					<torusGeometry args={[0.8, 0.05, 16, 32]} />
					<meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.5} transparent opacity={0.6} />
				</mesh>
				{/* Middle ring */}
				<mesh>
					<torusGeometry args={[0.55, 0.04, 16, 32]} />
					<meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.4} transparent opacity={0.5} />
				</mesh>
				{/* Inner core */}
				<mesh>
					<torusGeometry args={[0.3, 0.03, 16, 32]} />
					<meshStandardMaterial color="#93c5fd" emissive="#93c5fd" emissiveIntensity={0.6} transparent opacity={0.7} />
				</mesh>
				{/* Center triangle (arc reactor style) */}
				<mesh rotation={[0, 0, Math.PI / 6]}>
					<ringGeometry args={[0.1, 0.2, 3]} />
					<meshStandardMaterial color="#dbeafe" emissive="#dbeafe" emissiveIntensity={0.8} transparent opacity={0.6} side={THREE.DoubleSide} />
				</mesh>
			</group>
		</Float>
	)
}

/**
 * Code Terminal Icon - Developer
 */
function Terminal3D({ position, color = "#22c55e" }: { position: [number, number, number], color?: string }) {
	const groupRef = useRef<THREE.Group>(null)
	const scroll = useScroll()

	useFrame((state) => {
		if (!groupRef.current) return
		const t = state.clock.elapsedTime
		groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.3
		groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1 + scroll.progress * 0.5
	})

	return (
		<Float speed={0.4} rotationIntensity={0.2} floatIntensity={0.3}>
			<group ref={groupRef} position={position} scale={0.35}>
				{/* Terminal window */}
				<mesh>
					<boxGeometry args={[1.4, 1, 0.1]} />
					<meshStandardMaterial color={color} transparent opacity={0.2} wireframe />
				</mesh>
				{/* Command prompt > */}
				<mesh position={[-0.4, 0.2, 0.06]}>
					<boxGeometry args={[0.15, 0.08, 0.02]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.6} />
				</mesh>
				<mesh position={[-0.25, 0.2, 0.06]} rotation={[0, 0, -Math.PI / 4]}>
					<boxGeometry args={[0.12, 0.08, 0.02]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.6} />
				</mesh>
				{/* Cursor line */}
				<mesh position={[0.1, 0.2, 0.06]}>
					<boxGeometry args={[0.5, 0.06, 0.02]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.4} />
				</mesh>
				{/* Code lines */}
				<mesh position={[-0.1, -0.05, 0.06]}>
					<boxGeometry args={[0.8, 0.04, 0.02]} />
					<meshStandardMaterial color={color} transparent opacity={0.3} />
				</mesh>
				<mesh position={[0, -0.2, 0.06]}>
					<boxGeometry args={[0.6, 0.04, 0.02]} />
					<meshStandardMaterial color={color} transparent opacity={0.3} />
				</mesh>
			</group>
		</Float>
	)
}

/**
 * Music Note - Music passion
 */
function MusicNote3D({ position, color = "#a855f7" }: { position: [number, number, number], color?: string }) {
	const groupRef = useRef<THREE.Group>(null)
	const scroll = useScroll()

	useFrame((state) => {
		if (!groupRef.current) return
		const t = state.clock.elapsedTime
		groupRef.current.rotation.y = t * 0.4
		groupRef.current.position.y = position[1] + Math.sin(t * 2) * 0.1
	})

	return (
		<Float speed={0.6} rotationIntensity={0.4} floatIntensity={0.5}>
			<group ref={groupRef} position={position} scale={0.3}>
				{/* Note head */}
				<mesh position={[0, -0.4, 0]} rotation={[0, 0, -0.3]}>
					<sphereGeometry args={[0.25, 16, 16]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.5} />
				</mesh>
				{/* Stem */}
				<mesh position={[0.2, 0.2, 0]}>
					<boxGeometry args={[0.06, 1.2, 0.06]} />
					<meshStandardMaterial color={color} transparent opacity={0.4} />
				</mesh>
				{/* Flag */}
				<mesh position={[0.35, 0.6, 0]} rotation={[0, 0, -0.5]}>
					<boxGeometry args={[0.3, 0.08, 0.04]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} transparent opacity={0.4} />
				</mesh>
			</group>
		</Float>
	)
}

/**
 * AI Brain/Neural Network - Tech/AI interest
 */
function AIBrain({ position, color = "#06b6d4" }: { position: [number, number, number], color?: string }) {
	const groupRef = useRef<THREE.Group>(null)
	const scroll = useScroll()

	const nodes = useMemo(() => {
		return [
			[0, 0, 0], [-0.4, 0.3, 0.1], [0.4, 0.3, -0.1], [-0.3, -0.3, 0.1],
			[0.3, -0.3, -0.1], [0, 0.5, 0], [0, -0.5, 0]
		] as [number, number, number][]
	}, [])

	useFrame((state) => {
		if (!groupRef.current) return
		const t = state.clock.elapsedTime
		groupRef.current.rotation.y = t * 0.3
		groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.2
	})

	return (
		<Float speed={0.4} rotationIntensity={0.3} floatIntensity={0.3}>
			<group ref={groupRef} position={position} scale={0.5}>
				{/* Neural nodes */}
				{nodes.map((pos, i) => (
					<mesh key={i} position={pos}>
						<sphereGeometry args={[0.1, 12, 12]} />
						<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.6} />
					</mesh>
				))}
				{/* Connections */}
				<mesh>
					<octahedronGeometry args={[0.5]} />
					<meshStandardMaterial color={color} transparent opacity={0.15} wireframe />
				</mesh>
			</group>
		</Float>
	)
}

/**
 * Hexagon HUD - JARVIS style
 */
function HexagonHUD({ position, color = "#60a5fa" }: { position: [number, number, number], color?: string }) {
	const groupRef = useRef<THREE.Group>(null)
	const scroll = useScroll()

	useFrame((state) => {
		if (!groupRef.current) return
		const t = state.clock.elapsedTime
		groupRef.current.rotation.z = t * 0.2
		groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.3
		const pulse = 1 + Math.sin(t * 2 + scroll.progress * Math.PI) * 0.1
		groupRef.current.scale.setScalar(0.4 * pulse)
	})

	return (
		<Float speed={0.3} rotationIntensity={0.2} floatIntensity={0.2}>
			<group ref={groupRef} position={position}>
				{/* Outer hexagon */}
				<mesh>
					<ringGeometry args={[0.7, 0.8, 6]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.4} side={THREE.DoubleSide} />
				</mesh>
				{/* Inner hexagon */}
				<mesh>
					<ringGeometry args={[0.4, 0.5, 6]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.5} side={THREE.DoubleSide} />
				</mesh>
				{/* Center dot */}
				<mesh>
					<circleGeometry args={[0.15, 6]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.6} side={THREE.DoubleSide} />
				</mesh>
			</group>
		</Float>
	)
}

/**
 * Laugh/Comedy Star - Humor element
 */
function ComedyStar({ position, color = "#fbbf24" }: { position: [number, number, number], color?: string }) {
	const groupRef = useRef<THREE.Group>(null)

	useFrame((state) => {
		if (!groupRef.current) return
		const t = state.clock.elapsedTime
		groupRef.current.rotation.z = t * 0.5
		groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.4
		// Twinkle effect
		const twinkle = 0.9 + Math.sin(t * 4) * 0.1
		groupRef.current.scale.setScalar(0.35 * twinkle)
	})

	return (
		<Float speed={0.8} rotationIntensity={0.5} floatIntensity={0.6}>
			<group ref={groupRef} position={position}>
				{/* Star burst - representing joy/laughter */}
				{[0, 1, 2, 3, 4, 5].map((i) => (
					<mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
						<boxGeometry args={[0.08, 0.6, 0.08]} />
						<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.5} />
					</mesh>
				))}
				{/* Center */}
				<mesh>
					<sphereGeometry args={[0.15, 12, 12]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.6} />
				</mesh>
			</group>
		</Float>
	)
}

/**
 * Video/Film Reel - Videography passion
 */
function FilmReel({ position, color = "#ec4899" }: { position: [number, number, number], color?: string }) {
	const groupRef = useRef<THREE.Group>(null)

	useFrame((state) => {
		if (!groupRef.current) return
		const t = state.clock.elapsedTime
		groupRef.current.rotation.z = t * 0.8
		groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.2
	})

	return (
		<Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.4}>
			<group ref={groupRef} position={position} scale={0.35}>
				{/* Outer ring */}
				<mesh>
					<torusGeometry args={[0.6, 0.1, 8, 24]} />
					<meshStandardMaterial color={color} transparent opacity={0.3} wireframe />
				</mesh>
				{/* Sprocket holes */}
				{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
					<mesh key={i} position={[Math.cos((i * Math.PI) / 4) * 0.4, Math.sin((i * Math.PI) / 4) * 0.4, 0]}>
						<cylinderGeometry args={[0.08, 0.08, 0.15, 8]} rotation={[Math.PI / 2, 0, 0]} />
						<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.4} />
					</mesh>
				))}
				{/* Center hub */}
				<mesh>
					<cylinderGeometry args={[0.15, 0.15, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]} />
					<meshStandardMaterial color={color} transparent opacity={0.4} />
				</mesh>
			</group>
		</Float>
	)
}

/**
 * Curly Braces - Code symbol { }
 */
function CurlyBraces({ position, color = "#34d399" }: { position: [number, number, number], color?: string }) {
	const groupRef = useRef<THREE.Group>(null)
	const scroll = useScroll()

	useFrame((state) => {
		if (!groupRef.current) return
		const t = state.clock.elapsedTime
		groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.3
		groupRef.current.rotation.x = scroll.progress * 0.5
	})

	return (
		<Float speed={0.4} rotationIntensity={0.3} floatIntensity={0.3}>
			<group ref={groupRef} position={position} scale={0.3}>
				{/* Left brace { */}
				<group position={[-0.4, 0, 0]}>
					<mesh position={[0.1, 0.4, 0]} rotation={[0, 0, 0.3]}>
						<boxGeometry args={[0.08, 0.5, 0.08]} />
						<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.5} />
					</mesh>
					<mesh position={[-0.05, 0, 0]}>
						<boxGeometry args={[0.15, 0.08, 0.08]} />
						<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.5} />
					</mesh>
					<mesh position={[0.1, -0.4, 0]} rotation={[0, 0, -0.3]}>
						<boxGeometry args={[0.08, 0.5, 0.08]} />
						<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.5} />
					</mesh>
				</group>
				{/* Right brace } */}
				<group position={[0.4, 0, 0]}>
					<mesh position={[-0.1, 0.4, 0]} rotation={[0, 0, -0.3]}>
						<boxGeometry args={[0.08, 0.5, 0.08]} />
						<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.5} />
					</mesh>
					<mesh position={[0.05, 0, 0]}>
						<boxGeometry args={[0.15, 0.08, 0.08]} />
						<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.5} />
					</mesh>
					<mesh position={[-0.1, -0.4, 0]} rotation={[0, 0, 0.3]}>
						<boxGeometry args={[0.08, 0.5, 0.08]} />
						<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.5} />
					</mesh>
				</group>
			</group>
		</Float>
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

/**
 * JARVIS HUD Circle - Rotating data display ring
 */
function JarvisHUDCircle({ position, radius = 1, color = "#22d3ee" }: {
	position: [number, number, number]
	radius?: number
	color?: string
}) {
	const groupRef = useRef<THREE.Group>(null)
	const innerRef = useRef<THREE.Mesh>(null)

	useFrame((state) => {
		if (!groupRef.current) return
		const t = state.clock.elapsedTime
		groupRef.current.rotation.z = t * 0.3
		if (innerRef.current) {
			innerRef.current.rotation.z = -t * 0.5
		}
	})

	return (
		<Float speed={0.2} rotationIntensity={0.1} floatIntensity={0.2}>
			<group ref={groupRef} position={position}>
				{/* Outer rotating ring */}
				<mesh>
					<ringGeometry args={[radius * 0.9, radius, 64]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.3} side={THREE.DoubleSide} />
				</mesh>
				{/* Tick marks around the ring */}
				{Array.from({ length: 36 }).map((_, i) => (
					<mesh key={i} position={[Math.cos((i / 36) * Math.PI * 2) * radius * 0.95, Math.sin((i / 36) * Math.PI * 2) * radius * 0.95, 0]} rotation={[0, 0, (i / 36) * Math.PI * 2]}>
						<boxGeometry args={[i % 3 === 0 ? 0.08 : 0.04, 0.02, 0.01]} />
						<meshStandardMaterial color={color} emissive={color} emissiveIntensity={i % 3 === 0 ? 0.8 : 0.4} transparent opacity={0.6} />
					</mesh>
				))}
				{/* Inner ring with data segments */}
				<mesh ref={innerRef}>
					<ringGeometry args={[radius * 0.5, radius * 0.6, 32]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.2} side={THREE.DoubleSide} />
				</mesh>
				{/* Data arc segments */}
				{[0, 1, 2].map((i) => (
					<mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]}>
						<ringGeometry args={[radius * 0.65, radius * 0.75, 16, 1, 0, Math.PI / 4]} />
						<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.5} side={THREE.DoubleSide} />
					</mesh>
				))}
			</group>
		</Float>
	)
}

/**
 * JARVIS Holographic Panel - Floating data display
 */
function JarvisHoloPanel({ position, width = 1.5, height = 1, color = "#22d3ee" }: {
	position: [number, number, number]
	width?: number
	height?: number
	color?: string
}) {
	const groupRef = useRef<THREE.Group>(null)
	const linesRef = useRef<THREE.Group>(null)

	useFrame((state) => {
		if (!groupRef.current) return
		const t = state.clock.elapsedTime
		groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.1
		groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.05
		// Scan line effect
		if (linesRef.current) {
			linesRef.current.position.y = ((t * 0.5) % 1 - 0.5) * height
		}
	})

	return (
		<Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.15}>
			<group ref={groupRef} position={position}>
				{/* Panel border frame */}
				<mesh>
					<planeGeometry args={[width, height]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} transparent opacity={0.08} side={THREE.DoubleSide} />
				</mesh>
				{/* Corner brackets */}
				{[[-1, 1], [1, 1], [-1, -1], [1, -1]].map(([x, y], i) => (
					<group key={i} position={[x * width * 0.45, y * height * 0.45, 0.01]}>
						<mesh position={[x * 0.08, 0, 0]}>
							<boxGeometry args={[0.15, 0.02, 0.01]} />
							<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.8} />
						</mesh>
						<mesh position={[0, y * 0.08, 0]}>
							<boxGeometry args={[0.02, 0.15, 0.01]} />
							<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.8} />
						</mesh>
					</group>
				))}
				{/* Data lines */}
				{Array.from({ length: 5 }).map((_, i) => (
					<mesh key={i} position={[-width * 0.3, height * 0.3 - i * height * 0.15, 0.01]}>
						<boxGeometry args={[width * 0.4 * (0.5 + Math.random() * 0.5), 0.02, 0.01]} />
						<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.3} />
					</mesh>
				))}
				{/* Scan line */}
				<group ref={linesRef}>
					<mesh>
						<boxGeometry args={[width * 0.95, 0.01, 0.01]} />
						<meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.6} />
					</mesh>
				</group>
			</group>
		</Float>
	)
}

/**
 * JARVIS Grid Floor - Holographic grid
 */
function JarvisGrid({ position, size = 15, color = "#22d3ee" }: {
	position: [number, number, number]
	size?: number
	color?: string
}) {
	const gridRef = useRef<THREE.Group>(null)

	useFrame((state) => {
		if (!gridRef.current) return
		const t = state.clock.elapsedTime
		// Subtle wave motion
		gridRef.current.rotation.x = -Math.PI / 2 + Math.sin(t * 0.2) * 0.02
	})

	return (
		<group ref={gridRef} position={position} rotation={[-Math.PI / 2, 0, 0]}>
			{/* Grid lines X */}
			{Array.from({ length: 21 }).map((_, i) => (
				<mesh key={`x${i}`} position={[i - 10, 0, 0]}>
					<boxGeometry args={[0.01, size, 0.01]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.15} />
				</mesh>
			))}
			{/* Grid lines Y */}
			{Array.from({ length: 21 }).map((_, i) => (
				<mesh key={`y${i}`} position={[0, i - 10, 0]}>
					<boxGeometry args={[size, 0.01, 0.01]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.15} />
				</mesh>
			))}
		</group>
	)
}

/**
 * JARVIS Connection Lines - Animated data streams
 */
function JarvisDataStream({ start, end, color = "#22d3ee" }: {
	start: [number, number, number]
	end: [number, number, number]
	color?: string
}) {
	const particlesRef = useRef<THREE.Points>(null)
	const particleCount = 20

	const positions = useMemo(() => {
		const arr = new Float32Array(particleCount * 3)
		for (let i = 0; i < particleCount; i++) {
			const t = i / particleCount
			arr[i * 3] = start[0] + (end[0] - start[0]) * t
			arr[i * 3 + 1] = start[1] + (end[1] - start[1]) * t
			arr[i * 3 + 2] = start[2] + (end[2] - start[2]) * t
		}
		return arr
	}, [start, end])

	useFrame((state) => {
		if (!particlesRef.current) return
		const t = state.clock.elapsedTime
		const posArr = particlesRef.current.geometry.attributes.position.array as Float32Array

		for (let i = 0; i < particleCount; i++) {
			const progress = ((i / particleCount) + t * 0.3) % 1
			posArr[i * 3] = start[0] + (end[0] - start[0]) * progress
			posArr[i * 3 + 1] = start[1] + (end[1] - start[1]) * progress
			posArr[i * 3 + 2] = start[2] + (end[2] - start[2]) * progress
		}
		particlesRef.current.geometry.attributes.position.needsUpdate = true
	})

	return (
		<points ref={particlesRef}>
			<bufferGeometry>
				<bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
			</bufferGeometry>
			<pointsMaterial size={0.06} color={color} transparent opacity={0.7} sizeAttenuation />
		</points>
	)
}

/**
 * JARVIS Rotating Globe - World hologram
 */
function JarvisGlobe({ position, color = "#22d3ee" }: {
	position: [number, number, number]
	color?: string
}) {
	const globeRef = useRef<THREE.Group>(null)

	useFrame((state) => {
		if (!globeRef.current) return
		const t = state.clock.elapsedTime
		globeRef.current.rotation.y = t * 0.2
	})

	return (
		<Float speed={0.2} rotationIntensity={0.1} floatIntensity={0.2}>
			<group ref={globeRef} position={position}>
				{/* Wireframe sphere */}
				<mesh>
					<sphereGeometry args={[1, 24, 24]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.15} wireframe />
				</mesh>
				{/* Latitude rings */}
				{[-0.5, 0, 0.5].map((y, i) => (
					<mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
						<torusGeometry args={[Math.sqrt(1 - y * y), 0.02, 8, 32]} />
						<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.4} />
					</mesh>
				))}
				{/* Longitude rings */}
				{[0, 1, 2].map((i) => (
					<mesh key={`long${i}`} rotation={[0, (i * Math.PI) / 3, 0]}>
						<torusGeometry args={[1, 0.015, 8, 32]} />
						<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.3} />
					</mesh>
				))}
				{/* Data points */}
				{Array.from({ length: 8 }).map((_, i) => {
					const phi = Math.random() * Math.PI * 2
					const theta = Math.random() * Math.PI
					return (
						<mesh key={`point${i}`} position={[
							Math.sin(theta) * Math.cos(phi),
							Math.cos(theta),
							Math.sin(theta) * Math.sin(phi)
						]}>
							<sphereGeometry args={[0.04, 8, 8]} />
							<meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.8} />
						</mesh>
					)
				})}
			</group>
		</Float>
	)
}

/**
 * JARVIS Floating Text Indicator
 */
function JarvisIndicator({ position, color = "#22d3ee" }: {
	position: [number, number, number]
	color?: string
}) {
	const groupRef = useRef<THREE.Group>(null)

	useFrame((state) => {
		if (!groupRef.current) return
		const t = state.clock.elapsedTime
		groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2
		const pulse = 1 + Math.sin(t * 3) * 0.1
		groupRef.current.scale.setScalar(pulse)
	})

	return (
		<Float speed={0.4} rotationIntensity={0.2} floatIntensity={0.3}>
			<group ref={groupRef} position={position} scale={0.5}>
				{/* Diamond shape */}
				<mesh rotation={[0, 0, Math.PI / 4]}>
					<planeGeometry args={[0.4, 0.4]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.4} side={THREE.DoubleSide} />
				</mesh>
				{/* Inner diamond */}
				<mesh rotation={[0, 0, Math.PI / 4]}>
					<ringGeometry args={[0.1, 0.15, 4]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.6} side={THREE.DoubleSide} />
				</mesh>
				{/* Pointer line */}
				<mesh position={[0.5, 0, 0]}>
					<boxGeometry args={[0.6, 0.02, 0.01]} />
					<meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.5} />
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

/**
 * Component to update scroll state
 */
function ScrollTracker() {
	const lastScroll = useRef(0)

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY
			const maxScroll = document.documentElement.scrollHeight - window.innerHeight
			const progress = maxScroll > 0 ? scrollY / maxScroll : 0
			const velocity = scrollY - lastScroll.current

			scrollState.progress = progress
			scrollState.velocity = velocity * 0.01 // Normalize velocity
			lastScroll.current = scrollY
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		handleScroll() // Initial call

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return null
}

/**
 * Default Scene Elements - For Light/Dark themes
 */
function DefaultSceneElements() {
	return (
		<>
			{/* Iron Man / JARVIS References */}
			<ArcReactor position={[-7, 5, -4]} scale={0.6} />
			<ArcReactor position={[8, -6, -5]} scale={0.4} />
			<HexagonHUD position={[9, 3, -4]} color="#60a5fa" />
			<HexagonHUD position={[-8, -4, -3]} color="#3b82f6" />

			{/* Photography & Videography */}
			<Camera3D position={[7, 7, -3]} color="#f59e0b" />
			<Camera3D position={[-6, -7, -4]} color="#fbbf24" />
			<FilmReel position={[-9, 2, -4]} color="#ec4899" />
			<FilmReel position={[6, -9, -3]} color="#f472b6" />

			{/* Coding & Tech */}
			<Terminal3D position={[-7, 8, -4]} color="#22c55e" />
			<Terminal3D position={[8, -3, -3]} color="#34d399" />
			<CurlyBraces position={[9, 8, -4]} color="#34d399" />
			<CurlyBraces position={[-8, -9, -3]} color="#22c55e" />
			<FloatingBrackets position={[-5, 3, -3]} color="#f472b6" scale={0.8} />
			<FloatingBrackets position={[6, 0, -4]} color="#60a5fa" scale={0.7} />

			{/* AI & Neural */}
			<AIBrain position={[0, 9, -4]} color="#06b6d4" />
			<AIBrain position={[-9, -1, -5]} color="#0891b2" />

			{/* Music - Your passion */}
			<MusicNote3D position={[-6, 0, -3]} color="#a855f7" />
			<MusicNote3D position={[7, 5, -4]} color="#8b5cf6" />

			{/* Comedy/Joy - You like to laugh! */}
			<ComedyStar position={[0, -8, -3]} color="#fbbf24" />
			<ComedyStar position={[-4, 6, -4]} color="#f59e0b" />
			<ComedyStar position={[5, -5, -5]} color="#facc15" />

			{/* Orbiting particles around key elements */}
			<OrbitingParticles center={[-7, 5, -4]} count={15} radius={1.5} />
			<OrbitingParticles center={[8, -6, -5]} count={12} radius={1.2} />
			<OrbitingParticles center={[0, 9, -4]} count={18} radius={1.8} />
		</>
	)
}

/**
 * JARVIS Theme Scene Elements - Iron Man HUD style
 */
function JarvisSceneElements() {
	const cyan = "#22d3ee"
	const gold = "#fbbf24"

	return (
		<>
			{/* Main HUD Circles */}
			<JarvisHUDCircle position={[-6, 4, -3]} radius={1.5} color={cyan} />
			<JarvisHUDCircle position={[7, -3, -4]} radius={1.2} color={cyan} />
			<JarvisHUDCircle position={[0, 7, -5]} radius={1} color={cyan} />

			{/* Arc Reactors - more prominent in JARVIS mode */}
			<ArcReactor position={[0, 0, -2]} scale={1.2} />
			<ArcReactor position={[-8, -5, -4]} scale={0.7} />
			<ArcReactor position={[9, 5, -5]} scale={0.5} />

			{/* Holographic Panels */}
			<JarvisHoloPanel position={[-7, 0, -3]} width={2} height={1.5} color={cyan} />
			<JarvisHoloPanel position={[8, 2, -4]} width={1.5} height={1} color={cyan} />
			<JarvisHoloPanel position={[-4, -6, -3]} width={1.8} height={1.2} color={cyan} />
			<JarvisHoloPanel position={[5, -7, -4]} width={1.2} height={0.8} color={cyan} />

			{/* Globe hologram */}
			<JarvisGlobe position={[6, 6, -4]} color={cyan} />

			{/* Data streams connecting elements */}
			<JarvisDataStream start={[-6, 4, -3]} end={[0, 0, -2]} color={cyan} />
			<JarvisDataStream start={[7, -3, -4]} end={[0, 0, -2]} color={cyan} />
			<JarvisDataStream start={[-7, 0, -3]} end={[-6, 4, -3]} color={cyan} />
			<JarvisDataStream start={[8, 2, -4]} end={[7, -3, -4]} color={cyan} />
			<JarvisDataStream start={[6, 6, -4]} end={[8, 2, -4]} color={cyan} />

			{/* Indicators scattered */}
			<JarvisIndicator position={[-9, 7, -4]} color={cyan} />
			<JarvisIndicator position={[10, -6, -3]} color={cyan} />
			<JarvisIndicator position={[-3, -8, -4]} color={gold} />
			<JarvisIndicator position={[4, 9, -5]} color={cyan} />

			{/* Hexagon HUDs */}
			<HexagonHUD position={[9, -1, -3]} color={cyan} />
			<HexagonHUD position={[-8, 8, -4]} color={cyan} />
			<HexagonHUD position={[-10, -2, -5]} color={cyan} />
			<HexagonHUD position={[3, -9, -4]} color={cyan} />

			{/* Grid floor for depth */}
			<JarvisGrid position={[0, -12, -5]} size={20} color={cyan} />

			{/* Some personal elements - smaller, integrated into HUD */}
			<Terminal3D position={[-5, 5, -3]} color={cyan} />
			<AIBrain position={[5, 4, -3]} color={cyan} />
			<CurlyBraces position={[-9, -7, -4]} color={cyan} />

			{/* Orbiting particles - cyan themed */}
			<OrbitingParticles center={[0, 0, -2]} count={30} radius={3} />
			<OrbitingParticles center={[-6, 4, -3]} count={20} radius={2} />
			<OrbitingParticles center={[7, -3, -4]} count={20} radius={2} />
		</>
	)
}

/**
 * Theme-aware Scene Content
 */
function SceneContent() {
	const theme = useThemeTracker()

	return (
		<>
			{/* Ambient and directional lighting - adjusted for theme */}
			<ambientLight intensity={theme === 'joy' ? 0.3 : 0.4} />
			<directionalLight position={[5, 5, 5]} intensity={theme === 'joy' ? 0.4 : 0.5} />
			<pointLight position={[-10, -10, -5]} intensity={0.3} color={theme === 'joy' ? "#22d3ee" : "#a78bfa"} />
			<pointLight position={[10, 10, -5]} intensity={0.2} color={theme === 'joy' ? "#22d3ee" : "#60a5fa"} />

			{/* Background stars */}
			<Stars
				radius={80}
				depth={80}
				count={theme === 'joy' ? 2000 : 1500}
				factor={theme === 'joy' ? 2 : 3}
				saturation={theme === 'joy' ? 0.5 : 0}
				fade
				speed={theme === 'joy' ? 0.8 : 0.5}
			/>

			{/* Mouse follower */}
			<MouseFollower />

			{/* Theme-specific elements */}
			{theme === 'joy' ? <JarvisSceneElements /> : <DefaultSceneElements />}
		</>
	)
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
			<ScrollTracker />
			<SceneContent />
			<Preload all />
		</Canvas>
	)
}
