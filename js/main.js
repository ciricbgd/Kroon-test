$(document).ready(function() {
  // ----------------------------       Video player      ----------------------------
  var videoPlayer = $('#video');
  var topRight = $('#section1-right');
  var videoButton = $('.media-button');

  var videoExpanded = false;
  function expandVideo() {
    topRight.animate(
      {
        width: '100%'
      },
      800,
      'swing',
      function() {
        videoPlayer[0].play();
        videoButton.css({
          background: "url('./img/icons/Group 71.svg') no-repeat center center"
        });
        videoExpanded = true;
      }
    );
  }

  function colapseVideo() {
    topRight.animate(
      {
        width: '496px'
      },
      600,
      'swing',
      function() {
        videoPlayer[0].pause();
        videoButton.css({
          background: "url('./img/icons/Play.svg') no-repeat center center"
        });
        videoExpanded = false;
      }
    );
  }

  videoButton.click(function() {
    if (videoExpanded) {
      colapseVideo();
    } else {
      expandVideo();
    }
  });

  // ----------------------------       Section 2 scrolling      ----------------------------

  var scrollItems = [];
  $('#item-info .item').each(function() {
    scrollItems.push($(this));
  });

  // var controller = new ScrollMagic.Controller();

  // var scene = new ScrollMagic.Scene({
  //   triggerElement: '.scrollItem',
  //   duration: '300'
  // })
  //   .setClassToggle('.scrollItem', 'active-item')
  //   .setPin('.scrollItem')
  //   .addTo(controller);

  // ----------------------------       Loader bar      ----------------------------
  var loaders = [];

  $('.section-product-loader').each(function() {
    var loader = new ldBar(this, {
      preset: 'circle',
      easing: 'linear'
    });

    console.log(loader);
    loader.transition.value.src = 0;
    loaders.push(loader);
  });

  function startLoaders(loader, time) {
    let progress = 1;

    for (let i = 0; i < time; i++) {
      setTimeout(function timer() {
        loader.set(progress, false);
        progress++;
      }, i * 1000);
    }
  }

  var loaderController = new ScrollMagic.Controller();

  var loaderScene = new ScrollMagic.Scene({
    triggerElement: '#section4',
    triggerHook: 1,
    reverse: false
  })
    .on('enter', function(e) {
      $('.section-product-loader').each(function(index, loader) {
        startLoaders(loaders[index], $(loader).data('max'));
      });
    })
    .addTo(loaderController);

  // ----------------------------       Section 3 overlay      ----------------------------

  var s3Overlay = $('#section3-overlay');
  var s3OverlayClose = $('.close-icon');
  var s3Window = $('#overlay-window');
  var s3LearnMore = $('#learn-more');
  var s3Buttons = [];
  var s3Overlays = [];
  $('.progress-button').each(function() {
    s3Buttons.push($(this));
  });
  $('.overlay-info').each(function() {
    s3Overlays.push($(this));
  });

  s3LearnMore.click(function() {
    s3Overlay.css({
      display: 'block',
      'background-color': 'rgba(0, 0, 0, 0.47)'
    });
    s3Window.stop().animate(
      {
        right: '0px'
      },
      600,
      'swing',
      function() {}
    );
  });

  function closeS3() {
    s3Window.stop().animate(
      {
        right: '-438px'
      },
      600,
      'swing',
      function() {
        s3Overlay.css({
          display: 'none',
          'background-color': 'rgba(0, 0, 0, 0)'
        });
        s3Overlays[0].css({ left: '0%' });
        s3Overlays[1].css({ left: '100%' });
        s3Overlays[2].css({ left: '200%' });
      }
    );
  }

  function nextS3() {
    s3Overlays.forEach(function(overlay) {
      overlay.stop().animate(
        {
          left: '-=100%'
        },
        600,
        'swing',
        function() {}
      );
    });
  }

  s3Buttons[0].click(function() {
    nextS3();
  });
  s3Buttons[1].click(function() {
    nextS3();
  });
  s3Buttons[2].click(function() {
    closeS3();
  });
  s3OverlayClose.click(function() {
    closeS3();
  });

  // ----------------------------       Section 4 cards      ----------------------------

  var s4Cards = $('#section4 .cards');
  var s4Buttons = [];
  var s4ButtonsLeft = [];
  var s4ButtonsRight = [];
  $('#section4-icons .icon').each(function() {
    s4Buttons.push($(this));
  });
  $('#section4-icons .line-left').each(function() {
    s4ButtonsLeft.push($(this));
  });
  $('#section4-icons .line-right').each(function() {
    s4ButtonsRight.push($(this));
  });

  function changeSlide4(id, dom) {
    var pos = -id * 100;
    s4Cards.stop().animate(
      {
        left: pos + '%'
      },
      500,
      'swing',
      function() {}
    );
    s4Buttons.forEach(function(btn) {
      btn.attr('data-icon-active', false);
    });
    dom.attr('data-icon-active', true);
  }

  function changeLine4(dom) {
    var length = '104px';
    s4ButtonsLeft.concat(s4ButtonsRight).forEach(function(line) {
      line.animate(
        {
          width: '0px'
        },
        200,
        'swing',
        function() {}
      );
    });
    dom.stop().animate(
      {
        width: length
      },
      200,
      'swing',
      function() {}
    );
  }

  s4Buttons[0].click(function() {
    changeSlide4(0, $(this));
    changeLine4(s4ButtonsRight[0]);
  });
  s4Buttons[1].click(function() {
    changeSlide4(1, $(this));
    changeLine4(s4ButtonsRight[1]);
  });
  s4Buttons[2].click(function() {
    changeSlide4(2, $(this));
    changeLine4(s4ButtonsLeft[0]);
  });

  // ----------------------------       Slider      ----------------------------
  var nextButton = $('#slidern-next');
  var prevButton = $('#slidern-prev');
  var slides = [];
  var sliderPosition = 0;

  $('#slider li').each(function(index) {
    slides.push($(this));
  });

  function nextSlide() {
    if (sliderPosition < 2) {
      sliderPosition++;
      slides.forEach(function(slide) {
        slide.animate(
          {
            left: '+=100%'
          },
          500,
          'swing',
          function() {}
        );
      });
    }
  }
  function prevSlide() {
    if (sliderPosition > 0) {
      sliderPosition--;
      slides.forEach(function(slide) {
        slide.animate(
          {
            left: '-=100%'
          },
          500,
          'swing',
          function() {}
        );
      });
    }
  }

  nextButton.click(function() {
    nextSlide();
  });
  prevButton.click(function() {
    prevSlide();
  });
  // ----------------------------       Section 6 cards      ----------------------------

  var s6Cards = $('#section6 .cards');
  var s6Buttons = [];
  var s6ButtonsLeft = [];
  var s6ButtonsRight = [];
  $('#section6-icons .icon').each(function() {
    s6Buttons.push($(this));
  });
  $('#section6-icons .line-left').each(function() {
    s6ButtonsLeft.push($(this));
  });
  $('#section6-icons .line-right').each(function() {
    s6ButtonsRight.push($(this));
  });

  function changeSlide(id, dom) {
    var pos = -id * 100;
    s6Cards.stop().animate(
      {
        left: pos + '%'
      },
      500,
      'swing',
      function() {}
    );
    s6Buttons.forEach(function(btn) {
      btn.attr('data-icon-active', false);
    });
    dom.attr('data-icon-active', true);
  }

  function changeLine(dom) {
    var length = '104px';
    s6ButtonsLeft.concat(s6ButtonsRight).forEach(function(line) {
      line.animate(
        {
          width: '0px'
        },
        200,
        'swing',
        function() {}
      );
    });
    dom.stop().animate(
      {
        width: length
      },
      200,
      'swing',
      function() {}
    );
  }

  s6Buttons[0].click(function() {
    changeSlide(0, $(this));
    changeLine(s6ButtonsRight[0]);
  });
  s6Buttons[1].click(function() {
    changeSlide(1, $(this));
    changeLine(s6ButtonsRight[1]);
  });
  s6Buttons[2].click(function() {
    changeSlide(2, $(this));
    changeLine(s6ButtonsLeft[0]);
  });

  // ----------------------------       More info      ----------------------------

  var moreInfoButton = $('#more-info-button');
  var moreInfoText = $('#more-info-text');
  var buttonRotation = -90;

  moreInfoButton.click(function() {
    moreInfoText.stop().slideToggle();
    moreInfoButton.stop().animate(
      { rotation: buttonRotation },
      {
        duration: 300,
        easing: 'linear',
        step: function() {
          moreInfoButton.css({
            transform: 'rotate(' + this.rotation + 'deg)'
          });
        }
      }
    );
    if (buttonRotation == -90) {
      buttonRotation = 0;
    } else {
      buttonRotation = -90;
    }
  });
});
