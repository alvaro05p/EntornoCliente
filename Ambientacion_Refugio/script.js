// Elementos del DOM
const videoList = document.getElementById('video-list');
const audioList = document.getElementById('audio-list');
const videoPlayer = document.querySelector('video');
const audioPlayer = document.querySelector('audio');

// Datos de ejemplo
const videos = [
    { id: 1, title: 'Video 1', url: 'campfire.mp4' },
    { id: 1, title: 'Video 2', url: 'cosecha.mp4' }
];

const audios = [
    { id: 1, title: 'Radio 1', url: 'Blue Moon.mp3' },
    { id: 2, title: 'Radio 2', url: 'campfire.mp3' },
];

// Crear elementos de lista dinámicamente
function createListItem(list, item, player) {
    const li = document.createElement('li');
    li.textContent = item.title;
    li.dataset.url = item.url;
    li.addEventListener('click', () => {
        // Cambiar la fuente del reproductor al hacer clic
        player.src = item.url;
        player.play();
    });
    list.appendChild(li);
}

// Usamos foreach y creamos un elemento por cada video o audio que haya
videos.forEach(video => createListItem(videoList, video, videoPlayer));
audios.forEach(audio => createListItem(audioList, audio, audioPlayer));

// Seleccionamos los elementos del html que hacen de botonera para el reproductor


// Cambia entre mutear y desmuear (como un toggle)
videoControls.mute.addEventListener('click', () => {

    if(videoPlayer.muted){
        textContent = "Desileciár";
        
    }else{
        textContent = "Silenciar";
    }
    
});

// Rebobinar
videoControls.rewind.addEventListener('click', () => {
    videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime - 10);
});

// Pausar / continuar
videoControls.playPause.addEventListener('click', () => {
    if (videoPlayer.paused) {
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
});

// Avanzar 10 segundos
videoControls.forward.addEventListener('click', () => {
    videoPlayer.currentTime = Math.min(videoPlayer.duration, videoPlayer.currentTime + 10);
});

// Reiniciar
videoControls.restart.addEventListener('click', () => {
    videoPlayer.currentTime = 0;
    videoPlayer.play();
});

// Subir volumen
videoControls.volumeUp.addEventListener('click', () => {
    videoPlayer.volume = Math.min(1, videoPlayer.volume + 0.1);
});

// Bajar volumen
videoControls.volumeDown.addEventListener('click', () => {
    videoPlayer.volume = Math.max(0, videoPlayer.volume - 0.1);
});
