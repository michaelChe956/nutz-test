package com.test.nutzbook.module.bookManager;

import com.test.nutzbook.bean.Book;
import com.test.nutzbook.bean.User;
import com.test.nutzbook.bean.enumerate.BookType;
import com.test.nutzbook.common.RMap;
import com.test.nutzbook.common.SqlConditionBuilder;
import org.nutz.dao.Cnd;
import org.nutz.dao.Condition;
import org.nutz.dao.FieldFilter;
import org.nutz.dao.util.Daos;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.json.Json;
import org.nutz.lang.util.NutMap;
import org.nutz.mvc.annotation.*;
import org.nutz.mvc.filter.CheckSession;

import javax.servlet.http.HttpSession;
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
@Ok("json:{locked:'password',ignoreNull:true}")
@Fail("http:500")
@Filters(@By(type = CheckSession.class, args = {"me", "/SignIn/init"}))
public class bookManagerIndexModule extends BaseModule {


    @At("/init")
    @Ok("jsp:html.jsp.book-manager")
    public Object init(HttpSession session) {
        Integer userId = (Integer) session.getAttribute("me");
        Condition condition = Cnd.where("id", "=", userId);
        User user =
                Daos.ext(dao, FieldFilter.create(User.class, null, "^password", true)).fetch(User.class, condition);
        List<Book> bookList = dao.query(Book.class, null);
        for (Book book : bookList) {
            book.setTypeName(BookType.useBookType(book.getType() - 1));
        }
        return RMap.of("user", Json.toJson(user), "bookList", Json.toJson(bookList));
    }

    @At
    public Object lendBook(String bookId) {
        Condition condition = Cnd.where("id", "=", bookId);
        Book book =
                Daos.ext(dao, FieldFilter.create(User.class, null, "^password|id$", true)).fetch(Book.class, condition);
        if (1 == book.getNum()) {
            book.setCanLend(1);
        }
        book.setNum(book.getNum() - 1);
        dao.update(book);
        book =
                Daos.ext(dao, FieldFilter.create(User.class, null, "^password|id$", true)).fetch(Book.class, condition);
        return new NutMap()
                .setv("book", book);
    }

    @At
    public Object bookApplyInStore(@Param("..") Book book) {
        if (book.getNum() > 0) {
            book.setCanLend(0);
        }
        dao.insert(book);
        return true;
    }

    @At
    public Object searchBookInfo(@Param("..") Book book) {
        Condition condition = new SqlConditionBuilder()
                .sqlUseLike("bookName", book.getBookName())
                .sqlUseEqual("bookCode", book.getBookCode())
                .sqlUseEqual("author", book.getAuthor())
                .sqlUseEqual("type", book.getType() == 0 ? "" : book.getType() + "").build();
        List<Book> bookList = dao.query(Book.class, condition);
        return new NutMap().setv("bookInfo", bookList);
    }
}
