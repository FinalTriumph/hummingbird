$('a[href="/admin/logout"]').on('click', function(e) {
  e.preventDefault();
  $.post('/api/admin/logout', function(data) {
    window.location.href = '/admin';
  });
});
