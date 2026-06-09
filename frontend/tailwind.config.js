/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      {
        gathondu: {
          primary: '#D85A30',
          'primary-content': '#ffffff',
          secondary: '#712B13',
          'secondary-content': '#ffffff',
          accent: '#F0997B',
          'accent-content': '#4A1B0C',
          neutral: '#1c1917',
          'neutral-content': '#fafaf9',
          'base-100': '#ffffff',
          'base-200': '#fafaf9',
          'base-300': '#e7e5e4',
          'base-content': '#1c1917',
          info: '#2563eb',
          success: '#15803d',
          warning: '#d97706',
          error: '#dc2626',
          '--rounded-box': '0.5rem',
          '--rounded-btn': '0.25rem',
          '--rounded-badge': '9999px',
        },
      },
    ],
    darkTheme: 'gathondu',
  },
  plugins: [require('daisyui')],
}
