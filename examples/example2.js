var ctx = window.ctx ? window.ctx : new (window.AudioContext || window.webkitAudioContext)();

getAudioBuffer(ctx, 'shared/cissy-strut.mp3', function (buffer) {
  function createSource() {
    var source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    return source;
  }

  function playBufferFrom(offset, length) {
    var source = createSource();
    source.start(0, offset, length);
  }

  // Expose these functions for demoing
  window.playMain = function () {
    playBufferFrom(35.52, 1.4);
  };

  window.playShort1 = function () {
    playBufferFrom(51.61, 1/6);
  };

  window.playShort2 = function () {
    playBufferFrom(50.24, 1/6);
  };
});
