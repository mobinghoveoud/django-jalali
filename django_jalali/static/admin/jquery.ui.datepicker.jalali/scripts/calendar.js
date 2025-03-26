const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

function gregorianToJalali(g_year, g_month, g_day) {  
    let gy = g_year - 1600;
    let gm = g_month - 1;
  
    let j_day_no = (
        365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) 
        + Math.floor((gy + 399) / 400) + g_day - 1 - 79
    );
    
    for (let i = 0; i < gm; i++) {
        j_day_no += g_days_in_month[i];
    }
    
    if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0))) {
        j_day_no += 1;
    }
    
    const j_np = Math.floor(j_day_no / 12053);
    j_day_no %= 12053;
    let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);

    j_day_no %= 1461;
    
    if (j_day_no >= 366) {
        j_day_no -= 1;
        jy += Math.floor(j_day_no / 365);
        j_day_no %= 365;
    }
    
    let jm = 0;
    for (let i = 0; i < 11; i++) {
        if (j_day_no < j_days_in_month[i]) {
            jm = i + 1;
            break;
        }
        j_day_no -= j_days_in_month[i];
    }

    const jd = j_day_no + 1;    
    // If jm is still 0, then the date falls in the 12th month.
    if (jm === 0) {
        jm = 12;
    }
    
    return new Array(jy, jm, jd);
  }


function jalaliToGregorian(j_year, j_month, j_day) {
    let jy = j_year - 979;
    let g_day_no = (
        365 * jy +
        Math.floor(jy / 33) * 8 +
        Math.floor((jy % 33 + 3) / 4) +
        j_day - 1 + 79
    );

    for (let i = 0; i < j_month - 1; i++) {
        if (i == 11 && is_leap(j_year)) g_day_no += 1;

        g_day_no += j_days_in_month[i];
    }

    let gy = 1600 + 400 * Math.floor(g_day_no / 146097); // 146097 = 365*400 + 400/4 - 400/100 + 400/400
    g_day_no %= 146097;

    let leap = 1;
    if (g_day_no >= 36525) { // 36525 = 365*100 + 100/4
        g_day_no -= 1;
        gy += 100 * Math.floor(g_day_no / 36524); // 36524 = 365*100 + 100/4 - 100/100
        g_day_no %= 36524;

        if (g_day_no >= 365) {
            g_day_no += 1;
        } else {
            leap = 0;
        }
    }

    gy += 4 * Math.floor(g_day_no / 1461); // 1461 = 365*4 + 4/4
    g_day_no %= 1461;

    if (g_day_no >= 366) {
        leap = 0;
        g_day_no -= 1;
        gy += Math.floor(g_day_no / 365);
        g_day_no %= 365;
    }

    let i = 0;
    while (g_day_no >= g_days_in_month[i] + ((i === 1 && leap) ? 1 : 0)) {
        g_day_no -= g_days_in_month[i] + ((i === 1 && leap) ? 1 : 0);
        i++;
    }

    const gmonth = i + 1;
    const gday = g_day_no + 1;

    return new Array(gy, gmonth, gday);
}

function is_leap(year){
    return [1, 5, 9, 13, 17, 22, 26, 30].includes(year % 33);
}
