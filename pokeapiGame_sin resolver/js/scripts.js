const { createApp } = Vue;

createApp({
  data() {
    return {
      pokemonIds: Array.from({ length: 151 }, (_, i) => i + 1),
      pokemonData: {},
      cartasSeleccionadas : [],
      mostrarModal: true,
      cartasEnemigo: [],
      i:0,
      stats: []
    };
  },
  methods: {
    async getPokemonData(id) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      this.pokemonData[id] = data;
    },

    generarPokemonsEnemigo(){
      for(let i=0;i<5;i++){
        const randomNumber = Math.floor(Math.random() * 151) + 1;
        if(!this.cartasEnemigo.includes(randomNumber)){
          this.cartasEnemigo.push(randomNumber);
        }else{
          i--;
        }
      }

      console.log(this.cartasEnemigo);
      
    },

    seleccionarCarta(id, event) {

      console.log("Inicia: " + event.currentTarget);
      this.cartaSeleccionada = id;

      const index = this.cartasSeleccionadas.indexOf(id);

      if(index === -1 && this.cartasSeleccionadas.length < 5){
        this.cartasSeleccionadas.push(id);
        event.currentTarget.classList.add("seleccionada");
      }else if(index != -1){
        this.cartasSeleccionadas.splice(index, 1);
        event.currentTarget.classList.remove("seleccionada");
      }

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

    getPokemonStats(id) {
      const pokemon = this.pokemonData[id];
      this.stats = [pokemon.stats[0].base_stat, pokemon.stats[4].base_stat];
      return this.stats;
    },

    ocultarModal(){
      this.mostrarModal = false;
      this.generarPokemonsEnemigo();
    },

    sacarCarta(id){
      document.getElementById("jugadaPlayerImg").src = this.getPokemonImage(id);
      console.log("Pokemon jugador: " + this.getPokemonStats(id));

      setTimeout(() => {
        document.getElementById("jugadaMaquinaImg").src = this.getPokemonImage(this.cartasEnemigo[this.i]);
      }, 2000);
      console.log("Pokemon maquina: " + this.getPokemonStats(this.cartasEnemigo[this.i]));

      this.i++;

      

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
