(function () {
  var headerMarkup = [
    '<div class="resume-header">',
    '  <div class="row align-items-center">',
    '    <div class="resume-title col-12 col-md-6 col-lg-8 col-xl-9">',
    '      <h2 class="resume-name mb-0 text-uppercase">',
    '        <a href="/" style="text-decoration: none; color: inherit">Duy Nguyen Lu Khanh</a>',
    '      </h2>',
    '      <div class="resume-tagline mb-3 mb-md-0">Project Manager at FPT Software</div>',
    '    </div>',
    '    <div class="resume-contact col-12 col-md-6 col-lg-4 col-xl-3">',
    '      <ul class="list-unstyled mb-0">',
    '        <li class="mb-2">',
    '          <i class="fas fa-phone-square fa-fw fa-lg me-2 "></i>(+84) 97 2 342 075',
    '        </li>',
    '        <li class="mb-2">',
    '          <i class="fas fa-envelope-square fa-fw fa-lg me-2"></i>nguyenlukhanhduy@gmail.com',
    '        </li>',
    '        <li class="mb-2">',
    '          <i class="fas fa-cake-candles fa-fw fa-lg me-2"></i>Nov-1997',
    '        </li>',
    '        <li class="mb-0">',
    '          <i class="fas fa-map-marker-alt fa-fw fa-lg me-2"></i>Can Tho City, Vietnam',
    '        </li>',
    '      </ul>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('');

  function renderHeader() {
    document.querySelectorAll('[data-common-header]').forEach(function (target) {
      target.innerHTML = headerMarkup;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderHeader);
  } else {
    renderHeader();
  }
})();
