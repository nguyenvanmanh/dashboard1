import Vue from 'vue'
import Router from 'vue-router'
import dashboard from "../components/dashboard";
import login from "../components/login";
import register from "../components/register";
import sendingEmail from "../components/emailList";
import departments from "../components/departments";

Vue.use(Router)

export default new Router({
    mode: "history",
    routes :[
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
                    path: "/departments",
                    name: "departments",
                    component: departments
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
})