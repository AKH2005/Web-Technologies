const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}! Welcome to Node.js Events.`);
});

eventEmitter.on('greet', (name) => {
    console.log(`Have a great day, ${name}!`);
});

eventEmitter.on('message', (msg) => {
    console.log(`Message received: ${msg}`);
});

console.log('Triggering greet event...');
eventEmitter.emit('greet', 'Akhil');

console.log('Triggering message event...');
eventEmitter.emit('message', 'This is a custom event example.');