import { Manager, Socket } from "socket.io-client";

export const connectToServer = () => {
    const manager = new Manager('http://localhost:3000/');
    const socket = manager.socket('/');
    addListeners(socket);
}

const addListeners = (socket: Socket) => {
    const serverStatusLabel = document.querySelector('#server-status')!;
    socket.on('connect', () => {
        serverStatusLabel.textContent = 'Online';
    });

      socket.on('disconnect', () => {
        serverStatusLabel.textContent = 'Offline';
    });
}