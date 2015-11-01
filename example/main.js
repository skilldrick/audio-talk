var ctx = new (window.AudioContext || window.webkitAudioContext)();

// buffer sources are one shot, so we need to make one every time we
// want to play one. We only need one buffer, that can be used every
// time we need to play a new buffer.

var buffer;

function createSource() {
  var source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  return source;
}

function playBufferFrom(offset, length) {
  // If when is in the past, starts immediately
  var bufferSource = createSource();
  bufferSource.start(0, offset, length);
}

function playMain() {
  playBufferFrom(35.52, 1.5);
}

function playShort1() {
  playBufferFrom(51.61, 1/6);
}

function playShort2() {
  playBufferFrom(50.24, 1/6);
}

// find cheatsheet and take a look at that
getAudioBuffer(ctx, '../shared/cissy-strut-start.mp3', function (_buffer) {
  buffer = _buffer;
});

console.log('playMain', 'playShort1', 'playShort2');
