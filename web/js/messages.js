(function () {
  var KEY = 'lp_tech_messages_v1';

  function getList() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; }
  }
  function setList(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function render() {
    var listRoot = document.getElementById('msg-list');
    if (!listRoot) return;
    var list = getList();
    if (!list.length) { listRoot.innerHTML = '<div class="msg">暂无留言</div>'; return; }
    listRoot.innerHTML = list.map(function (m, idx) {
      return (
        '<div class="msg">' +
          '<div class="meta">' +
            '<span>' + escapeHtml(m.name || '匿名') + ' · ' + escapeHtml(m.phone || '无电话') + '</span>' +
            '<span>' + new Date(m.ts).toLocaleString() + '</span>' +
          '</div>' +
          '<div class="content">' + escapeHtml(m.content || '') + '</div>' +
          '<div class="ops">' +
            '<button class="btn secondary" data-op="del" data-idx="' + idx + '">删除</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (s) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[s]);
    });
  }

  function bindEvents() {
    var submit = document.getElementById('submit');
    var clearAll = document.getElementById('clearAll');
    var listRoot = document.getElementById('msg-list');
    var nameIpt = document.getElementById('name');
    var phoneIpt = document.getElementById('phone');
    var contentIpt = document.getElementById('content');

    if (submit) submit.addEventListener('click', function () {
      var name = (nameIpt && nameIpt.value || '').trim();
      var phone = (phoneIpt && phoneIpt.value || '').trim();
      var content = (contentIpt && contentIpt.value || '').trim();
      if (!content) { alert('请填写留言内容'); return; }
      var list = getList();
      list.unshift({ name: name, phone: phone, content: content, ts: Date.now() });
      setList(list);
      if (contentIpt) contentIpt.value = '';
      render();
    });

    if (clearAll) clearAll.addEventListener('click', function(){
      if (confirm('确定要清空全部留言吗？')) { setList([]); render(); }
    });

    if (listRoot) listRoot.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.getAttribute && t.getAttribute('data-op') === 'del') {
        var idx = parseInt(t.getAttribute('data-idx'), 10);
        var list = getList();
        if (!isNaN(idx)) { list.splice(idx, 1); setList(list); render(); }
      }
    });
  }

  render();
  bindEvents();
})();


