import { Manager, Socket } from "socket.io-client";

export const connectToServer = () => {
    const manager = new Manager('http://localhost:3000/');
    const socket = manager.socket('/');
    addListeners(socket);
}

const addListeners = (socket: Socket) => {
    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#clients-ul')!;

    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;

    socket.on('connect', () => {
        serverStatusLabel.textContent = 'Online';
    });

    socket.on('disconnect', () => {
        serverStatusLabel.textContent = 'Offline';
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHTML = '';
        clients.forEach(clientId => {
            clientsHTML += `<li>${clientId}</li>`;
        });
        clientsUl.innerHTML = clientsHTML;
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = messageInput.value;
        if (message) {
            socket.emit('message', message);
        }
        messageInput.value = '';
    });
}