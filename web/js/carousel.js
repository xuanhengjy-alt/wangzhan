(function () {
  var slidesUl = document.getElementById('carousel-slides');
  var indicatorsRoot = document.getElementById('carousel-indicators');
  if (!slidesUl || !indicatorsRoot) return;

  // 资源基准路径：根首页通过 window.ASSET_BASE = './web/'
  var assetBase = (window && window.ASSET_BASE) ? window.ASSET_BASE : './';
  // 图片文件名：banner1.jpg, banner2.jpg, banner3.jpg（放在 web/assets/ 下）
  var images = [
    { src: assetBase + 'assets/banner1.jpg', alt: '公司愿景 Banner 1' },
    { src: assetBase + 'assets/banner2.jpg', alt: '核心产品 Banner 2' },
    { src: assetBase + 'assets/banner3.jpg', alt: '客户案例 Banner 3' }
  ];

  var current = 0;
  var timer = null;
  var intervalMs = 5000;

  function render() {
    slidesUl.innerHTML = images.map(function (img) {
      return '<li><img src="' + img.src + '" alt="' + img.alt + '" onerror="this.parentElement.textContent=\'请替换为真实图片：' + img.src + '\';"></li>';
    }).join('');
    indicatorsRoot.innerHTML = images.map(function (_, i) {
      return '<span class="dot' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '"></span>';
    }).join('');
    update();
  }

  function update() {
    slidesUl.style.transform = 'translateX(' + (-current * 100) + '%)';
    var dots = indicatorsRoot.querySelectorAll('.dot');
    Array.prototype.forEach.call(dots, function (d, i) {
      if (i === current) d.classList.add('active'); else d.classList.remove('active');
    });
  }

  function next() { current = (current + 1) % images.length; update(); }
  function prev() { current = (current - 1 + images.length) % images.length; update(); }

  function start() { stop(); timer = setInterval(next, intervalMs); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  render();
  start();

  var prevBtn = document.getElementById('carousel-prev');
  var nextBtn = document.getElementById('carousel-next');
  if (prevBtn) prevBtn.addEventListener('click', function(){ prev(); start(); });
  if (nextBtn) nextBtn.addEventListener('click', function(){ next(); start(); });

  indicatorsRoot.addEventListener('click', function (e) {
    var t = e.target;
    if (t && t.classList.contains('dot')) {
      var idx = parseInt(t.getAttribute('data-idx'), 10);
      if (!isNaN(idx)) { current = idx; update(); start(); }
    }
  });
})();


