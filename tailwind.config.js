const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,ts,svelte}',
    ],
    theme: {
        colors: {test: 'red'},
        extend: {
            textShadow: {
                DEFAULT: '1px 1px 0 var(--tw-shadow-color)',
            },
            boxShadow: {
                glow: '0 0 2px 2px'
            },
            backgroundImage: {
                noise: "url('http://localhost/img/noise.png')"
            },
            spacing: {
                sidebar: '370px',
                box: '389px',
                '160': '40rem',
            },
            colors: {
                red: colors.red,
                black: 'black',
                white: 'white',
                transparent: 'transparent',
                current: 'currentColor',
                typo: colors.stone['200'],
                success: colors.lime['800'],
                danger: colors.red['800'],
                caution: colors.amber['400'],
                info: colors.cyan['500'],
                base: {
                    ...colors.stone,
                    '900': colors.neutral['900'],
                    '950': colors.neutral['950'],
                    bg: colors.neutral['900'],
                }
            }
        },
    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
          matchUtilities(
            {
              'text-shadow': (value) => ({
                textShadow: value,
              }),
            },
            { values: theme('textShadow') }
          )
        }),
    ],
};
