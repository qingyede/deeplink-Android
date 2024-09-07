// navData.ts
export const NAV_DATA = [
  {
    icon: 'm1',
    t: '控制台',
    list: [
      { icon: 'm3', t0: '云服务器', path: '/console/serverManage', list1: [] },
      { icon: 'm4', t0: '服务器托管', path: '2', list1: [] },
      { icon: 'm5', t0: '独立服务器', path: '3', list1: [] },
      { icon: 'm6', t0: '云虚拟主机', path: '4', list1: [] },
      { icon: 'm7', t0: 'SSL证书', path: '5', list1: [] },
      { icon: 'm8', t0: '域名', path: '6', list1: [] },
      { icon: 'm9', t0: '云数据库', path: '7', list1: [] },
      { icon: 'm10', t0: '短信服务', path: '8', list1: [] },
      { icon: 'm11', t0: '网站备案', path: '9', list1: [] },
      { icon: 'm12', t0: '商标服务', path: '10', list1: [] },
      { icon: 'm13', t0: '百度智能建站', path: '11', list1: [] },
      { icon: 'm14', t0: '更多产品', path: '12', list1: [] }
    ]
  },
  {
    icon: 'm2',
    t: '用户中心',
    list: [
      {
        icon: 'm15',
        t0: '财务中心',
        path: '14',
        list1: [
          { icon: 'm21', t1: '充值中心', path1: '/console/payment' },
          { icon: 'm22', t1: '收支明细', path1: '/console/money' },
          { icon: 'm23', t1: '订单管理', path1: '/console/order' },
          {
            icon: 'm24',
            t1: '我的卡券',
            path1: '/console/serverManage',
            list1: [
              { icon: 'm29', t1: '提货卡', path1: '/console/goodscard' },
              { icon: 'm30', t1: '代金券', path1: '/console/cashcoupon' }
            ]
          },
          { icon: 'm25', t1: '发票管理', path1: '/console/serverManage1' },
          { icon: 'm26', t1: '退款管理', path1: '/console/serverManage2' },
          { icon: 'm27', t1: '合同管理', path1: '/console/serverManage3' },
          { icon: 'm28', t1: '积分管理', path1: '/console/serverManage4' }
        ]
      },
      { icon: 'm16', t0: '续费管理', path: '15', list1: [] },
      { icon: 'm17', t0: '代理分销', path: '16', list1: [] },
      { icon: 'm18', t0: '工单管理', path: '17', list1: [] },
      {
        icon: 'm19',
        t0: '账号设置',
        path: '18',
        list1: [
          { icon: 'm31', t1: '安全设置', path1: '/console/safesetting' },
          { icon: 'm32', t1: '基本资料', path1: '/console/userinfo' },
          { icon: 'm33', t1: '联系人管理', path1: '/console/phonelist' }
        ]
      },
      { icon: 'm20', t0: '我的活动', path: '19', list1: [] }
    ]
  }
]
