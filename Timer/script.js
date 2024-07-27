// script.js

document.addEventListener('DOMContentLoaded', () => {
    const events = document.querySelectorAll('.event');
    const timerDisplay = document.getElementById('timer');

    function updateTimer() {
        const now = new Date();
        let nextEvent = null;
        let nextEventTime = Infinity;

        events.forEach(event => {
            const eventTime = new Date();
            const [hour, minute] = event.getAttribute('data-time').split(':');
            eventTime.setHours(hour);
            eventTime.setMinutes(minute);
            eventTime.setSeconds(0);

            if (eventTime > now && eventTime < nextEventTime) {
                nextEvent = event;
                nextEventTime = eventTime;
            }
        });

        if (nextEvent) {
            const timeDiff = nextEventTime - now;
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            timerDisplay.textContent = `Next: ${nextEvent.textContent} in ${hours}h ${minutes}m ${seconds}s`;
        } else {
            timerDisplay.textContent = 'No more events for today';
        }
    }

    setInterval(updateTimer, 1000);
    updateTimer();
});

