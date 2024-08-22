updateClock()
setInterval(updateClock, 1000)

function updateClock() {
    const now = new Date() // Get current date and time.

    // Extract hour, minute and second.
    const hour = String(now.getHours()).padStart(2, "0")
    const minute = String(now.getMinutes()).padStart(2, "0")
    const second = String(now.getSeconds()).padStart(2, "0")

    const clock = `${hour}:${minute}:${second}`

    document.getElementById("clock").textContent = clock
}