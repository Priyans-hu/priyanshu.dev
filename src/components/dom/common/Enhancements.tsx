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

// JARVIS/FRIDAY/EDITH quotes from Iron Man
const JARVIS_QUOTES = [
	{ ai: "JARVIS", quote: "At your service, sir." },
	{ ai: "JARVIS", quote: "I do enjoy helping you." },
	{ ai: "FRIDAY", quote: "You know me, boss." },
	{ ai: "FRIDAY", quote: "Working on it, boss." },
	{ ai: "EDITH", quote: "Even Dead, I'm The Hero." },
	{ ai: "JARVIS", quote: "Perhaps a bit of rest would improve your functioning." },
]

/**
 * JARVIS Easter Egg - triggered by typing "jarvis", "friday", or "edith"
 */
function JarvisEasterEgg() {
	const [activeQuote, setActiveQuote] = useState<{ ai: string, quote: string } | null>(null)
	const [typedText, setTypedText] = useState('')

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key.length === 1) {
				const newText = (typedText + e.key.toLowerCase()).slice(-6)
				setTypedText(newText)

				if (newText.includes('jarvis') || newText.includes('friday') || newText.includes('edith')) {
					const quote = JARVIS_QUOTES[Math.floor(Math.random() * JARVIS_QUOTES.length)]
					setActiveQuote(quote)
					playJarvisSound()
					setTimeout(() => setActiveQuote(null), 4000)
					setTypedText('')
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [typedText])

	if (!activeQuote) return null

	return (
		<div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999] animate-in fade-in slide-in-from-top-4 duration-500">
			<div className="bg-blue-500/10 backdrop-blur-md border border-blue-500/30 rounded-2xl px-6 py-4 shadow-2xl shadow-blue-500/20">
				<div className="flex items-center gap-3">
					{/* Arc Reactor Icon */}
					<div className="relative w-12 h-12">
						<div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
						<div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
							<div className="w-6 h-6 rounded-full bg-white/80" />
						</div>
					</div>
					<div>
						<p className="text-xs text-blue-400 font-medium uppercase tracking-wider">{activeQuote.ai}</p>
						<p className="text-foreground font-medium">{activeQuote.quote}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

/**
 * Play JARVIS-like activation sound
 */
const playJarvisSound = () => {
	try {
		const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

		// Futuristic beep sequence
		const frequencies = [440, 554.37, 659.25, 880]
		frequencies.forEach((freq, i) => {
			const oscillator = audioContext.createOscillator()
			const gainNode = audioContext.createGain()

			oscillator.connect(gainNode)
			gainNode.connect(audioContext.destination)

			oscillator.frequency.value = freq
			oscillator.type = 'sine'

			const startTime = audioContext.currentTime + i * 0.08
			gainNode.gain.setValueAtTime(0.1, startTime)
			gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15)

			oscillator.start(startTime)
			oscillator.stop(startTime + 0.15)
		})
	} catch (e) {
		// Audio not supported
	}
}

/**
 * Easter Egg Hint - Shows a subtle hint about hidden features
 */
function EasterEggHint() {
	const [showHint, setShowHint] = useState(false)
	const [dismissed, setDismissed] = useState(false)

	useEffect(() => {
		// Show hint after 30 seconds on page
		const timer = setTimeout(() => {
			if (!dismissed) setShowHint(true)
		}, 30000)

		return () => clearTimeout(timer)
	}, [dismissed])

	if (!showHint || dismissed) return null

	return (
		<div className="fixed bottom-24 left-8 z-40 animate-in fade-in slide-in-from-left-4 duration-500">
			<div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl px-4 py-3 shadow-lg max-w-xs">
				<div className="flex items-start gap-3">
					<span className="text-2xl">🤫</span>
					<div className="flex-1">
						<p className="text-sm text-foreground font-medium">Psst... Secret!</p>
						<p className="text-xs text-muted-foreground mt-1">
							Try typing <span className="text-primary font-mono">"jarvis"</span> anywhere on this page...
						</p>
					</div>
					<button
						onClick={() => setDismissed(true)}
						className="text-muted-foreground hover:text-foreground transition-colors"
						aria-label="Dismiss hint"
					>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>
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
			<JarvisEasterEgg />
			<EasterEggHint />
			<BackToTop />
			<SoundEffects />
			<SmoothScrollHandler />
		</>
	)
}
