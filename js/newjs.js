let addDayButton = document.querySelector("#add-day")
let removeDayButton = document.querySelector("#remove-day")
let updateTableButton = document.querySelector("#update-table")
let days = document.querySelector("#days")
let missedLessonDiv = document.querySelector('#missed-lessons')
let startingdate = new Date(2018, 3, 28);
let newDate = new Date(startingdate.getFullYear(), startingdate.getMonth(), startingdate.getDate());
let allStudents = 11

// below function is for Add Day Button when it's clicked
addDayButton.addEventListener('click', function () {
    missedLessonDiv.innerHTML = Number(missedLessonDiv.innerHTML) + 10
    let totalDays = document.querySelectorAll('.daily-score')
    document.querySelector('#total-days').innerHTML = 1 + totalDays.length

    // creating new div, which is appended as child in previously created div with #days
    let ScoresDiv = document.createElement('div');
    ScoresDiv.setAttribute('class', 'daily-score')
    days.appendChild(ScoresDiv);

    // creating new divs with amount of students and appen them as child to above created div
    for (let k = 0; k < allStudents; k++) {
        let studentScore = document.createElement('div')
        studentScore.setAttribute('class', 'student-score' + k)
        ScoresDiv.appendChild(studentScore)

        // searching div with class student-score0, which is first div for DATE.
        if (studentScore.classList.contains('student-score0')) {
            studentScore.style.background = 'yellow'
            studentScore.style.fontSize = "11px"

            // if week day is 1,3 or 6 (Mon, Wed, Sat) adding 2 days to my date defined in global score
            if (newDate.getDay() == 1 || newDate.getDay() == 3 || newDate.getDay() == 6) {
                newDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 2)
                studentScore.textContent = newDate
            }

            // in other condition, add 1 day. this happens when we add 2 days to Wed and becomes Friday.
            else {
                newDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1)
                studentScore.textContent = newDate
            }
        }

        // if above statement is skipped, below statement will happen. These are divs for scores
        else {
            studentScore.textContent = 0
            studentScore.style.background = 'red'

            // below eventListener calls prompt, which is saved in variable, and is sent to next if-else statement
            studentScore.addEventListener('click', function (e) {
                let dayscore = Number(prompt('please enter score'))

                // if entered value isn't number, call alert and don't update score.
                if (isNaN(dayscore)) {
                    alert('please enter number')
                }

                // if entered value is number, update value with following statements.
                else {
                    if (dayscore > 5) {
                        if (e.target.innerHTML == 0) {
                            missedLessonDiv.innerHTML = Number(missedLessonDiv.innerHTML) - 1
                        }
                        e.target.innerHTML = 5
                        e.target.style.background = "green"
                        e.target.classList.add("attanded-lesson")
                    }
                    else if (dayscore <= 0) {
                        if (!(e.target.innerHTML == 0)) {
                            missedLessonDiv.innerHTML = Number(missedLessonDiv.innerHTML) + 1
                        }
                        e.target.innerHTML = 0
                        e.target.style.background = "red"
                        e.target.classList.add("missed-lesson")
                    }
                    else {
                        if (e.target.innerHTML == 0) {
                            missedLessonDiv.innerHTML = Number(missedLessonDiv.innerHTML) - 1
                        }
                        e.target.innerHTML = dayscore
                        e.target.style.background = "green"
                        e.target.classList.add("attanded-lesson")
                    }
                }
                // update information after entering prompt
                average()
            })
        }
    }
    // update information after adding day
    average()
})

// function to calculate avarage for each student and update information in Statistic 
function average() {
    for (let j = 1; j < allStudents; j++) {
        let studentaverage = document.querySelectorAll('.student-score' + j);
        let totalDays = document.querySelectorAll('.daily-score')
        let average = 0;
        for (let i = 0; i < totalDays.length; i++) {
            average = (average + Number(studentaverage[i].innerHTML) / totalDays.length);
        }

        // replace average score DIV with current average score
        document.querySelector('.average-score-student' + j).innerHTML = average.toFixed(2)
    }

    // calculating total average mark for all students
    let total = 0
    for (let j = 0; j < 10; j++) {
        let averageDivs = document.querySelectorAll('.average-score')
        total += Number(averageDivs[j].innerHTML)

        // replace average score DIV with current average score
        document.querySelector('#average-mark').innerHTML = (total / 10).toFixed(2)
    }
}

// function for Remove Day button
removeDayButton.addEventListener("click", function () {
    let lastDayAttanded = document.querySelector("#days").lastChild.querySelectorAll('.attanded-lesson')

    // removing 1 last day from total days
    document.querySelector('#total-days').innerHTML = document.querySelector('#total-days').innerHTML - 1

    // removing missed days of removed last day
    missedLessonDiv.innerHTML = missedLessonDiv.innerHTML - (10 - lastDayAttanded.length)

    // removeing last child
    days.removeChild(days.lastChild)

    // if week day is 1,3 or 6 (Mon, Wed, Sat) adding 2 days to my date defined in global score
    if (newDate.getDay() == 1 || newDate.getDay() == 3 || newDate.getDay() == 5) {
        newDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - 2)
        studentScore.textContent = newDate
    }

    // in other condition, add 1 day. this happens when we add 2 days to Wed and becomes Friday.
    else {
        newDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - 1)
        studentScore.textContent = newDate
    }

    // function update information after deleting last day
    average()
})

// function for update button, which update information of average. but this information is updated dynamically

updateTableButton.addEventListener('click', function () {
    average()
})