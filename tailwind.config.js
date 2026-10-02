/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Be Vietnam Pro: hiển thị dấu tiếng Việt đẹp và cân đối
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },

      colors: {
        ink: { DEFAULT: '#33364D', soft: '#6B7089' },

        brand: {
          400: '#A5B1F5',
          500: '#8B9CF0',
          600: '#6F80DB',
        },

        // Thu / chi: `DEFAULT` cho chữ-icon, `soft` cho nền badge
        income: { DEFAULT: '#2F8F6B', soft: '#DDF3E8' },
        expense: { DEFAULT: '#C4566A', soft: '#FBE3E6' },

        // Màu danh mục: dùng cho progress bar, icon (xem constants/categories.js)
        cat: {
          food: '#F4B183',
          transport: '#8EC5F0',
          shopping: '#C9A7F0',
          bills: '#F0A9C0',
          health: '#8FD3B6',
          fun: '#F2D07A',
          other: '#B8BDD0',
        },
      },

      borderRadius: {
        glass: '1.5rem', // bo góc mềm cho card
      },

      backdropBlur: {
        glass: '20px',
      },

      boxShadow: {
        glass: '0 8px 32px rgba(120, 110, 170, 0.14)',
        'glass-lg': '0 12px 40px rgba(120, 110, 170, 0.22)',
      },

      keyframes: {
        // Skeleton loading: dải sáng trượt ngang, nhẹ nhàng
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};