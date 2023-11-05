const map_container = document.querySelector('.map-container');
let device = false
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  // User is likely using a smartphone
  console.log("User is using a smartphone");
  device = true;
} else {
  console.log("laptop");
}

const bounds = map_container.getBoundingClientRect(map_container);

// Get the dimensions of the container and the viewport
const containerWidth = bounds.width;
const containerHeight = bounds.height;
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

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

// for (let i = 0; i < placements.length; i++) {
//   const placement = placements[i];
//   const media_container = document.createElement("div");
//   media_container.classList.add("media-container");
//   const video = document.createElement("video");
//   video.style.position = "absolute";
//   const source = document.createElement("source");
//   source.src = placement.animation;
//   video.loop;
//   video.appendChild(source);
//   media_container.appendChild(video);

//   // const audio = document.createElement("audio");
//   // audio.src = placement.audio;
//   // audio.loop = true;
//   // media_container.appendChild(audio);

//   load_audio(placement.audio, media_container, (audio) => {
//     console.log(audio);
//   })

//   if (!device) {
//     video.addEventListener("mouseover", (e) => {
//       // audio.volume = 1;
//       // audio.play();
//       video.play();
//     });

//     video.addEventListener("mouseout", (e) => {
//       // fadeOutAudio(audio);
//       video.pause();
//       video.currentTime = 0;
//     });
//   } else {
//     video.addEventListener("touchstart", (e) => {
//       e.preventDefault();
//       audio.volume = 1;
//       audio.play();
//       video.play();
//     });

//     video.addEventListener("touchend", (e) => {
//       e.preventDefault();
//       fadeOutAudio(audio);
//       video.pause();
//       video.currentTime = 0;
//     });
//   }
//   // image.classList.add('image');

//   let attempts = 0;
//   let randomX, randomY;
//   let overlap;
//   do {
//     randomX =
//       50 + Math.floor(Math.random() * (containerWidth - (imageWidth + 50)));
//     randomY =
//       150 + Math.floor(Math.random() * (containerHeight - (imageHeight + 200)));
//     attempts++;

//     // Check if the generated coordinates overlap with existing images
//     overlap = false;
//     placedCoordinates.forEach((coord) => {
//       const [x, y] = coord;
//       if (
//         randomX < x + imageWidth &&
//         randomX + imageWidth > x &&
//         randomY < y + imageHeight &&
//         randomY + imageHeight > y
//       ) {
//         overlap = true;
//       }
//     });

//     if (!overlap) {
//       placedCoordinates.add([randomX, randomY]);
//     }
//   } while (overlap && attempts < maxAttempts);

//   if (attempts >= maxAttempts) {
//     console.log("Failed to place an image without overlapping.");
//   } else {
//     video.style.left = `${randomX}px`;
//     video.style.top = `${randomY}px`;
//     video.style.width = rand_int(200, 500) + "px";
//     video.style.maxHeight = "500px";
//     map_container.appendChild(media_container);
//   }
// }


async function loadAudioAndAnimation(index) {
  const audioFile = placements[index].audio;
  const animationFile = placements[index].animation;
  const media_container = document.createElement("div");
  media_container.classList.add("media-container");

  try {
    // Load the audio file using the Fetch API or any other method
    // const audioResponse = await fetch(audioFile);
    // const audioData = await audioResponse.arrayBuffer(); // Depending on the file type

    // Create an audio element for the audio
    const audio = new Audio();
    audio.src = audioFile;

    // Create a video element for the animation
    const animation = document.createElement('video');
    animation.src = animationFile;
    animation.controls = false; // Add controls to play the animation
    animation.autoplay = false; // Set autoplay as per your needs

    media_container.appendChild(animation)
    media_container.appendChild(audio)

    processAudioAndAnimation(audio, animation);
    // Append the elements to the DOM or handle them as needed
    element_placement(media_container, animation)
    // map_container.appendChild(media_container);

    // Process the loaded audio data and handle the elements as needed

    // Continue loading the next entry if there are more
    if (index < placements.length - 1) {
      const perc = Math.round((index / placements.length) * 100)
      console.log(`loaded ${perc}%`);
      loadAudioAndAnimation(index + 1);
    }
  } catch (error) {
    console.error(`Error loading files: ${error}`);
  }
}

// Start the loading process
loadAudioAndAnimation(0);

function processAudioAndAnimation(audio, video) {
  if (!device) {
    video.addEventListener("mouseover", (e) => {
      activate();
    });

    video.addEventListener("mouseout", (e) => {
      deactivate();
    });
  } else {
    video.addEventListener("touchstart", (e) => {
      e.preventDefault();
      activate()
    });

    video.addEventListener("touchend", (e) => {
      e.preventDefault();
      deactivate()
    });
    video.addEventListener("mousedown", (e) => {
      e.preventDefault();
      activate()
    });

    video.addEventListener("mouseup", (e) => {
      e.preventDefault();
      deactivate()
    });
  }

  function deactivate() {
    fadeOutAudio(audio);
    video.pause();
    video.currentTime = 0;
    audio_loaded = false;
  }

  function activate() {
    audio.volume = 1;
    analyse_audio(audio);
    audio.play();
    video.play();
  }
}

function element_placement(media_div, video) {
  let attempts = 0;
  let randomX, randomY;
  let overlap;
  do {
    randomX = 50 + Math.floor(Math.random() * (containerWidth - (imageWidth + 50)));
    randomY = 150 + Math.floor(Math.random() * (containerHeight - (imageHeight + 200)));
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
    console.log("Failed to place an image without overlapping.");
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

function load_audio(src, container, callback) {
  const audio = new Audio(src);
  audio.controls = false;
  audio.loop = true
  container.appendChild(audio);
  if (typeof callback === 'function') {
    callback(audio);
  }
}

function fadeOutAudio(audio) {
  if (!audio.paused) {
    const fadeOutInterval = 10; // Time interval for volume reduction (in milliseconds)
    const fadeOutDuration = 300; // Total duration of the fade-out effect (in milliseconds)
    const initialVolume = audio.volume;
    const steps = Math.ceil(fadeOutDuration / fadeOutInterval);
    const volumeStep = initialVolume / steps;

    let step = 0;

    const fadeOutIntervalId = setInterval(() => {
      if (step >= steps) {
        clearInterval(fadeOutIntervalId);
        audio.pause();
        console.log("audio paused");
      } else {
        audio.volume -= volumeStep;
        step++;
      }
    }, fadeOutInterval);
  }
}

// function isElementInCenter(element) {
//   const rect = element.getBoundingClientRect();
//   const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
//   return rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2;
// }

// window.addEventListener('scroll', function () {
//   console.log('check');
//   const media_containers = document.querySelectorAll('.media-container')
//   for (let i = 0; i < media_containers.length; i++) {
//     const image = media_containers[i]
//     console.log(image);
//     if (isElementInCenter(image)) {
//       // The image is in the center of the screen
//       // You can trigger your event here
//       image.style.backgroundColor = 'green'; // Change the background color for visualization
//     } else {
//       image.style.backgroundColor = 'red'; // Reset the background color
//     }
//   }
// });
