export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCover = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const radioHeader = document.querySelector('.radio-header__big');
    const radioVolume = document.querySelector('.radio-volume');
    const radioMute = document.querySelector('.radio-mute');

    const audio = new Audio();
    audio.type = 'audio/aac';

    let prevVolume = audio.volume;

    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };

    radioNavigation.addEventListener('change', e => {
        const target = event.target;
        const parent = target.closest('.radio-item');
        selectItem(parent);

        const title = parent.querySelector('.radio-name').textContent;
        radioHeader.textContent = title;

        const img = parent.querySelector('.radio-img').src;
        radioCover.src = img;

        radioStop.disabled = false;
        audio.src = target.dataset.radioStation;
        audio.play();
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
        audio.muted = false;
    });

    radioMute.addEventListener('click', () => {
        audio.muted = !audio.muted;
    });

    // radioVolume.value = audio.volume * 100; дефолтный звук - на максимум

    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    };
};