// data
var data;


// get data from json
// convert data from json file into javascript object named "data"
d3.json("data/tasks.json", function(error, data) {
  // _______________________________________________________________________
  // handle error
  if (error) {
    // display error message on page inside <div>
    d3.select("#error-message").text("Attention: Problem loading data.")
      // background color
      .attr("class", "bg-danger")
      // font color
      .style("color", "#fff");


    // hide navigation buttons
    d3.select("#button-container").style("display", "none");


    // display error in console
    return console.log(error);
  }


  // _______________________________________________________________________
  // success: retrieved data

  // // test: loop through each object in data, write to console
  // data.forEach(function(d) {
  //   console.log(d.CustomerInfo.CustomerName);
  // });


  // create array of customer names
  var customerNames = data.map(function(d) {
    return d.CustomerInfo.CustomerName;
  });


  // sort customerNames array in ascending order by customer name
  customerNames.sort();


  // convert each date string to a date object
  // loop through each object
  data.forEach(function(d) {
    // use dateParser to convert date string to date object
    var dateParser = d3.timeParse("%Y-%m-%dT%H:%M:%S");
    d.TaskDuration.StartDate = dateParser(d.TaskDuration.StartDate);
    d.TaskDuration.EndDate = dateParser(d.TaskDuration.EndDate);
  });


  // sort data in ascending order by task end date
  data.sort(function(a, b) {
    return a.TaskDuration.EndDate - b.TaskDuration.EndDate;
  });


  // set maximum date
  var maxDate = data[data.length - 1].TaskDuration.End;


  // sort data in ascending order by task start date
  data.sort(function(a, b) {
    return a.TaskDuration.StartDate - b.TaskDuration.StartDate;
  });


  // set minimum date
  var minDate = data[0].TaskDuration.StartDate;


  // x-axis tick datetime format
  var format = "%H:%M";


  // set default time domain
  var timeDomainString = "6months";


  // setup gantt chart
  var gantt = d3.gantt()
    .svgHeight(450)
    .svgWidth(800)
    .customerNames(customerNames)
    .tickFormat(format);


  // change time domain
  changeTimeDomain(timeDomainString);


  // create gantt chart
  gantt(data);


  function changeTimeDomain(timeDomainString) {
    // datetime domain string corresponds to navigation button that was clicked
    this.timeDomainString = timeDomainString;

    // set datetime domain based on button that was timeDomainString
    switch (timeDomainString) {
      case "1day":
        // set datetime format
        format = "%H:%M";
        // set datetime domain
        gantt.timeDomain([d3.timeDay.offset(getEndDate(), -1), getEndDate()]);
        break;

      case "1week":
        // set datetime format
        format = "%b %d";
        // set datetime domain
        gantt.timeDomain([d3.timeDay.offset(getEndDate(), -7), getEndDate()]);
        break;

      case "2weeks":
        // set datetime format
        format = "%b %d";
        // set datetime domain
        gantt.timeDomain([d3.timeDay.offset(getEndDate(), -14), getEndDate()]);
        break;

      case "1month":
        // set datetime format
        format = "%b %d";
        // set datetime domain
        gantt.timeDomain([d3.timeDay.offset(getEndDate(), -30), getEndDate()]);
        break;

      case "3months":
        // set datetime format
        format = "%b";
        // set datetime domain
        gantt.timeDomain([d3.timeMonth.offset(getEndDate(), -3), getEndDate()]);
        break;

      case "6months":
        // set datetime format
        format = "%b";
        // set datetime domain
        gantt.timeDomain([d3.timeMonth.offset(getEndDate(), -6), getEndDate()]);
        break;

      default:
        // set datetime format
        format = "%H:%M"
    }


    // set x-axis tick format
    gantt.tickFormat(format);


    // redraw gantt chart
    gantt.redraw(data);
  }


  function getEndDate() {
    // set task end date to today
    var lastEndDate = Date.now();

    // set task end date
    if (data.length > 0) {
      lastEndDate = data[data.length - 1].TaskDuration.EndDate;
    }

    return lastEndDate;
  }


  // _______________________________________________________________________
  // _______________________________________________________________________
  // navigation button click event handlers
  $(".btn").click(function() {
    // change all buttons color to white
    $(".btn").removeClass("btn-primary").addClass("btn-secondary");
  });


  $("#oneDay").on("click", function() {
    // change button color to blue
    $(this).removeClass("btn-secondary").addClass("btn-primary");

    // change time domain
    changeTimeDomain("1day");
  });


  $("#oneWeek").on("click", function() {
    // change button color to blue
    $(this).removeClass("btn-secondary").addClass("btn-primary");

    // change time domain
    changeTimeDomain("1week");
  });


  $("#twoWeeks").on("click", function() {
    // change button color to blue
    $(this).removeClass("btn-secondary").addClass("btn-primary");

    // change time domain
    changeTimeDomain("2weeks");
  });


  $("#oneMonth").on("click", function() {
    // change button color to blue
    $(this).removeClass("btn-secondary").addClass("btn-primary");

    // change time domain
    changeTimeDomain("1month");
  });


  $("#threeMonths").on("click", function() {
    // change button color to blue
    $(this).removeClass("btn-secondary").addClass("btn-primary");

    // change time domain
    changeTimeDomain("3months");
  });


  $("#sixMonths").on("click", function() {
    // change button color to blue
    $(this).removeClass("btn-secondary").addClass("btn-primary");

    // change time domain
    changeTimeDomain("6months");
  });
});