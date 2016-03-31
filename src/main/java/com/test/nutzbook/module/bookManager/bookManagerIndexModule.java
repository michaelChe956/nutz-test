package com.test.nutzbook.module.bookManager;

import com.test.nutzbook.bean.Book;
import com.test.nutzbook.bean.User;
import com.test.nutzbook.bean.UserBookRelation;
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
import org.nutz.trans.Atom;
import org.nutz.trans.Trans;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

    Logger logger = LoggerFactory.getLogger(bookManagerIndexModule.class);

    private static final int INUSE_USE = 0;//使用中

    private static final int INUSE_RET = 1;//归还


    @At("/init")
    @Ok("jsp:html.jsp.book-manager")
    public Object init(HttpSession session) {
        Integer userId = (Integer) session.getAttribute("me");
        Condition condition = Cnd.where("id", "=", userId);
        User user =
                Daos.ext(dao, FieldFilter.create(User.class, null, "^password", true)).fetch(User.class, condition);
        List<Book> bookList = dao.query(Book.class, null);
        changeTypeToTypeName(bookList);
        setAllBooksThatULend(user);
        return RMap.of("user", Json.toJson(user), "bookList", Json.toJson(bookList));
    }


    @At
    public Object lendBook(String bookId, boolean lendType, int libraryCardNo, HttpSession session) {
        Condition userCondition = Cnd.where("libraryCardNo", "=", libraryCardNo);
        User user =
                Daos.ext(dao, FieldFilter.create(User.class, null, "^password", true)).fetch(User.class, userCondition);
        Condition condition = Cnd.where("id", "=", bookId);
        Book book =
                Daos.ext(dao, FieldFilter.create(User.class, null, "^password", true)).fetch(Book.class, condition);

        User staff = getStaffInfo(session);
        doLendBookAction(lendType, user, book, staff);

        book =
                Daos.ext(dao, FieldFilter.create(User.class, null, "^password", true)).fetch(Book.class, condition);

        return new NutMap()
                .setv("book", book);
    }

    @At
    public Object lendBooksByCode(String bookCode, boolean lendType, @Param("..") User user, HttpSession session) {
        Book book = dao.fetch(Book.class, Cnd.where("bookCode", "=", bookCode));
        User staff = getStaffInfo(session);
        doLendBookAction(lendType, user, book, staff);
        return "";
    }

    @At
    public Object returnBooks(String bookId, int libraryCardNo, HttpSession session) {
        Condition userCondition = Cnd.where("libraryCardNo", "=", libraryCardNo);
        Condition bookCondition = Cnd.where("id", "=", bookId);
        User staff = getStaffInfo(session);
        doRetBooks(userCondition, bookCondition, staff);
        return new NutMap().setv("flag", true);
    }

    @At
    public Object returnBooksByCode(String bookCode, int libraryCardNo, HttpSession session) {
        Condition userCondition = Cnd.where("libraryCardNo", "=", libraryCardNo);
        Condition bookCondition = Cnd.where("bookCode", "=", bookCode);
        User staff = getStaffInfo(session);
        doRetBooks(userCondition, bookCondition, staff);
        return new NutMap().setv("flag", true);
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
    @Filters()
    public Object searchBookInfo(@Param("..") Book book) {
        Condition condition = new SqlConditionBuilder()
                .sqlUseLike("bookName", book.getBookName())
                .sqlUseEqual("bookCode", book.getBookCode())
                .sqlUseEqual("author", book.getAuthor())
                .sqlUseEqual("type", book.getType() == 0 ? "" : book.getType() + "").build();
        List<Book> bookList = dao.query(Book.class, condition);
        changeTypeToTypeName(bookList);
        return new NutMap().setv("bookInfo", bookList);
    }

    @At
    public Object leadToLendBooks(String bookId) {
        Book book = dao.fetch(Book.class, Cnd.where("id", "=", bookId));
        return new NutMap().setv("book", book);
    }

    @At
    public Object sureToModify(@Param("..") User user) {
        User student = dao.fetch(User.class, user.getId());
        student.setEmail(user.getEmail());
        student.setQq(user.getQq());
        student.setTelephone(user.getTelephone());
        student.setAnotherTphone(user.getAnotherTphone());
        dao.update(student);
        setAllBooksThatULend(student);
        return new NutMap().setv("student", student);
    }


    private Object changeToBoolean(int i) {
        if (0 == i) {
            return new NutMap().setv("flag", true);
        } else {
            return new NutMap().setv("flag", false);
        }
    }

    private void doRetBooks(final Condition userCondition, final Condition bookCondition, final User staff) {
        Trans.exec(new Atom() {
            public void run() {
                User user =
                        Daos.ext(dao, FieldFilter.create(User.class, null, "^password", true)).fetch(User.class, userCondition);
                Book book = dao.fetch(Book.class, bookCondition);
                book.setNum(book.getNum() + 1);
                dao.update(book);
                Condition userBookRelationCondition = Cnd.where("bookId", "=", book.getId()).and("userId", "=", user.getId());
                UserBookRelation userBookRelation = dao.fetch(UserBookRelation.class, userBookRelationCondition);
                userBookRelation.setOperatorId(staff.getId());
                userBookRelation.setOperatorName(staff.getUsername());
                userBookRelation.setInUse(INUSE_RET);
                dao.update(userBookRelation);
            }
        });
    }

    private void doLendBookAction(final boolean lendType, final User user, final Book book, final User staff) {
        Trans.exec(new Atom() {
            public void run() {
                if (1 == book.getNum()) {
                    book.setCanLend(1);
                }
                if (lendType) {
                    book.setLockNum(book.getLockNum() - 1);
                    UserBookRelation userBookRelation = new UserBookRelation();
                    userBookRelation.setBookId(book.getId());
                    userBookRelation.setUserId(user.getId());
                    userBookRelation.setUserName(user.getName());
                    userBookRelation.setBookName(book.getBookName());
                    userBookRelation.setInUse(INUSE_USE);//inuse : 0 正在使用  1 失效
                    userBookRelation.setOperatorId(staff.getId());
                    userBookRelation.setOperatorName(staff.getUsername());
                    dao.insert(userBookRelation);
                } else {
                    book.setNum(book.getNum() - 1);
                    book.setLockNum(book.getLockNum() + 1);

                }
                dao.update(book);
            }
        });
    }

    private void setAllBooksThatULend(User user) {
        Condition userCondition = Cnd.where("userId", "=", user.getId()).and("inUse", "=", INUSE_USE);
        List<UserBookRelation> userBookRelationList =
                dao.query(UserBookRelation.class, userCondition);
        String booksName = "";
        for (UserBookRelation u : userBookRelationList) {
            booksName += u.getBookName() + ";";
        }
        user.setBooksName(booksName);
    }


    private void changeTypeToTypeName(List<Book> bookList) {
        for (Book book : bookList) {
            book.setTypeName(BookType.useBookType(book.getType() - 1));
        }
    }
}
