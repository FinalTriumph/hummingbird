// TODO
function handleJsonError(data) {
  alert('Error');
  // TODO add error message;
  console.log(data);
  $('.overlay').hide();
}

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
  $('a[href*="/admin/logout"]').on('click', function(e) {
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

/* Remove */
function removeProductClicked(e) {
  e.preventDefault();
  $('.overlay').show();
  const removeFilename = $('#removeImageBtn').data('filename');
  if (removeFilename.length) {
    $.getJSON('/api/images/delete/' + removeFilename, (deleteResponse) => {
      if (deleteResponse.status !== 'ok') return handleJsonError(deleteResponse);
      //
      $('input[name="image"]').val('');
      $('#imagePreview').html('');
      $('input[name="image"]').show();
      $('#removeImageBtn').addClass('dn');
      $('.overlay').hide();
    });
  }
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
      return;
    }

    // Image
    if (data.product.image) {
      $('input[name="image"]').val(data.product.image);

      if (data.product.imageSource && data.product.imageSource !== 'external') {
        $('input[name="image"]').hide();
        $('<img src="/images/get/' + data.product.image + '" />').appendTo('#imagePreview');
        $('#removeImageBtn').data('filename', data.product.image);
        $('#removeImageBtn').removeClass('dn');
        $('#removeImageBtn').on('click', e => {
          removeProductClicked(e);
        });
      }
    }

    //
    $.each(data.product.title, (key, val) => {
      $('input[name="title[' + key + ']"]').val(val);
    });
    //
    $.each(data.product.description, (key, val) => {
      $('textarea[name="description[' + key + ']"]').val(val);
    });
    //
    $('input[name="price"]').val(data.product.price);
    //
    if (data.product.active) {
      $('input[name="active"]').val(data.product.active);
      $('input[name="active"]').attr('checked', true );
    }
    //
    if (data.product.best) {
      $('input[name="best"]').val(data.product.best);
      $('input[name="best"]').attr('checked', true );
    }
    //
    if (data.product.sale) {
      $('input[name="sale"]').val(data.product.sale);
      $('input[name="sale"]').attr('checked', true );
      $('input[name="salePrice"]').val(data.product.salePrice || '');
      $('input[name="saleDiscount"]').val(data.product.saleDiscount || '');
      $('input[name="salePrice"], input[name="saleDiscount"]').parent().removeClass('input-group-disabled');
    }
    //
    $('.product-edit').attr('action', $('.product-edit').attr('action') + id);
  });
}

