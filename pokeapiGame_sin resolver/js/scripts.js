const { createApp } = Vue;

createApp({
  data() {
    return {
      pokemonIds: Array.from({ length: 151 }, (_, i) => i + 1),
      pokemonData: {},
      cartasSeleccionadas : [],
      mostrarModal: true
    };
  },
  methods: {
    async getPokemonData(id) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      this.pokemonData[id] = data;
    },

    

    seleccionarCarta(id) {
      this.cartaSeleccionada = id;

      const index = this.cartasSeleccionadas.indexOf(id);

      if(index === -1 && this.cartasSeleccionadas.length < 5){
        this.cartasSeleccionadas.push(id);
        document.querySelector(`[data-id="${id}"]`)?.classList.add("seleccionada");
      }else if(index != -1){
        this.cartasSeleccionadas.splice(index, 1);
        document.querySelector(`[data-id="${id}"]`)?.classList.remove("seleccionada");
      }

      console.log(this.cartasSeleccionadas);
    },

    // Función para obtener la URL de la imagen del Pokémon
    getPokemonImage(id) {
      const pokemon = this.pokemonData[id];
      return pokemon ? pokemon.sprites.front_default : '';
    },

    // Función para obtener el nombre del Pokémon
    getPokemonName(id) {
      const pokemon = this.pokemonData[id];
      return pokemon ? pokemon.name : '';
    },

    ocultarModal(){
      this.mostrarModal= false;
    }


  },

  mounted() {
    
    const promises = this.pokemonIds.map(id => this.getPokemonData(id));

    Promise.all(promises).then(() => {
      console.log("Todos los Pokémon se han cargado correctamente.");
    }).catch(error => {
      console.error("Error al cargar los Pokémon:", error);
    });
  }
}).mount("body");
