export class SeoContent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <!-- Primary Meta Tags -->
      <title>Altrevie - Antonella Ruggiero</title>
      <meta name="title" content="Meta Tags — Preview, Edit and Generate" />
      <meta name="description" content="Sito dedicato ad Altrevie, album musicale di Antonella Ruggiero e Roberto Colombo" />

      <meta name="keywords" content="Altrevie, Antonella Ruggiero, Roberto Colombo, Album">
      <meta name="robots" content="index, follow">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-16">
      <meta name="language" content="Italian">
      <meta name="author" content="Arianna Smaron, Andrea Zaccuri, Yann Martins">

      <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://metatags.io/" />
    <meta property="og:title" content="Altrevie - Antonella Ruggiero" />
    <meta property="og:description" content="Sito dedicato ad Altrevie, album musicale di Antonella Ruggiero e Roberto Colombo" />
    <meta property="og:image" content="/img/cover.jpg" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://metatags.io/" />
    <meta property="twitter:title" content="Altrevie - Antonella Ruggiero" />
    <meta property="twitter:description" content="Sito dedicato ad Altrevie, album musicale di Antonella Ruggiero e Roberto Colombo" />
    <meta property="twitter:image" content="/img/cover.jpg" />
    `;
  }
}
