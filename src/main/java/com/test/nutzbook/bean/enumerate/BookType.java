package com.test.nutzbook.bean.enumerate;

/**
 * @author chejingchi
 *         创建时间:16/3/9 下午1:40
 *         项目名称:github-nutz
 * @author 车竞驰
 * @version 1.0
 * @since JDK 1.7
 * 类说明:
 */
public enum BookType {
    Novel("小说"), Essay("散文"), Cartoon("漫画"), Technical("技术类"), Humanity("人文类");

    private String bookTypeName;


    BookType(String bookTypeName) {
        this.bookTypeName = bookTypeName;
    }


    public String getBookTypeName() {
        return bookTypeName;
    }

    public void setBookTypeName(String bookTypeName) {
        this.bookTypeName = bookTypeName;
    }

    public static String useBookType(int bookType) {
        BookType[] bookTypeArr = BookType.values();
        BookType bookTypeInUse = bookTypeArr[bookType];
        return bookTypeInUse.getBookTypeName();
    }


}
