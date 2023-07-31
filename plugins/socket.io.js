// plugins/socket.io.js
import io from 'socket.io-client';

export default ({ app }, inject) => {
    const socket = io('http://localhost:3000'); // Replace with the URL of your WebSocket server

    // Listen for the 'blogCreated' event from the Socket.io server
    socket.on('blogCreated', (blogData) => {
        // Handle the real-time update (e.g., display a notification)
        console.log('New blog created:', blogData);
    });

    // Inject the socket instance into the app

};
