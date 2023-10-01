$(document).ready(function () {
  // Display the current date in the header
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  // Function to update the color of a single time block
  function updateTimeBlockColor($timeBlock) {
    var currentHour = dayjs().format("H");
    var timeBlockHour = parseInt($timeBlock.data("hour"));

    if (timeBlockHour < currentHour) {
      $timeBlock.removeClass("present future").addClass("past");
    } else if (timeBlockHour == currentHour) {
      $timeBlock.removeClass("past future").addClass("present");
    } else {
      $timeBlock.removeClass("past present").addClass("future");
    }
  }

  // Function to update all time block colors
  function updateAllTimeBlockColors() {
    $(".time-block").each(function () {
      updateTimeBlockColor($(this));
    });
  }

  // Initialize time block colors
  updateAllTimeBlockColors();

  // Load saved events from local storage
  $(".time-block").each(function () {
    var timeBlockHour = $(this).data("hour");
    var savedEvent = localStorage.getItem("event-" + timeBlockHour);

    if (savedEvent) {
      $(this).find(".description").val(savedEvent);
    }
  });

  // Event listener for save buttons
  $(".saveBtn").on("click", function () {
    var $timeBlock = $(this).closest(".time-block");
    var timeBlockHour = $timeBlock.data("hour");
    var eventText = $timeBlock.find(".description").val();

    localStorage.setItem("event-" + timeBlockHour, eventText);
  });

  // Update the time block color for the current hour every minute
  setInterval(function () {
    var $currentHourBlock = $(".time-block[data-hour=" + dayjs().format("H") + "]");
    updateAllTimeBlockColors();
    updateTimeBlockColor($currentHourBlock);
  }, 60000);
});
