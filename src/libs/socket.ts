import {io} from 'socket.io-client';
// const socket = io('https://banka-8las.onrender.com');
const socket = io('http://10.0.2.2:4000');
socket.on('connect', () => {
  console.log(socket.id);
});
socket.on('disconnect', () => {
  console.log('Socket is disconnect'); // undefined
});
export default socket;
