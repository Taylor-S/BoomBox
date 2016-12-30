var audio, play, pause, mutebtn, sun, speakerBoom, seekslider, volumeslider, seeking=false, seekto, curtimetext, durtimetext;
audio = new Audio ();
seekslider = document.getElementById("seekslider");
function initAudioPlayer() {
    audio.src = "../assets/music/BLOCKHEAD The Art of Walking.mp3";
    audio.loop = true;
    audio.autoplay = false;
    // set obj ref
    play = document.getElementById('playbtn');
    pause = document.getElementById('pausebtn');
    mutebtn = document.getElementById('mutebtn');
    volumeslider = document.getElementById("volumeslider");
    curtimetext = document.getElementById('curtimetext')
    durtimetext = document.getElementById('durtimetext')
    sun = document.getElementById('sunSpin');
    speakerBoom = $('.speakerBoom');
    // add event handling
    play.addEventListener("click", playMusic);
    pause.addEventListener("click", pauseMusic);
    mutebtn.addEventListener("click", mute);
    // seekslider.addEventListener("mousedown", function(){ seeking=true; seek; });
	// seekslider.addEventListener("mousemove", seek);
	// seekslider.addEventListener("mouseup",function(){ seeking=false; });
    volumeslider.addEventListener("mousemove", setvolume);
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
    //////////////////////////////////////////////
    function seek(event){
	    if(seeking){
		    seekslider.value = event.clientX - seekslider.offsetLeft;
	        seekto = audio.duration * (seekslider.value / 100);
	        audio.currentTime = seekto;
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



window.addEventListener("load", initAudioPlayer);
