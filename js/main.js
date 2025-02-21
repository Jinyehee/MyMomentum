$(document).ready(() => {
   // 날짜
   let time = $(".main_clock h1");
   let day = $(".top_middle_day");
   setTimeout(() => {
      timer();
      thisDay();
   });
   setInterval(() => {
      timer();
   }, 1000);
   function timer() {
      let today = new Date();
      let hours = today.getHours();
      let minutes = today.getMinutes();
      let seconds = today.getSeconds();
      time.text(
         `${hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes
         }`
      );
   }

   function thisDay() {
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth();
      let date = today.getDate();
      day.text(
         `${year} / ${month + 1 < 10 ? `0${month + 1}` : month + 1} / ${
            date < 10 ? `0${date}` : date
         }`
      );
   }

   // 날씨
   const api_key = "91bdbdffc330fa9fd5e5f1cf3e376ed4";
   setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
         async function (position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            const response = await fetch(
               `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric&lang=kr`
            );
            const data = await response.json();
            const icon = data.weather[0].icon;
            const temp = data.main.temp;
            const name = data.name;
            const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            $(".weather img").attr("src", iconURL);
            $(".weather_temp").text(`${temp}°C`);
            $(".weather_name").text(`${name}`);
         },
         function (error) {
            console.log("위치 정보 제공을 거부하였습니다.");
            alert("위치 정보가 제공되지 않았습니다.");
         }
      );
   });
});
