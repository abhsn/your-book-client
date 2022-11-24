/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	// darkMode: true,
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
}
