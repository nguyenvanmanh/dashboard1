import Vue from 'vue'
import Router from 'vue-router'
import dashboard from "../components/dashboard";
import login from "../components/login";
import register from "../components/register";
import sendingEmail from "../components/sendingEmail";
import departments from "../components/departments";
import editEmployee from "../components/editEmployee";
import analytics_dashboard from "../components/IntelAnalytics_Dashboard";
import marketing_dashboard from "../components/Marketing_Dashboard";
import roleManagement from "../components/roleManagement";

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            component: dashboard,
            children: [
                {
                    path: "/sendingEmail",
                    name: "sendingEmail",
                    component: sendingEmail
                },
                {
                    path: "/roleManagement",
                    name: "roleManagement",
                    component: roleManagement
                },
                {
                    path: "/departments",
                    name: "departments",
                    component: departments,

                },
                {
                    path: "departments/editEmployee/:status",
                    props: true,
                    component: editEmployee
                },
                {
                    path: "/intel_analytics_dashboard",
                    name: "analytics_dashboard",
                    component: analytics_dashboard
                },
                {
                    path: "/intel_marketing_dashboard",
                    name: "marketing_dashboard",
                    component: marketing_dashboard
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
        },

    ]
})