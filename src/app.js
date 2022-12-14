// FIREBASE DATA

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

// CONSTANTS AND EDITABLE VARIABLES

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

var activePath;
var calendarData;






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








// Onload, get calendar data
onValue(ref(database, 'calendars'), (snapshot) => {
    calendarData = snapshot.val();

    // If viewing a calendar
    if (dom('calendar-space')) {
        if (localStorage['personal calendar']) {
            sessionStorage['active calendar'] = localStorage['personal calendar'];
        } else {

        }


        // Show current year's calendar
        buildCalendar(calendarYear, 0, 'US Holidays');
        dom('month_' + months[date.getMonth()]).scrollIntoView();
    

        // Click listners for view year change
        for (let i = 0; i < 2; i++) {
            dom_c('modify-display-year')[i].addEventListener('click', function() {
                calendarYear = calendarYear + Number(dom_c('modify-display-year')[i].getAttribute('title'));
                buildCalendar(calendarYear, 0);
            })
        }
    }


}, {
    onlyOnce: true
});





// Library
const date = new Date();
let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let month_lengths = [31,28,31,30,31,30,31,31,30,31,30,31];
let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let calendarYear = date.getFullYear();






// Add events to calendar
function insertEvents(calendar) {
    let objectRef = calendarData[calendar]['events'];
    let eventCount = Object.keys(objectRef).length;
    // if (objectRef) {
    //     eventCount = Object.keys(objectRef).length;
    //     console.log(m + '-' + d + '-' + y, eventCount)
    // }

    for (let i = 0; i < eventCount; i++) {
        let date = 'date_' + Object.keys(objectRef)[i];
        let values = Object.values(objectRef)[i];
        let event_display = '';
        for (let i = 0; i < Object.keys(values).length; i++) {
            event_display = event_display + '???';
        }
        dom(date).children[0].children[1].innerHTML = event_display;
        // let eventDisplay = '';
        // eventDisplay = eventDisplay + '???';
    }
    // console.log('Events Inserted')
}








// Calendar Builder
function buildCalendar(year_begin, extra_years, calendar) {
    dom('calendar-space').innerHTML = '';
    dom_c('current-year-display')[0].innerHTML = calendarYear;
    for (let y = year_begin; y < (year_begin + extra_years + 1); y++) {
        for (let m = 0; m < 12; m++) {
            function firstDayOfMonthDay(month, year) {
                return new Date(year, month, 1).getDay();
            }

            function insertEmptyDay() {
                generated_month_data = generated_month_data + `<div class='calendar-object day empty'></div>`;
            }

            function insertDayWithTag(m, d, y) {
                // let eventCount = 0;
                // let objectRef = calendarData[sessionStorage['active calendar']]['events'][m + '-' + d + '-' + y];
                // if (objectRef) {
                    // eventCount = Object.keys(objectRef).length;
                    // console.log(m + '-' + d + '-' + y, eventCount)
                // }

                let eventDisplay = '';
                // for (let i = 0; i < eventCount; i++) {
                    // eventDisplay = eventDisplay + '???';
                // }

                generated_month_data = generated_month_data + `

                <div class='calendar-object day' id='date_` + (Number(m) + 1) + `-` + d  + `-` + y + `'>
                <div>
                    <div class='date'>` + d + `</div>
                    <div class='date-info'>` + eventDisplay + `</div>
                </div>
                </div>
                `;
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
                    <div class='calendar-object weekday-label'>S</div>
                    <div class='calendar-object weekday-label'>M</div>
                    <div class='calendar-object weekday-label'>T</div>
                    <div class='calendar-object weekday-label'>W</div>
                    <div class='calendar-object weekday-label'>T</div>
                    <div class='calendar-object weekday-label'>F</div>
                    <div class='calendar-object weekday-label'>S</div>
                </div>
                ` + generated_month_data + `
            </div>
            `
        }
    }
    dom('date_' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear()).classList.add('current-day');
    insertEvents(calendar);
}