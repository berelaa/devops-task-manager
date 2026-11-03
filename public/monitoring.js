
const statusIndicator = document.getElementById("statusIndicator");
const statusText = document.getElementById("statusText");
const statusDescription = document.getElementById("statusDescription");

const httpStatus = document.getElementById("httpStatus");
const lastChecked = document.getElementById("lastChecked");
const responseTime = document.getElementById("responseTime");

const refreshButton = document.getElementById("refreshButton");

async function checkApplication() {
    const startTime = performance.now();

    statusText.textContent = "Checking...";
    statusDescription.textContent = "Checking application availability";

    try {
        const response = await fetch("/", {
            method: "GET",
            cache: "no-store"
        });

        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);

        httpStatus.textContent = response.status;
        responseTime.textContent = `${duration} ms`;
        lastChecked.textContent = new Date().toLocaleTimeString();

        if (response.ok) {
            statusIndicator.className = "status-indicator up";
            statusText.textContent = "SYSTEM ONLINE";
            statusDescription.textContent = "Application is working correctly";
        } else {
            statusIndicator.className = "status-indicator down";
            statusText.textContent = "SYSTEM DOWN";
            statusDescription.textContent = "Application returned an error";
        }
    } catch (error) {
        statusIndicator.className = "status-indicator down";
        statusText.textContent = "SYSTEM DOWN";
        statusDescription.textContent = "Application is unreachable";

        httpStatus.textContent = "Error";
        responseTime.textContent = "--";
        lastChecked.textContent = new Date().toLocaleTimeString();
    }
}

refreshButton.addEventListener("click", checkApplication);

// Automatic check every 30 seconds
checkApplication();
setInterval(checkApplication, 30000);
