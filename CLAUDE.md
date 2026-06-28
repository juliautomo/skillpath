# SkillPath — Project Context for Claude Sessions

## What is SkillPath?
Remote job course platform for Indonesian learners. Static HTML/JS frontend on **Vercel** (`skillpath-opal.vercel.app`), Node.js/Express backend on **Railway free tier** (`skillpath-production-4f85.up.railway.app`). Railway free tier goes to sleep — expect 15–60s cold start on first API call.

GitHub repo: `https://github.com/juliautomo/skillpath.git`

---

## Architecture

### Frontend (Vercel)
- Pure HTML/CSS/JS — no bundler, no framework
- Files: `index.html`, `catalog.html`, `dashboard.html`, `lesson.html`, `sidebar.js` (shared component)
- Auth: JWT stored in `localStorage` as `sp_token`, user object as `sp_user`
- Enrollment cache: `sp_enrollments` + `sp_enrollments_ts` (30-min TTL)

### Backend (Railway)
- Express API at `https://skillpath-production-4f85.up.railway.app`
- Endpoints used: `/api/auth/login`, `/api/auth/register`, `/api/auth/forgot-password`, `/api/enrollments`

---

## CRITICAL: File Writing Rules

**The Windows FUSE mount (`/sessions/.../mnt/Skillpath/`) silently truncates large files.**

- ❌ NEVER copy files from the FUSE mount into the git push directory
- ❌ NEVER use Python `cp`, `shutil.copy`, or `re.sub` on files read from the mount
- ✅ ALWAYS work from `/tmp/skillpath_push/` (fresh git clone)
- ✅ Read files with `git show HEAD:filename` piped through Python, split on `\x00` to strip null padding
- ✅ Write changes back to `/tmp/skillpath_push/` using Python string replacement, then `git add/commit/push`

**Detection:** After writing, verify with `wc -c` and `tail -5` to confirm file ends properly (not mid-token).

**Git push clone setup** (if `/tmp/skillpath_push/` is missing):
```bash
cd /tmp && git clone https://github.com/juliautomo/skillpath.git skillpath_push
cd skillpath_push && git config user.email "julia.utomo@gmail.com" && git config user.name "Julia"
```

---

## Current State of Each File (as of commit `8fd1db2`)

### `index.html` (Landing page)
- Nav: Home, Courses, How it works, Pricing (Assessments removed)
- Logged-in nav: `Hi, firstName 👋` | Dashboard (ghost) | **Log out (dark navy button)**
- Has full auth modal: login + register + forgot password tabs, show/hide password eye icon, loading state on login button
- Bundle section: `display:none` (only one live course)

### `catalog.html` (Course catalog)
- Nav: Home, Courses, How it works, Pricing (Assessments removed)
- Logged-in nav: `Hi, firstName 👋` | Dashboard (ghost) | **Log out (dark navy inline-styled button)**
- Auth modal: full modal with forgot password, show/hide eye icon, loading state (`id="auth-login-btn"`, shows "Logging in…" while fetching)
- Enrollment sync: fetches from Railway in background, updates "Enroll" → "Continue" button
- No Status filter (removed)

### `dashboard.html`
- No topbar header (removed)
- Mobile hamburger bar at top (shows only on ≤900px)
- Sidebar injected via `sidebar.js`
- Mobile CSS: sidebar uses `transform: translateX` not `width` variable

### `lesson.html`
- Renders immediately from local CURRICULUM data — no Railway wait
- Enrollment check runs in background; shows non-blocking banner if not enrolled
- Has Resources section (PDF + XLSX placeholders)

### `sidebar.js` (shared component)
- Injected into every dashboard-area page
- User footer → click opens dropdown (Profile, Settings, Log out)
- Dropdown: `position: fixed; bottom: 80px; left: 12px` (avoids overflow clip)
- Logout clears: `sp_token`, `sp_user`, `sp_enrollments`, `sp_enrollments_ts`, `sp_avatar`
- NO DOMContentLoaded handler (was causing double-toggle bug)
- Mobile toggle: handled purely by `onclick` attribute on `#menu-btn` in each page

---

## Known Issues / Watch Out For

1. **sidebar.js truncation** — Was rebuilt from scratch via bash heredoc. If it breaks again, rebuild it in Linux directly (never copy from mount).
2. **Railway cold start** — lesson.html renders immediately; other pages that need enrollment data show a loading state while Railway wakes.
3. **Vercel caching** — After pushing, always tell user to **Ctrl+Shift+R** (hard refresh).
4. **Two auth script blocks** — catalog.html had a duplicate. Now cleaned up to one block.
5. **Assessments page** — Not live yet. Assessments link removed from all nav bars.

---

## Nav Design Reference (standardized across all pages)

**Desktop nav (logged out):** Logo | Home Courses How-it-works Pricing | Log in (ghost) | Get started (primary dark)

**Desktop nav (logged in):** Logo | Home Courses How-it-works Pricing | Hi, name 👋 | Dashboard (ghost) | **Log out (dark #0D1B2A button)**

**CSS values:**
- Nav link font: 14px, color `var(--ink3)` 
- Logo name: 17px, font-weight 500
- Logo icon: 18×18px
- Primary button: `background:#0D1B2A; color:#fff; padding:8px 18px; border-radius:7px; font-weight:500`
- Ghost button: `background:none; border:1px solid transparent; padding:7px 14px; border-radius:7px; color:#4A4A4A`

---

## Git Workflow

```bash
cd /tmp/skillpath_push
# Make changes with Python string replacement on file contents
git add <files>
git commit -m "fix: description"
git push origin main
```

After pushing, verify on GitHub raw URL:
`https://raw.githubusercontent.com/juliautomo/skillpath/main/<filename>`

---

## Recent Commits
```
8fd1db2 fix: Log out button inline styles, hide Assessments from nav on all pages
5c6890c fix: standardize nav across pages + auth modal on index + login loading state
73b6f1b fix: rebuild sidebar.js from scratch (was truncated by FUSE mount)
58acdb3 fix: sidebar double-toggle bug + hide Assessments when logged out
3e32c3f fix: catalog enrollment sync, remove status filter, auth modal improvements
105669f fix: sidebar mobile width + catalog nav matches landing page
3c771ed fix: hide bundle section on homepage
77403af fix: restore mobile hamburger button after topbar removal
fe23844 fix: remove topbar header from dashboard
5332b3f fix: user footer opens dropdown instead of instant logout
383a94c fix: render lesson immediately without waiting for Railway
```
