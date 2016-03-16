package com.test.nutzbook.module.bookManager;

import com.test.nutzbook.bean.Book;
import com.test.nutzbook.bean.enumerate.BookType;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;

import java.util.List;

/**
 * @author chejingchi
 *         创建时间:16/3/12 下午1:18
 *         项目名称:github-nutz
 * @author 车竞驰
 * @version 1.0
 * @since JDK 1.7
 * 类说明:
 */
@IocBean

public class BaseModule {
    @Inject
    protected Dao dao;

    public List<Book> getBookList(){
        List<Book> bookList = dao.query(Book.class, null);
        for (Book book : bookList) {
            book.setTypeName(BookType.useBookType(book.getType()));
        }
        return bookList;
    }

}
