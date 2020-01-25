// TODO
function handleJsonError(data) {
  alert('Error');
  console.log(data);
}

function handleNavigation() {
  let navVisible = false;
  var lastScrollTop = 0;
  $(window).scroll(function(e){
      var cst = $(this).scrollTop();
      if (cst > lastScrollTop && (!navVisible || !$('.nav-lines').is(':visible'))) {
          $('.header').slideUp(300);
      } else {
          $(".header").slideDown(300);
      }
      lastScrollTop = cst;
  });

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

// TODO This will be removed ///////////////////////////////////////////////////
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
      let descriptionLength = 145;
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
////////////////////////////////////////////////////////////////////////////////

function createProductsGrid(targetContainer) {
  $.getJSON('/api/products/all', data => {
    if (data.status !== 'ok' || !data.products.length) return handleJsonError(data);

    $.each(data.products, (key, product) => {
      const $item = $('<div class="grid-item"></div>');
      // Image
      $('<div class="item-image" style="background-image: url(' + product.image + ')"></div>').appendTo($item);
      // Title
      $('<p class="item-title">' + product.title[language] + '</p>').appendTo($item);
      // Description
      $('<p class="item-description">' + truncate(product.description[language], 150) + '</p>').appendTo($item);
      // Price
      $price = $('<p class="item-price">' + product.price + ' €</p>');
      /* if (product.sale && product.salePrice && product.saleDiscount) {
        $('<span class="salePrice">' + product.salePrice + ' € (-'+ product.saleDiscount +'%)</span>').appendTo($price);
        $price.addClass('oldPrice');
      } */
      $('<a href="#" class="btn-blue-2">More</a>').appendTo($price);
      $price.appendTo($item);
      // Add item to grid
      $item.prependTo(targetContainer);
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

function scrollToBestOffers() {
  $('a[href="#best-offers"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $('#best-offers').offset().top
    }, 300);
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
  // Products grid
  if ($('.products-grid').length) {
    createProductsGrid('.products-grid');
  }
  if ($('#best-offers').length) {
    scrollToBestOffers();
  }
});
