export class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <header class="fixed flex items-baseline justify-between w-full p-4 font-bold sm:p-8 z-40">
        <h1 class="text-3xl sm:text-4xl md:text-5xl text-rosso">
          ALTRE VIE
        </h1>
        <menu class="flex gap-2 md:gap-4 lg:gap-8">
          <li 
            class="px-5 md:px-8 hover:bg-blu hover:text-white p-2.5 rounded-full border-2 border-solid border-blu text-blu text-2xl sm:text-3xl md:text-4xl"
            :class="about ? 'bg-blu text-white' : ''"
          >
            <button 
              @click="about = ! about" 
              
              type="button" 
              role="button"
            >
              <span class="block md:hidden">A</span>
              <span 
                class="hidden md:block">ABOUT</span>
            </button>
          </li>
          <li class="px-5 md:px-8 py-2.5 rounded-full border-2 border-solid border-rosso hover:bg-rosso hover:text-white text-rosso text-2xl sm:text-3xl  md:text-4xl">
            <a href="https://shop.antonellaruggiero.com/" target="_blank" rel="noopener noreferrer">
              <span class="block md:hidden">S</span>
              <span class="hidden md:block">SHOP</span>
            </a>
          </li>
        </menu>
      </header>
    `;
  }
}
