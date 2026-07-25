/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Bloomberg-terminal-inspired dark palette
        ink: {
          950: '#07090e',
          900: '#0a0e16',
          850: '#0e131e',
          800: '#121826',
          700: '#1a2233',
          600: '#243047',
          500: '#34435f',
          400: '#556891',
          300: '#8496b8',
          200: '#b6c2d9',
          100: '#dde4f0',
        },
        accent: {
          DEFAULT: '#f5a623',
          dim: '#c47f0e',
        },
        pos: '#2fbf71',
        neg: '#e5484d',
        neutral: '#8b9bb4',
        info: '#4c9aff',
        forecast: '#a78bfa',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.68rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        panel: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 24px -12px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
