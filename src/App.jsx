import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr'; // jsQR kütüphanesini içe aktar
import './App.css';

function App() {
  const video = useRef(null);
  //use ref ile component içinden element seçme işlemi yapıyorsun
  //component içinde component olusturma
  const canvas = useRef(null);
  const [basket, setBasket] = useState([]);
  const [barcode, setBarcode] = useState('');

  const openCam = () => {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 1000,
        height: 1000,
        facingMode: 'environment' // mobilde arka kamerayı açtırmak için
      }
    })
      .then(stream => {
        video.current.srcObject = stream;
        video.current.play();

        const ctx = canvas.current.getContext('2d');
        setInterval(() => {
          canvas.current.width = video.current.videoWidth;
          canvas.current.height = video.current.videoHeight;
          ctx.drawImage(video.current, 0, 0, video.current.videoWidth, video.current.videoHeight);

          // Görüntü verisini al ve QR kodunu çöz
          const imageData = ctx.getImageData(0, 0, canvas.current.width, canvas.current.height);
          const code = jsQR(imageData.data, canvas.current.width, canvas.current.height);

          if (code) {
            setBarcode(code.data); // QR kod verisini ayarla
          }
        }, 100);
      })
      .catch(err => alert(err));
  }


  // kamerayı kapatmak için
  const closeCam = () => {
    const stream = video.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => track.stop());
  }


  useEffect(() => {
    if (barcode) {
      // API_URL'i kendinize uygun şekilde değiştirin
      const API_URL = `http://localhost/api.php?barcode=${barcode}`;

      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setBasket([...basket, data]);
          } else {
            alert('Bu ürün bulunamadı!');
          }
        });
    }
  }, [barcode]);

  return (
    <>
      <button onClick={openCam}>Kamerayı Aç</button>
      <button onClick={closeCam}>Kamerayı Kapat</button>
      <div>
        <video ref={video} autoPlay muted hidden />
        <canvas ref={canvas}></canvas>
      </div>
      {barcode && <div>Bulunan Barkod: {barcode}</div>}
      {basket.length > 0 && basket.map(item => (
        <div key={item.id}>
          {item.product} <br />
          {item.price} <br />
          <img src={item.image} alt={item.product} style={{ width: 100, height: 100 }} />
        </div>
      ))}
    </>
  );
}

export default App;
