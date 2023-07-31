// plugins/socket.io.js
import io from 'socket.io-client';

export default ({ app }, inject) => {
    const socket = io('http://localhost:3000');

    socket.on('blogCreated', (blogData) => {
        console.log('New blog created:', blogData);
    });


};
