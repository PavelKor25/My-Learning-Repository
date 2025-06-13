import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    /* Пустой тег - это фишка ES6, он не создает новый компонент, а просто обрамляет все как-бы дочерние комп-ты */
    <>
      <h1>Title of my first ViteReact project</h1>
      <p>Wow, that's cool, because: </p>
      <ol>
        <li>Dynamicly generating page</li>
        <li>More features</li>
        <li>I can use console! Yeah!</li>
      </ol>
    </>
  )
}

export default App
