export class ContentCanvas extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <section class="flex items-center justify-center w-full h-full">
        <picture>
          <img src="./img/test-animation.webp" alt="">
        </picture>
      </section>
    `;
  }
}
