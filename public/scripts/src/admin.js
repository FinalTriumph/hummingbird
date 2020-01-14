/* Login */
function loginListener() {
  $('.admin-login form').on('submit', function(e) {
    e.preventDefault();
    $('input[type="submit"]').prop('disabled', true);

    $.post($(this).attr('action'), $(this).serialize(), function(data) {
      if (data.status === 'ok') {
        return location.reload();
      }
      $('input[type="submit"]').removeAttr('disabled');
      // TODO add error message;
      console.log(data);
    });
  });
}

/* Logout */
function logoutListener() {
  $('a[href="/admin/logout"]').on('click', function(e) {
    e.preventDefault();
    $.post('/api/admin/logout', function(data) {
      window.location.href = '/admin';
    });
  });
}

/* Submit add/edit products */
function addEditProductListener() {
  $('input[name="image"]').val('');

  $('.product-edit').on('submit', function(e) {
    e.preventDefault();
    $('input[type="submit"]').prop('disabled', true);

    $.post($(this).attr('action'), $(this).serialize(), function(data) {
      if (data.status === 'ok') {
        window.location.href = '/admin/products';
        return;
      }
      $('input[type="submit"]').removeAttr('disabled');
      // TODO add error message;
      console.log(data);
    });
  });
}

/* Get product for edit */
function getProductForEdit() {
  const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  $.getJSON('/api/products/get/' + id, data => {
    // TODO
    if (data.status !== 'ok' || !data.product) {
      alert('Error');
      // TODO add error message;
      console.log(data);
    }
    //
    $('input[name="image"]').val(data.product.image);
    //
    $.each(data.product.title, (key, val) => {
      $('input[name="title[' + key + ']"]').val(val);
    });
    //
    $.each(data.product.description, (key, val) => {
      $('textarea[name="description[' + key + ']"]').val(val);
    });
    //
    $('.product-edit').attr('action', $('.product-edit').attr('action') + id);
  });
}

/* Submit add/edit translations */
function addEditTranslationListener() {
  $('input[name="key"]').val('');

  $('.translation-edit').on('submit', function(e) {
    e.preventDefault();
    $('input[type="submit"]').prop('disabled', true);

    $.post($(this).attr('action'), $(this).serialize(), function(data) {
      if (data.status === 'ok') {
        window.location.href = '/admin/translations';
        return;
      }
      $('input[type="submit"]').removeAttr('disabled');
      // TODO add error message;
      console.log(data);
    });
  });
}

/* Get all translations */
function getAllTranslations() {
  console.log('Will get all translations');
  $.getJSON('/api/translations/all', data => {
    // TODO
    if (data.status !== 'ok' || !data.translations || !data.translations.length) {
      alert('Error');
      // TODO add error message;
      console.log(data);
    }
    //
    $.each(data.translations, (key, val) => {
      console.log({
        'key': key,
        'val': val
      });
      const $item = $('<div class="translation-item"></div>');
      //
      $('<div class="translation-item-title">' + val.key + '</div>').appendTo($item);
      //
      const $allTranslations = $('<div class="translation-item-translations"></div>');
      $.each(val.translations, (lang, translation) => {
        $container = $('<div class="translation-item-translation-container"></div>');
        // Key
        $('<div class="dib-vat translation-item-lang">' + lang + ':</div>').appendTo($container);
        // Translation
        $('<div class="dib-vat translation-item-translation">' + translation + '</div>').appendTo($container);
        $container.appendTo($allTranslations);
      });
      //
      $allTranslations.appendTo($item);
      //
      /* const $buttons = $('<div class="product-item-buttons"></div>');
      if ($('.products-list').hasClass('products-list-public') || $('.products-list').hasClass('products-list-public-index')) {
        $('<a href="/products/view/' + val._id + '"><button class="btn-style-2">More</button></a>').appendTo($buttons);
      }
      else if ($('.products-list').hasClass('products-list-admin')) {
        $('<a href="/admin/products/edit/' + val._id + '"><button class="btn-style-1">Edit</button></a>').appendTo($buttons);
        $('<a href="#"><button class="btn-style-1 btn-custom-color-1">Delete</button></a>').appendTo($buttons);
      }
      $buttons.appendTo($item); */
      $item.prependTo('.translations-list');
    });
  });
}

/* Add necessary listeners */
$(document).ready(() => {
  // Login
  if ($('.admin-login form').length) {
    loginListener();
  }
  // Logout
  if ($('a[href="/admin/logout"]').length) {
    logoutListener();
  }

  // Add/edit product submit
  if ($('.product-edit').length) {
    // Get product for edit
    if (window.location.href.indexOf('products/edit/') > -1) {
      getProductForEdit();
    }
    // Add submit listener
    addEditProductListener();
  }

  // Add/edit translation submit
  if ($('.translation-edit').length) {
    // Get translation for edit
    if (window.location.href.indexOf('translations/edit/') > -1) {
      // TODO
      // getTranslationForEdit();
    }
    // Add submit listener
    addEditTranslationListener();
  }

  // Translations list
  if ($('.translations-list').length) {
    getAllTranslations();
  }
});
