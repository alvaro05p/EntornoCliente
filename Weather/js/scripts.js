areas = document.querySelectorAll("area");
modal = document.getElementById("modal");
fondo = document.getElementById("fondo");

function cerrar(){
    modal.classList.add("oculto")
    fondo.classList.add("oculto")
}

areas.forEach(area => {
    area.addEventListener("click", function(){
        
        modal.classList.remove("oculto");
        fondo.classList.remove("oculto");
        let titulo = document.getElementById("titulo");
        titulo.textContent=this.title;
        let id = this.getAttribute("data-cod");
        let valoresArray = coordenadas.find(item => item.code === id);
        let coords = valoresArray.coordinates;
        //console.log(coords);
        fetch("https://api.weatherusa.net/v1/forecast?q=" + coords + "&hourly=2&units=e")
        .then(response => response.json()) 
        .then(data => {

            

            data.forEach(element => {
                console.log(element.localtime);
            });
                let hora = data[1];
                
                let descripcion = hora.localtime;
                console.log(descripcion);
                /*
                let weather = dia.wx_str;
                let iconDesc = dia.wx_icon;
                let descDia = document.getElementById("dia1");
                let descWeather = document.getElementById("weather1");
                descDia.textContent = descripcion;
                descWeather.textContent = weather;
                let icon = document.getElementById("icon1");
                icon.src = "./icons/"+ iconDesc +".png";
                */
            

            

            
        })

    })

    

    let coordenadas = [
        { code: "AL", coordinates: "32.377716,-86.300568" }, // Montgomery, Alabama
        { code: "AK", coordinates: "58.301598,-134.420212" }, // Juneau, Alaska
        { code: "AZ", coordinates: "33.448376,-112.074036" }, // Phoenix, Arizona
        { code: "AR", coordinates: "34.746483,-92.289597" }, // Little Rock, Arkansas
        { code: "CA", coordinates: "38.576668,-121.493629" }, // Sacramento, California
        { code: "CO", coordinates: "39.739235,-104.990250" }, // Denver, Colorado
        { code: "CT", coordinates: "41.765804,-72.673372" }, // Hartford, Connecticut
        { code: "DE", coordinates: "39.158168,-75.524368" }, // Dover, Delaware
        { code: "FL", coordinates: "30.438118,-84.281296" }, // Tallahassee, Florida
        { code: "GA", coordinates: "33.749027,-84.388229" }, // Atlanta, Georgia
        { code: "HI", coordinates: "21.307442,-157.857376" }, // Honolulu, Hawaii
        { code: "ID", coordinates: "43.617775,-116.199722" }, // Boise, Idaho
        { code: "IL", coordinates: "39.798363,-89.654961" }, // Springfield, Illinois
        { code: "IN", coordinates: "39.768623,-86.162643" }, // Indianapolis, Indiana
        { code: "IA", coordinates: "41.591087,-93.603729" }, // Des Moines, Iowa
        { code: "KS", coordinates: "39.048191,-95.677956" }, // Topeka, Kansas
        { code: "KY", coordinates: "38.186722,-84.875374" }, // Frankfort, Kentucky
        { code: "LA", coordinates: "30.457069,-91.187393" }, // Baton Rouge, Louisiana
        { code: "ME", coordinates: "44.307167,-69.781693" }, // Augusta, Maine
        { code: "MD", coordinates: "38.978764,-76.490936" }, // Annapolis, Maryland
        { code: "MA", coordinates: "42.358162,-71.063698" }, // Boston, Massachusetts
        { code: "MI", coordinates: "42.733635,-84.555328" }, // Lansing, Michigan
        { code: "MN", coordinates: "44.955097,-93.102211" }, // Saint Paul, Minnesota
        { code: "MS", coordinates: "32.303848,-90.182106" }, // Jackson, Mississippi
        { code: "MO", coordinates: "38.579201,-92.172935" }, // Jefferson City, Missouri
        { code: "MT", coordinates: "46.585709,-112.018417" }, // Helena, Montana
        { code: "NE", coordinates: "40.808075,-96.699654" }, // Lincoln, Nebraska
        { code: "NV", coordinates: "39.163914,-119.766121" }, // Carson City, Nevada
        { code: "NH", coordinates: "43.206898,-71.537994" }, // Concord, New Hampshire
        { code: "NJ", coordinates: "40.220596,-74.769913" }, // Trenton, New Jersey
        { code: "NM", coordinates: "35.68224,-105.939728" }, // Santa Fe, New Mexico
        { code: "NY", coordinates: "42.652843,-73.757874" }, // Albany, New York
        { code: "NC", coordinates: "35.78043,-78.639099" }, // Raleigh, North Carolina
        { code: "ND", coordinates: "46.82085,-100.783318" }, // Bismarck, North Dakota
        { code: "OH", coordinates: "39.961346,-82.999069" }, // Columbus, Ohio
        { code: "OK", coordinates: "35.492207,-97.503342" }, // Oklahoma City, Oklahoma
        { code: "OR", coordinates: "44.938461,-123.030403" }, // Salem, Oregon
        { code: "PA", coordinates: "40.264378,-76.883598" }, // Harrisburg, Pennsylvania
        { code: "RI", coordinates: "41.830914,-71.414963" }, // Providence, Rhode Island
        { code: "SC", coordinates: "34.000343,-81.033211" }, // Columbia, South Carolina
        { code: "SD", coordinates: "44.367031,-100.346405" }, // Pierre, South Dakota
        { code: "TN", coordinates: "36.16581,-86.784241" }, // Nashville, Tennessee
        { code: "TX", coordinates: "30.27467,-97.740349" }, // Austin, Texas
        { code: "UT", coordinates: "40.777477,-111.888237" }, // Salt Lake City, Utah
        { code: "VT", coordinates: "44.262436,-72.580536" }, // Montpelier, Vermont
        { code: "VA", coordinates: "37.538857,-77.43364" }, // Richmond, Virginia
        { code: "WA", coordinates: "47.035805,-122.905014" }, // Olympia, Washington
        { code: "WV", coordinates: "38.336246,-81.612328" }, // Charleston, West Virginia
        { code: "WI", coordinates: "43.074684,-89.384445" }, // Madison, Wisconsin
        { code: "WY", coordinates: "41.140259,-104.820236" } // Cheyenne, Wyoming
    ];



});




