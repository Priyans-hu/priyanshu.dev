// Type imports
import type { ManifestOptions } from "vite-plugin-pwa"

/**
 * JARVIS SEO Configuration
 * Defines the default SEO configuration for the portfolio.
 */
export const seoConfig = {
	baseURL: "https://priyanshugarg.dev",
	description:
		"Priyanshu Garg - Web Developer & Tech Enthusiast. Building functional and beautiful digital experiences with React, Next.js, Node.js, and modern web technologies.",
	type: "website",
	image: {
		url: "/og-image.png",
		alt: "Priyanshu Garg - Web Developer Portfolio",
		width: 1200,
		height: 630
	},
	siteName: "Priyanshu Garg",
	twitter: {
		card: "summary_large_image"
	}
}

/**
 * JARVIS PWA Configuration
 * Defines the configuration for PWA webmanifest.
 */
export const manifest: Partial<ManifestOptions> = {
	name: "Priyanshu Garg | Portfolio",
	short_name: "PG Portfolio",
	description:
		"Web Developer & Tech Enthusiast portfolio showcasing projects and skills.",
	theme_color: "#0ea5e9", // Arc reactor blue
	background_color: "#0a0a0a", // Dark background
	display: "minimal-ui",
	icons: [
		{
			src: "/favicons/favicon-192x192.png",
			sizes: "192x192",
			type: "image/png"
		},
		{
			src: "/favicons/favicon-512x512.png",
			sizes: "512x512",
			type: "image/png"
		},
		{
			src: "/favicons/favicon-512x512.png",
			sizes: "512x512",
			type: "image/png",
			purpose: "any maskable"
		}
	]
}
