// TODO
function handleJsonError(data) {
  alert('Error');
  console.log(data);
}

/**
  * TODO
  * @desc
  *
*/
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

/**
  * TODO
  * @desc
  *
*/
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

/**
  * TODO
  * @desc
  *
*/
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

/**
  * TODO
  * @desc
  * @param
  * @param
  * @return
*/
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

/**
  * TODO
  * @desc
  * @param
  * @return
*/
function imageUrlFromProduct(product) {
  if (!product.image) {
    // TODO
    return '/images/default-image.jpg';
  }
  if (!product.imageSource || product.imageSource == 'external') {
    return product.image;
  }
  return '/images/get/' + product.image + '';
}

/**
  * TODO
  * @desc
  * @param
*/
function createProductsGrid(url, targetContainer, admin = false) {
  $.getJSON(url, data => {
    if (data.status !== 'ok' || !data.products.length) return handleJsonError(data);

    $.each(data.products, (key, product) => {
      const $item = $('<div class="grid-item"></div>');
      // Image
      $('<div class="item-image" style="background-image: url(' + imageUrlFromProduct(product) + ')"></div>').appendTo($item);
      // Title
      $('<p class="item-title">' + product.title[language] + '</p>').appendTo($item);
      // Description
      $('<p class="item-description">' + truncate(product.description[language], 150) + '</p>').appendTo($item);
      // Price
      $price = $('<p class="item-price"><span class="regular-price">' + product.price + ' €</span></p>');
      if (product.sale && product.salePrice && product.saleDiscount) {
        $('<span class="sale-price">' + product.salePrice + ' €</span>').appendTo($price);
        $('<span class="sale-discount">-'+ product.saleDiscount +'%</span>').appendTo($price);
        $price.addClass('item-price-with-discount');
      }
      $price.appendTo($item);
      // Admin buttons
      if (admin) {
        const $buttons = $('<div class="product-item-admin-buttons"></div>');
        $('<a href="/admin/products/edit/' + product._id + '" class="btn-grey-1 edit-delete-button">Edit</a>').appendTo($buttons);
        $('<a href="javascript:;" onclick="deleteProduct(\''+product.title[language]+'\', \''+product._id+'\');" class="btn-red-1 edit-delete-button delete-product">Delete</a>').appendTo($buttons);
        $buttons.appendTo($item);
        if (product.active) {
          $item.addClass('grid-item-active');
        } else {
          $item.addClass('grid-item-not-active');
        }
      }
      // More button
      else {
        $('<a href="#" class="btn-green-1 item-more-btn">More</a>').appendTo($item);
      }
      // Add item to grid
      $item.prependTo(targetContainer);
    });

    handleItemImageHeigh('.item-image');
    setAllToHighest('.item-description');
  });
}

/**
  *
  * @desc Set item image container height same as width and add listener, to keep it that way
  * @param string item image container class or id
  *
*/
function handleItemImageHeigh(target) {
  $(target).css('height', $(target).width());
  //
  $(window).resize(() => {
    $(target).css('height', $(target).width());
  });
}

/**
  *
  * @desc On 'a[href="#best-offers"]' click animate scroll to '#best-offers'
  *
*/
function scrollToBestOffers() {
  $('a[href="#best-offers"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $('#best-offers').offset().top
    }, 300);
    $('a[href="#best-offers"]').blur();
  });
}

/**
  *
  * @desc Set height of all target items the same as highest
  *
*/
function setAllToHighest(target) {
  var maxHeight = 0;
  $(target).each(function() {
    if ($(this).outerHeight() > maxHeight) {
      maxHeight = $(this).outerHeight();
    }
  }).height(maxHeight);
}

$(document).ready(() => {
  // Navigation
  handleNavigation();
  handleLanguageNavigation();
  handleLanguageChange();

  // Products grid
  if ($('.products-grid').length) {
    if ($('.home-products-grid').length) {
      createProductsGrid('/api/products/best', '.home-products-grid');
    } else if ($('.admin-products-grid').length) {
      createProductsGrid('/api/products/admin', '.admin-products-grid', true);
    } else {
      createProductsGrid('/api/products/' + activeCategory, '.products-grid');
    }
  }

  //
  if ($('#best-offers').length) {
    scrollToBestOffers();
  }
});
