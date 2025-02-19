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
    async sacarCarta(id, event) {
      this.sonidoChose();
      document.querySelector("#jugadaMachine .vida").style.width = `100%`;
      document.querySelector("#jugadaPlayer .vida").style.width = `100%`;
      document.getElementById("jugadaPlayerImg").src = this.getPokemonImage(id);
      console.log("Pokemon jugador: " + this.getPokemonStats(id));
      event.currentTarget.classList.add("combatiendo");
      
      setTimeout(async () => {
        document.getElementById("jugadaMaquinaImg").src = this.getPokemonImage(this.cartasEnemigo[this.i]);
        document.querySelectorAll(".info").forEach(info => {
          info.style.opacity = "1";
        });
        
        // Obtener los movimientos del Pokémon jugador y enemigo
        this.pokemonJugador = this.pokemonData[id]; 
        this.pokemonEnemigo = this.pokemonData[this.cartasEnemigo[this.i]];
        

      }, 2000);

      
      console.log("Pokemon maquina: " + this.getPokemonStats(this.cartasEnemigo[this.i]));

      
      this.llenarStats(this.getPokemonStats(this.cartasEnemigo[this.i]), this.getPokemonStats(id), id);
    
      if(this.i < 4){
        this.i++;
      }
      
    },

    // Función para llenar las estadísticas en la pantalla
    async llenarStats(maquina, jugador, id) {
      // Actualizamos estadísticas del jugador y la máquina con Vue
      this.vidaUser = jugador[0];
      this.vidaEnemigo = maquina[0];
    
      document.getElementById("vidaP").textContent = jugador[0];      // Vida
      document.getElementById("defensaP").textContent = jugador[1];   // Defensa
      document.getElementById("velocidadP").textContent = jugador[2]; // Velocidad
    
      document.getElementById("vidaM").textContent = maquina[0];
      document.getElementById("defensaM").textContent = maquina[1];   
      document.getElementById("velocidadM").textContent = maquina[2]; 
    
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
    
      let movimientosValidos = pokemon.moves.map(move => move.move.url);
    
      // Mezclar aleatoriamente los movimientos
      movimientosValidos = movimientosValidos.sort(() => Math.random() - 0.5);
    
      const movimientosSeleccionados = [];
      let intentos = 0;
      const maxIntentos = 10; // Para evitar bucles infinitos
    
      while (movimientosSeleccionados.length < 2 && intentos < maxIntentos) {
        intentos++;
        if (movimientosValidos.length === 0) break;
    
        // Obtener una URL de movimiento y eliminarla de la lista
        const url = movimientosValidos.shift();
    
        try {
          const response = await fetch(url);
          const data = await response.json();
    
          // Verificar si el poder es válido
          if (data.power !== null) {
            movimientosSeleccionados.push({
              id: data.id,
              nombre: data.name,
              poder: data.power
            });
          }
        } catch (error) {
          console.error(`Error obteniendo datos del movimiento: ${url}`, error);
        }
      }
    
      if (movimientosSeleccionados.length < 2) {
        console.warn(`No se encontraron suficientes movimientos con poder válido para el Pokémon ID: ${id}`);
      }
    
      return movimientosSeleccionados;
    },

    atacar(poder) {

      if (!this.pokemonJugador || !this.pokemonEnemigo) {
        console.warn("No hay Pokémon en batalla.");
        return;
      }
    
      // Obtener estadísticas
      const jugadorVelocidad = this.stats[2]; // Velocidad del jugador
      const enemigoVelocidad = this.getPokemonStats(this.cartasEnemigo[this.i])[2]; // Velocidad del enemigo
    
      const jugadorDefensa = this.stats[1]; // Defensa del jugador
      const enemigoDefensa = this.getPokemonStats(this.cartasEnemigo[this.i])[1]; // Defensa del enemigo
    
      // Determinar quién ataca primero (basado en velocidad)
      let atacante = "jugador";
      if (enemigoVelocidad > jugadorVelocidad) {
        atacante = "enemigo";
      }
    
      // Función para calcular el daño
      const calcularDanio = (poder, defensa) => {
        return Math.max(1, Math.floor((poder - defensa) / 2)); // El daño mínimo será 1
      };
    
      // Turno de ataque
      if (atacante === "jugador") {
        const danio = calcularDanio(poder, enemigoDefensa);
        this.vidaEnemigo = Math.max(0, this.vidaEnemigo - danio); // Evita valores negativos
        document.querySelector("#vidaM").textContent = this.vidaEnemigo;
    
        // Actualizar barra de vida
        document.querySelector("#jugadaMachine .vida").style.width = `${this.vidaEnemigo}%`;
    
        document.getElementById("battle-text").textContent =`El jugador ataca con poder ${poder}, causando ${danio} de daño.`;
      }
    
      if (this.vidaEnemigo > 0) {
        setTimeout(() => {
          // Turno del enemigo
          const ataqueEnemigo = this.movimientosEnemigo[0].poder; // Elige el primer ataque enemigo
          const danioEnemigo = calcularDanio(ataqueEnemigo, jugadorDefensa);
          this.vidaUser = Math.max(0, this.vidaUser - danioEnemigo);
          document.querySelector("#vidaP").textContent = this.vidaUser;
    
          // Actualizar barra de vida
          document.querySelector("#jugadaPlayer .vida").style.width = `${this.vidaUser}%`;
    
          document.getElementById("battle-text").textContent =`El enemigo ataca con poder ${ataqueEnemigo}, causando ${danioEnemigo} de daño.`;
    
          // Verificar si alguien perdió
          this.verificarGanador();
        }, 1500); // Retraso para simular turno del enemigo
      } else {
        this.verificarGanador();
      }
    },
    
    verificarGanador() {
      if (this.vidaUser <= 0) {
        document.getElementById("battle-text").textContent ="¡Tu Pokémon ha sido derrotado! Elige otro para continuar.";
        this.siguienteCombate();
      } else if (this.vidaEnemigo <= 0) {
        document.getElementById("battle-text").textContent ="¡Has derrotado al Pokémon enemigo! Ahora enfrentarás al siguiente.";
        this.siguienteCombate();
      }
    },
    
    siguienteCombate() {
      // Si ya no hay Pokémon disponibles, termina el juego
      if (this.cartasSeleccionadas.length === 0) {
        document.getElementById("battle-text").textContent = "¡Te has quedado sin Pokémon! Has perdido la batalla.";
        return;
      }
    
      // Si el enemigo se queda sin Pokémon, el jugador gana
      if (this.i >= this.cartasEnemigo.length - 1) {
        document.getElementById("battle-text").textContent = "¡Has derrotado a todos los Pokémon enemigos! ¡Ganaste la batalla!";
        location.reload();
        return;
      }
    
      // Pasar al siguiente Pokémon enemigo
      this.i++;
    
      // Resetear valores de vida y mostrar la selección de un nuevo Pokémon
      this.vidaUser = 100;
      this.vidaEnemigo = 100;
    
      // Vaciar movimientos
      this.movimientosJugador = [];
      this.movimientosEnemigo = [];
    
      // Pedir al jugador seleccionar otro Pokémon
      document.getElementById("battle-text").textContent = "Selecciona otro Pokémon para continuar el combate.";
    },
    sonidoCombate(){
      const sonido = new Audio("./sound/pokemon-battle.mp3");
      sonido.play();
    },
    sonidoChose(){
      const sonido = new Audio("./sound/ichooseyou.mp3");
      sonido.play();
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
