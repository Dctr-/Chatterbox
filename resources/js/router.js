import './bootstrap';
import Vue from 'vue';
import Router from 'vue-router';

import Home from './pages/Home';
import Topics from "./pages/Topics";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import error403 from "./pages/error403";
import error404 from "./pages/error404";

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            auth: true
        }
    },
    {
        path: '/topics',
        name: 'topics',
        component: Topics,
        meta: {
            auth: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            auth: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: false
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            auth: true
        }
    },
    {
        path: '/403',
        name: '403',
        component: error403,
    },
    {
        path: '/404',
        name: '404',
        component: error404,
    },
    // ADMIN ROUTES
    {
        path: '/admin',
        name: 'admin.dashboard',
        component: AdminDashboard,
        meta: {
            auth: {roles: "2", redirect: {name: 'login'}, forbiddenRedirect: '/403'}
        }
    },
];

const router = new Router({
    history: true,
    mode: 'history',
    routes,
});

export default router;