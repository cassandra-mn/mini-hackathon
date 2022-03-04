let cidade = null;
let img = null;
let temperaturaEmKelvin = 0;
let temperaturaEmCelsius = 0;

function pegarLocalizacao() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pegarDados);
    }
    else {
        console.log("Localização inválida!");
    }
}

function pegarDados(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
  
    let promise = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=62f60e17143d3c8126953e2fc3a9e6b5`)
    .then(resposta => {
        const city = document.querySelector(".cidade");
        cidade = resposta.data.name;
        city.innerHTML = `<h1>${cidade}</h1>`;

        const temp = document.querySelector(".temperatura");
        temperaturaEmKelvin = resposta.data.main.temp;
        temperaturaEmCelsius = transformarParaCelsius(temperaturaEmKelvin);
        temp.innerHTML = `<h2>${temperaturaEmCelsius}º</h2>`;

        const icon = document.querySelector(".icon");
        img = resposta.data.weather[0].icon;
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${img}@2x.png"/>`;
    });
}

function transformarParaCelsius(tempKelvin) {
    return (tempKelvin - 273).toFixed(0);
}

pegarLocalizacao();