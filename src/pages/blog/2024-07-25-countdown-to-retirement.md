---
templateKey: blog-post
title: Countdown to retirement
date: 2024-07-24T20:36:00.000Z
description: This is the html and javascript is for a countdown calendar page
featuredpost: true
featuredimage: /img/img_0477.jpeg
tags:
  - Retirement
---
As the date for my retirement approached, I thought it would be fun to create a count down timer to the last day.  I have made a few iterations to during development and ended up with [this version](https://garydohmeier.com/countdown-to-retirement/) on my old website.

The code for the countdown clock versions is in gitlab [here.](https://gitlab.com/gdohmeier/countdown/-/blob/master/countdown3.html?ref_type=heads)

As of Sept 2024 I have updated this code (see below) to include a date picker so its more generic and you can set the date to countdown too.

```html
<!DOCTYPE html>
<html>

<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
.container {
  position: relative;
  text-align: center;
  color: white;
}

.bottom-left {
  position: absolute;
  bottom: 16px;
  left: 16px;
}

.bottom-right {
  position: absolute;
  bottom: 16px;
  right: 16px;
}

.top-left {
  position: absolute;
  top: 8px;
  left: 16px;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

</head>

<body>


<div class="container"  style="font-size:30px;font-weight: bold;">
  <img src="https://scifiempire.net/wordpress/wp-content/gallery/the-fifth-element-movie/Leeloo-jump-The-Fifth-Element.JPG" alt="Snow" style="width:100%;">
 
  <div class="bottom-left">
    <table style="font-size:24px;font-weight:bold"><tr>
    <td style="background-image:none;vertical-align:none;border:none">
    <p>So long and thanks for all the fish!</p> </td>
    </tr></table>
  </div>
  
  <div class="bottom-right">
    <table style="font-size:24px;font-weight:bold">
      <tr>
        <td style="background-image:none;vertical-align:none;border:none">
          <p>set date: <input type="date" id="dateInput" value="2025-12-03" /></p></td>
      </tr></table>
  </div>
  
  <div class="centered">
    <table style="font-size:24px;font-weight:bold">
      <tr style="background-image:none;vertical-align:none;border:none">
        Countdown Calendar
        <td >Time left...: </td>
        <td><p id="demo"></p> </td>
      </tr>
    </table>
  </div> 

  <script>
  // Set the date we're counting down to

  const countDownDateInit = new Date();
  countDownDateInit.setDate(countDownDateInit.getDate() + 1 );
  //console.log("countDownDateInit", countDownDateInit);

  let countDownDate = countDownDateInit.getTime();
  //console.log("countDownDate timestamp", countDownDate);

  // Update the count down every 1 second
  function countdownfunction() {

    //console.log("countdown function entry");
   
    // Get todays date and time
    let now = new Date().getTime();

    // Find the distance between now an the count down date
    let distance = countDownDate - now;
    //console.log("distance", distance);


    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(countdownfunction);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }

  }


  document.getElementById("dateInput").addEventListener("change", function () {
    const input = this.value;
    let dateEntered = new Date(input);
    //console.log("dateEntered", dateEntered);
    //console.log("dateEntered timestamp", dateEntered.getTime());

    countDownDate = dateEntered.getTime();
    //console.log("countDownDateUpdate", countDownDate);  
    setInterval(countdownfunction,1000);

  });

  setInterval(countdownfunction, 1000);

  </script>

</body>
</html> 
  
```





## EXAMPLE

`<iframe src="https://garydohmeier.com/countdown-to-retirement/" title="old-countdown"></iframe>`

``
