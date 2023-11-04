const map_container = document.querySelector('.map-container');
let device = false
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  // User is likely using a smartphone
  console.log("User is using a smartphone");
  device = true
} else {
  console.log('laptop');
}

const bounds = map_container.getBoundingClientRect(map_container)

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

const freeze_frames = []
const placedCoordinates = new Set();

// Function to handle the intersection
function handleIntersection(entries) {
  entries.forEach(entry => {
    const centeredImage = entry.target;
    if (entry.isIntersecting) {
      // The image has entered the viewport
      // You can trigger your event here
      centeredImage.style.backgroundColor = 'green'; // Change the background color for visualization
      console.log('centering', centeredImage.currentSrc);
    } else {
      centeredImage.style.backgroundColor = 'red'; // Change the background color for visualization
      // The image is not in the viewport
      console.log('exit vieport');
    }
  });
}

// Create an Intersection Observer
// observer.observe(map_container)

for (let i = 0; i < placements.length; i++) {
  const placement = placements[i];
  const media_container = document.createElement('div')
  media_container.classList.add('media-container')
  const video = document.createElement('video')
  video.style.position = 'absolute'
  const source = document.createElement('source');
  source.src = placement.animation;
  video.loop
  video.appendChild(source)
  media_container.appendChild(video)

  const audio = document.createElement('audio')
  audio.src = placement.audio
  audio.loop = true
  media_container.appendChild(audio)

  // const observer = new IntersectionObserver(handleIntersection, {
  //   root: null,
  //   rootMargin: '-50% 50%',
  //   threshold: 0,
  // });
  // observer.observe(video)

  if (!device) {
    video.addEventListener("mouseover", () => {
      audio.volume = 1
      audio.play()
      video.play();
    });

    video.addEventListener("mouseout", () => {
      // audio.pause()
      fadeOutAudio(audio)
      video.pause();
      video.currentTime = 0;

    });
  } else {
    video.addEventListener('touchstart', (e) => {
      e.preventDefault()
      audio.volume = 1
      audio.play()
      video.play();
    })

    video.addEventListener('touchend', (e)=>{
      e.preventDefault()
      fadeOutAudio(audio)
      video.pause();
      video.currentTime = 0;
    })
  }
  // image.classList.add('image');

  let attempts = 0;
  let randomX, randomY;
  let overlap
  do {
    randomX = 50 + Math.floor(Math.random() * (containerWidth - (imageWidth + 50)));
    randomY = 150 + Math.floor(Math.random() * (containerHeight - (imageHeight + 200)));
    attempts++;

    // Check if the generated coordinates overlap with existing images
    overlap = false;
    placedCoordinates.forEach(coord => {
      const [x, y] = coord;
      if (
        randomX < x + imageWidth &&
        randomX + imageWidth > x &&
        randomY < y + imageHeight &&
        randomY + imageHeight > y
      ) {
        overlap = true;
      }
    })

    if (!overlap) {
      placedCoordinates.add([randomX, randomY]);
    }
  } while (overlap && attempts < maxAttempts);

  if (attempts >= maxAttempts) {
    console.log('Failed to place an image without overlapping.');
  } else {
    video.style.left = `${randomX}px`;
    video.style.top = `${randomY}px`;
    video.style.width = rand_int(200, 500) + 'px'
    video.style.maxHeight = '500px'
    map_container.appendChild(media_container);
  }
}


function rand_int(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
        console.log('audio paused');
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