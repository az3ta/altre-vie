export class AboutSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <section 
        x-cloak 
        class="fixed z-40 bottom-0 h-[calc(100%-96px)] sm:h-[calc(100%-124px)] md:h-[calc(100%-148px)] w-full px-4 md:px-8 pb-4 md:pb-8 font-medium text-blu" 
        x-show="about"
      >
        <div 
          @click.outside="about = false" 
          class="flex w-full h-full gap-4 scrollbar-hide p-4 overflow-auto text-3xl border-2 border-solid sm:text-4xl md:text-5xl md:gap-8 md:p-8 bg-white/80 backdrop-blur border-blu"
          >
          <article class="flex flex-col w-full gap-16 text-3xl md:gap-24 md:w-2/3 xl:w-1/2 animate-fade animate-once animate-duration-1000 animate-delay-100 animate-ease-in animate-normal animate-fill-backwards">
            <h2 class="text-4xl md:text-5xl">Altrevie è una ricerca artistica a più voci che si sviluppa nel suono, nella carta e nel web. 
            </h2>
            <div class="flex flex-col gap-3 md:gap-6">
              <h3 class="text-3xl uppercase md:text-4xl text-rosso">L’Album</h3>
              <p>
              La ricerca sonora di <b>Antonella Ruggiero</b> e <b>Roberto Colombo</b> si concentra sulla manipolazione digitale della voce e sulla coniazione di una lingua altra ed estranea che anima il mondo di Altrevie.
              <br/>
              Insieme riversano, scompongo e ricompongono la voce del primo lavoro solista di Antonella Ruggiero: “Libera” (1996). Di Roberto Colombo le musiche originali che accompagnano il nuovo canto. 
              </p>
            </div>

            <div class="flex flex-col gap-3 md:gap-6">
              <h3 class="text-3xl uppercase md:text-4xl text-rosso">La Grafica e il Peep-Show</h3>
              <p>
                Il lavoro grafico è frutto di un incontro di interessi tra il collettivo <b>Libri Finti Clandestini</b> e Antonella Ruggiero, uniti dall’amore per i libri d’epoca e per il riuso. Esplorando 110 titoli provenienti dalla collezione personale di Antonella, alcuni dei quali risalenti a più di un secolo fa, il collettivo ha composto il mondo visivo di Altrevie.
              </p>
              img
              <p>
              Oltre al formato CD, il collettivo milanese Libri Finti Clandestini, in collaborazione con <b>5X Letterpress</b>, ha prodotto un’opera di editoria d’arte in tiratura limitata: un peep-show, supporto cartaceo apribile a fisarmonica dotato di spiraglio, all’interno del quale è possibile spiare il mondo sconosciuto di Altrevie. 
              </p>
              img
            </div>

            <div class="flex flex-col gap-3 md:gap-6">
              <h3 class="text-3xl uppercase md:text-4xl text-rosso">Il Sito</h3>
              <p>
                Questo sito è la controparte digitale dell’esperienza fisica del peep-show, dove le immagini d’epoca che compongono il collage di Altrevie si animano e dialogano con i brani musicali, svelando piccoli dettagli sui personaggi e gli elementi che abitano questo mondo. 
                <br/>
                Il sito è stato sviluppato dallo studio svizzero <b>hypersecret.studio</b> di Arianna Smaron, Andrea Zaccuri e Yann Martins. 
              </p>
            </div>

            <div class="flex flex-col gap-3 pb-8 md:gap-6">
              <h3 class="text-3xl uppercase md:text-4xl text-rosso">Un Post-Disco?</h3>
              <p>
              Questa ricerca a più voci prende le mosse dalla curiosità di esplorare delle alternative possibili ai supporti musicali tradizionali, come il vinile o il CD, in un panorama dove la musica viene fruita principalmente via streaming. 
              <br/>
              L’obiettivo è quello di indagare una diversa modalità di fruizione musicale a livello sia fisico che digitale, progettando un supporto fisico “su misura” per la musica di Altrevie e il mondo immaginario che invita a esplorare. 
              <br/>
              Il peep-show, supporto fisico che permette di spiare dentro il mondo di Altrevie, è collegato tramite QR-code alla musica dell’omonimo album di Antonella Ruggiero, i cui canti animano e abitano questo stesso mondo. 
              <br/>
              Ricerca, co-progettazione e realizzazione del prototipo peep-show e del sito di Altrevie sono state cofinanziate dal European Union's Single Market Programme nell'ambito del progetto "Post-Disco-Graphy" di Gabriele Colombo.
              </p>
            </div>
          </article>

          <!-- aside about -->
          <aside class="sticky top-0 flex-col items-center justify-between hidden md:w-1/3 xl:w-1/2 md:flex animate-fade animate-once animate-duration-1000 animate-delay-[1100ms] animate-ease-in animate-normal animate-fill-backwards">
            <picture>
              <img src="./img/img-about.webp" alt="About context image">
            </picture>
            <picture>
              <img src="./icons/arrow.svg" alt="Arrow icon">
            </picture>
          </aside>
        </div>
      </section>
    `;
  }
}
