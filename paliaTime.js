// There seems to be a bit of an offset between reading the local time and what the in-game clock shows,
// so we'll have to adjust for that - modify your local storage if it doesn't perfectly match - for me 2231 worked perfectly

// Read the offset value from local storage
let offset = parseInt(localStorage.getItem('paliaOffset'));

// If no offset is found or it's not a valid number, use the default offset
if (isNaN(offset)) {
    offset = 2000; // those are ms
    // Set default offset in local storage
    localStorage.setItem('paliaOffset', offset.toString());
}

function updatePaliaTime() {
    let unixTimestamp = new Date().getTime();

    // Calculate total Palia seconds
    let paliaTimestamp = (unixTimestamp + offset) * 24;

    // Calculate in-game hours and minutes
    let paliaHour = Math.floor(paliaTimestamp / 3600000) % 24;
    let paliaMinute = Math.floor(paliaTimestamp / 60000) % 60;

    // Determine AM/PM and adjust hour for 12-hour format
    let amPm = paliaHour >= 12 ? 'PM' : 'AM';
    paliaHour = paliaHour % 12 || 12; // the hour '0' should be '12'

    // Format the time as HH:MM AM/PM
    let paliaTime = `${String(paliaHour).padStart(2, '0')}:${String(paliaMinute).padStart(2, '0')} ${amPm}`;
    document.getElementById('palia-time').textContent = paliaTime;

    // Determine the period of the day
    let periodText = 'Day';

    if (amPm == 'PM' && paliaHour >= 6 && paliaHour < 9) {
        periodText = 'Evening';
    } else if ((amPm == 'PM' && paliaHour >= 9 && paliaHour != 12) || (amPm == 'AM' && (paliaHour == 12 || paliaHour < 3))) {
        periodText = 'Night';
    } else if (amPm === 'AM' && paliaHour >= 3 && paliaHour < 6) {
        periodText = 'Morning';
    }

    document.getElementById('star').src = `https://guky667.github.io/random/${periodText}.png`
    document.getElementById('time-period').textContent = periodText;

    hour_offset = 0

        if((amPm == 'PM' && paliaHour != 12) || (amPm == 'AM' && paliaHour == 12))
        {
            hour_offset = 12;
        }

        let paliaTimeInMinutes = (paliaHour + hour_offset) * 60 + paliaMinute;
        let angle = paliaTimeInMinutes / 4; 

        // Apply the rotation: 48 degrees offset - to rotate the pointer image starting in the top-left to the top (morning) - and 180 because it starts at night actually, lmao
        document.getElementById('cursor').style.transform = `rotate(${ angle + 48 + 180 }deg)`;
    }

    console.log('v1.2') // just a hardcoded print so I can check the latest changes made it through

    // Initial call to display the cursor immediately
    updatePaliaTime();

    // Keep updating the clock every 500ms
    setInterval(updatePaliaTime, 500);