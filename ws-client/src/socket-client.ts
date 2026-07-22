import { Manager, Socket } from "socket.io-client";

let socket: Socket;

export const connectToServer = (token: string) => {
    const manager = new Manager('https://nest-teslo-shop-94og.onrender.com/socket.io/socket.io.min.js', {
        extraHeaders: {
            authentication: token
        }
    });
    socket?.removeAllListeners();
    socket = manager.socket('/');
    addListeners();
}

const addListeners = () => {
    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

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

    socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
      const newMessage = document.createElement('li');
      newMessage.innerHTML = `<strong>${payload.fullName}</strong>: ${payload.message}`;
      messagesUl.append(newMessage);
    });

   messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageInput.value;
    if (message) {
        socket.emit('message-from-client', { 
            id: '123',
            message: message
        });
    }
    messageInput.value = '';
});
}