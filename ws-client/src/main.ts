import './style.css'
import { connectToServer } from './socket-client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div> 
<h2>Websocket - Client</h2>
<input type="text" placeholder="JWT" id="jwt-token"/>
<button id="btn-connect">Connect</button>
<br/>
<span id="server-status">Offline</span>
<ul id="clients-ul">
<li>ASDASDAS</li>
</ul>
<form id="message-form">
    <input type="text" placeholder="Enter a message..." id="message-input"/>
    <button type="submit">Send</button>
    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
</form>
</div>
`
//connectToServer();
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;
const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;

btnConnect.addEventListener('click', () => {
    if(jwtToken.value.trim().length <= 0) return alert('JWT is required');
    connectToServer(jwtToken.value.trim());
});