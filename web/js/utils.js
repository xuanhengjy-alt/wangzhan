(function () {
  // 返回顶部按钮
  var backTop = document.createElement('button');
  backTop.textContent = '↑ 顶部';
  backTop.setAttribute('aria-label', '返回顶部');
  backTop.style.position = 'fixed';
  backTop.style.right = '16px';
  backTop.style.bottom = '16px';
  backTop.style.padding = '8px 10px';
  backTop.style.borderRadius = '10px';
  backTop.style.border = 'none';
  backTop.style.background = '#0ea5e9';
  backTop.style.color = '#fff';
  backTop.style.cursor = 'pointer';
  backTop.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
  backTop.style.display = 'none';
  document.body.appendChild(backTop);

  function toggleBackTop() {
    if (window.scrollY > 300) backTop.style.display = 'block';
    else backTop.style.display = 'none';
  }
  window.addEventListener('scroll', toggleBackTop, { passive: true });
  backTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // 图片懒加载（为未显式标注 loading 的 img 添加懒加载）
  var observer = null;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          if (img.dataset && img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    Array.prototype.forEach.call(document.querySelectorAll('img[data-src]'), function (img) {
      observer.observe(img);
    });
  }
})();


