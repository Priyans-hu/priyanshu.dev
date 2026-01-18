'use client'

import { useEffect, useState } from 'react'

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
 * Main Enhancements Component
 */
export default function Enhancements() {
	return (
		<>
			<BackToTop />
			<SoundEffects />
			<SmoothScrollHandler />
		</>
	)
}
