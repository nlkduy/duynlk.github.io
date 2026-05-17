(function () {
  var footerMarkup = [
    '<footer class="footer text-center py-4">',
    '  <small class="copyright text-muted">&copy 2026 - duynlk.id.vn</small>',
    '</footer>'
  ].join('');

  function renderFooter() {
    document.querySelectorAll('[data-common-footer]').forEach(function (target) {
      target.innerHTML = footerMarkup;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderFooter);
  } else {
    renderFooter();
  }
})();
