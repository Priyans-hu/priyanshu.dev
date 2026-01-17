import { useEffect, useState } from "react"
import { Button } from "~/ui/button"
import { Moon, Sun, Sparkles } from "lucide-react"

type Theme = "light" | "dark" | "joy"

const THEMES: Theme[] = ["light", "dark", "joy"]

/**
 * JARVIS Theme Toggle
 * Cycles through: Light → Dark → Joy → Light
 * - Light: Clean, minimal
 * - Dark: Sleek, professional
 * - Joy: Colorful, vibrant
 */
export default function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>("dark")

	useEffect(() => {
		// Initialize theme from localStorage or default to dark
		const stored = localStorage.getItem("theme") as Theme | null
		const initialTheme = stored && THEMES.includes(stored) ? stored : "dark"
		setTheme(initialTheme)
		applyTheme(initialTheme)
	}, [])

	const applyTheme = (newTheme: Theme) => {
		const root = document.documentElement

		// Add transition class
		root.classList.add("theme-transition")

		// Remove all theme classes
		root.classList.remove("dark", "joy")

		// Apply new theme
		if (newTheme === "dark") {
			root.classList.add("dark")
		} else if (newTheme === "joy") {
			root.classList.add("joy")
		}
		// light = no class (default :root styles)

		// Remove transition class after animation
		setTimeout(() => {
			root.classList.remove("theme-transition")
		}, 300)
	}

	const cycleTheme = () => {
		const currentIndex = THEMES.indexOf(theme)
		const nextIndex = (currentIndex + 1) % THEMES.length
		const nextTheme = THEMES[nextIndex]

		setTheme(nextTheme)
		localStorage.setItem("theme", nextTheme)
		applyTheme(nextTheme)
	}

	const getIcon = () => {
		switch (theme) {
			case "light":
				return <Sun className="h-5 w-5" />
			case "dark":
				return <Moon className="h-5 w-5" />
			case "joy":
				return <Sparkles className="h-5 w-5" />
		}
	}

	const getLabel = () => {
		switch (theme) {
			case "light":
				return "Switch to dark theme"
			case "dark":
				return "Switch to joy theme"
			case "joy":
				return "Switch to light theme"
		}
	}

	return (
		<Button
			variant="outline"
			size="icon"
			className="rounded-full cursor-pointer border-border/50 hover:border-primary hover:bg-primary/10 transition-all duration-200"
			onClick={cycleTheme}
			aria-label={getLabel()}
			title={getLabel()}
		>
			{getIcon()}
		</Button>
	)
}
