import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/home', component: _import('home/index'), hidden: true},
  {path: '/home2', component: _import('home/index2'), hidden: true},
  {path: '/404', component: _import('errorPage/404'), hidden: true},
  {path: '/401', component: _import('errorPage/401'), hidden: true},
  {path: '/map_print', name: 'map_print', component: _import('home/map_print'), hidden: true},

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  }

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: {title: 'Example', icon: 'example'},
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: _import('table/index'),
  //       meta: {title: 'Table', icon: 'table'}
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: _import('tree/index'),
  //       meta: {title: 'Tree', icon: 'tree'}
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: _import('form/index'),
  //       meta: {title: 'Form', icon: 'form'}
  //     }
  //   ]
  // }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/dpf',
    component: Layout,
    redirect: '/supplier',
    name: 'DPF信息管理',
    meta: {title: 'DPF信息管理', icon: 'form', roles: ['editor']},
    children: [
      {
        path: 'supplier',
        name: '供应商管理',
        component: _import('supplier/index'),
        meta: {title: '供应商管理', roles: ['admin']}
      },
      {
        path: 'register',
        name: '登记信息管理',
        component: _import('register/index'),
        meta: {title: '登记信息管理'}
      },
      {
        path: 'equipment',
        name: '设备信息管理',
        component: _import('equipment/index'),
        meta: {title: '设备信息管理'}
      },
      {
        path: 'maintenance',
        name: '维修厂管理',
        component: _import('maintenance/index'),
        meta: {title: '维修厂管理'}
      },
      {
        path: 'maintenance_record',
        name: '维修管理',
        component: _import('maintenance_record/index'),
        meta: {title: '维修管理'}
      }
    ]
  },
  {
    path: '/Report',
    component: Layout,
    redirect: '/vehicle_report_run',
    name: '统计分析',
    meta: {title: '统计分析', icon: 'chart', roles: ['admin']},
    children: [
      {
        path: 'vehicle_report_run',
        name: '统计报表生成',
        component: _import('vehicle_report_run/index'),
        meta: {title: '统计报表生成'}
      },
      {
        path: 'vehicle_report_run',
        name: '报表推送',
        component: _import('vehicle_report_run/index'),
        meta: {title: '报表推送'}
      },
      {
        path: 'vehicle_report_run',
        name: '在线率统计',
        component: _import('vehicle_report_run/index'),
        meta: {title: '在线率统计'}
      },
      {
        path: 'vehicle_report_run',
        name: '车辆信息统计',
        component: _import('vehicle_report_run/index'),
        meta: {title: '车辆信息统计'}
      },
      {
        path: 'vehicle_report_run',
        name: '车辆报警统计',
        component: _import('vehicle_report_run/index'),
        meta: {title: '车辆报警统计'}
      },
      {
        path: 'vehicle_report_run',
        name: '车辆不在线统计',
        component: _import('vehicle_report_run/index'),
        meta: {title: '车辆不在线统计'}
      },
      {
        path: 'vehicle_report_run',
        name: '里程统计',
        component: _import('vehicle_report_run/index'),
        meta: {title: '里程统计'}
      },
      {
        path: 'vehicle_report_run',
        name: '地市车辆统计',
        component: _import('vehicle_report_run/index'),
        meta: {title: '地市车辆统计'}
      },
      {
        path: 'vehicle_report_run',
        name: '汽车指标统计',
        component: _import('vehicle_report_run/index'),
        meta: {title: '汽车指标统计'}
      },
      {
        path: 'vehicle_report_run',
        name: '单车指标统计',
        component: _import('vehicle_report_run/index'),
        meta: {title: '单车指标统计'}
      }
    ]
  },
  {
    path: '/System',
    component: Layout,
    redirect: '/department',
    name: '日志管理',
    meta: {title: '日志管理', icon: 'excel', roles: ['admin']},
    children: [
      {
        path: 'department',
        name: '系统日志',
        component: _import('department/index'),
        meta: {title: '系统日志'}
      },
      {
        path: 'part',
        name: '平台日志',
        component: _import('part/index'),
        meta: {title: '平台日志'}
      },
      {
        path: 'user',
        name: '审核日志',
        component: _import('user/index'),
        meta: {title: '审核日志'}
      }
    ]
  },
  {
    path: '/System',
    component: Layout,
    redirect: '/department',
    name: '公告管理管理',
    meta: {title: '公告管理', icon: 'documentation', roles: ['admin']},
    children: [
      {
        path: 'department',
        name: '公告管理',
        component: _import('department/index'),
        meta: {title: '公告管理', icon: 'documentation'}
      }
    ]
  },
  {
    path: '/System',
    component: Layout,
    redirect: '/department',
    name: '系统管理',
    meta: {title: '系统管理', icon: 'password', roles: ['admin']},
    children: [
      {
        path: 'department',
        name: '机构管理',
        component: _import('department/index'),
        meta: {title: '机构管理'}
      },
      {
        path: 'part',
        name: '角色管理',
        component: _import('part/index'),
        meta: {title: '角色管理'}
      },
      {
        path: 'user',
        name: '用户管理',
        component: _import('user/index'),
        meta: {title: '用户管理'}
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]
