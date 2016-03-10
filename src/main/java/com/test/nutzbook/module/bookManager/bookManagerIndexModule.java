package com.test.nutzbook.module.bookManager;

import com.test.nutzbook.bean.Book;
import com.test.nutzbook.bean.User;
import com.test.nutzbook.bean.enumerate.BookType;
import com.test.nutzbook.common.RMap;
import org.nutz.dao.Cnd;
import org.nutz.dao.Condition;
import org.nutz.dao.Dao;
import org.nutz.dao.FieldFilter;
import org.nutz.dao.util.Daos;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.json.Json;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Fail;
import org.nutz.mvc.annotation.Ok;

import java.util.List;

/**
 * @author chejingchi
 *         创建时间:16/3/4 下午3:30
 *         项目名称:github-nutz
 * @author 车竞驰
 * @version 1.0
 * @since JDK 1.7
 * 类说明:
 */

@At("/bookManager")
@IocBean
@Ok("json:{locked:'password|salt',ignoreNull:true}")
@Fail("http:500")
public class bookManagerIndexModule {
    @Inject
    protected Dao dao;

    @At("/init")
    @Ok("jsp:html.jsp.book-manager")
    public Object init() {
        Condition condition = Cnd.where("username", "=", "wunan");
        User user =
                Daos.ext(dao, FieldFilter.create(User.class, null,"^password|id$",true)).fetch(User.class, condition);
        List<Book> bookList = dao.query(Book.class,null);
        for(Book book : bookList){
            book.setTypeName(BookType.useBookType(book.getType()));
        }
        return RMap.of("user", Json.toJson(user),"bookList",Json.toJson(bookList));
    }
}
