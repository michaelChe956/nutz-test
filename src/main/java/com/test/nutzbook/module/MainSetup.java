package com.test.nutzbook.module;


import com.test.nutzbook.bean.User;
import org.nutz.dao.Dao;
import org.nutz.dao.util.Daos;
import org.nutz.ioc.Ioc;
import org.nutz.mvc.NutConfig;
import org.nutz.mvc.Setup;

import java.util.Date;

/**
 * @author chejingchi
 *         创建时间:15/12/11 下午5:51
 *         项目名称:myFirstNutzTest
 * @author 车竞驰
 * @version 1.0
 * @since JDK 1.8
 * 类说明:
 */
public class MainSetup implements Setup {
    public void init(NutConfig nutConfig) {
        Ioc ioc = nutConfig.getIoc();
        Dao dao = ioc.get(Dao.class);
        Daos.createTablesInPackage(dao, "com.test.nutzbook", false);
        //初始化默认根用户
        if (dao.count(User.class) == 0) {
            User user = new User();
            user.setName("admin");
            user.setPassword("123456");
            user.setCreateTime(new Date());
            user.setUpdateTime(new Date());
            dao.insert(user);
        }
    }

    public void destroy(NutConfig nutConfig) {

    }
}
