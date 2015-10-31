function getData(filename, cb) {
  request = new XMLHttpRequest();
  request.open('GET', filename, true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    cb(request.response);
  }
  request.send();
}

function getAudioBuffer(ctx, filename, cb) {
  getData(filename, function (audioData) {
    ctx.decodeAudioData(audioData,
      function (buffer) {
        cb(buffer);
      },
      function (e) {
        console.log("Error decoding audio data" + e.err);
      }
    );
  });
}
