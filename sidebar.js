/**
 * sidebar.js — SkillPath shared sidebar component
 */
(function () {
  var page = window.location.pathname.split('/').pop() || 'index.html';

  function isActive(href) { return page === href ? ' active' : ''; }
  function icon(path) { return '<svg viewBox="0 0 16 16" fill="none">' + path + '</svg>'; }

  var icons = {
    dashboard:   icon('<rect x="1" y="1" width="6" height="6" rx="1.5" stroke="white" stroke-width="1.4"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke="white" stroke-width="1.4"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke="white" stroke-width="1.4"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke="white" stroke-width="1.4"/>'),
    catalog:     icon('<path d="M2 4h12M2 8h8M2 12h10" stroke="white" stroke-width="1.4" stroke-linecap="round"/>'),
    assessments: icon('<rect x="2" y="1" width="12" height="14" rx="2" stroke="white" stroke-width="1.4"/><path d="M5 5h6M5 8h6M5 11h4" stroke="white" stroke-width="1.2" stroke-linecap="round"/>'),
    profile:     icon('<circle cx="8" cy="5" r="3" stroke="white" stroke-width="1.4"/><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke="white" stroke-width="1.4" stroke-linecap="round"/>'),
    settings:    icon('<circle cx="8" cy="8" r="2.5" stroke="white" stroke-width="1.3"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.1 3.1l1.4 1.4M11.5 11.5l1.4 1.4M3.1 12.9l1.4-1.4M11.5 4.5l1.4-1.4" stroke="white" stroke-width="1.3" stroke-linecap="round"/>'),
  };

  function navItem(href, iconKey, label) {
    return '<a href="' + href + '" class="sb-item' + isActive(href) + '">' +
      '<div class="sb-icon">' + icons[iconKey] + '</div>' +
      '<span class="sb-label">' + label + '</span>' +
      '</a>';
  }

  var html =
    '<aside class="sidebar" id="sidebar" role="navigation">' +
    '<a href="index.html" class="sb-logo">' +
      '<div class="sb-logo-mark">' +
        '<svg viewBox="0 0 16 16" fill="none">' +
          '<path d="M2 12L5.5 7L8 9.5L10.5 5.5L14 8" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
          '<circle cx="14" cy="8" r="1.4" fill="#C5E8D5"/>' +
        '</svg>' +
      '</div>' +
      '<span class="sb-logo-name">Skill<span>Path</span></span>' +
    '</a>' +
    '<div class="sb-group">' +
      '<div class="sb-group-label">Main</div>' +
      navItem('dashboard.html',   'dashboard',   'Dashboard') +
      navItem('catalog.html',     'catalog',     'Course Catalog') +
      navItem('assessments.html', 'assessments', 'Assessments') +
    '</div>' +
    '<div class="sb-group">' +
      '<div class="sb-group-label">Account</div>' +
      navItem('profile.html',  'profile',  'Profile') +
      navItem('settings.html', 'settings', 'Settings') +
    '</div>' +
    '<div class="sb-footer">' +
      '<div class="sb-user" id="sb-user-btn" style="cursor:pointer">' +
        '<div class="sb-avatar" id="sb-avatar">?</div>' +
        '<div style="flex:1;min-width:0">' +
          '<div class="sb-user-name" id="sb-name">Loading...</div>' +
          '<div class="sb-user-role">Student</div>' +
        '</div>' +
        '<svg id="sb-chevron" viewBox="0 0 16 16" fill="none" style="width:14px;height:14px;flex-shrink:0;opacity:.5;transition:transform .2s">' +
          '<path d="M5 7l3-3 3 3M5 10l3 3 3-3" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>' +
      '</div>' +
    '</div>' +
    '<div id="sb-user-menu" style="display:none;position:fixed;bottom:80px;left:12px;width:216px;background:#1e293b;border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:4px;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.5)">' +
      '<a href="profile.html" class="sb-menu-item">Profile</a>' +
      '<a href="settings.html" class="sb-menu-item">Settings</a>' +
      '<div style="height:1px;background:rgba(255,255,255,.08);margin:4px 0"></div>' +
      '<button id="sb-logout-btn" class="sb-menu-item sb-menu-danger">Log out</button>' +
    '</div>' +
    '</aside>';

  var root = document.getElementById('sidebar-root');
  if (root) { root.innerHTML = html; }
  else { document.body.insertAdjacentHTML('afterbegin', html); }

  // Inject menu item styles
  var style = document.createElement('style');
  style.textContent = '.sb-menu-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:6px;color:rgba(255,255,255,.8);font-size:13px;text-decoration:none;background:none;border:none;cursor:pointer;width:100%;text-align:left;box-sizing:border-box}.sb-menu-item:hover{background:rgba(255,255,255,.07)}.sb-menu-danger{color:rgba(255,100,100,.85)!important}';
  document.head.appendChild(style);

  // Populate user info
  try {
    var user = JSON.parse(localStorage.getItem('sp_user') || 'null');
    if (user && user.name) {
      var parts = user.name.trim().split(' ');
      var initials = parts.map(function(w){ return w[0]; }).join('').substring(0,2).toUpperCase();
      var avatarEl = document.getElementById('sb-avatar');
      var nameEl   = document.getElementById('sb-name');
      var savedAvatar = localStorage.getItem('sp_avatar');
      if (avatarEl) {
        if (savedAvatar) {
          avatarEl.textContent = '';
          avatarEl.style.backgroundImage = 'url(' + savedAvatar + ')';
          avatarEl.style.backgroundSize = 'cover';
          avatarEl.style.backgroundPosition = 'center';
        } else { avatarEl.textContent = initials; }
      }
      if (nameEl) nameEl.textContent = parts[0];
    }
  } catch(e) {}

  // Toggle dropdown
  var userBtn  = document.getElementById('sb-user-btn');
  var userMenu = document.getElementById('sb-user-menu');
  var chevron  = document.getElementById('sb-chevron');

  if (userBtn && userMenu) {
    userBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = userMenu.style.display !== 'none';
      userMenu.style.display = isOpen ? 'none' : 'block';
      if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
    });
    document.addEventListener('click', function(e) {
      if (userMenu.style.display === 'none') return;
      if (!userBtn.contains(e.target) && !userMenu.contains(e.target)) {
        userMenu.style.display = 'none';
        if (chevron) chevron.style.transform = '';
      }
    });
  }

  // Logout
  document.addEventListener('click', function(e) {
    var btn = e.target && (e.target.id === 'sb-logout-btn' ? e.target : e.target.closest && e.target.closest('#sb-logout-btn'));
    if (btn) {
      ['sp_token','sp_user','sp_enrollments','sp_enrollments_ts','sp_avatar'].forEach(function(k){ localStorage.removeItem(k); });
      window.location.href = 'index.html';
    }
  });

  // Mobile menu toggle: handled by onclick on #menu-btn in each page's HTML
})();
