export class IntroMessage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <div 
        id="introMessage" 
        x-show="intro"
        class="fixed top-0 left-0 z-50 flex items-center w-screen h-screen font-bold bg-white/70 backdrop-blur"
      >
        <div class="flex flex-col justify-center p-4 md:p-0 w-full md:w-2/3 gap-4 md:gap-6 mx-auto">
          <h2 class=" text-rosso text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-fade animate-once animate-duration-1000 animate-delay-100 animate-ease-in animate-normal animate-fill-backwards">Benvenut!</h2>
          <div class="flex flex-col gap-1 sm:gap-2 md:gap-4 text-lg sm:text-xl md:text-2xl text-rosso animate-fade animate-once animate-duration-1000 animate-delay-[1100ms] animate-ease-in animate-normal animate-fill-backwards">
            <p>Questo è lo spazio sonoro di un mondo immaginario chiamato Altrevie.</p>
            <p>Un piccolo mondo fatto di canti, personaggi e linguaggi lontani.</p>
            <p>Qui è possibile ascoltare degli estratti dall’album omonimo di Antonella Ruggiero e Roberto Colombo, autori dei canti e delle musiche di questo mondo.</p>
            <p>Per esplorare lo spazio:</p>
            <p>Da desktop posiziona il mouse sull’immagine </p>
            <p>Da mobile porta l’immagine al centro dello schermo e tieni premuto affianco all’immagine</p>
            <p>Se hai delle curiosità trovi altre info nella sezione About! </p>
          </div>
         
          <button 
          type="button" role="button" id="entra"
          class="text-blu hover:bg-blu hover:text-white text-center w-fit px-4 text-lg sm:text-2xl md:text-3xl rounded-full  border-2 border-solid border-blu animate-fade animate-once animate-duration-1000 animate-delay-[2100ms] animate-ease-in animate-normal animate-fill-backwards"
          onclick="init()"
          >
          ENTRA
          </button>
          </div>
          </div>
          `;
        }
      }
      
      // @click="intro = ! intro"