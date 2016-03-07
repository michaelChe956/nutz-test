package com.test.nutzbook.bean;

import org.nutz.dao.entity.annotation.Column;
import org.nutz.dao.entity.annotation.Id;
import org.nutz.dao.entity.annotation.Name;
import org.nutz.dao.entity.annotation.Table;

import java.util.Date;

/**
 * @author chejingchi
 *         创建时间:15/12/11 下午5:40
 *         项目名称:myFirstNutzTest
 * @author 车竞驰
 * @version 1.0
 * @since JDK 1.8
 * 类说明:
 */
@Table("t_user")
public class User {
    @Id
    private int id;
    @Name
    @Column
    private String name;

    @Column
    private String username;

    @Column("password")
    private String password;

    @Column
    private String studentId;

    @Column
    private int sex;

    @Column("libraryCardNo")
    private String libraryCardNo;

    @Column("classId")
    private int classId;

    @Column("studyState")
    private int studyState;

    @Column("telephone")
    private String telephone;

    @Column
    private String anotherTphone;

    @Column
    private String email;

    @Column
    private String booksId;

    @Column
    private String qq;

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    @Column("createTime")
    private Date createTime;

    @Column("updateTime")
    private Date updateTime;


    public User() {
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", sex='" + sex + '\'' +
                ", libraryCardNo='" + libraryCardNo + '\'' +
                ", classId='" + classId + '\'' +
                ", studyState='" + studyState + '\'' +
                ", telephone='" + telephone + '\'' +
                ", anotherTphone='" + anotherTphone + '\'' +
                ", email='" + email + '\'' +
                ", booksId='" + booksId + '\'' +
                ", studentId='" + studentId + '\'' +
                ", qq='" + qq + '\'' +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    public String getLibraryCardNo() {
        return libraryCardNo;
    }

    public void setLibraryCardNo(String libraryCardNo) {
        this.libraryCardNo = libraryCardNo;
    }

    public int getClassId() {
        return classId;
    }

    public void setClassId(int classId) {
        this.classId = classId;
    }

    public int getStudyState() {
        return studyState;
    }

    public void setStudyState(int studyState) {
        this.studyState = studyState;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAnotherTphone() {
        return anotherTphone;
    }

    public void setAnotherTphone(String anotherTphone) {
        this.anotherTphone = anotherTphone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBooksId() {
        return booksId;
    }

    public void setBooksId(String booksId) {
        this.booksId = booksId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }
}
