const map_container = document.querySelector(
  ".map-container"
);
let device = false;
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // User is likely using a smartphone
  console.log("User is using a smartphone");
  device = true;
} else {
  console.log("laptop");
}

const bounds =
  map_container.getBoundingClientRect(map_container);

// Get the dimensions of the container and the viewport
const containerWidth = bounds.width;
const containerHeight = bounds.height;
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

// global audio
const audio_elements = [];
const video_elements = [];

// Calculate the center position
const centerX = (containerWidth - viewportWidth) / 2;
const centerY = (containerHeight - viewportHeight) / 2;

// Scroll to the center position
map_container.scrollLeft = centerX;
map_container.scrollTop = centerY;

const numImages = 30;
const imageWidth = 365; // Adjust this to the actual width of your images
const imageHeight = 500; // Adjust this to the actual height of your images
const maxAttempts = 100; // Maximum number of attempts to position an image

const placedCoordinates = new Set();

function init() {
  // loadAudioAndAnimation(0);
  // const button = document.querySelector('#entra')
  // button.textContent = 'LOADING...'

  const media_elements = document.querySelectorAll(
    ".media-container"
  );
  for (let i = 0; i < media_elements.length; i++) {
    const media = media_elements[i];
    const video = media.querySelector("video");
    const audio = media.querySelector("audio");
    console.log(video, audio);
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const media_el =
      audioContext.createMediaElementSource(audio);
    if (!device) {
      video.addEventListener("mouseover", (e) => {
        activate(audio, video, audioContext, media_el);
      });

      video.addEventListener("mouseout", (e) => {
        deactivate(audio, video);
      });
    } else {
      media.style.width =
        rand_int(150, window.innerWidth - 50) + "px";
      media.style.maxHeight = "500px";
      media.style.left = "0px";
      media.style.top = "0px";
      const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: "0px", // No margin
        threshold: 0.95, // When at least 50% of the target is visible
      };
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log("activate");
              activate(
                audio,
                video,
                audioContext,
                media_el
              );
            } else {
              console.log("deactivate");
              deactivate(audio, video);
            }
          });
        },
        observerOptions
      );
      observer.observe(media);
    }
  }
}

let loaded_items_audio = 0;
let loaded_items_video = 0;
let data_loaded = false;

async function loadAudioAndAnimation(index) {
  const audioFile = placements[index].audio;
  const animationFile = placements[index].animation;
  const media_container = document.createElement("div");
  media_container.classList.add("media-container");

  try {
    const audio = new Audio();
    // console.log(window.location, audioFile);
    audio.src = audioFile;
    audio.loop = true;
    audio_elements.push(audio);
    // audio.onloadeddata = () => {
    //   loaded_items_audio++
    //   const perc = Math.round((loaded_items_audio / placements.length) * 100)
    //   // console.log(`audio loading: ${perc}%`);
    //   // console.log(loaded_items_video === placements.length && loaded_items_audio === placements.length);
    //   if (loaded_items_video === placements.length && loaded_items_audio === placements.length) {
    //     const intro = document.querySelector('#introMessage')
    //     intro.style.display = 'none'
    //   }
    // }
    // Create a video element for the animation
    const animation = document.createElement("video");
    const source = document.createElement("source");
    source.src = animationFile;
    source.type = "video/mp4";
    animation.appendChild(source);
    animation.preload = "auto";
    animation.setAttribute("muted", "true");
    animation.controls = false; // Add controls to play the animation
    animation.loop = true;
    animation.style.mixBlendMode = "multiply";
    animation.onprogress = (event) => {
      // console.log(event);
    };
    // animation.onloadeddata = () => {
    //   loaded_items_video++
    //   const perc = Math.round((loaded_items_video / placements.length) * 100)
    //   // console.log(`video loading: ${perc}%`);
    //   // console.log(loaded_items_video === placements.length && loaded_items_audio === placements.length);
    //   if (loaded_items_video === placements.length && loaded_items_audio === placements.length) {
    //     const intro = document.querySelector('#introMessage')
    //     intro.style.display = 'none'
    //   }
    // }
    video_elements.push(animation);

    media_container.appendChild(animation);
    media_container.appendChild(audio);

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const media =
      audioContext.createMediaElementSource(audio);

    if (!device) {
      processAudioAndAnimation(
        audio,
        audioContext,
        media,
        animation
      );
      element_placement(media_container, animation);
    } else {
      processAudioAndAnimation_mobile(
        audio,
        audioContext,
        media,
        animation,
        media_container
      );
      element_placement_mobile(media_container, animation);
    }
    if (index < placements.length - 1) {
      loadAudioAndAnimation(index + 1);
    } else {
      console.log("all items loaded");
    }
  } catch (error) {
    console.error(`Error loading files: ${error}`);
  }
}

