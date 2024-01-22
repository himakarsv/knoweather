function putData(data){
                let iconcode = data.weather[0].icon;
                let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                document.querySelector('#wicon').setAttribute('src',iconurl);
                document.querySelector('.city').textContent = data.name;
                let t=(data.main.temp - 273).toString().slice(0,5);
                document.querySelector('.temp').textContent = `${t} °C`;
                let u=(data.main.feels_like - 273).toString().slice(0,5);
                document.querySelector(".feels").textContent=`Feels Like : ${u} °C`;
                document.querySelector(".desc").textContent=`Climate: ${data.weather[0].main}`;
                let v=data.wind.speed;
                document.querySelector(".winds").textContent=`Wind : ${v} km/h`;
                let w=(data.main.temp_min - 273).toString().slice(0,5);
                document.querySelector(".min").textContent=`Min ${w} °C`;
                let x=(data.main.temp_max - 273).toString().slice(0,5);
                document.querySelector(".max").textContent=`Max ${x} °C`;
}

function getCurrLoc() {
    // let par = document.querySelector("#ip");
    let map = document.querySelector("#map");
    map.href = "";
    // par.textContent = "";

    function success(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        map.href = `https://www.openstreetmap.org/#map=18/${lat}/${long}`;
        // par.textContent = `Lat: ${lat} , Long: ${long}`;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=555eebc861dd0187de31244fbb234fac`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                putData(data);
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
            });
    }

    function error() {
        // par.textContent = 'Unavailable';
    }

    if (!navigator.geolocation) {
        // par.textContent = 'Geolocation API not supported';
    } else {
        // par.textContent = 'Loading...';
        navigator.geolocation.getCurrentPosition(success, error);
    }
}


function getloc(lat,long){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=555eebc861dd0187de31244fbb234fac`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                putData(data);
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
            });
}

let btn = document.querySelector('#btn');
btn.addEventListener("click", getCurrLoc);

let btn1=document.querySelector("#btn1");
btn1.addEventListener("click", ()=>{
    let sval=document.querySelector('#ser').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${sval}&appid=be2cc5aee1324127ca6fafaa7bcb6349`)
    .then((response)=>response.json())
    .then((data)=>{
                console.log(data);
                putData(data);
    })
    .catch((error)=>{
        console.error('Error fetching weather data:', error);
    });
});