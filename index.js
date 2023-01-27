// Jquery function to ensure DOM elements are ready and finished loading
$(function () {

    // Prevents saved data from being overwritten
    let eventsVar = JSON.parse(localStorage.getItem('eventsVar')); 
  
    if (!eventsVar) { 
      eventsVar = {}; 
    };

    const conSaveBtn = $(":button");
    conSaveBtn.click(function (event) {
      const inputText = (event.currentTarget.parentElement.children[1].value.trim()); 
      const inputTime = (event.currentTarget.parentElement.id); 
      eventsVar[inputTime] = inputText; 
      localStorage.setItem('eventsVar', JSON.stringify(eventsVar)); 
    })

    //future tense class 
    function futTime(time) { 
        var timeVar = $(time);
        timeVar.addClass("future");
      };  
    
    //past tense class 
    function pastTime(time) { 
      var timeVar = $(time);
      timeVar.addClass("past");
    };

    //present tense class 
    function presTime(time) {
        var timeVar = $(time);
        timeVar.addClass("present");
      };

    // time 'at the moment' of input
    var atmTime = moment().hour(); 

    // allows code to determine correct time of day so that the correct class is used
    function setTimes(time) {
      if (time > atmTime) {
        futTime(`#hour-${time}`);
      } else if (time < atmTime) {
        pastTime(`#hour-${time}`);
      } else {
        presTime(`#hour-${time}`);
      }
    }
  
    // Ensures input data is sent to relavant timeslot
    const timeSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17]; 
    for (var time of timeSlots) {
      setTimes(time);
      var targetTime = $(`#hour-${time}`);
      var targetTextArea = targetTime.find('textarea');
      targetTextArea.val(eventsVar[`hour-${time}`]);
    };
  
    const atmDay = $("#currentDay");
    const today = moment().format("MMMM Do, YYYY");
    atmDay[0].innerHTML = today;

  });
  