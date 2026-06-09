export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        darkBlue: '#0F172A',
        waterBlue: '#2563EB',
        emergency: '#DC2626',
        grayText: '#64748B',
        cardBg: '#F1F5F9',
        success: '#10B981',
      },
    },
  },
  plugins: [],
};
