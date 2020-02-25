import { createGlobalStyle } from 'styled-components'

const Fonts = createGlobalStyle`
 @font-face {
  font-family: 'proximanova';
  src: url('/fonts/ProximaNovaLight/proximanova-light-webfont.eot');
  src: url('/fonts/ProximaNovaLight/proximanova-light-webfont.eot?#iefix') format('embedded-opentype'),
   url('/fonts/ProximaNovaLight/proximanova-light-webfont.woff2') format('woff2'),
   url('/fonts/ProximaNovaLight/proximanova-light-webfont.woff') format('woff'),
   url('/fonts/ProximaNovaLight/proximanova-light-webfont.ttf') format('truetype'),
   url('/fonts/ProximaNovaLight/proximanova-light-webfont.svg#proxima_novalight') format('svg');
  font-weight: 300;
  font-style: normal;
 }

 @font-face {
  font-family: 'proximanova';
  src: url('/fonts/ProximaNovaRegular/proximanova-regular-webfont.eot');
  src: url('/fonts/ProximaNovaRegular/proximanova-regular-webfont.eot?#iefix') format('embedded-opentype'),
   url('/fonts/ProximaNovaRegular/proximanova-regular-webfont.woff2') format('woff2'),
   url('/fonts/ProximaNovaRegular/proximanova-regular-webfont.woff') format('woff'),
   url('/fonts/ProximaNovaRegular/proximanova-regular-webfont.ttf') format('truetype'),
   url('/fonts/ProximaNovaRegular/proximanova-regular-webfont.svg#proxima_novaregular') format('svg');
  font-weight: 400;
  font-style: normal;
 }

 @font-face {
  font-family: 'proximanova';
  src: url('/fonts/ProximaNovaMedium/proximanova-medium-webfont.eot');
  src: url('/fonts/ProximaNovaMedium/proximanova-medium-webfont.eot?#iefix') format('embedded-opentype'),
   url('/fonts/ProximaNovaMedium/proximanova-medium-webfont.woff2') format('woff2'),
   url('/fonts/ProximaNovaMedium/proximanova-medium-webfont.woff') format('woff'),
   url('/fonts/ProximaNovaMedium/proximanova-medium-webfont.ttf') format('truetype'),
   url('/fonts/ProximaNovaMedium/proximanova-medium-webfont.svg#proxima_novamedium') format('svg');
  font-weight: 500;
  font-style: normal;
 }

 @font-face {
  font-family: 'proximanova';
  src: url('/fonts/ProximaNovaSemibold/proximanova-semibold-webfont.eot');
  src: url('/fonts/ProximaNovaSemibold/proximanova-semibold-webfont.eot?#iefix') format('embedded-opentype'),
   url('/fonts/ProximaNovaSemibold/proximanova-semibold-webfont.woff2') format('woff2'),
   url('/fonts/ProximaNovaSemibold/proximanova-semibold-webfont.woff') format('woff'),
   url('/fonts/ProximaNovaSemibold/proximanova-semibold-webfont.ttf') format('truetype'),
   url('/fonts/ProximaNovaSemibold/proximanova-semibold-webfont.svg#proxima_novasemibold') format('svg');
  font-weight: 600;
  font-style: normal;
 }

 @font-face {
  font-family: 'proximanova';
  src: url('/fonts/ProximaNovaBold/proximanova-bold-webfont.eot');
  src: url('/fonts/ProximaNovaBold/proximanova-bold-webfont.eot?#iefix') format('embedded-opentype'),
   url('/fonts/ProximaNovaBold/proximanova-bold-webfont.woff2') format('woff2'),
   url('/fonts/ProximaNovaBold/proximanova-bold-webfont.woff') format('woff'),
   url('/fonts/ProximaNovaBold/proximanova-bold-webfont.ttf') format('truetype'),
   url('/fonts/ProximaNovaBold/proximanova-bold-webfont.svg#proxima_novabold') format('svg');
  font-weight: 700;
  font-style: normal;
 }

 @font-face {
  font-family: 'icomoon';
  src: url('/fonts/icon/icomoon.eot?7wyazg');
  src: url('/fonts/icon/icomoon.eot?7wyazg#iefix') format('embedded-opentype'),
   url('/fonts/icon/icomoon.woff2?7wyazg') format('woff2'),
   url('/fonts/icon/icomoon.ttf?7wyazg') format('truetype'),
   url('/fonts/icon/icomoon.woff?7wyazg') format('woff'),
   url('/fonts/icon/icomoon.svg?7wyazg#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
 }

 [class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 }

 .icon-rectangle-copy:before {
  content: "\e918";
 }
 .icon-calendar:before {
  content: "\\e900";
  color: #0057b8;
 }

 .icon-down:before {
  content: "\\e901";
 }

 .icon-up:before {
  content: "\\e917";
 }

 .icon-icons-16-px-add:before {
  content: "\\e902";
  color: #0057b8;
 }

 .icon-icons-16-px-calculator:before {
  content: "\\e903";
 }

 .icon-icons-16-px-calendar:before {
  content: "\\e904";
  color: #bbbfc6;
 }

 .icon-icons-16-px-down:before {
  content: "\\e905";
 }

 .icon-icons-16-px-error:before {
  content: "\\e906";
  color: #0057b8;
 }

 .icon-icons-16-px-error-glyph:before {
  content: "\\e907";
  color: #0057b8;
 }

 .icon-icons-16-px-information:before {
  content: "\\e908";
  color: #bbbfc6;
 }

 .icon-icons-16-px-input-check:before {
  content: "\\e909";
  color: #84bd00;
 }

 .icon-icons-16-px-input-controller:before {
  content: "\\e90a";
  color: #0057b8;
 }

 .icon-icons-16-px-left:before {
  content: "\\e90b";
 }

 .icon-icons-16-px-plan:before {
  content: "\\e90c";
  color: #bbbfc6;
 }

 .icon-icons-16-px-refresh:before {
  content: "\\e90d";
  color: #bbbfc6;
 }

 .icon-icons-16-px-right:before {
  content: "\\e90e";
 }

 .icon-icons-check-active .path1:before {
  content: "\\e90f";
  color: rgb(0, 0, 0);
 }

 .icon-icons-check-active .path2:before {
  content: "\\e910";
  margin-left: -1em;
  color: rgb(255, 255, 255);
 }

 .icon-icons-check-error:before {
  content: "\\e911";
 }

 .icon-icons-check-passive:before {
  content: "\\e912";
 }

 .icon-icons-close:before {
  content: "\\e913";
  color: #949aa5;
 }

 .icon-icons-custom-error:before {
  content: "\\e914";
 }

 .icon-information:before {
  content: "\\e915";
  color: #bbbfc6;
 }

 .icon-input-check:before {
  content: "\\e916";
  color: #84bd00;
 }
`
export default Fonts