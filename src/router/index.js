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
  {path: '/open_api', name: 'open_api', component: _import('open_api/index'), hidden: true},
  {path: '/login', name: 'login', component: _import('login/index3'), hidden: true},
  {path: '/home', component: _import('home/index4'), hidden: true},
  // {path: '/home2', component: _import('home/index2'), hidden: true},
  // {path: '/home3', component: _import('home/index3'), hidden: true},
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
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

// 原始路由表，角色菜单显示用，不会改变
export const asyncRouterMapRole = [
  {
    id: 1,
    path: '/dpf',
    component: Layout,
    redirect: '/dpf/supplier',
    name: 'DPF管理',
    meta: {title: 'DPF管理', icon: 'form'},
    children: [
      {
        id: 11,
        path: 'supplier',
        name: '供应商管理',
        component: _import('supplier/index'),
        meta: {title: '供应商管理', roles: ['admin']}
      },
      {
        id: 12,
        path: 'register',
        name: '登记信息管理',
        component: _import('register/index'),
        meta: {title: '登记信息管理'}
      },
      {
        id: 13,
        path: 'equipment',
        name: '设备型号管理',
        component: _import('equipment/index'),
        meta: {title: '设备型号管理'}
      },
      {
        id: 14,
        path: 'maintenance',
        name: '维修厂管理',
        component: _import('maintenance/index'),
        meta: {title: '维修厂管理'}
      },
      {
        id: 15,
        path: 'maintenance_record',
        name: '维修管理',
        component: _import('maintenance_record/index'),
        meta: {title: '维修管理'}
      },
      {
        id: 16,
        path: 'platform',
        name: '下级平台管理',
        component: _import('lower_platform/index'),
        meta: {title: '下级平台管理'}
      },
      {
        id: 17,
        path: 'info',
        name: 'DPF安装&报警信息',
        component: _import('register/info'),
        meta: {title: 'DPF安装&报警信息'}
      }
    ]
  },
  {
    id: 2,
    path: '/Report',
    component: Layout,
    redirect: '/vehicle_report_run',
    name: '统计分析',
    meta: {title: '统计分析', icon: 'chart'},
    children: [
      {
        id: 21,
        path: 'report_create',
        name: 'dpf安装数量统计',
        component: _import('report_create/index'),
        meta: {title: 'dpf安装数量统计'}
      },
      {
        id: 22,
        path: 'report_push',
        name: '报表推送',
        component: _import('report_push/index'),
        meta: {title: '报表推送'},
        hidden: true
      },
      {
        id: 23,
        path: 'report_online',
        name: '在线率统计',
        component: _import('report_online/index'),
        meta: {title: '在线率统计'}
      },
      {
        id: 24,
        path: 'report_info',
        name: '车辆信息统计',
        component: _import('report_info/index'),
        meta: {title: '车辆信息统计'},
        hidden: true
      },
      {
        id: 25,
        path: 'report_alarm',
        name: '车辆报警统计',
        component: _import('report_alarm/index'),
        meta: {title: '车辆报警统计'},
        hidden: true
      },
      {
        id: 26,
        path: 'report_offline',
        name: '车辆不在线统计',
        component: _import('report_offline/index'),
        meta: {title: '车辆不在线统计'}
      },
      {
        id: 27,
        path: 'report_mileage',
        name: '里程统计',
        component: _import('report_mileage/index'),
        meta: {title: '里程统计'},
        hidden: true
      },
      {
        id: 28,
        path: 'report_vehicle_city',
        name: '地市车辆统计',
        component: _import('report_vehicle_city/index'),
        meta: {title: '地市车辆统计'},
        hidden: true
      },
      {
        id: 29,
        path: 'report_vehicle',
        name: '汽车指标统计',
        component: _import('report_vehicle/index'),
        meta: {title: '汽车指标统计'},
        hidden: true
      },
      {
        id: 210,
        path: 'report_vehicle_single',
        name: '单车指标统计',
        component: _import('report_vehicle_single/index'),
        meta: {title: '单车指标统计'}
      },
      {
        id: 211,
        path: 'count_warn',
        name: '17地市报警数量统计',
        component: _import('count_warn/index'),
        meta: {title: '17地市报警数量统计'}
      },
      {
        id: 212,
        path: 'countWarnBySupplier',
        name: '供应商报警数量统计',
        component: _import('countWarnBySupplier/index'),
        meta: {title: '供应商报警数量统计'}
      },
      {
        id: 213,
        path: 'report_early_warning',
        name: '运营人员审核统计',
        component: _import('report_early_warning/index'),
        meta: {title: '运营人员审核统计'}
      },
      {
        id: 214,
        path: 'report_illegal',
        name: '非法数据统计报表',
        component: _import('report_illegal/index'),
        meta: {title: '非法数据统计报表'}
      },
      {
        id: 215,
        path: 'report_dpf_models',
        name: 'dpf型号安装统计',
        component: _import('report_dpf_models/index'),
        meta: {title: 'dpf型号安装统计'}
      }
    ]
  },
  {
    id: 3,
    path: '/Logs',
    component: Layout,
    redirect: '/Logs/system',
    name: '日志管理',
    meta: {title: '日志管理', icon: 'excel'},
    children: [
      {
        id: 31,
        path: 'system',
        name: '系统日志',
        component: _import('logs/system'),
        meta: {title: '系统日志'},
        hidden: true
      },
      {
        id: 32,
        path: 'platform',
        name: '平台日志',
        component: _import('logs/platform'),
        meta: {title: '平台日志'},
        hidden: true
      },
      {
        id: 33,
        path: 'valid',
        name: '审核日志',
        component: _import('logs/valid'),
        meta: {title: '审核日志'}
      }
    ]
  },
  {
    id: 4,
    path: '/Notice',
    component: Layout,
    redirect: '/Notice/notice',
    name: '公告管理',
    meta: {title: '公告管理', icon: 'documentation'},
    children: [
      {
        id: 41,
        path: 'notice',
        name: '平台公告',
        component: _import('notice/index'),
        meta: {title: '平台公告', icon: 'documentation'}
      },
      {
        id: 42,
        path: 'notice_create',
        name: '公告添加编辑',
        hidden: true,
        component: _import('notice/create'),
        meta: {title: '添加编辑', icon: 'documentation'}
      }
    ]
  },
  {
    id: 5,
    path: '/Warning',
    component: Layout,
    redirect: '/warning/sms',
    name: '报警管理',
    meta: {title: '报警管理', icon: 'documentation'},
    children: [
      {
        id: 51,
        path: 'sms',
        name: '报警短信',
        component: _import('sms/index'),
        meta: {title: '报警短信'},
        hidden: true
      },
      {
        id: 52,
        path: 'alarm',
        name: '预警处理',
        component: _import('alarm/index'),
        meta: {title: '预警处理'}
      },
      {
        id: 53,
        path: 'time_threshold',
        name: '时间阀值设置',
        component: _import('time_threshold/index'),
        meta: {title: '时间阀值设置'}
      },
      {
        id: 54,
        path: 'time_threshold2',
        name: '时间&距离阀值',
        component: _import('time_threshold2/index'),
        meta: {title: '时间&距离阀值'}
      },
      {
        id: 55,
        path: 'threshold',
        name: 'dpf阀值设置',
        component: _import('threshold/index'),
        meta: {title: 'dpf阀值设置'}
      },
      {
        id: 56,
        path: 'history',
        name: '历史轨迹',
        component: _import('history/index'),
        meta: {title: '历史轨迹'}
      },
      {
        id: 57,
        path: 'early_warning_history',
        name: '运营人员操作历史',
        component: _import('early_warning_history/index'),
        meta: {title: '运营人员操作历史'}
      }
    ]
  },
  {
    id: 6,
    path: '/System',
    component: Layout,
    redirect: '/System/user',
    name: '系统管理',
    meta: {title: '系统管理', icon: 'password', roles: ['admin']},
    children: [
      {
        id: 61,
        path: 'part',
        name: '角色管理',
        component: _import('part/index'),
        meta: {title: '角色管理'}
      },
      {
        id: 62,
        path: 'user',
        name: '用户管理',
        component: _import('user/index'),
        meta: {title: '用户管理'}
      },
      {
        id: 63,
        path: 'organ',
        name: '机构管理',
        component: _import('organ/index'),
        meta: {title: '机构管理'}
      }
    ]
  },
  {
    id: 99,
    path: '/home',
    component: Layout,
    redirect: '/home/home',
    name: '首页',
    meta: {title: '首页', icon: 'documentation'},
    children: [
      {
        id: 991,
        path: 'home',
        name: '地图车辆实时监控',
        component: _import('home/index4'),
        meta: {title: '地图车辆实时监控', icon: 'documentation'}
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

// 新的路由表，会动态改变
export const asyncRouterMap = [
  {
    id: 1,
    path: '/dpf',
    component: Layout,
    redirect: '/dpf/supplier',
    name: 'DPF管理',
    meta: {title: 'DPF管理', icon: 'form'},
    children: [
      {
        id: 11,
        path: 'supplier',
        name: '供应商管理',
        component: _import('supplier/index'),
        meta: {title: '供应商管理', roles: ['admin']}
      },
      {
        id: 12,
        path: 'register',
        name: '登记信息管理',
        component: _import('register/index'),
        meta: {title: '登记信息管理'}
      },
      {
        id: 13,
        path: 'equipment',
        name: '设备型号管理',
        component: _import('equipment/index'),
        meta: {title: '设备型号管理'}
      },
      {
        id: 14,
        path: 'maintenance',
        name: '维修厂管理',
        component: _import('maintenance/index'),
        meta: {title: '维修厂管理'}
      },
      {
        id: 15,
        path: 'maintenance_record',
        name: '维修管理',
        component: _import('maintenance_record/index'),
        meta: {title: '维修管理'}
      },
      {
        id: 16,
        path: 'platform',
        name: '下级平台管理',
        component: _import('lower_platform/index'),
        meta: {title: '下级平台管理'}
      },
      {
        id: 17,
        path: 'info',
        name: 'DPF安装&报警信息',
        component: _import('register/info'),
        meta: {title: 'DPF安装&报警信息'}
      }
    ]
  },
  {
    id: 2,
    path: '/Report',
    component: Layout,
    redirect: '/vehicle_report_run',
    name: '统计分析',
    meta: {title: '统计分析', icon: 'chart'},
    children: [
      {
        id: 21,
        path: 'report_create',
        name: 'dpf安装数量统计',
        component: _import('report_create/index'),
        meta: {title: 'dpf安装数量统计'}
      },
      {
        id: 22,
        path: 'report_push',
        name: '报表推送',
        component: _import('report_push/index'),
        meta: {title: '报表推送'},
        hidden: true
      },
      {
        id: 23,
        path: 'report_online',
        name: '在线率统计',
        component: _import('report_online/index'),
        meta: {title: '在线率统计'}
      },
      {
        id: 24,
        path: 'report_info',
        name: '车辆信息统计',
        component: _import('report_info/index'),
        meta: {title: '车辆信息统计'},
        hidden: true
      },
      {
        id: 25,
        path: 'report_alarm',
        name: '车辆报警统计',
        component: _import('report_alarm/index'),
        meta: {title: '车辆报警统计'},
        hidden: true
      },
      {
        id: 26,
        path: 'report_offline',
        name: '车辆不在线统计',
        component: _import('report_offline/index'),
        meta: {title: '车辆不在线统计'}
      },
      {
        id: 27,
        path: 'report_mileage',
        name: '里程统计',
        component: _import('report_mileage/index'),
        meta: {title: '里程统计'},
        hidden: true
      },
      {
        id: 28,
        path: 'report_vehicle_city',
        name: '地市车辆统计',
        component: _import('report_vehicle_city/index'),
        meta: {title: '地市车辆统计'},
        hidden: true
      },
      {
        id: 29,
        path: 'report_vehicle',
        name: '汽车指标统计',
        component: _import('report_vehicle/index'),
        meta: {title: '汽车指标统计'},
        hidden: true
      },
      {
        id: 210,
        path: 'report_vehicle_single',
        name: '单车指标统计',
        component: _import('report_vehicle_single/index'),
        meta: {title: '单车指标统计'}
      },
      {
        id: 211,
        path: 'count_warn',
        name: '17地市报警数量统计',
        component: _import('count_warn/index'),
        meta: {title: '17地市报警数量统计'}
      },
      {
        id: 212,
        path: 'countWarnBySupplier',
        name: '供应商报警数量统计',
        component: _import('countWarnBySupplier/index'),
        meta: {title: '供应商报警数量统计'}
      },
      {
        id: 213,
        path: 'report_early_warning',
        name: '运营人员审核统计',
        component: _import('report_early_warning/index'),
        meta: {title: '运营人员审核统计'}
      },
      {
        id: 214,
        path: 'report_illegal',
        name: '非法数据统计报表',
        component: _import('report_illegal/index'),
        meta: {title: '非法数据统计报表'}
      },
      {
        id: 215,
        path: 'report_dpf_models',
        name: 'dpf型号安装统计',
        component: _import('report_dpf_models/index'),
        meta: {title: 'dpf型号安装统计'}
      }
    ]
  },
  {
    id: 3,
    path: '/Logs',
    component: Layout,
    redirect: '/Logs/system',
    name: '日志管理',
    meta: {title: '日志管理', icon: 'excel'},
    children: [
      {
        id: 31,
        path: 'system',
        name: '系统日志',
        component: _import('logs/system'),
        meta: {title: '系统日志'},
        hidden: true
      },
      {
        id: 32,
        path: 'platform',
        name: '平台日志',
        component: _import('logs/platform'),
        meta: {title: '平台日志'},
        hidden: true
      },
      {
        id: 33,
        path: 'valid',
        name: '审核日志',
        component: _import('logs/valid'),
        meta: {title: '审核日志'}
      }
    ]
  },
  {
    id: 4,
    path: '/Notice',
    component: Layout,
    redirect: '/Notice/notice',
    name: '公告管理',
    meta: {title: '公告管理', icon: 'documentation'},
    children: [
      {
        id: 41,
        path: 'notice',
        name: '平台公告',
        component: _import('notice/index'),
        meta: {title: '平台公告', icon: 'documentation'}
      },
      {
        id: 42,
        path: 'notice_create',
        name: '公告添加编辑',
        hidden: true,
        component: _import('notice/create'),
        meta: {title: '添加编辑', icon: 'documentation'}
      }
    ]
  },
  {
    id: 5,
    path: '/Warning',
    component: Layout,
    redirect: '/warning/sms',
    name: '报警管理',
    meta: {title: '报警管理', icon: 'documentation'},
    children: [
      {
        id: 51,
        path: 'sms',
        name: '报警短信',
        component: _import('sms/index'),
        meta: {title: '报警短信'},
        hidden: true
      },
      {
        id: 52,
        path: 'alarm',
        name: '预警处理',
        component: _import('alarm/index'),
        meta: {title: '预警处理'}
      },
      {
        id: 53,
        path: 'time_threshold',
        name: '时间阀值设置',
        component: _import('time_threshold/index'),
        meta: {title: '时间阀值设置'}
      },
      {
        id: 54,
        path: 'time_threshold2',
        name: '时间&距离阀值',
        component: _import('time_threshold2/index'),
        meta: {title: '时间&距离阀值'}
      },
      {
        id: 55,
        path: 'threshold',
        name: 'dpf阀值设置',
        component: _import('threshold/index'),
        meta: {title: 'dpf阀值设置'}
      },
      {
        id: 56,
        path: 'history',
        name: '历史轨迹',
        component: _import('history/index'),
        meta: {title: '历史轨迹'}
      },
      {
        id: 57,
        path: 'early_warning_history',
        name: '运营人员操作历史',
        component: _import('early_warning_history/index'),
        meta: {title: '运营人员操作历史'}
      }
    ]
  },
  {
    id: 6,
    path: '/System',
    component: Layout,
    redirect: '/System/user',
    name: '系统管理',
    meta: {title: '系统管理', icon: 'password', roles: ['admin']},
    children: [
      {
        id: 61,
        path: 'part',
        name: '角色管理',
        component: _import('part/index'),
        meta: {title: '角色管理'}
      },
      {
        id: 62,
        path: 'user',
        name: '用户管理',
        component: _import('user/index'),
        meta: {title: '用户管理'}
      },
      {
        id: 63,
        path: 'organ',
        name: '机构管理',
        component: _import('organ/index'),
        meta: {title: '机构管理'}
      }
    ]
  },
  {
    id: 99,
    path: '/home',
    component: Layout,
    redirect: '/home/home',
    name: '首页',
    meta: {title: '首页', icon: 'documentation'},
    children: [
      {
        id: 991,
        path: 'home',
        name: '地图车辆实时监控',
        component: _import('home/index4'),
        meta: {title: '地图车辆实时监控', icon: 'documentation'}
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]
