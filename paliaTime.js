// Created by ChatGPT 4o

function updatePaliaTime() {
    let realNow = new Date();
    
    let realSecond = realNow.getSeconds();
    let realMinute = realNow.getMinutes();
    let realHour = realNow.getHours();

    // Total real seconds elapsed in the current day
    let totalRealSeconds = (realHour * 3600) + (realMinute * 60) + realSecond;

    // Palia time: 1 real hour = 24 Palia hours
    let totalPaliaSeconds = totalRealSeconds * 24;

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
    let periodText = 'Day';

    if (amPm == 'PM' && paliaHour >= 6 && paliaHour < 9) {
        periodText = 'Evening';
    } else if ((amPm == 'PM' && paliaHour >=9 && paliaHour != 12) || (amPm == 'AM' && (paliaHour == 12 || paliaHour < 3)) ) {
        periodText = 'Night';
    } else if (amPm === 'AM' && paliaHour >= 3 && paliaHour < 6) {
        periodText = 'Morning';
    }
    
    document.getElementById('time-period').textContent = periodText;

    setTimeout(() => updatePaliaTime(), 415);
}

updatePaliaTime();
