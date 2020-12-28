import { addZero } from './subscript.js';

export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play'); 
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoProgress = document.querySelector('.video-progress');
    const videoVolume = document.querySelector('.video-volume');
    const videoVolumeDown = document.querySelector('.fa-volume-down');
    const videoVolumeUp = document.querySelector('.fa-volume-up');
    const videoFull = document.querySelector('.video-fullscreen');

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.remove('fa-play');
            videoButtonPlay.classList.add('fa-pause');
        }
    };

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
        // toggleIcon(); альтернатива - установить обработчик событий на события play, pause
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    const changeValue = () => {
        const valueVolume = videoVolume.value;
        videoPlayer.volume = valueVolume / 100;
    };

    const volumeDown = () => {
        videoPlayer.volume = 0;
        videoVolume.value = 0;
    };

    const volumeUp = () => {
        videoPlayer.volume = 1;
        videoVolume.value = 100;
    };

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon); // вместо вызова функции внутри функции togglePlay
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100; 

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`; 
        videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal); //другой вар-т написания усл-я
    });

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;
        videoPlayer.currentTime = (value * duration) / 100;
    });

    // включение фулскрина при нажатии на иконку
    videoFull.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    // включение элементов управления при фулскрине
    videoPlayer.addEventListener('fullscreenchange', () => {
        if (document.fullscreen) {
            videoPlayer.controls = true;
        } else {
            videoPlayer.controls = false;
        }
    });

    videoVolume.addEventListener('input', changeValue);

    videoPlayer.addEventListener('volumechange', () => {
        videoVolume.value = Math.round(videoPlayer.volume * 100);
    });

    changeValue();

    videoVolumeUp.addEventListener('click', volumeUp);
    videoVolumeDown.addEventListener('click', volumeDown);

    videoPlayerInit.stop = () => {
        videoPlayer.pause();
        toggleIcon();
    };
};

