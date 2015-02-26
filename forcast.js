function getData() {
  var url = "http://api.worldweatheronline.com/free/v2/weather.ashx?key=b5c474f461014299017e2c088f017&q=salem,or&num_of_days=5&format=json&showlocaltime=yes&date=today&tp=1&extra=localObsTime";
  var currentDate = new Date();
  $.getJSON(url, function(json) {

  function appendDayForcast() {
    var weekDays = ["Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"];

    for (var i = 1; i < 5; i++) {
      var d = new Date(json.data.weather[i].date);
      var min = json.data.weather[i].mintempF+'\u00B0F';
      var max = json.data.weather[i].maxtempF+'\u00B0F';
      $('#dayforcast').append("<tr id="+i+"></tr>");
      $("#"+i).append("<td>"+weekDays[d.getUTCDay()]+
        "</td><td>"+min+"</td><td id='max'>"+max+"</td>");
      /*
      creates a table row with the appropriate day of the week
      then creates two td tags with min and max tempuratures
      for that day. Uses for loop to do this for next 4 days from user
      input.
      */
    }
  }

  function makeSlide(slideNum) {
    var shownTime = ["2am","5am","8am","11am",
                     "2pm","5pm","8pm","11pm"],
        monthNames = ['Jan','Feb','Mar','Apr','May','Jun',
                      'Jul','Aug','Sep','Oct','Nov','Dec'],
        numHrs = shownTime.length,
        rowAmount = 4,
        slideTotal = 3,
        index = closest(),
        data = json.data.weather[0].hourly,
        d = currentDate.getDate(),
        month = monthNames[currentDate.getMonth()],
        dNext = new Date(),
        increment = 1;
        spaceDate = "<td id=\'date1\'>"+month+' '+d+"</td>";
        console.log(closest());




    for (var i = 0; i < 3; i++) {
      var dateRow = $('.date'+slideNum);
      var hourRow = $('.hour'+slideNum);
      var tempRow = $('.temp'+slideNum);

      for (var j = 0; j < rowAmount; j++){
        dateRow.append(spaceDate);
        hourRow.append("<td>"+shownTime[index]+"</td>");
        tempRow.append("<td>"+data[index].tempF+"\u00B0F</td>");

          if (index === 7) {
            data = json.data.weather[1].hourly;
            dNext.setDate(dNext.getDate() + increment);
            var addDate = "<td>"+monthNames[dNext.getMonth()]+' '+dNext.getDate()+"</td>";
            spaceDate = addDate;
          } else {
            spaceDate = "<td> </td>";
          }

        index = (index + 1) % numHrs;
      }
      slideNum++;
    }
  }

  function closest () {
    //returns index of closest number in an array that is larger than given number.
    var num = currentDate.getHours()*100,
        hrs = [200, 500, 800, 1100, 1400, 1700, 2000, 2300],
        curr = hrs[0],
        diff = Math.abs (num - curr);

    for (var val = 0; val < hrs.length; val++) {
      var newdiff = Math.abs (num - hrs[val]);
      if (newdiff < diff) {
          diff = newdiff;
          curr = hrs[val];
      }
    }

    if (num > curr && curr === 2300) {
      curr = 200;
    } else if (num > curr) {
      curr = curr + 300;
    }
    return hrs.indexOf(curr);
  }

  makeSlide(1);
  appendDayForcast();

  });
}

getData();
