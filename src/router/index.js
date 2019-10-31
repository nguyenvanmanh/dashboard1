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
import employeeManagement from "../components/employeeManagement"
import campaigns from "../components/campaigns"
import templateMagement from '../components/TemplateManagement'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            component: dashboard,
            children: [
                {
                    path: "/uploadCustomer",
                    name: "uploadCustomer",
                    component: sendingEmail  // updload customers
                },
                {
                    path: "/campaigns",
                    name: "campaigns",
                    component: campaigns
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
                    path: "departments/editEmployee/:status/:departmentId",
                    props: true,
                    name: editEmployee,
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
                },
                {
                    path: "/employeeManagement",
                    name: "employeeManagement",
                    component: employeeManagement
                },
                {
                    path: "/templateMagement",
                    name: "templateMagement",
                    component: templateMagement
                },

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