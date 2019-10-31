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
                <ul>
                  <li>
                    <a
                      href="form_basic_inputs.html"
                      title="Basic Inputs"
                      data-filter-tags="form stuff basic inputs"
                    >
                      <span
                        class="nav-link-text"
                        data-i18n="nav.form_stuff_basic_inputs"
                      >Basic Inputs</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="form_checkbox_radio.html"
                      title="Checkbox & Radio"
                      data-filter-tags="form stuff checkbox & radio"
                    >
                      <span
                        class="nav-link-text"
                        data-i18n="nav.form_stuff_checkbox_&_radio"
                      >Checkbox & Radio</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="form_input_groups.html"
                      title="Input Groups"
                      data-filter-tags="form stuff input groups"
                    >
                      <span
                        class="nav-link-text"
                        data-i18n="nav.form_stuff_input_groups"
                      >Input Groups</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="form_validation.html"
                      title="Validation"
                      data-filter-tags="form stuff validation"
                    >
                      <span class="nav-link-text" data-i18n="nav.form_stuff_validation">Validation</span>
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <router-link to="/uploadCustomer" title="uploadCustomer" data-filter-tags="tables">
                  <i class="fal fa-th-list"></i>
                  <span class="nav-link-text" data-i18n="nav.tables">Upload Customer</span>
                </router-link>
              </li>

              <li>
                <router-link to="/templateMagement" title="templateMagement" data-filter-tags="tables">
                  <i class="fal fa-th-list"></i>
                  <span class="nav-link-text" data-i18n="nav.tables">Template Management</span>
                </router-link>
              </li>

              <li>
                <ul>
                  <li>
                    <a
                      href="plugin_faq.html"
                      title="Plugins FAQ"
                      data-filter-tags="plugins plugins faq"
                    >
                      <span class="nav-link-text" data-i18n="nav.plugins_plugins_faq">Plugins FAQ</span>
                    </a>
                  </li>
                  <li>
                    <a href="plugin_waves.html" title="Waves" data-filter-tags="plugins waves">
                      <span class="nav-link-text" data-i18n="nav.plugins_waves">Waves</span>
                      <span class="dl-ref label bg-primary-400 ml-2">9 KB</span>
                    </a>
                  </li>
                  <li>
                    <a href="plugin_pacejs.html" title="PaceJS" data-filter-tags="plugins pacejs">
                      <span class="nav-link-text" data-i18n="nav.plugins_pacejs">PaceJS</span>
                      <span class="dl-ref label bg-primary-500 ml-2">13 KB</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="plugin_smartpanels.html"
                      title="SmartPanels"
                      data-filter-tags="plugins smartpanels"
                    >
                      <span class="nav-link-text" data-i18n="nav.plugins_smartpanels">SmartPanels</span>
                      <span class="dl-ref label bg-primary-600 ml-2">9 KB</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="plugin_bootbox.html"
                      title="BootBox"
                      data-filter-tags="plugins bootbox alert sound"
                    >
                      <span class="nav-link-text" data-i18n="nav.plugins_bootbox">BootBox</span>
                      <span class="dl-ref label bg-primary-600 ml-2">15 KB</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="plugin_slimscroll.html"
                      title="Slimscroll"
                      data-filter-tags="plugins slimscroll"
                    >
                      <span class="nav-link-text" data-i18n="nav.plugins_slimscroll">Slimscroll</span>
                      <span class="dl-ref label bg-primary-700 ml-2">5 KB</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="plugin_throttle.html"
                      title="Throttle"
                      data-filter-tags="plugins throttle"
                    >
                      <span class="nav-link-text" data-i18n="nav.plugins_throttle">Throttle</span>
                      <span class="dl-ref label bg-primary-700 ml-2">1 KB</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="plugin_navigation.html"
                      title="Navigation"
                      data-filter-tags="plugins navigation"
                    >
                      <span class="nav-link-text" data-i18n="nav.plugins_navigation">Navigation</span>
                      <span class="dl-ref label bg-primary-700 ml-2">2 KB</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="plugin_i18next.html"
                      title="i18next"
                      data-filter-tags="plugins i18next"
                    >
                      <span class="nav-link-text" data-i18n="nav.plugins_i18next">i18next</span>
                      <span class="dl-ref label bg-primary-700 ml-2">10 KB</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="plugin_appcore.html"
                      title="App.Core"
                      data-filter-tags="plugins app.core"
                    >
                      <span class="nav-link-text" data-i18n="nav.plugins_app.core">App.Core</span>
                      <span class="dl-ref label bg-success-700 ml-2">14 KB</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <a
                      href="datatables_basic.html"
                      title="Basic"
                      data-filter-tags="datatables datagrid basic"
                    >
                      <span class="nav-link-text" data-i18n="nav.datatables_basic">Basic</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="datatables_autofill.html"
                      title="Autofill"
                      data-filter-tags="datatables datagrid autofill"
                    >
                      <span class="nav-link-text" data-i18n="nav.datatables_autofill">Autofill</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="datatables_buttons.html"
                      title="Buttons"
                      data-filter-tags="datatables datagrid buttons"
                    >
                      <span class="nav-link-text" data-i18n="nav.datatables_buttons">Buttons</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="datatables_export.html"
                      title="Export"
                      data-filter-tags="datatables datagrid export tables pdf excel print csv"
                    >
                      <span class="nav-link-text" data-i18n="nav.datatables_export">Export</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="datatables_colreorder.html"
                      title="ColReorder"
                      data-filter-tags="datatables datagrid colreorder"
                    >
                      <span class="nav-link-text" data-i18n="nav.datatables_colreorder">ColReorder</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="datatables_columnfilter.html"
                      title="ColumnFilter"
                      data-filter-tags="datatables datagrid columnfilter"
                    >
                      <span
                        class="nav-link-text"
                        data-i18n="nav.datatables_columnfilter"
                      >ColumnFilter</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="datatables_fixedcolumns.html"
                      title="FixedColumns"
                      data-filter-tags="datatables datagrid fixedcolumns"
                    >
                      <span
                        class="nav-link-text"
                        data-i18n="nav.datatables_fixedcolumns"
                      >FixedColumns</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="datatables_fixedheader.html"
                      title="FixedHeader"
                      data-filter-tags="datatables datagrid fixedheader"
                    >
                      <span class="nav-link-text" data-i18n="nav.datatables_fixedheader">FixedHeader</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="datatables_keytable.html"
                      title="KeyTable"
                      data-filter-tags="datatables datagrid keytable"
                    >
                      <span class="nav-link-text" data-i18n="nav.datatables_keytable">KeyTable</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="datatables_responsive.html"
                      title="Responsive"
                      data-filter-tags="datatables datagrid responsive"
                    >
                      <span class="nav-link-text" data-i18n="nav.datatables_responsive">Responsive</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="datatables_responsive_alt.html"
                      title="Responsive Alt"
                      data-filter-tags="datatables datagrid responsive alt"
                    >
                      <span
                        class="nav-link-text"
                        data-i18n="nav.datatables_responsive_alt"
                      >Responsive Alt</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="datatables_rowgroup.html"
                      title="RowGroup"
                      data-filter-tags="datatables datagrid rowgroup"
                    >
                      <span class="nav-link-text" data-i18n="nav.datatables_rowgroup">RowGroup</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="datatables_rowreorder.html"
                      title="RowReorder"
                      data-filter-tags="datatables datagrid rowreorder"
                    >
                      <span class="nav-link-text" data-i18n="nav.datatables_rowreorder">RowReorder</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="datatables_scroller.html"
                      title="Scroller"
                      data-filter-tags="datatables datagrid scroller"
                    >
                      <span class="nav-link-text" data-i18n="nav.datatables_scroller">Scroller</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="datatables_select.html"
                      title="Select"
                      data-filter-tags="datatables datagrid select"
                    >
                      <span class="nav-link-text" data-i18n="nav.datatables_select">Select</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="datatables_alteditor.html"
                      title="AltEditor"
                      data-filter-tags="datatables datagrid alteditor"
                    >
                      <span class="nav-link-text" data-i18n="nav.datatables_alteditor">AltEditor</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <a
                      href="statistics_flot.html"
                      title="Flot"
                      data-filter-tags="statistics chart graphs flot bar pie"
                    >
                      <span class="nav-link-text" data-i18n="nav.statistics_flot">Flot</span>
                      <span class="dl-ref label bg-primary-500 ml-2">36 KB</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="statistics_chartjs.html"
                      title="Chart.js"
                      data-filter-tags="statistics chart graphs chart.js bar pie"
                    >
                      <span class="nav-link-text" data-i18n="nav.statistics_chart.js">Chart.js</span>
                      <span class="dl-ref label bg-primary-500 ml-2">205 KB</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="statistics_chartist.html"
                      title="Chartist.js"
                      data-filter-tags="statistics chart graphs chartist.js"
                    >
                      <span class="nav-link-text" data-i18n="nav.statistics_chartist.js">Chartist.js</span>
                      <span class="dl-ref label bg-primary-600 ml-2">39 KB</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="statistics_c3.html"
                      title="C3 Charts"
                      data-filter-tags="statistics chart graphs c3 charts"
                    >
                      <span class="nav-link-text" data-i18n="nav.statistics_c3_charts">C3 Charts</span>
                      <span class="dl-ref label bg-primary-600 ml-2">197 KB</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="statistics_peity.html"
                      title="Peity"
                      data-filter-tags="statistics chart graphs peity small"
                    >
                      <span class="nav-link-text" data-i18n="nav.statistics_peity">Peity</span>
                      <span class="dl-ref label bg-primary-700 ml-2">4 KB</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="statistics_sparkline.html"
                      title="Sparkline"
                      data-filter-tags="statistics chart graphs sparkline small tiny"
                    >
                      <span class="nav-link-text" data-i18n="nav.statistics_sparkline">Sparkline</span>
                      <span class="dl-ref label bg-primary-700 ml-2">42 KB</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="statistics_easypiechart.html"
                      title="Easy Pie Chart"
                      data-filter-tags="statistics chart graphs easy pie chart"
                    >
                      <span
                        class="nav-link-text"
                        data-i18n="nav.statistics_easy_pie_chart"
                      >Easy Pie Chart</span>
                      <span class="dl-ref label bg-primary-700 ml-2">4 KB</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="statistics_dygraph.html"
                      title="Dygraph"
                      data-filter-tags="statistics chart graphs dygraph complex"
                    >
                      <span class="nav-link-text" data-i18n="nav.statistics_dygraph">Dygraph</span>
                      <span class="dl-ref label bg-primary-700 ml-2">120 KB</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <a
                      href="notifications_sweetalert2.html"
                      title="SweetAlert2"
                      data-filter-tags="notifications sweetalert2"
                    >
                      <span
                        class="nav-link-text"
                        data-i18n="nav.notifications_sweetalert2"
                      >SweetAlert2</span>
                      <span class="dl-ref label bg-primary-500 ml-2">40 KB</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="notifications_toastr.html"
                      title="Toastr"
                      data-filter-tags="notifications toastr"
                    >
                      <span class="nav-link-text" data-i18n="nav.notifications_toastr">Toastr</span>
                      <span class="dl-ref label bg-primary-600 ml-2">5 KB</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <a
                      href="form_plugins_colorpicker.html"
                      title="Color Picker"
                      data-filter-tags="form plugins color picker"
                    >
                      <span
                        class="nav-link-text"
                        data-i18n="nav.form_plugins_color_picker"
                      >Color Picker</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="form_plugins_datepicker.html"
                      title="Date Picker"
                      data-filter-tags="form plugins date picker"
                    >
                      <span
                        class="nav-link-text"
                        data-i18n="nav.form_plugins_date_picker"
                      >Date Picker</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="form_plugins_daterange_picker.html"
                      title="Date Range Picker"
                      data-filter-tags="form plugins date range picker"
                    >
                      <span
                        class="nav-link-text"
                        data-i18n="nav.form_plugins_date_range_picker"
                      >Date Range Picker</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="form_plugins_dropzone.html"
                      title="Dropzone"
                      data-filter-tags="form plugins dropzone"
                    >
                      <span class="nav-link-text" data-i18n="nav.form_plugins_dropzone">Dropzone</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="form_plugins_ionrangeslider.html"
                      title="Ion.RangeSlider"
                      data-filter-tags="form plugins ion.rangeslider"
                    >
                      <span
                        class="nav-link-text"
                        data-i18n="nav.form_plugins_ion.rangeslider"
                      >Ion.RangeSlider</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="form_plugins_inputmask.html"
                      title="Inputmask"
                      data-filter-tags="form plugins inputmask"
                    >
                      <span class="nav-link-text" data-i18n="nav.form_plugins_inputmask">Inputmask</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="form_plugin_imagecropper.html"
                      title="Image Cropper"
                      data-filter-tags="form plugins image cropper"
                    >
                      <span
                        class="nav-link-text"
                        data-i18n="nav.form_plugins_image_cropper"
                      >Image Cropper</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="form_plugin_select2.html"
                      title="Select2"
                      data-filter-tags="form plugins select2"
                    >
                      <span class="nav-link-text" data-i18n="nav.form_plugins_select2">Select2</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="form_plugin_summernote.html"
                      title="Summernote"
                      data-filter-tags="form plugins summernote texteditor editor"
                    >
                      <span class="nav-link-text" data-i18n="nav.form_plugins_summernote">Summernote</span>
                    </a>
                  </li>
                </ul>
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