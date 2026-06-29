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
    '<button class="sb-toggle" id="sb-toggle" title="Toggle sidebar"><svg id="sb-toggle-icon" viewBox="0 0 16 16" fill="none" style="width:14px;height:14px;transition:transform .2s"><path d="M10 3L6 8l4 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
    '<div class="sb-group">' +
      '<div class="sb-group-label">Main</div>' +
      navItem('dashboard.html',   'dashboard',   'Dashboard') +
      navItem('catalog.html',     'catalog',     'Course Catalog') +
      navItem('assessments.html', 'assessments', 'Assessments') +
    '</div>' +
    '<div class="sb-group" id="sb-my-courses" style="display:none">' +
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
  style.textContent = '.sb-menu-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:6px;color:rgba(255,255,255,.8);font-size:13px;text-decoration:none;background:none;border:none;cursor:pointer;width:100%;text-align:left;box-sizing:border-box}.sb-menu-item:hover{background:rgba(255,255,255,.07)}.sb-menu-danger{color:rgba(255,100,100,.85)!important}'
  + '.sb-toggle{position:absolute;left:38px;top:42px;width:20px;height:20px;background:var(--navy3);border:1.5px solid rgba(255,255,255,.25);border-radius:7px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:60;transition:background .2s;flex-shrink:0;box-shadow:0 1px 4px rgba(0,0,0,.4)}.sb-toggle:hover{background:#2d3f55}'
  + 'body.sb-collapsed .sidebar{width:60px}'
  + 'body.sb-collapsed .sb-logo-name{display:none}'
  + 'body.sb-collapsed .sb-group-label{display:none}'
  + 'body.sb-collapsed .sb-label{display:none}'
  + 'body.sb-collapsed .sb-item{justify-content:center;padding:10px 0}'
  + 'body.sb-collapsed .sb-icon{opacity:.7}'
  + 'body.sb-collapsed .sb-item.active .sb-icon{opacity:1}'
  + 'body.sb-collapsed .sb-user{justify-content:center;padding:10px 0}'
  + 'body.sb-collapsed .sb-user-name,body.sb-collapsed .sb-user-role,body.sb-collapsed #sb-chevron,body.sb-collapsed .sb-progress-card{display:none}'
  + 'body.sb-collapsed .sb-logo{justify-content:center;padding:20px 0}'
  + 'body.sb-collapsed .main{margin-left:60px}'
  + 'body.sb-collapsed .page-header{margin-left:60px}'
  + 'body.sb-collapsed .track-bar{margin-left:60px}';
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

  // Sidebar collapse toggle
  (function() {
    if (localStorage.getItem('sb_collapsed') === '1') {
      document.body.classList.add('sb-collapsed');
      var icon = document.getElementById('sb-toggle-icon');
      if (icon) icon.style.transform = 'rotate(180deg)';
    }
    var toggleBtn = document.getElementById('sb-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        var collapsed = document.body.classList.toggle('sb-collapsed');
        localStorage.setItem('sb_collapsed', collapsed ? '1' : '');
        var icon = document.getElementById('sb-toggle-icon');
        if (icon) icon.style.transform = collapsed ? 'rotate(180deg)' : '';
      });
    }
  })();

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

  // My Courses section — populated from enrollment cache
  function _slugToTitle(slug) {
    return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); });
  }

  function _renderMyCourses(courses) {
    var groupEl = document.getElementById('sb-my-courses');
    if (!groupEl || !courses || !courses.length) return;
    var courseIcon = '<svg viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="white" stroke-width="1.4"/><path d="M5 6h6M5 9h4" stroke="white" stroke-width="1.2" stroke-linecap="round"/></svg>';
    var items = courses.map(function(c) {
      var slug = c.slug || '';
      var title = c.title || _slugToTitle(slug);
      var active = (window.location.search.indexOf('course=' + slug) !== -1) ? ' active' : '';
      return '<a href="lesson.html?course=' + slug + '" class="sb-item' + active + '">' +
        '<div class="sb-icon">' + courseIcon + '</div>' +
        '<span class="sb-label" style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + title + '</span>' +
        '</a>';
    }).join('');
    groupEl.innerHTML = '<div class="sb-group-label">My Courses</div>' + items;
    groupEl.style.display = '';
  }

  try {
    var _tok = localStorage.getItem('sp_token');
    if (_tok) {
      // Populate immediately from cache
      var _cached = localStorage.getItem('sp_enrollments');
      if (_cached) {
        var _data = JSON.parse(_cached);
        _renderMyCourses(_data.courses || []);
      }
      // Then refresh via getEnrollments if available
      if (typeof getEnrollments === 'function') {
        getEnrollments().then(function(d) {
          if (d && d.courses) _renderMyCourses(d.courses);
        }).catch(function(){});
      }
    }
  } catch(e2) {}

  // Mobile menu toggle: handled by onclick on #menu-btn in each page's HTML
})();
