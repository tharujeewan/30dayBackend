const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'large_input.txt');
const outputPath = path.join(__dirname, 'streamed_output.txt');

// --- NEW STEP: Create the large file first so we have something to read ---
const content = "This is a test line that we will repeat many times. ".repeat(5);
fs.writeFileSync(inputPath, content); 
console.log("📝 Created 'large_input.txt' for testing.");

// 2. Create a Readable Stream
// We use a very small highWaterMark (64 bytes) just so you can see many chunks in the console
const readStream = fs.createReadStream(inputPath, { 
    encoding: 'utf8', 
    highWaterMark: 64 
}); 

// 3. Create a Writable Stream
const writeStream = fs.createWriteStream(outputPath);

// 4. Listen to the data flow
readStream.on('data', (chunk) => {
    console.log(`--- Received a chunk of ${chunk.length} bytes ---`);
    writeStream.write(chunk);
});

readStream.on('end', () => {
    console.log('✅ Streaming complete: File copied piece-by-piece!');
});

// 5. Handle Errors (Crucial for Day 3 & 5 logic!)
readStream.on('error', (err) => console.error("Read Error:", err.message));
writeStream.on('error', (err) => console.error("Write Error:", err.message));