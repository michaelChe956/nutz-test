package com.test.nutzbook.module.myTest;

import com.test.nutzbook.bean.User;
import org.nutz.dao.Cnd;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.annotation.*;
import org.nutz.mvc.filter.CheckSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpSession;

/**
 * @author chejingchi
 *         创建时间:15/12/22 下午5:49
 *         项目名称:github-nutz
 * @author 车竞驰
 * @version 1.0
 * @since JDK 1.8
 * 类说明:
 */
@Filters(@By(type = CheckSession.class, args = {"me", "/login/init"}))
@IocBean
@At("/login")
@Ok("json:{locked:'password|salt',ignoreNull:true}")
@Fail("http:500")
public class LoginModule {
    Logger logger = LoggerFactory.getLogger(LoginModule.class);

    @Inject
    protected Dao dao;


    @At
    @Filters()
    @Ok("jsp:jsp.bootstrap-jsp.login")
    public void init() {
    }

    @At
    @Filters()
    public boolean signIn(String username, String password, HttpSession session) {
        User user = dao.fetch(User.class,
                Cnd.where("name", "=", username).and("password", "=", password));
        if (null == user) {
            return false;
        } else {
            session.setAttribute("me", user.getId());
            return true;
        }

    }

    @At
    @Ok(">>:/")
    public void signOut(HttpSession session) {
        session.invalidate();
    }

}
