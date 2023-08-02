let stream = null


function handleMediaStreamError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

function gotLocalMediaStream(mediaStream) {
  if (!stream)
    stream = mediaStream
  const localStream = stream;
  const localVideo = document.querySelector('video');
  if ("srcObject" in localVideo) {
    localVideo.srcObject = localStream;
  } else {
    localVideo.src = window.URL.createObjectURL(localStream);
  }
}

const devicesArray = []

const startGetStream = () => {
  navigator.mediaDevices.enumerateDevices().then(devices => {
    devicesArray.length = 0;
    devicesArray.push(...devices)
    console.log('devicesArray', devicesArray)

    const constraints = {
      video: {
        deviceId: devicesArray.find(d => d.kind === 'videoinput').deviceId,
        facingMode: 'environment',
      }
    };

    console.log('constraints', constraints)

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(gotLocalMediaStream)
      .catch(handleMediaStreamError)
  })
}

startGetStream()

document.addEventListener('visibilitychange', startGetStream);
window.addEventListener('pageshow', startGetStream);
