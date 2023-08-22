let [dayLabel, monthLabel, yearLabel] = document.querySelectorAll("label")
let [dayError, monthError, yearError] = document.querySelectorAll("p")

let dayInput = document.getElementById("day")
let monthInput = document.getElementById("month")
let yearInput = document.getElementById("year")


let calculate_button = document.getElementById("calculate");


let dayDisplay = document.getElementById("day_display")
let monthDisplay = document.getElementById("month_display")
let yearDisplay = document.getElementById("year_display")

let ErrorState = false;


function dateDiff(startingDate) {
    // source = https://stackoverflow.com/questions/17732897/difference-between-two-dates-in-years-months-days-in-javascript
    let startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
    let endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
    let endDate = new Date(endingDate);


    const startYear = startDate.getFullYear();
    const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    let yearDiff = endDate.getFullYear() - startYear;
    let monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    let dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += daysInMonth[startDate.getMonth()];
    }
    return [yearDiff, monthDiff, dayDiff];
  }


function clearWarning(){
    // console.log("warning cleared")

    //remove error messages
    dayError.textContent=""
    monthError.textContent=""
    yearError.textContent=""


    //restore label
    dayLabel.classList.remove("red_text")
    monthLabel.classList.remove("red_text")
    yearLabel.classList.remove("red_text")

    //restore inputs
    dayInput.classList.remove("red_border")
    monthInput.classList.remove("red_border")
    yearInput.classList.remove("red_border")

    dayInput.value = ""
    monthInput.value = ""
    yearInput.value = ""

    ErrorState = false;
}

function isEmpty(){
    let error=false;
    let message = "This field is required"
    if (dayInput.value===""){
        dayError.textContent = message
        dayLabel.classList.add("red_text")
        dayInput.classList.add("red_border")
        error = true}
    if (monthInput.value===""){
        monthError.textContent = message
        monthLabel.classList.add("red_text")
        monthInput.classList.add("red_border")
        error = true}
    if (yearInput.value===""){
        yearError.textContent = message
        yearLabel.classList.add("red_text")
        yearInput.classList.add("red_border")
        error = true}
    return error
}

function isValid(date,month,year){
    valid = true
    let dateString  = year +" "+month + " "+ date
    let given_date = new Date(dateString)
    if (isNaN(date+month+year)==true) {
        dayError.textContent = "Must be a valid date"
        return false  
    }

    // validate date
    if (date<1 || date>31){
        dayError.textContent = "Must be a valid day"
        dayLabel.classList.add("red_text")
        dayInput.classList.add("red_border")
        valid = false
    }
    
    // validate month
    if (month<1 || month>12){
        monthError.textContent = "Must be a valid month"
        monthLabel.classList.add("red_text")
        monthInput.classList.add("red_border")
        valid = false

    }

    // validate year
      
    if ((new Date()-given_date<0) || year>new Date().getFullYear()){
        yearError.textContent = "Must be in past"
        yearLabel.classList.add("red_text")
        yearInput.classList.add("red_border")
        return false

        }

    // check egde cases like 31-04-1991
    const february = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (daysInMonth[month-1]<date){
        dayError.textContent = "Must be a valid date"
        dayLabel.classList.add("red_text")
        dayInput.classList.add("red_border")
        monthLabel.classList.add("red_text")
        monthInput.classList.add("red_border")
        yearLabel.classList.add("red_text")
        yearInput.classList.add("red_border")
        valid = false
    }
    
   

    return valid;
}

function displayDate(year,month,date){
    yearDisplay.textContent = year
    monthDisplay.textContent = month
    dayDisplay.textContent = date
}

calculate_button.addEventListener("click", function(){
    if (ErrorState==true){
        clearWarning();
        return
    }

    if (isEmpty()==false){
        given_date = dayInput.value
        given_month = monthInput.value
        given_year = yearInput.value
        if (isValid(given_date,given_month,given_year)){
            let given_str = given_year + " " + given_month +" "+ given_date;
            let [y,m,d] = dateDiff(new Date(given_str))
            displayDate(y,m,d)
        } else ErrorState=true;
    }else ErrorState=true;
 
})

function restore_inputs() {
    if (ErrorState==true){
        clearWarning()
        ErrorState=false;
    }
}

dayInput.addEventListener("click", restore_inputs)
dayInput.addEventListener("keydown", restore_inputs)
monthInput.addEventListener("click", restore_inputs)
monthInput.addEventListener("keydown", restore_inputs)
yearInput.addEventListener("click", restore_inputs)
yearInput.addEventListener("keydown", restore_inputs)