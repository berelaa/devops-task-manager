
const fs = require("fs");

const requiredFiles = [
    "public/index.html",
    "public/style.css",
    "public/script.js",
    "src/taskManager.js"
];

console.log("Starting application build...");

for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
        console.error(`Build failed: Missing file ${file}`);
        process.exit(1);
    }

    console.log(`Verified: ${file}`);
}

console.log("Build completed successfully!");
