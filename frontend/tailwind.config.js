/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#27292D",
				secondary: "#353638",
				tertiary: "#434446",
				menu: "#222222",
			},
		},
	},
	plugins: [],
}
