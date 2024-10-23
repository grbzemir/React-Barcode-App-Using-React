import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRef } from 'react'

function App() {

  const video = useRef(null)
  //UseRef bir component içerisindeki bir elemente erişmek için kullanılır.

  useEffect(() => {

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.current.srcObject = stream
    })

  }, [])

  return (
    <>
      <video ref={video} autoPlay muted />
    </>
  )
}

export default App
