# iWater
Node.js实现水务管理系统

主要架构:   
Express + Angular1.5 + Bootstrap + Gulp + Mongodb  

其他:   
前端BootstrapTable, BootstrapTree, Ztree, ui-router, ui-bootstrap, ui-select, sweetAlert.     
后端Jade, Mongoose, Nodeman.  
使用部分ES6语法.   
Session使用Mongodb持久化.  
RestfulAPI.    
单页.  

异步处理: 
主要使用Async和Promise.  

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
- [x] 权限管理
  - [x] 编辑窗口远程加载权限列表
  - [x] 权限管理列表使用子表格展示子权限
  - [x] 客户端分页
- [x] 角色管理
  - [x] 角色分配权限  
  - [x] 角色管理列表使用子表格展示已分配的权限
  - [x] 服务端分页
- [x] 用户管理
  - [x] 用户分配角色
  - [x] 重置密码 
  - [x] 服务端分页
- [x] 用户登录
  - [x] 根据"用户-角色-权限"关联, 开放对应页面
  - [x] session持久化, 重启服务器后仍能使用session
- [x] 客户信息管理
  - [x] 客户信息列表
  - [ ] 多条件查找
- [ ] 用水性质管理
  - [x] 数据库表结构设计
  - [ ] 关联阶梯水费价格
- [ ] 账期管理
  - [ ] 生成账期 
- [ ] 应收管理
  - [ ] 每一个账期的客户欠费信息列表
  - [ ] 每个账期客户的水费计算
- [ ] 实收管理
  - [ ] 客户缴费记录
- [ ] 客户缴费  
