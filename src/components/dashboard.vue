<template>
  <div class="container-dashboard">
    <div class="page-wrapper">
      <div class="page-inner">
        <!-- BEGIN Left Aside -->
        <aside class="page-sidebar">
          <div class="page-logo">
            <a
              href="#"
              class="page-logo-link press-scale-down d-flex align-items-center"
              data-toggle="modal"
              data-target="#modal-shortcut"
            >
              <img
                src="../assets/img/logo.png"
                alt="Employee Management"
                aria-roledescription="logo"
              />
              <span class="page-logo-text mr-1">Employee Management</span>
            </a>
          </div>
          <!-- BEGIN PRIMARY NAVIGATION -->
          <nav id="js-primary-nav" class="primary-nav" role="navigation">
            <div class="nav-filter">
              <div class="position-relative">
                <input
                  type="text"
                  id="nav_filter_input"
                  placeholder="Filter menu"
                  class="form-control"
                  tabindex="0"
                />
                <a
                  href="#"
                  onclick="return false;"
                  class="btn-primary btn-search-close js-waves-off"
                  data-action="toggle"
                  data-class="list-filter-active"
                  data-target=".page-sidebar"
                >
                  <i class="fal fa-chevron-up"></i>
                </a>
              </div>
            </div>
            <div class="info-card">
              <img
                src="../assets/img/demo/avatars/avatar-admin.png"
                class="profile-image rounded-circle"
                alt="Dr. Codex Lantern"
              />
              <div class="info-card-text">
                <a href="#" class="d-flex align-items-center text-white">
                  <span class="text-truncate text-truncate-sm d-inline-block">Dr. Codex Lantern</span>
                </a>
                <span class="d-inline-block text-truncate text-truncate-sm">Toronto, Canada</span>
              </div>
              <img src="../assets/img/card-backgrounds/cover-2-lg.png" class="cover" alt="cover" />
          
            </div>
            <ul id="js-nav-menu" class="nav-menu">
              <li class="nav-title">Data Management</li>
              <li>
                <router-link to="/employeeManagement" title="employeeManagement" data-filter-tags="tables">
                  <i class="fal fa-th-list"></i>
                  <span class="nav-link-text" data-i18n="nav.tables">Employee Management</span>
                </router-link>
              </li>
              <li>
                <router-link to="/departments" title="departments" data-filter-tags="tables">
                  <i class="fal fa-th-list"></i>
                  <span class="nav-link-text" data-i18n="nav.tables">Departments Management</span>
                </router-link>
              </li>
              <li>
                <router-link to="/campaigns" title="Campaigns" data-filter-tags="tables">
                  <i class="fal fa-th-list"></i>
                  <span class="nav-link-text" data-i18n="nav.tables">Campaigns</span>
                </router-link>
              </li>
            </ul>
            <div class="filter-message js-filter-message bg-success-600"></div>
          </nav>
          <!-- END PRIMARY NAVIGATION -->
          <!-- NAV FOOTER -->
          <div class="nav-footer shadow-top">
            <a
              href="#"
              onclick="return false;"
              data-action="toggle"
              data-class="nav-function-minify"
              class="hidden-md-down"
            >
              <i class="ni ni-chevron-right"></i>
              <i class="ni ni-chevron-right"></i>
            </a>
          </div>
          <!-- END NAV FOOTER -->
        </aside>
        <!-- END Left Aside -->
        <div class="page-content-wrapper">
          <!-- BEGIN Page Header -->
          <header class="page-header" role="banner">
            <!-- we need this logo when user switches to nav-function-top -->
            <!-- DOC: nav menu layout change shortcut -->
            <!-- DOC: mobile button appears during mobile width -->
            <div class="hidden-lg-up">
              <a
                href="#"
                class="header-btn btn press-scale-down"
                data-action="toggle"
                data-class="mobile-nav-on"
              >
                <i class="ni ni-menu"></i>
              </a>
            </div>
            <div class="ml-auto d-flex">
              <div>
                  <img
                    src="../assets/img/demo/avatars/avatar-admin.png"
                    class="profile-image rounded-circle"
                    alt="Dr. Codex Lantern"
                  />
              </div>
            </div>
          </header>
          <!-- END Page Header -->
          <!-- BEGIN Page Content -->
          <!-- the #js-page-content id is needed for some plugins to initialize -->
          <main id="js-page-content" role="main" class="page-content">
            <router-view></router-view>
          </main>
          <!-- this overlay is activated only when mobile menu is triggered -->
          <div class="page-content-overlay" data-action="toggle" data-class="mobile-nav-on"></div>
          <!-- END Page Content -->
          <!-- BEGIN Page Footer -->
          <footer class="page-footer" role="contentinfo">
            <div class="d-flex align-items-center flex-1 text-muted">
              <span class="hidden-md-down fw-700">
                2019 © SmartAdmin by&nbsp;
                <a
                  href="https://www.gotbootstrap.com"
                  class="text-primary fw-500"
                  title="gotbootstrap.com"
                  target="_blank"
                >gotbootstrap.com</a>
              </span>
            </div>
          </footer>
          <!-- END Page Footer -->
          <!-- BEGIN Shortcuts -->
          <!-- modal shortcut -->
          <!-- END Shortcuts -->
        </div>
      </div>
    </div>
    <!-- END Page Settings -->
  </div>
</template>
<script>
export default {
  name: "dashboard"
};
</script>
<style>
.menu-open:checked + .menu-open-button {
  background: #505050 !important;
}
.menu-item,
label.menu-open-button {
  background: #886ab5 !important;
  border-radius: 50% !important;
}
.modal-dialog-right {
  position: absolute !important;
}


</style>