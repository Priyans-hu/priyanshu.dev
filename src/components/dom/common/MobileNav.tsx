'use client'

import { useState, useEffect } from 'react'

interface MobileNavProps {
	links: { href: string; label: string }[]
}

export default function MobileNav({ links }: MobileNavProps) {
	const [isOpen, setIsOpen] = useState(false)

	// Close menu on escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsOpen(false)
		}
		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [])

	// Prevent body scroll when menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	const handleLinkClick = () => {
		setIsOpen(false)
	}

	return (
		<>
			{/* Hamburger Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
				aria-label={isOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={isOpen}
			>
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					{isOpen ? (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					) : (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					)}
				</svg>
			</button>

			{/* Mobile Menu Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 md:hidden"
					onClick={() => setIsOpen(false)}
				>
					<div
						className="flex flex-col items-center justify-center h-full gap-8"
						onClick={(e) => e.stopPropagation()}
					>
						{links.map((link) => (
							<a
								key={link.href}
								href={link.href}
								onClick={handleLinkClick}
								className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
							>
								{link.label}
							</a>
						))}
					</div>
				</div>
			)}
		</>
	)
}
