function getAudioBuffer(ctx, filename, cb) {
  getData(filename, function (audioData) {
    ctx.decodeAudioData(audioData,
      function (buffer) {
        cb(buffer);
      }
    );
  });
}

function getData(filename, cb) {
  var request = new XMLHttpRequest();
  request.open('GET', filename, true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    cb(request.response);
  }
  request.send();
}
