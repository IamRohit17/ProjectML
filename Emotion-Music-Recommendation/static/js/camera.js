const startCam = document.querySelector('.start-camera');
const stopCam = document.querySelector('.stop-camera');
const video = document.getElementById('camera_feed');

let cameraRunning = false;

startCam.addEventListener('click', toggleCamera);
stopCam.addEventListener('click', toggleCamera);

function toggleCamera() {
  if (cameraRunning) {
    stopCamera();
  } else {
    startCamera();
  }
}

function startCamera() {
  cameraRunning = true;
  startCam.style.display = 'none';
  stopCam.style.display = 'block';
  video.src = `{{ url_for('video_feed') }}`;

  const songList = document.querySelector('.song-list');
  songList.style.display = 'block';
}

function stopCamera() {
  cameraRunning = false;
  stopCam.style.display = 'none';
  startCam.style.display = 'block';
  video.src = "../static/img/im5.jpg";
  fetch('/stop_camera', { method: 'POST' })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error stopping camera:', error));
  const songList = document.querySelector('.song-list');
  songList.style.display = 'none';
}