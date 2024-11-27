// Ejemplo de cómo agregar elementos a las listas dinámicamente
const videoList = document.getElementById('video-list');
const audioList = document.getElementById('audio-list');

// Arreglos con los datos de los videos y la música
const videos = [
    { id: 1, title: 'Video 1', url: 'video1.mp4' },
    { id: 2, title: 'Video 2', url: 'video2.mp4' },
    // ... más videos
];

const audios = [
    { id: 1, title: 'Radio 1', url: 'radio1.mp3' },
    { id: 2, title: 'Radio 2', url: 'radio2.mp3' },
    // ... más radios
];

// Función para crear un elemento de lista
function createListItem(list, item) {
    const li = document.createElement('li');
    li.textContent = item.title;
    li.dataset.url = item.url;
    list.appendChild(li);
}

// Agregar los elementos a las listas
videos.forEach(video => createListItem(videoList, video));
audios.forEach(audio => createListItem(audioList, audio));

// Agregar un event listener para reproducir el video o audio seleccionado
// (Esta parte se puede implementar utilizando un reproductor de video/audio como HTML5 Video o Audio)