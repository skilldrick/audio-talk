function setupAudio(canvas) {
  var ctx;
  var master;
  var buffer;
  var oldSource;
  var currentBuffer;
  var markerBuffers = {};
  var monophonic = false; // allow multiple buffers to be played at once

  function success() {
    var data = [buffer.getChannelData(0), buffer.getChannelData(1)];
    sampleRate = buffer.sampleRate;
    samplesPerPixel = Math.floor(buffer.length / canvas.width);

    var x, val;
    var amplitudes = [];

    for (var i = 0; i < canvas.width; i++) {
      x = i;
      val = (data[0][i * samplesPerPixel] + data[1][i * samplesPerPixel]) / 2;
      amplitude = Math.pow(Math.abs(val), 0.7);
      amplitudes.push(amplitude);
    }

    canvas.setAmplitudes(amplitudes);
  }

  function drawMeter(level, maxMax) {
    var meterCanvas = document.getElementById('meter');
    var ctx = meterCanvas.getContext('2d');
    var width = meterCanvas.width;
    var height = meterCanvas.height;

    var hue = (maxMax / 2 + 0.5) * 360;
    var lineColor = "hsla(" + hue + ",100%,50%,1)";

    ctx.clearRect(0, 0, width, height);
    ctx.strokeWidth = 1;
    ctx.strokeRect(0, 0, width, height);


    ctx.save();
    ctx.fillStyle = lineColor;
    ctx.fillRect(0, height - (level * height), width, level * height);
    ctx.fillRect(0, height - (maxMax * height), width, 1);
    ctx.restore();
  }

  function createSource() {
    var source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(master);
    return source;
  }

  function playBuffer(offset, length) {
    if (monophonic) {
      oldSource && oldSource.stop();
    }

    var source = createSource();
    source.start(0, offset, length);
    oldSource = source;
  }

  function playBufferByName(key) {
    var bufferInfo = markerBuffers[key];
    playBuffer(bufferInfo.position, bufferInfo.length);
  }

  function updateBuffer(markerName, pos, markerLength) {
    markerBuffers[markerName] = { position: pos / sampleRate, length: markerLength  };
  }

  function loadTrack(track) {
    getAudioBuffer(ctx, track, function (_buffer) {
      buffer = _buffer;
      success();
      updateMarkerState();
    });
  }

  function setupAnalyser(analyser) {
    var length = analyser.fftSize;
    var arr = new Float32Array(length);
    var maxMax = 0;
    setInterval(function () {
      analyser.getFloatTimeDomainData(arr);
      var max = 0;
      for (var i = 0; i < length; i++) {
        max = Math.max(Math.abs(arr[i]), max);
      }
      maxMax = Math.max(max, maxMax)
      drawMeter(max, maxMax);
      maxMax -= 0.0005;
    }, Math.floor(1000 * length / sampleRate));

  }

  function setup() {
    ctx = new AudioContext()
    loadTrack('/shared/cissy-strut-start.mp3');
    master = ctx.createGain();
    var analyser = ctx.createAnalyser()
    master.connect(analyser);
    analyser.connect(ctx.destination);
    setupAnalyser(analyser);
  }

  setup();

  return {
    playBufferByName: playBufferByName,
    updateBuffer: updateBuffer
  };
}
