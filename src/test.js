var donations
var goal
var daysActive
var fundResult
var output

donations = 2999
goal = 3000
daysActive = 10

fundResult = donations / goal
dayResult = daysActive / 365

if (fundResult <= .25 && dayResult >= .75) {

    output = "Bad"
} else if (fundResult <= .5 && dayResult >= .5) {
    output = "Good"
} else if (fundResult <= .75 && dayResult >= .25) {
    output = "Very Good"
} else {
    output = "Excellent"
}
console.log(fundResult)
console.log(dayResult)
console.log(output)