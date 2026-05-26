/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./pages/*.{html,js}",
    "./index.html",
    "./components/**/*.{html,js}",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Sage Green Palette
        primary: {
          DEFAULT: "#6B8E4A", // sage-600
          50: "#F4F7F0", // sage-50
          100: "#E8EFE0", // sage-100
          200: "#D1DFC1", // sage-200
          300: "#BACFA2", // sage-300
          400: "#92AE76", // sage-400
          500: "#6B8E4A", // sage-500
          600: "#5A7A3E", // sage-600
          700: "#4A6533", // sage-700
          800: "#3A5028", // sage-800
          900: "#2C3E1F", // sage-900
        },
        // Secondary Colors - Sienna Palette
        secondary: {
          DEFAULT: "#A0522D", // sienna-600
          50: "#FBF5F2", // sienna-50
          100: "#F7EBE5", // sienna-100
          200: "#EFD7CB", // sienna-200
          300: "#E7C3B1", // sienna-300
          400: "#D79B7D", // sienna-400
          500: "#C77349", // sienna-500
          600: "#A0522D", // sienna-600
          700: "#844325", // sienna-700
          800: "#68341D", // sienna-800
          900: "#4C2616", // sienna-900
        },
        // Accent Colors - Gold Palette
        accent: {
          DEFAULT: "#B8860B", // gold-600
          50: "#FBF8F0", // gold-50
          100: "#F7F1E1", // gold-100
          200: "#EFE3C3", // gold-200
          300: "#E7D5A5", // gold-300
          400: "#D7B969", // gold-400
          500: "#C79D2D", // gold-500
          600: "#B8860B", // gold-600
          700: "#996F09", // gold-700
          800: "#7A5807", // gold-800
          900: "#5B4105", // gold-900
        },
        // Background Colors
        background: "#FEFEFE", // neutral-50
        surface: {
          DEFAULT: "#F8F6F0", // warm-50
          100: "#F3F1E8", // warm-100
          200: "#E7E3D1", // warm-200
        },
        // Text Colors
        text: {
          primary: "#2C3E1F", // forest-900
          secondary: "#5A6B4D", // sage-muted
          tertiary: "#8A9B7D", // sage-light
          inverse: "#FEFEFE", // neutral-50
        },
        // Semantic Colors
        success: {
          DEFAULT: "#4A7C59", // green-600
          50: "#F0F7F3", // green-50
          100: "#E1EFE7", // green-100
          500: "#4A7C59", // green-500
          700: "#3A6347", // green-700
        },
        warning: {
          DEFAULT: "#D2691E", // amber-600
          50: "#FDF6F0", // amber-50
          100: "#FBEDE1", // amber-100
          500: "#D2691E", // amber-500
          700: "#A85418", // amber-700
        },
        error: {
          DEFAULT: "#A0522D", // terracotta-600
          50: "#FBF5F2", // terracotta-50
          100: "#F7EBE5", // terracotta-100
          500: "#A0522D", // terracotta-500
          700: "#844325", // terracotta-700
        },
        // Border Colors
        border: {
          light: "rgba(107, 142, 74, 0.15)", // sage with opacity
          medium: "rgba(107, 142, 74, 0.25)", // sage with opacity
          dark: "rgba(44, 62, 31, 0.3)", // forest with opacity
        },
      },
      fontFamily: {
        headline: ['"Crimson Text"', 'serif'],
        body: ['"Source Sans 3"', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Source Sans 3"', 'sans-serif'],
        serif: ['"Crimson Text"', 'serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.75rem' }],
        'lg': ['1.125rem', { lineHeight: '1.875rem' }],
        'xl': ['1.25rem', { lineHeight: '2rem' }],
        '2xl': ['1.5rem', { lineHeight: '2.25rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.5rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.75rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
        '6xl': ['3.75rem', { lineHeight: '4rem' }],
        '7xl': ['4.5rem', { lineHeight: '4.75rem' }],
      },
      spacing: {
        'xs': '0.25rem', // 4px
        'sm': '0.5rem', // 8px
        'md': '1rem', // 16px
        'lg': '1.5rem', // 24px
        'xl': '2rem', // 32px
        '2xl': '3rem', // 48px
        '3xl': '4rem', // 64px
        '4xl': '6rem', // 96px
        '5xl': '8rem', // 128px
        '6xl': '12rem', // 192px
      },
      borderRadius: {
        'sm': '0.25rem', // 4px
        'md': '0.5rem', // 8px
        'lg': '0.75rem', // 12px
        'xl': '1rem', // 16px
        '2xl': '1.5rem', // 24px
        'full': '9999px',
      },
      boxShadow: {
        'organic': '0 4px 20px rgba(44, 62, 31, 0.08)',
        'organic-sm': '0 2px 10px rgba(44, 62, 31, 0.06)',
        'organic-lg': '0 8px 30px rgba(44, 62, 31, 0.12)',
        'organic-xl': '0 12px 40px rgba(44, 62, 31, 0.15)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '300ms',
        'slow': '500ms',
        'breath': '800ms',
      },
      transitionTimingFunction: {
        'organic': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'breath': 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-out forwards',
        'slide-up': 'slideUp 300ms ease-out forwards',
        'breath': 'breath 800ms ease-in-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        breath: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #92AE76 0%, #5A7A3E 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #D79B7D 0%, #A0522D 100%)',
        'gradient-accent': 'linear-gradient(135deg, #D7B969 0%, #B8860B 100%)',
        'gradient-earth': 'linear-gradient(135deg, #BACFA2 0%, #E7C3B1 50%, #E7D5A5 100%)',
      },
      backdropBlur: {
        'organic': '12px',
      },
      backdropSaturate: {
        'organic': '180%',
      },
      letterSpacing: {
        'tighter': '-0.02em',
        'tight': '-0.01em',
        'normal': '0',
        'wide': '0.01em',
        'wider': '0.02em',
        'widest': '0.04em',
      },
      lineHeight: {
        'tight': '1.2',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.75',
        'loose': '2',
      },
      maxWidth: {
        'prose': '65ch',
        'prose-narrow': '55ch',
        'prose-wide': '75ch',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-pretty': {
          'text-wrap': 'pretty',
        },
        '.backdrop-organic': {
          'backdrop-filter': 'blur(12px) saturate(180%)',
          'background-color': 'rgba(248, 246, 240, 0.85)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}