export class IntroMessage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <div x-show="intro" class="fixed top-0 left-0 z-30 flex items-center w-screen h-screen font-bold bg-white/70 backdrop-blur">
        <div class="flex flex-col justify-center p-4 md:p-0 w-full md:w-2/3 gap-12 mx-auto">
          <h2 class=" text-rosso text-4xl sm:text-5xl md:text-6xl lg:text-8xl">Benvenut!</h2>
          <div class="flex flex-col gap-8 text-2xl md:text-3xl text-rosso">
            <p >
              questo è lo spazio suono disordinato di Antonella e Roberto.
            </p>
            <p>
              second paragraph
            </p>
            <p>
              third
            </p>
          </div>
          <button 
            @click="intro = ! intro"
            type="button" role="button"
            class="text-blu hover:bg-blu hover:text-white text-center w-fit px-4 text-2xl md:text-3xl rounded-full  border-2 border-solid border-blu"
          >
            ENTRA
          </button>
        </div>
      </div>
    `;
  }
}
