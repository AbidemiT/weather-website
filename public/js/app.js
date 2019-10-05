let locate = document.querySelector("#location");
let weatherForm = document.querySelector("form");
let err = document.querySelector(".err");
let loc = document.querySelector(".loc");
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