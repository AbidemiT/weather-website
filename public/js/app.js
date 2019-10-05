let locate = document.querySelector("#location");
let weatherForm = document.querySelector("form");
let err = document.querySelector(".err");
let loc = document.querySelector(".loc");
let atmos = document.querySelector(".atmos");
let forecast = document.querySelector(".forecast");
let spin = document.querySelector("#spin");





weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    spin.classList.add('lds-default');

    fetch(`/weather?address=${locate.value}`)
        .then(res => {
            res.json()
                .then(data => {
                    if (data.err) {
                        spin.classList.remove('lds-default');
                        loc.textContent = "";
                        forecast.textContent = "";
                        err.textContent = data.err;
                        
                    } else {
                        spin.classList.remove('lds-default');
                        err.textContent = "";
                        loc.textContent = data.location;
                        forecast.textContent = data.forecast;
                        console.log(data.location)
                        if(data.icon === "cloudy") {
                            atmos.src = "/svg/cloudy.svg";
                        } else if(data.icon === "rain") {
                            atmos.src = "/svg/rainy-5.svg";
                        } else if(data.icon === "partly-cloudy-day") {
                            atmos.src = "/svg/cloudy-day-2.svg";
                        } else if(data.icon === "partly-cloudy-night") {
                            atmos.src = "/svg/cloudy-night-2.svg";
                        } else if(data.icon === "clear-night") {
                            atmos.src = "/svg/night.svg";
                        } else {
                            atmos.src = "/svg/day.svg";
                        }
                    }
                })
        })
    locate.value = "";
})

// fetch('http://puzzle.mead.io/puzzle')
//     .then(res => {
//         res.json()
//             .then(data => {
//                 console.log(data);
//             })
//     })