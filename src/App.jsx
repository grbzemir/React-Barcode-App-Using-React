import { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const video = useRef(null);
  const canvas = useRef(null);

  const openCam = () => {

    navigator.mediaDevices
      .getUserMedia({ video: { width: 1280, height: 720 } })
      .then((stream) => {
        video.current.srcObject = stream;
        video.current.play();

        const ctx = canvas.current.getContext('2d');

        setInterval(() => {
          ctx.current.width = video.current.videoWidth;
          ctx.current.height = video.current.videoHeight;
          ctx.drawImage(video.current, 0, 0, video.current.videoWidth, ctx.current.videoHeight);
          const imageData = ctx.getImageData(0, 0, ctx.width, ctx.height);
          console.log(imageData);
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });

  }
  return (
    <>
      <button onClick={openCam}>Kamerayı Aç</button>
      <div>
        <video ref={video} autoPlay muted hidden />
        <canvas ref={canvas}></canvas>
      </div>
    </>
  );
}

export default App;
