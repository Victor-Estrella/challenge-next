import type { Config } from "tailwindcss";
import type { PluginAPI } from 'tailwindcss/types/config';


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'min-418': '418px',
        'min-520': '520px',
        'min-640': '640px',
        'min-870': '870px',
        'min-1075': '1075px',
        'min-1086': '1086px',
        'min-1310': '1310px',
        'min-1520': '1520px',
        'min-1580': '1580px',
        'min-1700': '1700px',
        'min-1820': '1820px',
        'min-1920': '1920px',
        'min-2000': '2000px',
      },
      boxShadow: {
        'pergunta': '5px 5px 7px rgba(33,33,33,.7)',
      },
      backgroundImage: {
        'fundoheader': 'linear-gradient(285deg, #0000FF 0%, #0000DD 25%, #0303ab 100%)',
      },
      colors: {
        azul: '#0000FF',
        azulescuro: '#001D5C',
        azulclaro: '#01a1fc',
        branco: '#FFFFFF',
        cinza: '#D9D9D9',
        creme: '#FBF2E7',
        preto: '#000000',
        cinzalabel: '#707070',
        fundoinput: '#151515',
        bordainput: '#222222',
        preencherinput: '#b9b9b9',
        informacoes: '#7a7a7a',
        creditos: '#656565',
        footer: '#111',
      }
    }
  },
  plugins: [
    function ({ addBase }: PluginAPI) {
    addBase({
      '*': {
        'margin': '0',
        'padding': '0',
        'box-sizing': 'border-box',
        'font-family': '"Montserrat", sans-serif'
      },
      'body': {
        'background-color': '#FBF2E7'
      },
    });
  }
],
};
export default config;
