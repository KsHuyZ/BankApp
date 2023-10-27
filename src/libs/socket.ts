import {io} from 'socket.io-client';
const socket = io('https://banka-8las.onrender.com');
socket.on('connect', () => {
  console.log(socket.id);
});
socket.on('disconnect', () => {
  console.log('Socket is disconnect'); // undefined
});
export default socket;
