import Vue from 'vue'
import Router from 'vue-router'
import dashboard from "../components/dashboard";
import login from "../components/login";
import register from "../components/register";
import employeeManagement from "../components/employeeManagement";
import departments from "../components/departments";
import editEmployee from "../components/editEmployee"

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            component: dashboard,
            children: [
                {
                    path: "/employeeManagement",
                    name: "employeeManagement",
                    component: employeeManagement
                },
                {
                    path: "/departments",
                    name: "departments",
                    component: departments,

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
        {
            path: "/departments/editEmployee/:status",
            props: true,
            component: editEmployee
        }
    ]
})