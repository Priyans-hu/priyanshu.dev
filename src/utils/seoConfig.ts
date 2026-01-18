// Type imports
import type { ManifestOptions } from "vite-plugin-pwa"

/**
 * JARVIS SEO Configuration
 * Defines the default SEO configuration for the portfolio.
 */
export const seoConfig = {
	baseURL: "https://priyans-hu.netlify.app",
	description:
		"Priyanshu Garg - Full Stack Developer at Plivo. Specializing in React, Node.js, Go, TypeScript, and cloud technologies. Building scalable web applications and open-source projects.",
	type: "website",
	image: {
		url: "/og-image.png",
		alt: "Priyanshu Garg - Full Stack Developer Portfolio",
		width: 1200,
		height: 630
	},
	siteName: "Priyanshu Garg | Portfolio",
	twitter: {
		card: "summary_large_image",
		site: "@priyans_hu",
		creator: "@priyans_hu"
	},
	keywords: [
		"Priyanshu Garg",
		"Full Stack Developer",
		"Software Engineer",
		"React Developer",
		"Node.js Developer",
		"Go Developer",
		"Plivo",
		"Web Developer India",
		"Portfolio",
		"TypeScript",
		"AWS",
		"PostgreSQL"
	]
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
