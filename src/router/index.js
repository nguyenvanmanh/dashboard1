import Vue from "vue";
import Router from "vue-router";
import dashboard from "../components/dashboard";
import login from "../components/login";
import register from "../components/register";
import sendingEmail from "../components/sendingEmail";
import departments from "../components/departments";
import editEmployee from "../components/editEmployee";
import analytics_dashboard from "../components/IntelAnalytics_Dashboard";
import marketing_dashboard from "../components/Marketing_Dashboard";
import roleManagement from "../components/roleManagement";
import employeeManagement from "../components/employeeManagement";
import campaigns from "../components/campaigns";
import TemplateManagement from "../components/TemplateManagement";
import CustomerManagement from "../components/CustomerManagement";

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      component: dashboard,
      children: [
        {
          path: "/uploadCustomer",
          name: "uploadCustomer",
          component: sendingEmail, // updload customers
          beforeEnter: (to, from, next) => {
            let listPage = localStorage.getItem("listPage");
            if (listPage.search("uploadCustomer") !== -1) {
              next();
            } else {
              next(false);
            }
          }
        },
        {
          path: "/campaigns",
          name: "campaigns",
          component: campaigns,
          beforeEnter: (to, from, next) => {
            let listPage = localStorage.getItem("listPage");
            if (listPage.search("campaigns") !== -1) {
              next();
            } else {
              next(false);
            }
          }
        },
        {
          path: "/roleManagement",
          name: "roleManagement",
          component: roleManagement,
          beforeEnter: (to, from, next) => {
            let listPage = localStorage.getItem("listPage");
            if (listPage.search("roleManagement") !== -1) {
              next();
            } else {
              next(false);
            }
          }
        },
        {
          path: "/departments",
          name: "departments",
          component: departments,
          beforeEnter: (to, from, next) => {
            let listPage = localStorage.getItem("listPage");
            if (listPage.search("departments") !== -1) {
              next();
            } else {
              next(false);
            }
          }
        },
        {
          path: "departments/editEmployee/:status/:departmentId",
          props: true,
          name: editEmployee,
          component: editEmployee
        },
        {
          path: "/intel_analytics_dashboard",
          name: "analytics_dashboard",
          component: analytics_dashboard,
          beforeEnter: (to, from, next) => {
            let listPage = localStorage.getItem("listPage");
            if (listPage.search("intel_analytics_dashboard") !== -1) {
              next();
            } else {
              next(false);
            }
          }
        },
        {
          path: "/intel_marketing_dashboard",
          name: "marketing_dashboard",
          component: marketing_dashboard,
          beforeEnter: (to, from, next) => {
            let listPage = localStorage.getItem("listPage");
            if (listPage.search("marketing_dashboard") !== -1) {
              next();
            } else {
              next(false);
            }
          }
        },
        {
          path: "/employeeManagement",
          name: "employeeManagement",
          component: employeeManagement,
          beforeEnter: (to, from, next) => {
            let listPage = localStorage.getItem("listPage");
            if (listPage.search("employeeManagement") !== -1) {
              next();
            } else {
              next(false);
            }
          }
        },
        {
          path: "/templateManagement",
          name: "templateManagement",
          component: TemplateManagement,
          beforeEnter: (to, from, next) => {
            let listPage = localStorage.getItem("listPage");
            if (listPage.search("templateManagement") !== -1) {
              next();
            } else {
              next(false);
            }
          }
        },
        {
          path: "/customerManagement",
          name: "customerManagement",
          component: CustomerManagement
        }
      ]
    },
    {
      path: "/login",
      component: login
    },
    {
      path: "/register",
      component: register
    }
  ]
});
