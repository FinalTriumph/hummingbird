$('#admin-login form').on('submit', function(e) {
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
