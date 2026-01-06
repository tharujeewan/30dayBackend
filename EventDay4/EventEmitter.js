const EventEmitter = require('events');

// Initialize a new emitter object
const myEmitter = new EventEmitter();
const myEmit = new EventEmitter();

// 1. CREATE A LISTENER (.on)
myEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}! The event was triggered.`);
});

// 2. CREATE A LISTENER (.on)
myEmitter.on('greet', (name, age) => {
    console.log(`Hello, ${name}! You are ${age} years old. The event was triggered.`);
});

// 1. CREATE A LISTENER for second event (.on)
myEmit.on('Namaste', (name) => {
    console.log(`Namaste, ${name}! Second event was triggered.`);
})
// 2. TRIGGER THE EVENT (.emit)
myEmitter.emit('greet', 'Binod', 25);
myEmit.emit('Namaste', 'apple');