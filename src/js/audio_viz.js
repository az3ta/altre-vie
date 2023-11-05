let audioElement;
let audioContext;
let analyser;
let bufferLength;
let dataArray;
let canvas;
let audio_loaded = false
let t = 0

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('#p5')
  angleMode(DEGREES)
  background(255);
  // Get the audio element and create an audio context
  // analyse_audio();
}

function analyse_audio(audioElement) {
  // audioElement = document.getElementById('audio');
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Connect the audio element to the audio context
  const source = audioContext.createMediaElementSource(audioElement);

  // Create an analyser node
  analyser = audioContext.createAnalyser();
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  // Set some analyser properties
  analyser.fftSize = 64;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  audio_loaded = true
}

function draw() {
  // clear()
  background(255, 50)
  // Analyze the audio and get the frequency data
  if (audio_loaded) {
    analyser.getByteFrequencyData(dataArray);
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw concentric ellipses that react to audio
    noFill();
    stroke(0);
    strokeWeight(1);

    beginShape();

    for (let i = 0; i < dataArray.length; i++) {
      // drawCustomShape(centerX, centerY, dataArray[i], i);
      // const exponent = map(dataArray[i], 0, 255, 0.5, 2); // Exponent based on audio data
      // const xRadius = pow(dataArray[i] / 255, exponent) * 200;
      // const yRadius = pow(dataArray[i] / 255, exponent) * 200;

      const xRadius = map(dataArray[i], 0, 255, 50, width / 3.5);
      const yRadius = map(dataArray[i], 0, 255, height / 3.5, 50);

      // Map the audio data to colors transitioning from red to blue
      const redValue = map(dataArray[i], 0, 255, 255, 0);
      const blueValue = map(dataArray[i], 0, 255, 0, 255);

      stroke(redValue, 0, blueValue, 30);
      const offset = map(i, 0, dataArray.length, 0, 360)
      createOrganicEllipse(centerX, centerY, xRadius * 3, yRadius * 3, 360, offset)
      t += 0.001;
    }
  }
}

function createOrganicEllipse(x, y, xRadius, yRadius, segments, offset) {
  beginShape();

  for (let i = 0; i < segments; i++) {
    // Use Perlin noise with changing time to add dynamic randomness to the points
    let noiseFactor = map(noise(i * 0.03, t), 0, 1, -20, 20);

    // Calculate the position of each point with modulated radii
    let xPos = x + cos(i + offset) * (xRadius / 2 + noiseFactor);
    let yPos = y + sin(i + offset) * (yRadius / 2 + noiseFactor);

    // Add the vertex to the shape
    vertex(xPos, yPos);
  }

  endShape(CLOSE);
}

function windowResized() {
  // Resize the canvas when the window size changes
  resizeCanvas(windowWidth, windowHeight);
}
