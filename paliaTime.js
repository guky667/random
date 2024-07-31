// Created by ChatGPT 4o

function updatePaliaTime() {
    let realNow = new Date();
    let realHour = realNow.getHours();
    let realMinute = realNow.getMinutes();
    let realSecond = realNow.getSeconds();

    // Total real seconds elapsed in the current day
    let totalRealSeconds = (realHour * 3600) + (realMinute * 60) + realSecond;

    // Palia time: 1 real hour = 24 Palia hours
    let paliaSecondsPerRealSecond = 24 * 3600 / (1 * 3600); // 1 real hour = 24 in-game hours
    let totalPaliaSeconds = totalRealSeconds * paliaSecondsPerRealSecond;

    // Offset to sync with actual in-game time (adjust this value as needed)
    let offsetMinutes = 2;
    totalPaliaSeconds += offsetMinutes * 60;

    // Convert total Palia seconds to hours and minutes
    let paliaHour = Math.floor((totalPaliaSeconds / 3600) % 24);
    let paliaMinute = Math.floor((totalPaliaSeconds % 3600) / 60);
    let amPm = paliaHour >= 12 ? 'PM' : 'AM';

    // Adjust hour for 12-hour format
    paliaHour = paliaHour % 12;
    paliaHour = paliaHour ? paliaHour : 12; // the hour '0' should be '12'

    // Format the time as HH:MM
    let formattedPaliaTime = `${String(paliaHour).padStart(2, '0')}:${String(paliaMinute).padStart(2, '0')} ${amPm}`;
    document.getElementById('palia-time').textContent = formattedPaliaTime;

    // Determine the period of the day
    let periodText = '';
    if (paliaHour >= 3 && paliaHour < 6 && amPm === 'AM') {
        periodText = 'Morning';
    } else if ((paliaHour >= 6 && amPm === 'AM') || (paliaHour < 6 && amPm === 'PM')) {
        periodText = 'Day';
    } else if (paliaHour >= 6 && paliaHour < 9 && amPm === 'PM') {
        periodText = 'Evening';
    } else if ((paliaHour >= 9 && amPm === 'PM') || (paliaHour < 3 && amPm === 'AM')) {
        periodText = 'Night';
    }
    document.getElementById('time-period').textContent = periodText;
}

// Update the Palia time every second
setInterval(updatePaliaTime, 1000);

// Initial call to display the time immediately
updatePaliaTime();
