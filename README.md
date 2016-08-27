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
1. 权限管理.  
2. 角色管理, 角色分配权限.  
3. 用户管理, 用户分配角色, 重置密码.  
4. 用户登录后根据"用户-角色-权限"关联, 展现用户个人的页面.  
5. 客户信息列表.  

系统截图    
1. 用户管理  
![image](./images/user.png)    
2. 用户管理-编辑     
![image](./images/userEdit.png)  
3. 角色管理    
![image](http://github.com/clouds8/iWater/images/role.png)    
4. 角色管理-编辑    
![image](http://github.com/clouds8/iWater/images/roleEdit.png)      
5. 权限管理    
![image](http://github.com/clouds8/iWater/images/auth.png)    
6. 权限管理-编辑  
![image](http://github.com/clouds8/iWater/images/authEdit.png)    

TODO:   
1. 用水性质管理  
2. 账期管理  
3. 应收管理  
4. 实收管理  
5. 客户缴费  
