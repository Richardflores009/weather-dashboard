var currentDay = moment().format('dddd, MMMM Do YYYY')
var currentHour = moment().hours()
$("#currentDay").replaceWith(currentDay)
// Update colors according to time.
function updateColors(){
    // find all the time blocks with the class .time-block and go through each one of those...
    $(".time-color").each(function(){
        // in each time block, there is a data-hour that is particular to that time-block, similar to an id, whose value we will find and turn into a number
        var thisBlock = Number($(this).attr("data-hour"))
        // if that number from the data-hour matches the current hour of the day, we're giong to change the .css background to salmon color
        if (thisBlock === currentHour) {
            $(this).css("background-color", "salmon")
        } 
        // if the time block is behind the current hour, we will make the background gray
        else if (thisBlock < currentHour){
            $(this).css("background-color", "lightgray")
        }
        // if the time block is ahead of the current hour, we will make the background green
        else if (thisBlock > currentHour){
            $(this).css("background-color", "lightgreen")
        }
    })
}
// fire the function
updateColors();
// setting intervals for every minute to refresh the color codes so that they reflect the actual time
var intervalID = window.setInterval(updateColors, 60000);
// Next we deal with the local storage by making a function called getSchedule()
var getSchedule = function(){
    var localStorageKey; 
    var currentTextArea;
    // create a for loop that runs 12 times, starting at 1 - this will reflect the 1 - 12 hours
    for (let i = 1; i < 13; i++) {
        // since we have no 6, 7, or 8, we'll tell the loop to continue so that the code doesn't break
        if (i === 6 || i === 7 || i === 8) {
            continue
        }
        // we set our id's in the index.html for each time-block as textArea9AM, textArea10AM, and so on until textArea5PM
        // we need to isolate the numbers with this loop so the loop will store the current Text Area as AM if it's greater than or equal to 9 or less than 12 so that it makes it AM, and everything else will be PM. 
        currentTextArea = "#textArea" + i;
        if (i >= 9 && i < 12){
            localStorageKey = i + "AM"
        }
        else { 
            localStorageKey = i + "PM"
        }
        // we'll then connect to said textArea and update the local storage key to reflect what's in that actual time block
        $(currentTextArea).text(localStorage.getItem(localStorageKey))  
    }
}
getSchedule();
// to load the schedule, we create a function that passes two variable, the actual data and the time that data is set to take place according to the time blocks, which happens in the next function
var loadSchedule = function(storeData, storeTime){
    localStorage.setItem(storeTime, storeData);
}
// once the document is ready, we'll make a function happen that when we click the save button, we get the actual values which we'll pass through the aforementioned loadScheduler function. 
$(document).ready(function () {
    $(".saveBtn").click(function(){
        //get the value from the input box and time and store it as a variable
        var storeData = $(this).siblings("textarea").val().trim();
        var storeTime = $(this).siblings("div").text().trim();
        // we'll call the function that we created earlier and pass the arguments created now to save to local storage as a key value pair
        loadSchedule(storeData, storeTime)
    })
});