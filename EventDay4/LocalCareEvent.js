const EventEmitter = require('events');
//create object
const reportEmitter = new EventEmitter();

// The Trigger (This would happen when your Flutter app hits the API)
const reportData = {
    category: 'Water Leak',
    location: 'Kathmandu, Ward 4',
    timestamp: new Date()
};

// Listener 1: Logging to console
reportEmitter.on('newReport', (data) => {
    console.log(`[LOG]: New report received for ${data.category} at ${data.location}`);
});

// Listener 2: Sending a notification (Simulated)
reportEmitter.on('newReport', (data) => {
    console.log(`[NOTIFY]: Sending alert to the ${data.category} Department...`);
});

reportEmitter.emit('newReport', reportData);