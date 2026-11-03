
const fs = require("fs");

const APP_URL = "https://devops-task-manager-rose.vercel.app";
const LOG_FILE = "monitoring/health-check.log";

async function checkWebsite() {
    const timestamp = new Date().toISOString();

    try {
        const response = await fetch(APP_URL);

        if (response.ok) {
            const message = `${timestamp} | UP | HTTP ${response.status}\n`;
            fs.appendFileSync(LOG_FILE, message);
            console.log("Website is UP");
        } else {
            const message = `${timestamp} | DOWN | HTTP ${response.status}\n`;
            fs.appendFileSync(LOG_FILE, message);
            console.log("Website is DOWN");
            process.exitCode = 1;
        }
    } catch (error) {
        const message = `${timestamp} | DOWN | ${error.message}\n`;
        fs.appendFileSync(LOG_FILE, message);
        console.log("Website is DOWN");
        process.exitCode = 1;
    }
}

checkWebsite();
