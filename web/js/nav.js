// 复用导航与页面切换按钮（所有页面通用）
(function () {
  var navRoot = document.getElementById('site-nav');
  if (!navRoot) return;

  var links = [
    { href: './index.html', text: '首页' },
    { href: './products.html', text: '产品介绍' },
    { href: './news.html', text: '新闻动态' },
    { href: './about.html', text: '关于我们' },
    { href: './contact.html', text: '联系我们' },
    { href: './messages.html', text: '留言板' }
  ];

  function getPathName(url) {
    try { return new URL(url, window.location.href).pathname.split('/').pop(); } catch (e) { return ''; }
  }

  var current = getPathName(window.location.href) || 'index.html';

  var menuHtml = links.map(function (l) {
    var isActive = getPathName(l.href) === current;
    return '<a href="' + l.href + '" class="' + (isActive ? 'active' : '') + '">' + l.text + '</a>';
  }).join('');

  navRoot.innerHTML = `
    <nav class="nav">
      <div class="container nav-inner">
        <div class="brand">辽宁鲲鹏科技有限公司</div>
        <button class="nav-toggle" aria-label="展开菜单" id="nav-toggle">菜单</button>
        <div class="menu" id="site-menu">${menuHtml}</div>
      </div>
    </nav>`;

  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('site-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
    });
  }

  // 小屏默认展开，避免用户看不到导航
  function adaptMenu() {
    if (!menu) return;
    if (window.innerWidth <= 768) {
      menu.classList.add('open');
    } else {
      menu.classList.remove('open');
    }
  }
  adaptMenu();
  window.addEventListener('resize', adaptMenu);
})();


