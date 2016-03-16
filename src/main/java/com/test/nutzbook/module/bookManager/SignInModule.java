package com.test.nutzbook.module.bookManager;

import com.test.nutzbook.bean.Book;
import com.test.nutzbook.bean.User;
import org.nutz.dao.Cnd;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.json.Json;
import org.nutz.lang.util.NutMap;
import org.nutz.mvc.annotation.*;
import org.nutz.mvc.filter.CheckSession;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * @author chejingchi
 *         创建时间:16/3/12 下午12:52
 *         项目名称:github-nutz
 * @author 车竞驰
 * @version 1.0
 * @since JDK 1.7
 * 类说明:
 */
@At("/SignIn")
@IocBean
@Ok("json:{locked:'password',ignoreNull:true}")
@Filters(@By(type = CheckSession.class, args = {"me", "/SignIn/init"}))
@Fail("http:500")
public class SignInModule extends BaseModule {

    @At
    @Filters()
    @Ok("jsp:html.jsp.book-manager")
    public Object init() {
        List<Book> bookInfo = getBookList();
        return new NutMap()
                .setv("bookList", Json.toJson(bookInfo))
                .setv("user", Json.toJson(new User()));
    }

    @At
    @Filters()
    @Ok("jsp:html.jsp.signPage")
    public void signPage() {
    }

    @At
    @Filters()
    public boolean sign(String username, String password, HttpSession session) {
        User user = dao.fetch(User.class,
                Cnd.where("username", "=", username).and("password", "=", password));
        if (null == user) {
            return false;
        } else {
            session.setAttribute("me", user.getId());
            return true;
        }
    }


    @At
    @Ok(">>:/SignIn/init")
    public void signOut(HttpSession session) {
        session.invalidate();
    }

}
