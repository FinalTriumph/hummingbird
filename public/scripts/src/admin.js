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

function logoutListener() {
  $('a[href="/admin/logout"]').on('click', function(e) {
    e.preventDefault();
    $.post('/api/admin/logout', function(data) {
      window.location.href = '/admin';
    });
  });
}

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
      const $item = $('<div class="product-list-item"></div>');
      //
      $('<div class="dib-vat item-image" style="background-image: url(' + val.image + ')"></div>').appendTo($item);
      //
      const $textItems = $('<div class="dib-vat text-items"></div>');
      $('<p class="item-title">' + val.title.en + '</p>').appendTo($textItems);
      $('<p class="item-description">' + val.description.en + '</p>').appendTo($textItems);
      //
      $textItems.appendTo($item);
      //
      const $buttons = $('<div class="dib-vat item-buttons"></div>');
      $('<a href="/admin/products/edit/' + val._id + '"><button class="btn-style-1 btn-custom-width-1">Edit</button></a>').appendTo($buttons);
      $('<a href="#"><button class="btn-style-1 btn-custom-width-1 btn-custom-color-1">Delete</button></a>').appendTo($buttons);
      //
      $buttons.appendTo($item);
      $item.prependTo('.products-list');
    });
  });
}

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

$(document).ready(() => {
  // Login
  if ($('.admin-login form').length) {
    loginListener();
  }
  // Logout
  if ($('a[href="/admin/logout"]').length) {
    logoutListener();
  }
  // Products list
  if ($('.products-list').length) {
    getProductList();
  }
  // Add/edit product submit
  if ($('.product-edit').length) {
    addEditProductListener()
  }
  // Get product for edit
  if (window.location.href.indexOf('products/edit/') > -1) {
    getProductForEdit();
  }
});
