areas = document.querySelectorAll("area");

areas.forEach(area => {
    area.addEventListener("click", function(){
        let titulo = this.title;
        let modal = document.getElementById("modal");
        let tituloModal = document.getElementById("titulo");
        tituloModal.textContent = titulo;
        modal.classList.remove("oculto");
        fetch('https://api.covidtracking.com/v1/states/ca/info.json')
        .then(response => response.json())
        .then(json => console.log(json))

    });
});