function processAudioAndAnimation_mobile(
  audio,
  audioctx,
  media,
  video,
  media_container
) {
  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: "0px", // No margin
    threshold: 0.95, // When at least 50% of the target is visible
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activate(audio, video, audioctx, media);
      } else {
        deactivate(audio, video);
      }
    });
  }, observerOptions);
  observer.observe(media_container);
}

function processAudioAndAnimation(
  audio,
  audioctx,
  media,
  video
) {
  if (!device) {
    video.addEventListener("mouseover", (e) => {
      activate(audio, video, audioctx, media);
    });

    video.addEventListener("mouseout", (e) => {
      deactivate(audio, video);
    });
  }
  // else {
  //   video.addEventListener("touchstart", (e) => {
  //     e.preventDefault();
  //     activate(audio, video, audioctx, media)
  //   });

  //   video.addEventListener("touchend", (e) => {
  //     e.preventDefault();
  //     deactivate(audio, video)
  //   });
  //   video.addEventListener("mousedown", (e) => {
  //     e.preventDefault();
  //     activate(audio, video, audioctx, media)
  //   });

  //   video.addEventListener("mouseup", (e) => {
  //     e.preventDefault();
  //     deactivate(audio, video)
  //   });
  // }
}

function deactivate(audio, video) {
  if (!device) {
    fadeOutAudio(audio);
  } else {
    audio.pause();
    global_audio_pause();
  }
  global_video_pause();
  video.pause();
  video.currentTime = 0;
  audio_loaded = false;
}

function activate(audio, video, audioctx, media) {
  clearInterval(fadeOutIntervalId);
  // if (fade_out_audio !== null) { fade_out_audio.pause() }
  global_audio_pause();
  audio.volume = 0.5;
  analyse_audio(audioctx, media);
  audio.play();
  video.play();
}

function element_placement_mobile(media_div) {
  media_div.style.width =
    rand_int(150, windowWidth - 50) + "px";
  media_div.style.maxHeight = "500px";
  map_container.appendChild(media_div);
}

function element_placement(media_div) {
  let attempts = 0;
  let randomX, randomY;
  let overlap;
  do {
    randomX =
      50 +
      Math.floor(
        Math.random() * (containerWidth - (imageWidth + 50))
      );
    randomY =
      150 +
      Math.floor(
        Math.random() *
          (containerHeight - (imageHeight + 200))
      );
    attempts++;

    // Check if the generated coordinates overlap with existing images
    overlap = false;
    placedCoordinates.forEach((coord) => {
      const [x, y] = coord;
      if (
        randomX < x + imageWidth &&
        randomX + imageWidth > x &&
        randomY < y + imageHeight &&
        randomY + imageHeight > y
      ) {
        overlap = true;
      }
    });

    if (!overlap) {
      placedCoordinates.add([randomX, randomY]);
    }
  } while (overlap && attempts < maxAttempts);

  if (attempts >= maxAttempts) {
    console.log(
      "Failed to place an image without overlapping."
    );
  } else {
    media_div.style.left = `${randomX}px`;
    media_div.style.top = `${randomY}px`;
    media_div.style.width = rand_int(200, 500) + "px";
    media_div.style.maxHeight = "500px";
    map_container.appendChild(media_div);
  }
}

function rand_int(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function global_audio_pause() {
  for (let i = 0; i < audio_elements.length; i++) {
    const audio = audio_elements[i];
    audio.pause();
  }
}
function global_video_pause() {
  for (let i = 0; i < video_elements.length; i++) {
    const video = video_elements[i];
    video.pause();
  }
}

let fadeOutIntervalId = null;
let fade_out_audio = null;
function fadeOutAudio(audio) {
  // fade_out_audio = audio
  if (!audio.paused) {
    const fadeOutInterval = 1; // Time interval for volume reduction (in milliseconds)
    const fadeOutDuration = 100; // Total duration of the fade-out effect (in milliseconds)
    const initialVolume = audio.volume;
    const steps = Math.ceil(
      fadeOutDuration / fadeOutInterval
    );
    const volumeStep = initialVolume / steps;
    let step = 0;
    fadeOutIntervalId = setInterval(() => {
      if (step >= steps) {
        clearInterval(fadeOutIntervalId);
        audio.pause();
      } else {
        audio.volume -= volumeStep;
        step++;
      }
    }, fadeOutInterval);
  }
}
