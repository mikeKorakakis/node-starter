/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
    daisyui:{
        themes: ["light"],
    },
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./core/**/*.{js,ts,jsx,tsx}",
		"./features/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			animation: {
				wiggle: "wiggle 4s infinite",
			},
			keyframes: {
				wiggle: {
					"0%, 100%": { transform: " translateY(-5%) " },
					"50%": { transform: "translateY(5%) " },
				},
			},
			fontFamily: {
				sans: ["Roboto", ...defaultTheme.fontFamily.sans],
			},
			// colors: {
			//     primary: colors.blue,
			//     secondary: colors.red,
			//     neutral: colors.gray,
			// },
			minWidth: {
				32: "32rem",
			},
			theme: {
				extend: {
					scale: {
						flip: "-1",
					},
				},
			},
           
		},
	},
	plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
