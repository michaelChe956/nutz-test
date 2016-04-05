package com.test.nutzbook.module.bookManager;

import com.google.common.collect.Lists;
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
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.*;

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


    @At
    @Ok("raw")
    public File download(@Param("flag") int flag) {
        List<Map> retList = new ArrayList<Map>();
        List<String> columnNames;
        List<String> columnCodes;
        if (0 == flag) {
            List<Book> bookList = dao.query(Book.class, null);
            columnNames = Lists.newArrayList("图书名字", "图书编码", "作者", "出版社",
                    "类型", "版本", "价格", "书籍简介", "列", "行");
            columnCodes = Lists.newArrayList("bookName", "bookCode", "author", "publishingHouse"
                    , "typeName", "version", "price", "bookBriefIntroduction", "libraryRow", "libraryColumn");
            for (Book b : bookList) {
                Map bookMap = new HashMap();
                bookMap.put("bookCode", b.getBookCode());
                bookMap.put("bookName", b.getBookName());
                bookMap.put("author", b.getAuthor());
                bookMap.put("publishingHouse", b.getPublishingHouse());
                bookMap.put("typeName", b.getTypeName());
                bookMap.put("version", b.getVersion());
                bookMap.put("price", b.getPrice());
                bookMap.put("bookBriefIntroduction", b.getBookBriefIntroduction());
                bookMap.put("libraryRow", b.getLibraryRow());
                bookMap.put("libraryColumn", b.getLibraryColumn());
                retList.add(bookMap);
            }
            export("书籍信息" + new SimpleDateFormat("yyyyMMdd_HHmm").format(new Date())
                    + ".csv", retList, columnNames, columnCodes);
        } else if (1 == flag) {
            List<UserBookRelation> userBookRelationList = dao.query(UserBookRelation.class, null);
            for (UserBookRelation u : userBookRelationList) {
                Map userBookRelationMap = new HashMap();
                User user = dao.fetch(User.class, u.getUserId());
                Book book = dao.fetch(Book.class, u.getBookId());
                userBookRelationMap.put("userName", u.getUserName());
                userBookRelationMap.put("libraryCardNo", user.getLibraryCardNo());
                userBookRelationMap.put("bookCode", book.getBookCode());
                userBookRelationMap.put("bookName", u.getBookName());
                userBookRelationMap.put("inUse", u.getInUse() == 0 ? "借阅中" : "已经归还");
                userBookRelationMap.put("createTime", u.getCreateTime());
                userBookRelationMap.put("operatorName", u.getOperatorName());
                retList.add(userBookRelationMap);
            }
            columnNames = Lists.newArrayList("借书人姓名", "借书证", "书籍编码", "书籍名称",
                    "是否被借阅", "操作人员", "创建时间");
            columnCodes = Lists.newArrayList("userName", "libraryCardNo", "bookCode",
                    "bookName", "inUse", "operatorName", "createTime");
            export("借书情况" + new SimpleDateFormat("yyyyMMdd_HHmm").format(new Date())
                    + ".csv", retList, columnNames, columnCodes);
        } else if (2 == flag) {
            List<User> userList = dao.query(User.class, null);
            for (User u : userList) {
                setAllBooksThatULend(u);
                Map userMap = new HashMap();
                userMap.put("name", u.getName());
                userMap.put("studentId", u.getStudentId());
                userMap.put("sex", u.getSex() == 0 ? "男" : "女");
                userMap.put("libraryCardNo", u.getLibraryCardNo());
                userMap.put("classId", u.getClassId());
                userMap.put("telephone", u.getTelephone());
                userMap.put("email", u.getEmail());
                userMap.put("qq", u.getQq());
                userMap.put("booksName", u.getBooksName());
                retList.add(userMap);
            }
            columnNames = Lists.newArrayList("姓名", "学号", "性别",
                    "借书证", "班级号", "电话号码", "邮箱","QQ","借阅书籍");
            columnCodes = Lists.newArrayList("name", "studentId", "sex",
                    "libraryCardNo", "classId", "telephone", "email", "qq", "booksName");
            export("用户信息" + new SimpleDateFormat("yyyyMMdd_HHmm").format(new Date())
                    + ".csv", retList, columnNames, columnCodes);
        }

        File retFile = new File("");
        try {
            retFile = getFile();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return retFile;
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
