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


// Reference, but working


buildCalendar()

// if (localStorage['custom calendar view'])

function buildCalendar() {
    const date = new Date();
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let month_lengths = [31,28,31,30,31,30,31,31,30,31,30,31];
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let currentYear = date.getFullYear();
    for (let y = date.getFullYear(); y < date.getFullYear() + 10; y++) {
        for (let m = 0; m < 5; m++) {
            let year = date.getFullYear();
            function firstDayOfMonthDay(year, month) {
                return new Date(year, month, 1).getDay();
            }

            let calc_month = months[m];
            let calc_first_day = days[firstDayOfMonthDay(date.getFullYear(), m)];
            let calc_first_day_num = firstDayOfMonthDay(date.getFullYear(), m);

            var generated_month_data = '<div class="row">';

            let week_day_counter = 0;
            let day_counter = 1;

            console.log(calc_month, calc_first_day)

            console.log(calc_first_day_num);
            for (let i = 0; i < calc_first_day_num; i++) {
                generated_month_data = generated_month_data + `<div class='day'></div>`;
                week_day_counter++;
            }

            for (let i = week_day_counter; i < 7; i++) {
                generated_month_data = generated_month_data + `<div class='day'>` + day_counter + `</div>`;
                day_counter++;
            }
            generated_month_data = generated_month_data + '</div>';
            
            for (let i = day_counter; i < month_lengths[m]; i++) {
                week_day_counter = 0;
                generated_month_data = generated_month_data + `<div class='row'>`;
                for (let i = week_day_counter; i < 7; i++) {
                    if (day_counter <= month_lengths[m]) {
                        generated_month_data = generated_month_data + `<div class='day'>` + day_counter + `</div>`;
                        day_counter++;
                    } else {
                        break;
                    }
                }
                generated_month_data = generated_month_data + '</div>';
            }

            dom('calendar-space').innerHTML = dom('calendar-space').innerHTML + `
            <div class='month-label'>` + calc_month + ' ' + y + `</div>
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
            </div>
            
            `
        }
    }
}