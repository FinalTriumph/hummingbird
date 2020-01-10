function handleNavigation() {
  let navVisible = false;

  $('.header .nav-lines').on('click', () => {
    if (navVisible) {
      $('.header .nav').slideUp(100);
      $('.header .nav-lines .cross').fadeOut(100, () => {
        $('.header .nav-lines .horizontal').fadeIn(100);
      });
      navVisible = false;
    }
    else {
      $('.header .nav').slideDown(100);
      $('.header .nav-lines .horizontal').fadeOut(100, () => {
        $('.header .nav-lines .cross').fadeIn(100);
      });
      navVisible = true;
    }
  });

  $(document).on('click', () => {
    if ($('.header .nav-lines').is(":visible")) {
      $('.header .nav').slideUp(100);
      $('.header .nav-lines .cross').fadeOut(100, () => {
        $('.header .nav-lines .horizontal').fadeIn(100);
      });
      navVisible = false;

      $('a').on('click', () => {
        console.log('a clicked');
      });
    };
  });
  $('.header .nav-lines, .header .nav').on('click', (e) => {
      e.stopPropagation();
      return $(e.target).hasClass('nav-item');
  });
}

$(document).ready(() => {
  handleNavigation();
});
