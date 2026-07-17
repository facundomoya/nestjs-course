import './style.css'
import typescriptLogo from './assets/typescript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.ts'
import { connectToServer } from './socket-client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div> 
<h1>Websocket - Client</h1>
<span id="server-status">Offline</span>
<ul id="clients-ul">
<li>ASDASDAS</li>
</ul>
<form id="message-form">
    <input type="text" placeholder="Enter a message..." id="message-input"/>
    <button type="submit">Send</button>
</form>
</div>
`
connectToServer();