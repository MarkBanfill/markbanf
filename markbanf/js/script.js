jQuery(document).ready(function($) {

  // Resets for Javascript animations (will only remove if Javascript enabled)
  // Remove fade-in elements
  $('#page2 .parallax__layer parallax__layer--back, #page2 .banner h2, #page2 .banner p, #page2 .banner .rslides_container, #page2 .banner p, #page3 .parallax__layer parallax__layer--back, #page3 .subtle, #page4 .banner h2, #page6 .banner h2, #page7 .contactform h2, #page7 .contactform .fscf-div-clear, #footer .testimonial, #footer .copyright, #footer .menu-all-pages-container').fadeTo(0,0);
  // Reset skill bars to 0
  $('.skillbar-bar').width(0);
  
  // Parallax triggers
  var lastScrollTop = 0,
  delta = 8;
  var pageheight = $('#page1').height();
  sessionStorage.pageno = 0;
  $('.parallax').scroll(function(event) {
    var st = $(this).scrollTop();

    //if (Math.abs(lastScrollTop - st) <= delta)
      //return;

    if (st > lastScrollTop) {
      switch (Math.round(st / pageheight)) {
        case 7:
          if (sessionStorage.pageno < 8) {
            $('#footer .testimonial').addClass('animated fadeInUp');
            $('#footer .copyright, #footer .menu-all-pages-container').addClass('animated fadeInUp');
            sessionStorage.pageno = 8;
          }
          break;
        case 6:
          if (sessionStorage.pageno < 7) {
            $('#page7 .contactform h2').addClass('animated fadeInUp');
            $('#page7 .contactform .fscf-div-clear').addClass('animated fadeIn');
            sessionStorage.pageno = 7;
          }
          break;
        case 5:
          if (sessionStorage.pageno < 6) {
            $('#page6 .banner h2').addClass('animated fadeInUp');
            sessionStorage.pageno = 6;
          }
          break;
        case 4:
          sessionStorage.pageno = 5;
          break;
        case 3:
          if (sessionStorage.pageno < 4) {
            $('#page4 .banner h2, #page4 .banner p').addClass('animated fadeInUp');
            $('.skillbar').each(function() {
              $(this).find('.skillbar-bar').animate({
                width: $(this).attr('data-percent')
              }, 3000);
            });
            sessionStorage.pageno = 4;
          }
          break;
        case 2:
          if (sessionStorage.pageno < 3) {
            $('#page3 .parallax__layer parallax__layer--back').addClass('animated fadeIn');
            $('#page3 .subtle').addClass('animated fadeInUp');
            sessionStorage.pageno = 3;
          }
          break;
        case 1:
          if (sessionStorage.pageno < 2) {
            $('#page2 .banner h2, #page2 .banner p').addClass('animated fadeInUp');
            $('#page2 .banner .rslides_container').addClass('animated fadeInUp');
            $('#page2 .parallax__layer parallax__layer--back').addClass('animated fadeIn');
            sessionStorage.pageno = 2;
          }
          break;
        case 0:
          sessionStorage.pageno = 1;
          break;
      }
    } else {
      switch (Math.round(st / pageheight)) {
        case 7:
          sessionStorage.pageno = 8;
          break;
        case 6:
          sessionStorage.pageno = 7;
          break;
        case 5:
          sessionStorage.pageno = 6;
          break;
        case 4:
          sessionStorage.pageno = 5;
          break;
        case 3:
          sessionStorage.pageno = 4;
          break;
        case 2:
          sessionStorage.pageno = 3;
          break;
        case 1:
          if (sessionStorage.pageno > 2) {
            $('.skillbar').each(function() {
              $(this).find('.skillbar-bar').animate({
                width: 0
              }, 0);
            });
            sessionStorage.pageno = 2;
          }
          break;
        case 0:
          sessionStorage.pageno = 1;
          break;
      }
    }
    lastScrollTop = st;
  });

  // Snow
  var isMobile = window.matchMedia("only screen and (max-width: 600px)");
  if (isMobile.matches) {
    $('#page1').flurry({
      character: '❄❅❆',
      color: 'white',
      height: 800,
      frequency: 1000,
      speed: 30000,
      small: 2,
      large: 8,
      wind: 100,
      windVariance: 100,
      rotation: 150
    });
  } else {
    $('#page1').flurry({
      character: '❄❅❆',
      color: 'white',
      height: 800,
      frequency: 300,
      speed: 20000,
      small: 2,
      large: 8,
      wind: 100,
      windVariance: 100,
      rotation: 150
    });
  }

  // Hamburger menu
  var $hamburger = $('.hamburger');
  $hamburger.on('click', function(e) {
    $hamburger.toggleClass('is-active');
    if ( $hamburger.is( ".is-active" ) ) {
      $('#parallax').removeClass('moveForward');
      $('#parallax').addClass('moveBack');
      $('.menu-all-pages-container').removeClass('menuOut');
      $('.menu-all-pages-container').addClass('menuIn');
    } else {
      $('.menu-all-pages-container').removeClass('menuIn');
      $('.menu-all-pages-container').addClass('menuOut');
      $('#parallax').removeClass('moveBack');
      $('#parallax').addClass('moveForward');
    }
  });

  // Sliders
  $(".rslides").responsiveSlides({
    auto: true, // Boolean: Animate automatically, true or false
    speed: 800, // Integer: Speed of the transition, in milliseconds
    timeout: 6000, // Integer: Time between slide transitions, in milliseconds
    pager: false, // Boolean: Show pager, true or false
    nav: true, // Boolean: Show navigation, true or false
    random: false, // Boolean: Randomize the order of the slides, true or false
    pause: true, // Boolean: Pause on hover, true or false
    pauseControls: true, // Boolean: Pause when hovering controls, true or false
    prevText: "<i class='fa fa-chevron-circle-left' aria-hidden='true'></i>", // String: Text for the "previous" button
    nextText: "<i class='fa fa-chevron-circle-right' aria-hidden='true'></i>" // String: Text for the "next" button
  });

  // Smooth scrolling nav
  $('a[href*="#"]:not([href="#"])').click(function(event) {
    event.preventDefault();
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[id=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('.hamburger').removeClass('is-active');
        $('#site-navigation').removeClass('toggled');
        var wibble = $('#parallax').scrollTop() + target.offset().top;
        $('#parallax').animate({
          scrollTop: wibble
        }, 1000);
        var $menucontain = $('.menu-all-pages-container');
        if ( $menucontain.is( ".menuIn" ) ) {
          $('.menu-all-pages-container').removeClass('menuIn');
          $('.menu-all-pages-container').addClass('menuOut');
          $('#parallax').removeClass('moveBack');
          $('#parallax').addClass('moveForward');
        }
      }
    }
  });
  

});
