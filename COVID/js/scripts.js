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
            const miercoles = data[0];
            const descripcion = miercoles.wx_str;
            let descMiercoles = document.getElementById("miercoles");
            descMiercoles.textContent = descripcion;
        })

    })

    

    



});

