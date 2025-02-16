const { createApp } = Vue;

createApp({
  data() {
    return {
      pokemonIds: Array.from({ length: 151 }, (_, i) => i + 1),
      pokemonData: {},
      cartasSeleccionadas: [],
      mostrarModal: true,
      cartasEnemigo: [],
      i: 0,
      stats: [],
      vidaUser: 100,
      vidaEnemigo: 100,
      movimientosJugador: [],
      movimientosEnemigo: []
    };
  },
  methods: {
    // Método para obtener los datos del Pokémon
    async getPokemonData(id) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      this.pokemonData[id] = data;
    },

    // Función para generar Pokémon enemigos aleatorios
    generarPokemonsEnemigo() {
      for (let i = 0; i < 5; i++) {
        const randomNumber = Math.floor(Math.random() * 151) + 1;
        if (!this.cartasEnemigo.includes(randomNumber)) {
          this.cartasEnemigo.push(randomNumber);
        } else {
          i--;
        }
      }
      console.log(this.cartasEnemigo);
    },

    // Función para seleccionar cartas (Pokémon)
    seleccionarCarta(id, event) {
      console.log("Inicia: " + event.currentTarget);
      this.cartaSeleccionada = id;

      const index = this.cartasSeleccionadas.indexOf(id);

      if (index === -1 && this.cartasSeleccionadas.length < 5) {
        this.cartasSeleccionadas.push(id);
        event.currentTarget.classList.add("seleccionada");
      } else if (index !== -1) {
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

    // Función para obtener las estadísticas de un Pokémon
    getPokemonStats(id) {
      const pokemon = this.pokemonData[id];
      this.stats = [pokemon.stats[0].base_stat, pokemon.stats[4].base_stat, pokemon.stats[5].base_stat];
      return this.stats;
    },

    // Función para obtener 2 movimientos aleatorios con poder no nulo
    async movimientos(id) {
      const pokemon = this.pokemonData[id];
      const movimientosValidos = [];
    
      for (let i = 0; i < pokemon.moves.length; i++) {
        const moveUrl = pokemon.moves[i].move.url;
        const moveData = await fetch(moveUrl)
          .then(response => response.json())
          .catch(error => console.log('Error al obtener el movimiento:', error));
        
        if (moveData.power !== null) {
          movimientosValidos.push({
            name: moveData.names.find(name => name.language.name === 'es').name, // Nombre en español
            power: moveData.power
          });
        }
      }

      if (movimientosValidos.length < 2) {
        console.log('No hay suficientes movimientos válidos con poder');
        return;
      }
    
      // Seleccionamos aleatoriamente 2 movimientos
      const movimientosAleatorios = [];
      for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * movimientosValidos.length);
        movimientosAleatorios.push(movimientosValidos[randomIndex]);
        movimientosValidos.splice(randomIndex, 1);
      }
    
      console.log('Movimientos seleccionados:');
      movimientosAleatorios.forEach(movimiento => {
        console.log(`Movimiento: ${movimiento.name}, Poder: ${movimiento.power}`);
      });
    
      return movimientosAleatorios;
    },

    // Función para ocultar el modal y generar enemigos
    ocultarModal() {
      this.mostrarModal = false;
      this.generarPokemonsEnemigo();
    },

    // Función para hacer una jugada con las cartas seleccionadas
    async sacarCarta(id) {
      document.getElementById("jugadaPlayerImg").src = this.getPokemonImage(id);
      console.log("Pokemon jugador: " + this.getPokemonStats(id));

      setTimeout(async () => {
        document.getElementById("jugadaMaquinaImg").src = this.getPokemonImage(this.cartasEnemigo[this.i]);
        document.querySelectorAll(".info").forEach(info => {
          info.style.opacity = "1";
        });
        
        // Obtener los movimientos del Pokémon jugador y enemigo
        const movimientosJugador = await this.movimientos(id);
        const movimientosEnemigo = await this.movimientos(this.cartasEnemigo[this.i]);

        this.movimientosJugador = movimientosJugador;
        this.movimientosEnemigo = movimientosEnemigo;

      }, 2000);
      console.log("Pokemon maquina: " + this.getPokemonStats(this.cartasEnemigo[this.i]));

      this.i++;
      this.llenarStats(this.getPokemonStats(this.cartasEnemigo[this.i]), this.getPokemonStats(id));
    },

    // Función para llenar las estadísticas en la pantalla
    llenarStats(maquina, jugador) {
      // Actualizamos estadísticas del jugador y la máquina con Vue
      this.vidaUser = jugador[0];
      this.vidaEnemigo = maquina[0];

      document.getElementById("vidaP").textContent = jugador[0];      // Vida
      document.getElementById("defensaP").textContent = jugador[1];   // Defensa
      document.getElementById("velocidadP").textContent = jugador[2]; // Velocidad
    
      document.getElementById("vidaM").textContent = maquina[0];      // Vida
      document.getElementById("defensaM").textContent = maquina[1];   // Defensa
      document.getElementById("velocidadM").textContent = maquina[2]; // Velocidad
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
