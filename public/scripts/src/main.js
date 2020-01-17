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
    };
  });
  $('.header .nav-lines, .header .nav').on('click', (e) => {
      e.stopPropagation();
      return $(e.target).hasClass('nav-item');
  });
}

function handleLanguageNavigation() {
  let langNavVisible = false;

  $('.header .active-lang').on('click', () => {
    if (langNavVisible) {
      $('.header .lang-nav-list').slideUp(100);
      langNavVisible = false;
    }
    else {
      $('.header .lang-nav-list').slideDown(100);
      langNavVisible = true;
    }
  });

  $(document).on('click', () => {
    if ($('.header .lang-nav-list').is(":visible")) {
      // console.log('is visible');
      $('.header .lang-nav-list').slideUp(100);
      langNavVisible = false;
    };
  });
  $('.header .active-lang, .header .lang-nav-list').on('click', (e) => {
      e.stopPropagation();
      return $(e.target).hasClass('lang-nav-list-item');
  });
}

function truncate(string, maxLength) {
  if (string.length <= maxLength) {
    return string;
  }
  const words = string.split(' ');
  let letterCount= 0;
  const readyWords = [];
  for (let i = 0; i < string.length; i++) {
    letterCount += words[i].length;
    if (letterCount <= maxLength) {
      readyWords.push(words[i]);
      // To include spaces
      letterCount += 1;
    } else {
      break;
    }
  }
  return readyWords.join(' ') + ' ...';
}

function getProductList() {
  $.getJSON('/api/products/all', data => {
    // TODO
    if (data.status !== 'ok' || !data.products.length) {
      alert('Error');
      // TODO add error message;
      console.log(data);
    }
    //
    $.each(data.products, (key, val) => {
      const $item = $('<div class="product-item"></div>');
      //
      $('<div class="product-item-image" style="background-image: url(' + val.image + ')"></div>').appendTo($item);
      //
      const $textItems = $('<div class="product-text-items"></div>');
      let descriptionLength = 200;
      if ($('.products-list').hasClass('products-list-public-index')) {
        descriptionLength = 400;
      }
      $('<p class="product-title">' + val.title[language] + '</p>').appendTo($textItems);
      $('<p class="product-description">' + truncate(val.description[language], descriptionLength) + '</p>').appendTo($textItems);
      //
      $textItems.appendTo($item);
      //
      const $buttons = $('<div class="product-item-buttons"></div>');
      if ($('.products-list').hasClass('products-list-public') || $('.products-list').hasClass('products-list-public-index')) {
        $('<a href="/products/view/' + val._id + '"><button class="btn-style-2">More</button></a>').appendTo($buttons);
      }
      else if ($('.products-list').hasClass('products-list-admin')) {
        $('<a href="/admin/products/edit/' + val._id + '"><button class="btn-style-1">Edit</button></a>').appendTo($buttons);
        $('<a href="#"><button class="btn-style-1 btn-custom-color-1">Delete</button></a>').appendTo($buttons);
      }
      $buttons.appendTo($item);
      $item.prependTo('.products-list');
    });
  });
}

function handleLanguageChange() {
  $('.lang-nav-list-item').on('click', (e) => {
    e.preventDefault();

    const currentPathnameParts = window.location.pathname.split('/');
    const readyPathNameParts = [];
    for (let i = 0; i < currentPathnameParts.length; i++) {
      if (currentPathnameParts[i].length > 2) {
        readyPathNameParts.push(currentPathnameParts[i]);
      }
    }
    window.location.href = $(e.target).attr('href') + '/' + readyPathNameParts.join('/');
  });
}

$(document).ready(() => {
  handleNavigation();
  handleLanguageNavigation();
  handleLanguageChange();
  // Products list
  if ($('.products-list').length) {
    getProductList();
  }
});
