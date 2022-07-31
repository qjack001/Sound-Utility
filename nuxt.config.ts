import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	app: {
		baseURL: '/Sound-Utility/'
	},
	router: {
		base: '/Sound-Utility/'
	},
	target: 'static',
	ssr: false,
})
