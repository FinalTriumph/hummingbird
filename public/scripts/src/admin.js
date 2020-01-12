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

/* Submit add/edit */
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
});
