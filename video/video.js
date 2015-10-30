(function () {
  var $container;

  $(document).ready(function () {
    setupAudio();
    setupVideo();
  });

  function setupVideo() {
    $container = $('.container');

    var standupcat = new Image();
    var standupcatsrc = "cat.gif";
    standupcat.src = standupcatsrc;

    function newCat(pos) {
      var $cat = $('<img>').addClass('standupcat positionable small').prop('src', standupcatsrc).show();
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

    $(document).on('beat', function (e, number) {
      console.log('Beat', number);

      if (number % 4 == 0) {
        $('.standupcat').prop('src', standupcat.src).show();
        $('body').css('background-color', '#f00');
      }
      if (number % 4 == 2) {
        $('.standupcat').removeAttr('src').hide();
        $('body').css('background-color', '#0f0');
      }

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
      if (number == 48) {
        position(newCat({}).removeClass('small').css('height', '100%'), { middle: true });
      }
      if (number == 64) {
        $('.standupcat.small').hide();
      }

      makeBig($('.standupcat.small'));
      setContainerHeight();
    });

    setContainerHeight();
  }

  function makeBig($img) {
    $img.css('height', '40%');
    $img.filter('.middle').css('left', $container.width() / 2 - $img.width() / 2);
  }

  function setContainerHeight() {
    var height = $(window).height() * 0.9;
    var width = height * 1.5;
    $container.height(height).width(width);
  }
})();
/*
http://25.media.tumblr.com/tumblr_me4to17Fi51rd2l87o1_500.gif;
http://25.media.tumblr.com/tumblr_m6lz2mqSln1raq43io1_500.gif
http://25.media.tumblr.com/tumblr_m6qc6t2lze1r4u9wdo1_500.gif
http://cdn.cinemagr.am/cine_1/51727493.gif
http://i.imgur.com/RssgfnU.gif
*/
