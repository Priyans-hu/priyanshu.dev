'use client'

import { useEffect, useState, useRef } from 'react'

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
 * Play a smooth glide sound for scroll navigation
 */
const playSmoothScrollSound = () => {
	try {
		const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
		const oscillator = audioContext.createOscillator()
		const gainNode = audioContext.createGain()

		oscillator.connect(gainNode)
		gainNode.connect(audioContext.destination)

		// Smooth rising tone - like a gentle slide
		oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
		oscillator.frequency.exponentialRampToValueAtTime(350, audioContext.currentTime + 0.15)
		oscillator.type = 'sine'

		gainNode.gain.setValueAtTime(0.04, audioContext.currentTime)
		gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15)

		oscillator.start(audioContext.currentTime)
		oscillator.stop(audioContext.currentTime + 0.15)
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
 * Smooth scroll to element
 */
const smoothScrollTo = (elementId: string) => {
	const element = document.getElementById(elementId)
	if (element) {
		playSmoothScrollSound()
		element.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}
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
		playSmoothScrollSound()
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
 * Sound Effects Handler - attaches to buttons and links (except nav links)
 */
function SoundEffects() {
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			const anchor = target.closest('a')
			// Don't play click sound for hash navigation links (they have their own sound)
			if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
				return
			}
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
 * Smooth Scroll Handler - converts # links to smooth scroll without changing URL
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
				// Don't change URL - just scroll
			}
		}

		document.addEventListener('click', handleClick)
		return () => document.removeEventListener('click', handleClick)
	}, [])

	return null
}

/**
 * Random Double/Triple Click Easter Egg
 * Double-click anywhere shows a car animation
 * Triple-click shows JARVIS quote
 */
function ClickEasterEgg() {
	const [showCar, setShowCar] = useState(false)
	const [activeQuote, setActiveQuote] = useState<{ ai: string, quote: string } | null>(null)
	const clickCountRef = useRef(0)
	const clickTimerRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			// Ignore clicks on interactive elements
			if (target.closest('a') || target.closest('button') || target.closest('input') || target.closest('textarea')) {
				return
			}

			clickCountRef.current += 1

			// Clear existing timer
			if (clickTimerRef.current) {
				clearTimeout(clickTimerRef.current)
			}

			// Set timer to reset click count
			clickTimerRef.current = setTimeout(() => {
				const clicks = clickCountRef.current

				if (clicks === 2) {
					// Double click - show car
					setShowCar(true)
					playSuccessSound()
					setTimeout(() => setShowCar(false), 3000)
				} else if (clicks >= 3) {
					// Triple click - show JARVIS quote
					const quote = JARVIS_QUOTES[Math.floor(Math.random() * JARVIS_QUOTES.length)]
					setActiveQuote(quote)
					playJarvisSound()
					setTimeout(() => setActiveQuote(null), 4000)
				}

				clickCountRef.current = 0
			}, 300)
		}

		document.addEventListener('click', handleClick)
		return () => {
			document.removeEventListener('click', handleClick)
			if (clickTimerRef.current) clearTimeout(clickTimerRef.current)
		}
	}, [])

	return (
		<>
			{/* Car Animation */}
			{showCar && (
				<div className="fixed bottom-20 left-0 z-[9999] animate-[carDrive_3s_ease-in-out_forwards]">
					<div className="text-6xl transform -scale-x-100">🏎️💨</div>
				</div>
			)}

			{/* JARVIS Quote */}
			{activeQuote && (
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
			)}
		</>
	)
}

/**
 * PG Logo Easter Egg - Triple click activates Iron Man mode
 */
function LogoEasterEgg() {
	const [showIronMan, setShowIronMan] = useState(false)
	const clickCountRef = useRef(0)
	const clickTimerRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			const logo = target.closest('a[href="/"]')

			if (logo && (target.textContent?.includes('PG') || logo.textContent?.includes('PG'))) {
				e.preventDefault()
				e.stopPropagation()

				clickCountRef.current += 1

				if (clickTimerRef.current) {
					clearTimeout(clickTimerRef.current)
				}

				clickTimerRef.current = setTimeout(() => {
					if (clickCountRef.current >= 3) {
						// Triple click - activate Iron Man mode
						setShowIronMan(true)
						playJarvisSound()
						setTimeout(() => setShowIronMan(false), 5000)
					} else if (clickCountRef.current === 1) {
						// Single click - scroll to top
						playSmoothScrollSound()
						window.scrollTo({ top: 0, behavior: 'smooth' })
					}
					clickCountRef.current = 0
				}, 400)
			}
		}

		document.addEventListener('click', handleClick, true)
		return () => {
			document.removeEventListener('click', handleClick, true)
			if (clickTimerRef.current) clearTimeout(clickTimerRef.current)
		}
	}, [])

	if (!showIronMan) return null

	return (
		<div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
			<div className="text-center animate-in zoom-in duration-500">
				{/* Arc Reactor Animation */}
				<div className="relative w-32 h-32 mx-auto mb-6">
					<div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
					<div className="absolute inset-2 rounded-full bg-blue-500/20 animate-pulse" />
					<div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center">
						<div className="w-12 h-12 rounded-full bg-white/90 shadow-lg shadow-blue-400/50" />
					</div>
					{/* Rotating ring */}
					<div className="absolute inset-0 rounded-full border-2 border-blue-400/50 animate-spin" style={{ animationDuration: '3s' }}>
						<div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-blue-400" />
					</div>
				</div>
				<p className="text-2xl font-bold text-blue-400">Iron Man Mode</p>
				<p className="text-muted-foreground mt-2">"I am Iron Man." - Tony Stark</p>
			</div>
		</div>
	)
}

/**
 * Easter Egg Hint - Shows a subtle hint about hidden features, auto-hides after 10 seconds
 */
function EasterEggHint() {
	const [showHint, setShowHint] = useState(false)

	useEffect(() => {
		// Show hint after 30 seconds on page
		const showTimer = setTimeout(() => {
			setShowHint(true)
		}, 30000)

		return () => clearTimeout(showTimer)
	}, [])

	useEffect(() => {
		// Auto-hide after 10 seconds once shown
		if (showHint) {
			const hideTimer = setTimeout(() => {
				setShowHint(false)
			}, 10000)
			return () => clearTimeout(hideTimer)
		}
	}, [showHint])

	if (!showHint) return null

	return (
		<div className="fixed bottom-24 left-8 z-40 animate-in fade-in slide-in-from-left-4 duration-500">
			<div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl px-4 py-3 shadow-lg max-w-xs">
				<div className="flex items-start gap-3">
					<span className="text-2xl">🤫</span>
					<div className="flex-1">
						<p className="text-sm text-foreground font-medium">Psst... Secret!</p>
						<p className="text-xs text-muted-foreground mt-1">
							Try <span className="text-primary font-medium">triple-clicking</span> the PG logo or <span className="text-primary font-medium">double-clicking</span> anywhere...
						</p>
					</div>
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
			<ClickEasterEgg />
			<LogoEasterEgg />
			<EasterEggHint />
			<BackToTop />
			<SoundEffects />
			<SmoothScrollHandler />
		</>
	)
}
