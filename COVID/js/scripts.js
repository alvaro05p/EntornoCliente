areas = document.querySelectorAll("area");
modal = document.getElementById("modal");

function cerrar(){
    modal.classList.add("oculto")
}

areas.forEach(area => {
    area.addEventListener("click", function(){
        
        modal.classList.remove("oculto");
        console.log("oculto");
        let titulo = document.getElementById("titulo");
        titulo.textContent=this.title;
        let coords = this.getAttribute("data-coordinates");
        
        fetch("https://api.weatherusa.net/v1/forecast?q=" + coords + "&daily=1&units=e")
        .then(response => response.json()) 
        .then(data => {
            let dia = data[0];
            let descripcion = dia.day_name;
            let weather = dia.wx_str;
            let iconDesc = dia.wx_icon;
            let descDia = document.getElementById("dia1");
            let descWeather = document.getElementById("weather1");
            descDia.textContent = descripcion;
            descWeather.textContent = weather;
            let icon = document.getElementById("icon1");
            icon.src = "./icons/"+ iconDesc +".png";

            dia = data[1];
            descripcion = dia.day_name;
            weather = dia.wx_str;
            iconDesc = dia.wx_icon;
            descDia = document.getElementById("dia2");
            descWeather = document.getElementById("weather2");
            descDia.textContent = descripcion;
            descWeather.textContent = weather;
            icon = document.getElementById("icon2");
            icon.src = "./icons/"+ iconDesc +".png";

            dia = data[2];
            descripcion = dia.day_name;
            weather = dia.wx_str;
            iconDesc = dia.wx_icon;
            descDia = document.getElementById("dia3");
            descWeather = document.getElementById("weather3");
            descDia.textContent = descripcion;
            descWeather.textContent = weather;
            icon = document.getElementById("icon3");
            icon.src = "./icons/"+ iconDesc +".png";
        })

    })

    

    



});

