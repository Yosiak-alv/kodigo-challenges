import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { charactersView } from './src/pages/charactersView'



document.querySelector('#app').innerHTML = `
  <div>
    <h1>API DRAGON BALL</h1>
    <div id="planets">
        <label>Seleccion un planeta: </label>
    </div>
    <div id="list-dragon-ball"></div>
  </div>
`
charactersView();
