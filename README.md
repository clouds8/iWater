# iWater
水务管理系统后台

主要架构: Express + Angular1.5 + Bootstrap + Gulp + Mongodb
其他: Jade, Mongoose, BootstrapTable, BootstrapTree, Ztree, ui-router, ui-bootstrap, ui-select, Nodeman, 使用部分ES6语法.

异步处理: 主要使用Async和Promise.
Session使用Mongodb存储.

目前已实现:
1. 权限管理.
2. 角色管理, 角色分配权限.
3. 用户管理, 用户分配角色, 重置密码.
4. 用户登录后根据"用户-角色-权限"关联, 展现用户个人的页面.
5. 客户信息列表.

TODO: 
1. 用水性质管理
2. 账期管理
3. 应收管理
4. 实收管理
5. 客户缴费
