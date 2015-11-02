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
    var bufferSource = createSource(output);
    bufferSource.start(when, offset, length);
  }

  var bpm = 90;
  var beatLength = 60 / bpm;
  var quarterBeatLength = beatLength / 4;
  var quarterBeatsPerPattern = 32;

  // Locations of each sample within cissy-strut.mp3
  var labels = {
    short1: 51.61,
    short2: 50.24
  };

  var fastPattern = [
  //  label   offset  length
    ['short1',  0,      1],
    ['short1',  2,      1],
    ['short1',  5,      1],
    ['short1',  7,      1],
    ['short1',  8,      1],
    ['short1',  9,      1],
    ['short2', 10,      1],
    ['short2', 11,      1],
    ['short1', 12,      1],
    ['short1', 13,      1],
    ['short2', 14,      1],
    ['short1', 15,    .33],
    ['short1', 15.33, .33],
    ['short1', 15.66, .33],
    ['short1', 16,      1],
    ['short1', 18,      1],
    ['short1', 21,      1],
    ['short1', 23,    .33],
    ['short1', 23.33, .33],
    ['short1', 23.66, .33],
    ['short1', 24,      1],
    ['short1', 25,      1],
    ['short2', 26,      1],
    ['short2', 27,      1],
    ['short1', 28,      1],
    ['short1', 29,      1],
    ['short2', 30,    .33],
    ['short2', 30.33, .33],
    ['short2', 30.66,   1]
  ];

  // start is measured in quarter-beats from start of playing
  // length is measured in quarter-beats
  function playSample(label, start, length, output, startTime) {
    playBufferFrom(
      startTime + start * quarterBeatLength,
      labels[label],
      length * quarterBeatLength,
      output
    );
  }

  function playPattern(pattern, patternNumber, output, startTime) {
    pattern.forEach(function (sample) {
      playSample(
        sample[0],
        patternNumber * quarterBeatsPerPattern + sample[1],
        sample[2],
        output,
        startTime
      );
    });
  }

  window.playFastPatternFourTimes = function () {
    playPattern(fastPattern, 0, ctx.destination, ctx.currentTime);
    playPattern(fastPattern, 1, ctx.destination, ctx.currentTime);
    playPattern(fastPattern, 2, ctx.destination, ctx.currentTime);
    playPattern(fastPattern, 3, ctx.destination, ctx.currentTime);
  };
});
