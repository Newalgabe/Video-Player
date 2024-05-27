document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("myVideo");
    var playPauseBtn = document.getElementById("playPause");
    var muteUnmuteBtn = document.getElementById("muteUnmute");
    var volumeUpBtn = document.getElementById("volumeUp");
    var volumeDownBtn = document.getElementById("volumeDown");
    var fullscreenBtn = document.getElementById("fullscreen");
    var backwardBtn = document.getElementById("backward");
    var forwardBtn = document.getElementById("forward");
    var preview = document.getElementById("preview");
    var previewImg = document.getElementById("previewImg");
    var previewTime = document.getElementById("previewTime");

    video.play();

    playPauseBtn.addEventListener("click", function() {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = "Pause";
        } else {
            video.pause();
            playPauseBtn.textContent = "Play";
        }
    });

    muteUnmuteBtn.addEventListener("click", function() {
        if (video.muted) {
            video.muted = false;
            muteUnmuteBtn.textContent = "Mute";
        } else {
            video.muted = true;
            muteUnmuteBtn.textContent = "Unmute";
        }
    });

    volumeUpBtn.addEventListener("click", function() {
        if (video.volume < 1) video.volume += 0.1;
    });

    volumeDownBtn.addEventListener("click", function() {
        if (video.volume > 0) video.volume -= 0.1;
    });

    fullscreenBtn.addEventListener("click", function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
            video.msRequestFullscreen();
        }
    });

    backwardBtn.addEventListener("click", function() {
        video.currentTime -= 10;
    });

    forwardBtn.addEventListener("click", function() {
        video.currentTime += 10;
    });

    video.addEventListener("mousemove", function(e) {
        var rect = video.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var time = (x / rect.width) * video.duration;

        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);
        var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

        previewTime.textContent = formattedMinutes + ":" + formattedSeconds;
        preview.style.display = "flex";
        preview.style.left = (x - preview.offsetWidth / 2) + "px";
        preview.style.top = (rect.top - preview.offsetHeight - 10) + "px";

        previewImg.src = `path/to/preview-images/${Math.floor(time)}.jpg`;
    });

    video.addEventListener("mouseleave", function() {
        preview.style.display = "none";
    });
});
