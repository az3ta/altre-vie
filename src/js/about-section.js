export class AboutSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <section 
        x-cloak 
        class="fixed bottom-0 h-[calc(100%-96px)] sm:h-[calc(100%-124px)] md:h-[calc(100%-148px)] w-full px-4 md:px-8 pb-4 md:pb-8 font-medium text-blu" 
        x-show="about"
      >
        <div 
          @click.outside="about = false" 
          class="flex w-full h-full gap-4 p-4 overflow-auto text-3xl border-2 border-solid sm:text-4xl md:text-5xl md:gap-8 md:p-8 bg-white/80 backdrop-blur border-blu"
          >
          <article class="flex flex-col w-full gap-16 text-3xl md:gap-24 md:w-2/3 lg:w-1/2">
            <div class="flex flex-col gap-8 md:gap-12">
              <h2 class="text-4xl uppercase md:text-5xl">About l'Album e il Libro</h2>
              <p>
                Benvenuti nel meraviglioso mondo dell'artista eclettica Antonella, la cui nuova release, l'album "In Altre Vie," rappresenta un'esperienza unica che fonde la musica con la letteratura. Questo progetto unico è stato curato con passione e dedizione da Gabriele, un esperto del settore musicale e un ammiratore di lunga data di Antonella. Gabriele ha lavorato instancabilmente per dar vita a un album che racconta una storia speciale attraverso le note e le parole.
              </p>
            </div>

            <div class="flex flex-col gap-8 md:gap-12">
              <h3 class="text-3xl uppercase md:text-4xl text-rosso">Il Ruolo di Sebastiano: Il Grafico Visionario</h3>
              <p>La copertina dell'album, realizzata da Sebastiano, è un'opera d'arte visiva che cattura l'essenza dell'album. Il suo talento nel tradurre le emozioni e il messaggio di Antonella in un'immagine è sorprendente. L'arte visuale di Sebastiano non solo abbellisce il progetto, ma aggiunge un livello di profondità e comprensione all'opera complessiva.</p>
            </div>

            <div class="flex flex-col gap-8 md:gap-12">
              <h3 class="text-3xl uppercase md:text-4xl text-rosso">Il Team di Progettisti dei Siti Web: Arianna, Andrea e Yann</h3>
              <p>L'esperienza online è una parte fondamentale di "In Altre Vie". I siti web dedicati al progetto sono stati curati con cura da Arianna, Andrea e Yann, un trio di esperti in design e sviluppo web. Questi tre talentuosi progettisti hanno creato un ambiente online coinvolgente e interattivo che amplifica ulteriormente la connessione tra il pubblico e l'opera di Antonella.</p>
            </div>

            <div class="flex flex-col gap-8 pb-8 md:gap-12">
              <h3 class="text-3xl uppercase md:text-4xl text-rosso">L'Intreccio tra il Libro e il Sito Web</h3>
              <p>L'aspetto più intrigante di questo progetto è la stretta connessione tra l'album e il libro. Le canzoni dell'album sono strettamente intrecciate con la trama del libro, creando un'esperienza coinvolgente che coinvolge sia l'udito che la lettura. Visitando il sito web dedicato, gli utenti possono esplorare ulteriormente il mondo di Antonella, accedere a contenuti esclusivi e immergersi nell'atmosfera unica del progetto.</p>
            </div>
          </article>

          <!-- aside about -->
          <aside class="sticky top-0 flex-col items-center justify-between hidden md:w-1/3 lg:w-1/2 md:flex">
            <picture>
              <img src="./img/img-1.jpg" alt="">
            </picture>
            <picture>
              <img src="./img/arrow.jpg" alt="">
            </picture>
          </aside>
        </div>
      </section>
    `;
  }
}
