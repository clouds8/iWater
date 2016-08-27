# iWater
水务管理系统后台

主要架构: 
Express + Angular1.5 + Bootstrap + Gulp + Mongodb  

其他: 
Jade, Mongoose, BootstrapTable, BootstrapTree, Ztree, ui-router, ui-bootstrap, ui-select, sweetAlert, Nodeman, 使用部分ES6语法.

异步处理: 
主要使用Async和Promise.
Session使用Mongodb存储.

目前已实现:  
  

系统截图    
1. 用户管理  
![image](https://github.com/clouds8/iWater/blob/master/images/users.png)    
2. 用户管理-编辑     
![image](https://github.com/clouds8/iWater/blob/master/images/usersEdit.png)  
3. 角色管理    
![image](https://github.com/clouds8/iWater/blob/master/images/roles.png)    
4. 角色管理-编辑    
![image](https://github.com/clouds8/iWater/blob/master/images/rolesEdit.png)      
5. 权限管理    
![image](https://github.com/clouds8/iWater/blob/master/images/auths.png)    
6. 权限管理-编辑  
![image](https://github.com/clouds8/iWater/blob/master/images/authsEdit.png)    

TODO:
- [x]权限管理
- [x]角色管理
  - [x]角色分配权限  
- [x]用户管理
  - [x]用户分配角色
  - [x]重置密码  
- [x]用户登录
  - [x]根据"用户-角色-权限"关联, 开放对应页面
  - [x]保存登录信息
-[x]客户信息管理
- [ ]用水性质管理  
- [ ]账期管理  
- [ ]应收管理  
- [ ]实收管理  
- [ ]客户缴费  
