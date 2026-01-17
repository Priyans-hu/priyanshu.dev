'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

// Konami Code sequence
const KONAMI_CODE = [
	'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
	'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
	'KeyB', 'KeyA'
]

// Sound effect URLs (using Web Audio API for generated sounds)
const createClickSound = () => {
	if (typeof window === 'undefined') return null
	const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
	return audioContext
}

/**
 * Play a subtle click sound
 */
const playClickSound = () => {
	try {
		const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
		const oscillator = audioContext.createOscillator()
		const gainNode = audioContext.createGain()

		oscillator.connect(gainNode)
		gainNode.connect(audioContext.destination)

		oscillator.frequency.value = 800
		oscillator.type = 'sine'

		gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
		gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)

		oscillator.start(audioContext.currentTime)
		oscillator.stop(audioContext.currentTime + 0.1)
	} catch (e) {
		// Audio not supported or blocked
	}
}

/**
 * Play a whoosh sound for navigation
 */
const playWhooshSound = () => {
	try {
		const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
		const oscillator = audioContext.createOscillator()
		const gainNode = audioContext.createGain()

		oscillator.connect(gainNode)
		gainNode.connect(audioContext.destination)

		oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
		oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2)
		oscillator.type = 'sine'

		gainNode.gain.setValueAtTime(0.08, audioContext.currentTime)
		gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2)

		oscillator.start(audioContext.currentTime)
		oscillator.stop(audioContext.currentTime + 0.2)
	} catch (e) {
		// Audio not supported or blocked
	}
}

/**
 * Play success sound for easter egg
 */
const playSuccessSound = () => {
	try {
		const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

		const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
		notes.forEach((freq, i) => {
			const oscillator = audioContext.createOscillator()
			const gainNode = audioContext.createGain()

			oscillator.connect(gainNode)
			gainNode.connect(audioContext.destination)

			oscillator.frequency.value = freq
			oscillator.type = 'sine'

			const startTime = audioContext.currentTime + i * 0.1
			gainNode.gain.setValueAtTime(0.15, startTime)
			gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3)

			oscillator.start(startTime)
			oscillator.stop(startTime + 0.3)
		})
	} catch (e) {
		// Audio not supported
	}
}

/**
 * Smooth scroll to element
 */
const smoothScrollTo = (elementId: string) => {
	const element = document.getElementById(elementId)
	if (element) {
		playWhooshSound()
		element.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}
}

/**
 * Easter Egg Component - Konami Code
 */
function EasterEgg() {
	const [activated, setActivated] = useState(false)
	const [keySequence, setKeySequence] = useState<string[]>([])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const newSequence = [...keySequence, e.code].slice(-10)
			setKeySequence(newSequence)

			// Check if Konami code is entered
			if (newSequence.length === 10 && newSequence.every((key, i) => key === KONAMI_CODE[i])) {
				setActivated(true)
				playSuccessSound()
				setTimeout(() => setActivated(false), 5000)
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [keySequence])

	if (!activated) return null

	return (
		<div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
			<div className="animate-bounce text-center">
				<div className="text-6xl mb-4">🚗💨</div>
				<div className="text-2xl font-bold gradient-text">JARVIS Mode Activated!</div>
				<div className="text-muted-foreground mt-2">"I am Iron Man" - Tony Stark</div>
				<div className="text-4xl mt-4">🦾✨🤖</div>
			</div>
		</div>
	)
}

/**
 * Back to Top Button
 */
function BackToTop() {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setVisible(window.scrollY > 500)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToTop = () => {
		playWhooshSound()
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<button
			onClick={scrollToTop}
			className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
				}`}
			aria-label="Back to top"
		>
			<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
			</svg>
		</button>
	)
}

/**
 * Sound Effects Handler - attaches to buttons and links
 */
function SoundEffects() {
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
				playClickSound()
			}
		}

		document.addEventListener('click', handleClick)
		return () => document.removeEventListener('click', handleClick)
	}, [])

	return null
}

/**
 * Smooth Scroll Handler - converts # links to smooth scroll
 */
function SmoothScrollHandler() {
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			const anchor = target.closest('a')

			if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
				e.preventDefault()
				const elementId = anchor.hash.slice(1)
				smoothScrollTo(elementId)

				// Update URL without jumping
				history.pushState(null, '', anchor.hash)
			}
		}

		document.addEventListener('click', handleClick)
		return () => document.removeEventListener('click', handleClick)
	}, [])

	return null
}

/**
 * Car Animation Easter Egg - triggered by typing "car" or "vroom"
 */
function CarEasterEgg() {
	const [showCar, setShowCar] = useState(false)
	const [typedText, setTypedText] = useState('')

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key.length === 1) {
				const newText = (typedText + e.key.toLowerCase()).slice(-5)
				setTypedText(newText)

				if (newText.includes('car') || newText.includes('vroom')) {
					setShowCar(true)
					playSuccessSound()
					setTimeout(() => setShowCar(false), 3000)
					setTypedText('')
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [typedText])

	if (!showCar) return null

	return (
		<div className="fixed bottom-20 left-0 z-[9999] animate-[carDrive_3s_ease-in-out_forwards]">
			<div className="text-6xl transform -scale-x-100">🏎️💨</div>
		</div>
	)
}

/**
 * Main Enhancements Component
 */
export default function Enhancements() {
	return (
		<>
			<EasterEgg />
			<CarEasterEgg />
			<BackToTop />
			<SoundEffects />
			<SmoothScrollHandler />
		</>
	)
}
