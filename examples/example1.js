var ctx = window.ctx ? window.ctx : new (window.AudioContext || window.webkitAudioContext)();

getAudioBuffer(ctx, 'shared/cissy-strut.mp3', function (buffer) {
  // buffer sources are one shot, so we need to make one every time we
  // want to play one. We only need one buffer, that can be used every
  // time we need to play a new buffer.
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
  window.playSource = function () {
    var source = createSource();
    source.start(0, 35.52, 1.4);
  };
});
