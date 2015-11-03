var ctx = window.ctx ? window.ctx : new (window.AudioContext || window.webkitAudioContext)();

getAudioBuffer(ctx, 'shared/cissy-strut.mp3', function (buffer) {
  // buffer sources are one shot, so we need to make one every time we
  // want to play one. We only need one buffer, that can be used every
  // time we need to play a new buffer.
  function createSource(output) {
    var source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(output);
    return source;
  }

  function playBufferFrom(when, offset, length, output) {
    var source = createSource(output);
    source.start(when, offset, length);
  }

  window.playFourTimes = function () {
    playBufferFrom(ctx.currentTime + 0 * 1.33, 35.52, 1.33, ctx.destination);
    playBufferFrom(ctx.currentTime + 1 * 1.33, 35.52, 1.33, ctx.destination);
    playBufferFrom(ctx.currentTime + 2 * 1.33, 35.52, 1.33, ctx.destination);
    playBufferFrom(ctx.currentTime + 3 * 1.33, 35.52, 1.33, ctx.destination);
  };
});
