var audio, play, pause, mutebtn, sun, speakerBoom, seekslider, volumeslider, curtimetext, durtimetext, dir, ext, playlist, playlist_status, playlist_index, cue, review;
audio = new Audio ();
seekslider = document.getElementById("seekslider");

function initAudioPlayer() {

    // set obj ref
    play = document.getElementById('playbtn');
    pause = document.getElementById('pausebtn');
    cue = document.getElementById('cue');
    review = document.getElementById('review');
    mutebtn = document.getElementById('mutebtn');
    volumeslider = document.getElementById("volumeslider");
    curtimetext = document.getElementById('curtimetext');
    durtimetext = document.getElementById('durtimetext');
    sun = document.getElementById('sunSpin');
    speakerBoom = $('.speakerBoom');
    playlist_status = document.getElementById('playlist_status');
    dir = '../assets/music/'
    ext = '.mp3'
    playlist = ['Blockhead - The Art of Walking', 'Blockhead - Its Raining Clouds','Adam Hinden - Laniakea', 'AK & Direct - Sleepless Nights', 'Crywolf - Anachronism Crystal Skies Remix', 'Ether - As if time stood still', 'Fadent - Time Apart', 'Kisnou - Same Destiny' ]
    playlist_index = 0

    // audio object
    audio.src = dir + playlist[playlist_index] + ext;
    audio.loop = false;
    audio.autoplay = true;
    playlist_status.innerHTML =  playlist_status.innerHTML = " <span id = 'blackLines'>---------------------------------------------------</span> " + 'Now playing: ' + playlist[playlist_index] + " <span id = 'blackLines'>---------------------------------------------------</span> " ;

    // add event handling
    play.addEventListener("click", playMusic);
    pause.addEventListener("click", pauseMusic);
    mutebtn.addEventListener("click", mute);
    volumeslider.addEventListener("mousemove", setvolume);
    cue.addEventListener("click", switchTrack);
    review.addEventListener("click", previousTrack);
    audio.addEventListener('ended', function() {switchTrack(); });
    audio.addEventListener('timeupdate', seektimeupdate);


    // functions
    function playMusic () {
        audio.play();
        play.className = 'buttonPressed';
        pause.className = 'button';
        sun.className = 'sun sunRotate';
        speakerBoom.addClass('speaker');
    }
    ///////////////////////////////////////////////
    function pauseMusic () {
        audio.pause();
        play.className = 'button';
        pause.className = 'buttonPressed';
        sun.className = 'sun';
        speakerBoom.removeClass('speaker');
    }
    /////////////////////////////////////////
    function switchTrack () {
        if (playlist_index == playlist.length - 1) {
            playlist_index = 0;
        }
        else {
            playlist_index++;
        }
        playlist_status.innerHTML = " <span id = 'blackLines'>---------------------------------------------------</span> " + 'Now playing: ' + playlist[playlist_index] + " <span id = 'blackLines'>---------------------------------------------------</span> " ;
        pause.className = 'button';
        speakerBoom.addClass('speaker');
        sun.className = 'sun sunRotate';
        play.className = 'buttonPressed';
        audio.src = dir + playlist[playlist_index] + ext;
        audio.play();
    }
    /////////////////////////////////////////
    function previousTrack () {
        if (playlist_index == 0) {
            playlist_index = playlist.length - 1;
        }
        else {
            playlist_index--;
        }
        playlist_status.innerHTML = " <span id = 'blackLines'>---------------------------------------------------</span> " + 'Now playing: ' + playlist[playlist_index] + " <span id = 'blackLines'>---------------------------------------------------</span> " ;
        pause.className = 'button';
        speakerBoom.addClass('speaker');
        sun.className = 'sun sunRotate';
        play.className = 'buttonPressed';
        audio.src = dir + playlist[playlist_index] + ext;
        audio.play();
    }
    /////////////////////////////////////////
    function mute () {
        if (audio.muted) {
            audio.muted = false;
            mutebtn.className = 'mute';
            speakerBoom.addClass('speaker');
        }
        else {
            audio.muted = true;
            mutebtn.className = 'mutePressed';
            speakerBoom.removeClass('speaker');
        }
    }
    /////////////////////////////////////////////////////
    function setvolume(){
	    audio.volume = volumeslider.value / 100;
        // console.log(volumeslider.value/100);
    }
    ////////////////////////////////////////////////////
    function seektimeupdate() {
    // moves the knob and updates the player's time
        var nt = audio.currentTime * (100/audio.duration);
        seekslider.value = nt;
        var curmins = Math.floor(audio.currentTime/60);
        var cursecs = Math.floor(audio.currentTime-curmins*60);
        var durmins = Math.floor(audio.duration/60);
        var dursecs = Math.floor(audio.duration-durmins*60);
        if (cursecs <10) {
            cursecs = '0'+cursecs
        }
        if (curmins <10) {
            curmins = '0'+curmins
        }
        if (dursecs <10) {
            dursecs = '0'+dursecs
        }
        if (durmins <10) {
            durmins = '0'+durmins
        }
        curtimetext.innerHTML = curmins+":"+cursecs;
        durtimetext.innerHTML = durmins+":"+dursecs;
    }


}

//////////////////////////////////////////////////
// seekslider functionality
function seekSong () {
audio.currentTime = seekslider.value/100 * audio.duration;
}
//////////////////////////////////////////////////

// boomBox screen scroller
function autoScroll () {
    box = document.getElementById('content_scroller');
    max = box.scrollWidth-box.clientWidth;

    if (box.scrollLeft < max) {
        box.scrollLeft++;

    } else {
        box.scrollLeft = -500;

    }
}

window.addEventListener("load", initAudioPlayer);
window.addEventListener("load", setInterval(function() {autoScroll() ;}, 30));
