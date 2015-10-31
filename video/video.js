(function () {
  var $container;

  $(document).ready(function () {
    setupAudio();
    setupVideo();
  });

  function setupVideo() {
    $container = $('.container');

    var srcs = [
      'standupcat.gif',
      'smokecat.gif',
      'pawcat.gif',
      'breadcat.gif',
      'wtfcat.gif',
      'pouncecat.gif',
      'omgcat.gif',
      'pianocat.gif',
      'keyboardcat.gif',
      'maru.gif',
    ];

    srcs.forEach(function (src) {
      $('.hidden').append($('<img>').prop('src', src));
    });

    function randomEl(arr) {
      var randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    }

    function randomSrc() {
      return randomEl(srcs);
    }

    function newCat(pos) {
      var $cat = $('<img>').addClass('gif positionable small').prop('src', randomSrc()).show();
      return position($cat.appendTo('.container'), pos);
    }

    function position($el, options) {
      if (options.middle) {
        $el.addClass('middle').css('left', $container.width() / 2 - $el.width() / 2);
      }
      if (options.left) {
        $el.css('left', 0);
      }
      if (options.right) {
        $el.css('right', 0);
      }
      if (options.bottom) {
        $el.css('bottom', 0);
      }
      return $el;
    }

    function makeBig($imgs) {
      $imgs.each(function () {
        var $img = $(this);
        $img.css('height', '40%');
        $img.filter('.middle').css('left', $container.width() / 2 - $img.width() / 2);
      });
    }

    function setContainerHeight() {
      var height = $(window).height() * 0.9;
      var width = height * 1.5;
      $container.height(height).width(width);
    }

    function restartGifs($els) {
      $els.each(function () {
        $(this).prop('src', randomSrc());
      });
      return $els;
    }

    $(document).on('beat', function (e, number) {
      console.log('Beat', number);

      if (number == 0) {
        newCat({ middle: true });
      }

      if (number == 16) {
        newCat({ left: true });
        newCat({ right: true });
      }

      if (number == 32) {
        newCat({ left: true, bottom: true });
        newCat({ right: true, bottom: true });
        newCat({ middle: true, bottom: true });
      }

      if (number % 4 == 0) {
        $('.gif').show();
        $('body').css('background-color', '#f00');
      }
      if (number % 4 == 2) {
        restartGifs($('.gif')).hide();
        $('body').css('background-color', '#0f0');
      }

      setContainerHeight();
      makeBig($('.gif.small'));
    });

    setContainerHeight();
  }
})();
