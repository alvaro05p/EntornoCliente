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
        

      }, 2000);

      
      console.log("Pokemon maquina: " + this.getPokemonStats(this.cartasEnemigo[this.i]));

      
      this.llenarStats(this.getPokemonStats(this.cartasEnemigo[this.i]), this.getPokemonStats(id), id);
    
      this.i++;
    },

    // Función para llenar las estadísticas en la pantalla
    async llenarStats(maquina, jugador, id) {
      // Actualizamos estadísticas del jugador y la máquina con Vue
      this.vidaUser = jugador[0];
      this.vidaEnemigo = maquina[0];
    
      document.getElementById("vidaP").textContent = jugador[0];      // Vida
      document.getElementById("defensaP").textContent = jugador[1];   // Defensa
      document.getElementById("velocidadP").textContent = jugador[2]; // Velocidad
    
      document.getElementById("vidaM").textContent = maquina[0];      // Vida
      document.getElementById("defensaM").textContent = maquina[1];   // Defensa
      document.getElementById("velocidadM").textContent = maquina[2]; // Velocidad
    
      // Esperar los movimientos del jugador y enemigo antes de continuar
      this.movimientosJugador = await this.getMovimientos(id);
      this.movimientosEnemigo = await this.getMovimientos(this.cartasEnemigo[this.i]);
    
      // Ahora que los movimientos están cargados, mostramos los resultados
      console.log(await this.getMovimientos(id));
      console.log(await this.getMovimientos(this.cartasEnemigo[this.i]));
    },
    
    async getMovimientos(id) {
      const pokemon = this.pokemonData[id];
    
      // Verificar si el Pokémon tiene movimientos
      if (!pokemon || !pokemon.moves || pokemon.moves.length === 0) {
        console.warn(`No hay movimientos disponibles para el Pokémon con ID: ${id}`);
        return [];
      }
    
      // Extraer nombres y URLs de los movimientos
      let movimientosValidos = pokemon.moves.map(move => move.move.url);
    
      // Mezclar aleatoriamente los movimientos
      movimientosValidos = movimientosValidos.sort(() => Math.random() - 0.5);
    
      // Seleccionar los primeros dos movimientos
      const movimientosSeleccionados = movimientosValidos.slice(0, 2);
    
      // Hacer fetch de cada movimiento para obtener ID y poder
      const detallesMovimientos = await Promise.all(
        movimientosSeleccionados.map(async (url) => {
          try {
            const response = await fetch(url);
            const data = await response.json();
    
            return {
              id: data.id,
              nombre: data.name,
              poder: data.power ?? "Desconocido" // Algunos movimientos no tienen poder definido
            };
          } catch (error) {
            console.error(`Error obteniendo datos del movimiento: ${url}`, error);
            return null;
          }
        })
      );
    
      // Filtrar movimientos nulos en caso de errores en la API
      return detallesMovimientos.filter(mov => mov !== null);
    },

    atacar(poder
    ){
      alert(poder);
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
