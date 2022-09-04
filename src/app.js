import { 
    initializeApp 
} from "firebase/app";

import { 
    getAnalytics 
} from "firebase/analytics";

import { 
    getDatabase, ref, set, onValue, get
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA74gLz1oCS_bD1-mr-eEpk7YAxsC1_RcY",
  authDomain: "baileo-calendar.firebaseapp.com",
  databaseURL: "https://baileo-calendar-default-rtdb.firebaseio.com",
  projectId: "baileo-calendar",
  storageBucket: "baileo-calendar.appspot.com",
  messagingSenderId: "664695284118",
  appId: "1:664695284118:web:e0a1456728c059a1f6bdb7"
};



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

var activePath;



// Reference Functions



function dom(id) {
    return document.getElementById(id);
}

function dom_c(className) {
    return document.getElementsByClassName(className);
}

function writeData(path, value) {
    set(ref(database, path), value);
}

// onValue(ref(database, path), (snapshot) => {

// }, {
//     onlyOnce: true
// });

// Library
const date = new Date();
let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let month_lengths = [31,28,31,30,31,30,31,31,30,31,30,31];
let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let calendarYear = date.getFullYear();

// On Load, RUN...
if (dom('calendar-space')) {
    buildCalendar(calendarYear, 0);
    dom('month_' + months[date.getMonth()]).scrollIntoView();
    dom('date_' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear()).style.color = 'lightcoral';
    // dom('date_' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear()).style.fontWeight = '500';

    for (let i = 0; i < 2; i++) {
        dom_c('modify-display-year')[i].addEventListener('click', function() {
            calendarYear = calendarYear + Number(dom_c('modify-display-year')[i].getAttribute('title'));
            buildCalendar(calendarYear, 0);
        })
    }

    // dom_c('current-year-display')[0].addEventListener('click', function() {
    //     calendarYear = prompt('What year do you want to transport to?');
    //     buildCalendar(calendarYear, 0);
    // })
}

// Calendar Builder
function buildCalendar(year_begin, extra_years) {
    dom('calendar-space').innerHTML = '';
    dom_c('current-year-display')[0].innerHTML = calendarYear;
    for (let y = year_begin; y < (year_begin + extra_years + 1); y++) {
        for (let m = 0; m < 12; m++) {
            function firstDayOfMonthDay(month, year) {
                return new Date(year, month, 1).getDay();
            }

            function insertEmptyDay() {
                generated_month_data = generated_month_data + `<div class='day'></div>`;
            }

            function insertDayWithTag(m, d, y, wd) {
                generated_month_data = generated_month_data + `<div class='day' id='date_` + (Number(m) + 1) + `-` + d  + `-` + y + `'>` + d + `</div>`;
            }

            function endDiv() {
                generated_month_data = generated_month_data + '</div>';
            }

            var generated_month_data = '<div class="row">';

            let week_day_counter = 0;
            let day_counter = 1;

            for (let i = 0; i < firstDayOfMonthDay(m, y); i++) {
                insertEmptyDay()
                week_day_counter++;
            }

            for (let i = week_day_counter; i < 7; i++) {
                insertDayWithTag(m, day_counter, y);
                day_counter++;
            }
            endDiv();
            
            for (let i = day_counter; i < month_lengths[m]; i++) {
                week_day_counter = 0;
                generated_month_data = generated_month_data + `<div class='row'>`;
                for (let i = week_day_counter; i < 7; i++) {
                    if (day_counter <= month_lengths[m]) {
                        insertDayWithTag(m, day_counter, y);
                        day_counter++;
                    } else {
                        break;
                    }
                }
                endDiv();
            }

            dom('calendar-space').innerHTML = dom('calendar-space').innerHTML + `
            <div class='month-label' id='month_` + months[m] + `'>` + months[m] + ' ' + y + `</div>
            <div class='table'>
                <div class='row'>
                    <div class='weekday-label'>S</div>
                    <div class='weekday-label'>M</div>
                    <div class='weekday-label'>T</div>
                    <div class='weekday-label'>W</div>
                    <div class='weekday-label'>T</div>
                    <div class='weekday-label'>F</div>
                    <div class='weekday-label'>S</div>
                </div>
                ` + generated_month_data + `
            </div>`
        }
    }
}