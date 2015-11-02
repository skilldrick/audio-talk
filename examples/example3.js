var ctx = window.ctx ? window.ctx : new (window.AudioContext || window.webkitAudioContext)();

getAudioBuffer(ctx, 'shared/cissy-strut.mp3', function (buffer) {
  function createSource(output) {
    var source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(output);
    return source;
  }

  function playBufferFrom(offset, length, output) {
    var bufferSource = createSource(output);
    bufferSource.start(0, offset, length);
  }

  window.playWithGain = function (gain) {
    var gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);
    gainNode.gain.value = gain;

    playBufferFrom(35.52, 1.4, gainNode);
  };
});
