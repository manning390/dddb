/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,svelte}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                noise: "url('http://localhost/img/noise.png')"
            },
            spacing: {
                sidebar: '370px',
                box: '389px'
            }
        }
    },
    plugins: [],
};