/* Product sale switch listener */
function addSaleSwitchListener() {
  $('input[name="sale"]').on('click', () => {
    if ($('input[name="sale"]').is(':checked')) {
      $('input[name="salePrice"], input[name="saleDiscount"]').parent().removeClass('input-group-disabled');
    } else {
      $('input[name="salePrice"], input[name="saleDiscount"]').parent().addClass('input-group-disabled');
    }
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
  $.getJSON('/api/translations/all', data => {
    if (data.status !== 'ok' || !data.translations || !data.translations.length) {
      alert('Error');
      // TODO add error message;
      console.log(data);
    }

    // Add each translation
    $.each(data.translations, (key, val) => {
      addTranslationToList(val);
    });
  });
}

function addTranslationToList(val) {
  // Item container
  const $item = $('<div class="translation-item"></div>');
  // Title
  $('<p class="translation-key"><span>Key:</span>' + val.key + '</p>').appendTo($item);
  // All translations
  const $allTranslations = $('<div class="all-translations"></div>');
  $.each(val.translations, (lang, translation) => {
    // Translation
    $('<p class="translation-text"><span class="translation-lang">' + lang + ':</span>' + translation + '</p>').appendTo($allTranslations);
  });
  // Buttons
  const $buttons = $('<div class="tranlslation-item-buttons"></div>');
  $('<a href="/admin/translations/edit/' + val._id + '" class="btn-grey-1">Edit</a>').appendTo($buttons);
  $('<a href="#" class="btn-red-1">Delete</a>').appendTo($buttons);
  // Append translations
  $allTranslations.appendTo($item);
  // Append buttons
  $buttons.appendTo($item);
  // Prepend to list
  $item.prependTo('.translations-list');
}

/* Get translation for edit */
function getTranslationForEdit() {
  const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  $.getJSON('/api/translations/get/' + id, data => {
    // TODO
    if (data.status !== 'ok' || !data.translation) {
      alert('Error');
      // TODO add error message;
      console.log(data);
    }
    //
    $('input[name="key"]').val(data.translation.key);
    //
    $.each(data.translation.translations, (key, val) => {
      $('textarea[name="translations[' + key + ']"]').val(val);
    });
    //
    $('.translation-edit').attr('action', $('.translation-edit').attr('action') + id);
  });
}

/**
  * TODO
  * @desc
  *
*/
function handleImageUpload() {
  $('#uploadImageBtn').on('click', (e) => {
    e.preventDefault();
    $('#uploadImage').click();
  });

  $('#uploadImage').on('change', function() {
    $('.overlay').show();
    $('#uploadImage').prop('disabled', true);
    $('#uploadImageBtn').prop('disabled', true);

    const imageData = new FormData();
    imageData.append('image', $(this)[0].files[0]);

    if ($('input[name="image"]').val().length && $('input[name="image"]').val().indexOf('://') > -1) {
      imageData.append('oldImageFilename', $('input[name="image"]').val());
    }

    $.ajax({
      url: '/api/images/upload',
      type: 'POST',
      processData: false, // important
      contentType: false, // important
      data: imageData,
      success: function(data) {
        $('#imagePreview').html('');
        const removeFilename = $('#removeImageBtn').data('filename') || '';
        if (removeFilename.length) {
          $.getJSON('/api/images/delete/' + removeFilename, (deleteResponse) => {
            if (deleteResponse.status !== 'ok') console.log(deleteResponse);
          });
        }
        $('input[name="image"]').val(data.filename);
        $('input[name="image"]').hide();
        $('<img src="/images/get/' + data.filename + '" />').appendTo('#imagePreview');
        $('#uploadImage').removeAttr('disabled');
        $('#uploadImageBtn').removeAttr('disabled');
        //
        $('#removeImageBtn').data('filename', data.filename);
        $('#removeImageBtn').removeClass('dn');
        $('#removeImageBtn').off('click');
        $('#removeImageBtn').on('click', e => {
          removeProductClicked(e);
        });
        $('.overlay').hide();
      },
      error: function(err) {
        console.log(err);
        $('#uploadImage').removeAttr('disabled');
        $('#uploadImageBtn').removeAttr('disabled');
        $('.overlay').hide();
      }
    });
  });
}

// TODO Temporary solution
function deleteProduct(title, id) {
  if (confirm('Delete "' + title + '"?')) {
    $.getJSON('/api/products/delete/' + id, data => {
      if (data.status === 'ok') {
        window.location.href = '/admin/products';
        return;
      }
      handleJsonError(data);
    });
  }
}

/* Add necessary listeners */
$(document).ready(() => {
  // Login
  if ($('.admin-login form').length) {
    loginListener();
  }
  // Logout
  if ($('a[href*="/admin/logout"]').length) {
    logoutListener();
  }

  // Add/edit product submit
  if ($('.product-edit').length) {
    // Get product for edit
    if (window.location.href.indexOf('products/edit/') > -1) {
      getProductForEdit();
    }
    // Add sales swicth listener
    addSaleSwitchListener();
    // Add submit listener
    addEditProductListener();
  }

  // Add/edit translation submit
  if ($('.translation-edit').length) {
    // Get translation for edit
    if (window.location.href.indexOf('translations/edit/') > -1) {
      getTranslationForEdit();
    }
    // Add submit listener
    addEditTranslationListener();
  }

  // Translations list
  if ($('.translations-list').length) {
    getAllTranslations();
  }

  // Image upload
  if ($('#uploadImage').length) {
    handleImageUpload();
  }
});
