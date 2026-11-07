(function () {
  var script = document.currentScript;
  var dataset = script ? script.dataset : {};
  var siteUrl = 'https://duynlk.id.vn';
  var siteName = 'Duy Nguyen Lu Khanh';
  var defaultTitle = 'Duy Nguyen Lu Khanh - My Profile';
  var defaultDescription = 'Portfolio and resume of Duy Nguyen Lu Khanh, Project Manager at FPT Software in Can Tho City, Vietnam.';
  var path = dataset.path || '';
  var title = dataset.title || defaultTitle;
  var description = dataset.description || defaultDescription;
  var canonicalUrl = siteUrl + '/' + path;
  var imageUrl = siteUrl + '/avatar.jpg';
  var scriptSrc = (script && script.getAttribute('src')) || '';
  var basePath = scriptSrc.replace(/assets\/js\/common-head\.js.*$/, '');

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[character];
    });
  }

  document.write([
    '<title>' + escapeHtml(title) + '</title>',
    '<meta http-equiv="X-UA-Compatible" content="IE=edge">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '<meta name="description" content="' + escapeHtml(description) + '">',
    '<meta name="keywords" content="Duy Nguyen Lu Khanh, Duy Nguyen, Project Manager, FPT Software, portfolio, resume, web developer, Can Tho, Vietnam">',
    '<meta name="author" content="' + siteName + '">',
    '<meta name="robots" content="index, follow">',
    '<meta name="theme-color" content="#434e5e">',
    '<link rel="canonical" href="' + canonicalUrl + '">',
    '<meta property="og:type" content="' + (dataset.ogType || 'profile') + '">',
    '<meta property="og:title" content="' + escapeHtml(title) + '">',
    '<meta property="og:description" content="' + escapeHtml(description) + '">',
    '<meta property="og:url" content="' + canonicalUrl + '">',
    '<meta property="og:site_name" content="' + siteName + '">',
    '<meta property="og:image" content="' + imageUrl + '">',
    '<meta property="og:image:alt" content="Portrait of Duy Nguyen Lu Khanh">',
    '<meta name="twitter:card" content="summary">',
    '<meta name="twitter:title" content="' + escapeHtml(title) + '">',
    '<meta name="twitter:description" content="' + escapeHtml(description) + '">',
    '<meta name="twitter:image" content="' + imageUrl + '">',
    '<script async src="https://www.googletagmanager.com/gtag/js?id=G-2SQ7LG164D"><\/script>',
    '<script>',
    '  window.dataLayer = window.dataLayer || [];',
    '  function gtag(){dataLayer.push(arguments);}',
    '  gtag("js", new Date());',
    '  gtag("config", "G-2SQ7LG164D");',
    '<\/script>',
    '<script type="application/ld+json">' + JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: siteName,
      url: siteUrl + '/',
      image: imageUrl,
      jobTitle: 'Project Manager',
      worksFor: {
        '@type': 'Organization',
        name: 'FPT Software'
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Can Tho City',
        addressCountry: 'Vietnam'
      },
      sameAs: [
        'https://facebook.com/nlkduy/',
        'https://github.com/nlkduy',
        'https://linkedin.com/in/nlkduy/'
      ]
    }) + '<\/script>',
    '<link rel="shortcut icon" href="' + basePath + 'favicon.png">',
    '<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900" rel="stylesheet">',
    '<script defer src="' + basePath + 'assets/fontawesome/js/all.min.js"><\/script>',
    '<script defer src="' + basePath + 'assets/js/common-header.js"><\/script>',
    '<script defer src="' + basePath + 'assets/js/common-footer.js"><\/script>',
    '<link id="theme-style" rel="stylesheet" href="' + basePath + 'assets/css/devresume.css">'
  ].join(''));
})();
