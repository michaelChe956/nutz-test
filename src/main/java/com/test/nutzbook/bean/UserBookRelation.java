package com.test.nutzbook.bean;

import org.nutz.dao.entity.annotation.Column;
import org.nutz.dao.entity.annotation.Table;

import java.util.Date;

/**
 * @author chejingchi
 *         创建时间:16/3/17 下午10:55
 *         项目名称:github-nutz
 * @author 车竞驰
 * @version 1.0
 * @since JDK 1.7
 * 类说明:
 */
@Table("t_user_book_relation")
public class UserBookRelation {
    @Column
    private int userId;
    @Column
    private int bookId;
    @Column
    private String userName;
    @Column
    private String bookName;

    public int getInUse() {
        return inUse;
    }

    public void setInUse(int inUse) {
        this.inUse = inUse;
    }

    @Column
    private int inUse;

    @Override
    public String toString() {
        return "UserBookRelation{" +
                "userId=" + userId +
                ", bookId=" + bookId +
                ", userName='" + userName + '\'' +
                ", bookName='" + bookName + '\'' +
                ", inUse=" + inUse +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                '}';
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Column("createTime")
    private Date createTime;

    @Column("updateTime")
    private Date updateTime;

}
