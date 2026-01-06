// const fs = require('fs').promises; // Use the Promise-based version
// const path = require('path');
// const math = require('./math');

// async function handleCivicData() {
//     try {
//         // Perform a calculation using your Day 2 module
//         const totalReports = math.add(15, 25); 
//         const content = `Total issues reported today: ${totalReports}`;
//         console.log("totalReports",totalReports);

//         const filePath = path.join(__dirname, 'reports.txt');

//         // 1. WRITE: Create the file
//         await fs.writeFile(filePath, content);
//         console.log("✅ File created successfully!");

//         // 2. READ: Get the data back
//         const data = await fs.readFile(filePath, 'utf8'); // 'utf8' makes it readable text
//         console.log("📖 File Content:", data);

//         // 3. APPEND: Add more data without deleting the old stuff
//         await fs.appendFile(filePath, '\nStatus: All issues pending review.');
//         console.log("📝 Data appended!");

//     } catch (err) {
//         console.error("❌ Error handling file:", err);
//     }
// }

// handleCivicData();



//Json data
const fs = require('fs').promises;
const path = require('path');
const math = require('./math');

async function handleCivicData() {
    try {
        const filePath = path.join(__dirname, 'reports.json');

        // New report
        const newReport = {
            totalReports: math.add(15, 25),
            status: "pending",
            createdAt: new Date().toISOString()
        };

        let reports = [];

        // 1️⃣ READ existing JSON (if file exists)
        try {
            const data = await fs.readFile(filePath, 'utf8');
            const parsed = JSON.parse(data);

            // ✅ Ensure reports is always an array
            reports = Array.isArray(parsed) ? parsed : [];
        } catch (err) {
            // File does not exist or is invalid → start fresh
            reports = [];
        }

        // 2️⃣ APPEND (push) new report
        reports.push(newReport);

        // 3️⃣ WRITE updated JSON back
        await fs.writeFile(filePath, JSON.stringify(reports, null, 2), 'utf8');

        console.log("✅ JSON report appended successfully");

    } catch (err) {
        console.error("❌ Error:", err);
    }
}

handleCivicData();
