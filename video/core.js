function setupAudio() {
  var audio, context, soundSource, soundBuffer, interval;

  function init() {
    if ("AudioContext" in window) {
      context = new AudioContext();
    } else if ("webkitAudioContext" in window) {
      context = new webkitAudioContext();
    } else {
      alert("AudioContext not supported.");
      throw new Error('AudioContext not supported.');
    }

    audio = $('audio')[0];
  }

  function startSound() {
    soundSource = context.createMediaElementSource(audio);
    soundSource.connect(context.destination);
  }

  function start() {
    var lastTime = audio.currentTime;

    var startTime = 2.9;
    var bpm = 180;
    var beatLength = 60 / bpm;
    var lastBeat = 430;

    interval = setInterval(function () {
      var time = 0;
      for (var i = 0; i < lastBeat; i++) {
        time = startTime + beatLength * i;
        if (lastTime <= time && audio.currentTime > time) {
          $(document).trigger('beat', i);
        }
        if (audio.currentTime < time) { //already passed
          break;
        }
      }
      lastTime = audio.currentTime;
    }, 50);

    audio.play();
  }

  function stop() {
    audio.pause();
    clearInterval(interval);
  }

  init();

  $(document).keydown(function (e) {
    if (e.keyCode == 27) {
      stop();
    } else if (e.keyCode == 32) {
      start();
    }
  });

  audio.addEventListener('canplay', function () {
    startSound();
  }, false);

  $('button').click(function () {
    start();
    $(this).hide();
  });
}
