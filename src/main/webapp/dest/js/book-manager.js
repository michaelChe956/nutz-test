var data = {
    "bookList": bookList,
    "student": user
}
var bookInfoPage = new PAGER();
pageObjArr.push(bookInfoPage);
var readInfo = new PAGER();
pageObjArr.push(readInfo);
$(function () {
    //图书管理
    var BookManager = {
        //渲染书籍信息
        getBookInfoData: function (tp, pageSize, finalData) {
            var dataSpace = '<div class="data-render"><table class="table table-hover" id="Pui">';
            dataSpace += '<thead><tr>';
            dataSpace += '<td><p>书籍编号</p></td>';
            dataSpace += '<td><p>书籍名称</p></td>';
            dataSpace += '<td><p>书籍作者</p></td>';
            dataSpace += '<td><p>出版社</p></td>';
            dataSpace += '<td><p>书籍类型</p></td>';
            dataSpace += '<td><p>是否可借</p></td>';
            dataSpace += '</tr></thead>';
            for (var i = 0; i < pageSize; i++) {
                var dataId = pageSize * (tp - 1) + i;
                if (dataId + 1 > finalData.length) {
                    break;
                } else {
                    dataSpace += '<tr class="show-detail-info" data-toggle="modal" data-target="#book-detail-info">';
                    dataSpace += '<input type="hidden" value="' + finalData[dataId].id + '" />';
                    dataSpace += '<td><p>' + finalData[dataId].bookCode + '</p></td>';
                    dataSpace += '<td><p>' + finalData[dataId].bookName + '</p></td>';
                    dataSpace += '<td><p>' + finalData[dataId].author + '</p></td>';
                    dataSpace += '<td><p>' + finalData[dataId].publishingHouse + '</p></td>';
                    dataSpace += '<td><p>' + finalData[dataId].typeName + '</p></td>';
                    dataSpace +=
                        finalData[dataId].canLend == 0 ? '<td><p class="text-success">可以借阅</p></td>'
                            : '<td><p class="text-danger">已经借出去或锁定</p></td>';
                    dataSpace += '</tr>';
                }
            }
            dataSpace += '</table></div>';
            $("#book-info-pager-div").html(dataSpace);
        },
        //渲染查询书籍信息情况
        checkBookCondition: function (tp, pageSize, finalData) {
            var dataSpace = '<div class="data-render"><table class="table table-hover" id="Pui">';
            dataSpace += '<thead><tr>';
            dataSpace += '<td><p>书籍编号</p></td>';
            dataSpace += '<td><p>书籍名称</p></td>';
            dataSpace += '<td><p>书籍作者</p></td>';
            dataSpace += '<td><p>出版社</p></td>';
            dataSpace += '<td><p>书籍类型</p></td>';
            dataSpace += '<td><p>书籍剩余数量</p></td>';
            dataSpace += '</tr></thead>';
            for (var i = 0; i < pageSize; i++) {
                var dataId = pageSize * (tp - 1) + i;
                if (dataId + 1 > finalData.length) {
                    break;
                } else {
                    dataSpace += '<tr> <input type="hidden" value="' + finalData[dataId].id + '" />';
                    dataSpace += '<td><p>' + finalData[dataId].bookCode + '</p></td>';
                    dataSpace += '<td><p>' + finalData[dataId].bookName + '</p></td>';
                    dataSpace += '<td><p>' + finalData[dataId].author + '</p></td>';
                    dataSpace += '<td><p>' + finalData[dataId].publishingHouse + '</p></td>';
                    dataSpace += '<td><p>' + finalData[dataId].typeName + '</p></td>';
                    dataSpace += '<td><p class="text-success">' + finalData[dataId].num + '</p></td>';
                    if (finalData[dataId].canLend == 0) {
                        dataSpace += '<td><button class="btn lend-book btn-primary" ' +
                            'data-toggle="modal"data-target="#lendModal">借书</button></td>';
                    } else {
                        dataSpace += '<td><button class="btn btn-primary" ' +
                            'data-toggle="modal"data-target="#lendModal" disabled="disabled">借书</button></td>';
                    }
                    dataSpace += '<td><button class="btn return-book btn-primary" ' +
                        'data-toggle="modal"data-target="#returnModal">还书</button></td>';
                    dataSpace += '</tr>';

                }
            }
            dataSpace += '</table></div>'
            $("#book-read-info-pager-div").html(dataSpace);
        },
        //渲染个人信息
        setSelfInfo: function (student) {
            if (student.id <= 0) {
                $("#section-1").hide();
                return;
            }
            student.sex = student.sex == 0 ? '女' : '男';
            student.studyState = student.sex == 0 ? '在读' : '离校';
            var userInfo = '<table class="table table-bordered"><caption></caption><thead></thead><tbody><tr>' +
                '<input id="user-id" type="hidden" value="' + student.id + '" />' +
                '<td class="first-col">姓名</td> <td class="second-col">' + student.name +
                '</td><td class="first-col">性别</td><td class="second-col">' + student.sex +
                '</td></tr><tr></tr><tr><td>借书证</td><td>' + student.libraryCardNo +
                '</td><td>学号</td><td>' + student.studentId +
                '</td></tr><tr><td>班级号</td><td>' + student.classId +
                '</td><td>状态</td><td>' + student.studyState +
                '</td></tr><tr><td colspan="4">联系方式（如联系方式有变动请及时修改，以便能及时联系到你。谢谢！）</td></tr>' +
                '<tr><td>手机号码:</td><td><p class="need-to-display">' + student.telephone +
                '</p><input class="search-input need-to-modify" maxlength="11" name="telephone" type="text" />' +
                '</td><td>第二联系号码:</td><td><p class="need-to-display">' + student.anotherTphone +
                '</p><input class="search-input need-to-modify" maxlength="11" name="anotherTphone" type="text" />' +
                '</td></tr><tr><td>QQ:</td><td><p class="need-to-display">' + student.qq +
                '</p><input class="search-input need-to-modify" name="qq" type="text" />' +
                '</td><td>电子邮箱:</td><td><p class="need-to-display">' + student.email +
                '</p><input class="search-input need-to-modify" name="email" type="text" />' +
                '</td></tr><tr><td colspan="5">所借阅的书籍: ' + student.booksName +
                '</td></tr><tr><td colspan="5"> <div align="center">' +
                '<button type="button" id="modify-link" class="btn">联系方式修改</button>' +
                '</div></td></tr></tbody></table>';
            $("#userInfo").html(userInfo);
            UserLinkModel.showModel();
        },
        //展示书籍信息
        showBookDetailInfo: function (bookRow) {
            var bookId = $($(bookRow).find("input")).val();
            var bookDetailInfo = '<table class="table">';
            bookDetailInfo += '<input type="hidden" value="' + bookId + '" />';
            bookId -= 1;
            bookDetailInfo += '<tbody><tr><td class="book-info-width">书籍名称:</td> ';
            bookDetailInfo += '<td class="book-info-width">' + data.bookList[bookId].bookName +
                '</td> <td class="book-info-width">作者:</td> <td class="book-info-width">' + data.bookList[bookId].author +
                '</td> </tr> <tr> <td>页数:</td> <td>' + data.bookList[bookId].pages +
                '</td> <td>版本:</td> <td>' + data.bookList[bookId].version +
                '</td> </tr> <tr> <td>出版社:</td> <td>' + data.bookList[bookId].publishingHouse +
                '</td> <td>类型:</td> <td>' + data.bookList[bookId].type +
                '</td> </tr> <tr> <td rowspan="2"  class="info-brief">图书简介:</td> ' +
                '<td rowspan="2" colspan="3">' + data.bookList[bookId].bookBriefIntroduction +
                '</td> <tr></tr><tr> <td>数量:</td> <td>' + data.bookList[bookId].num +
                '</td> <td class="text-success">可借阅</td> ';
            if (0 == data.bookList[bookId].canLend) {
                bookDetailInfo +=
                    '<td><button class="lend-the-book btn btn-large btn-primary" type="button" style="width: 74px">借阅</button> </td>'
            } else {
                bookDetailInfo +=
                    '<td><button class="lend-the-book btn btn-large btn-primary" type="button" style="width: 74px" disabled>借阅</button> </td>'
            }
            bookDetailInfo += '</tr> </tr> </tbody> </table>';
            $("#book-detail-info").find(".modal-body").html(bookDetailInfo);
            var num = data.bookList[bookId].num;
            if (0 >= num) {
                $(".lend-the-book").parent().prev().text("已全部借出").removeClass("text-success").addClass('text-danger');
                $(".lend-the-book").attr("disabled", "disabled");
            }
        },
        changeMyLinkInfo: function () {
        },
        //锁定书本等待借出
        lendBook: function ($bookInfo) {
            var bookId =
                $bookInfo.parent().parent().parent().parent().find("input").val();
            $.ajax({
                type: "post",
                url: lendBookUrl,
                data: {
                    bookId: bookId,
                    lendType: false
                },
                dataType: "json",
                success: function (data, Status) {
                    var num = data.book.num;
                    if (0 >= num) {
                        $bookInfo.parent().prev().text("已全部借出").removeClass("text-success").addClass('text-danger');
                    } else {
                        $bookInfo.html(data.book.libraryRow + "排" + +data.book.libraryColumn + "列");
                    }
                    $bookInfo.attr("disabled", "disabled");
                    $bookInfo.parent().prev().prev().text(num);
                }
            });
        },
        //刷新页面的方法
        closeAndRefresh: function () {
            window.location.reload();
        },
        //按条件查询图书 管理员使用
        renderBookInfoByCondition: function () {
            var condition = new Condition(($(".search-input-book-condition")[0]).value,
                $(".search-input-book-condition")[1].value, $(".search-input-book-condition")[2].value,
                $(".search-input-book-condition")[3].value);
            condition.search();
        },
        //按条件查询图书用户使用
        renderBookInfoByConditionUser: function () {
            var condition = new Condition(($(".search-input-bookinfo")[0]).value,
                $(".search-input-bookinfo")[1].value, $(".search-input-bookinfo")[2].value,
                $(".search-input-bookinfo")[3].value);
            condition.searchBookInfo();
        },
        //进入借书处理弹出层
        leadToLendBooks: function ($lendObj) {
            var bookId = $lendObj.parent().parent().find("input").val();
            $.ajax({
                url: leadToLendBooksUrl,
                type: "post",
                data: {bookId: bookId},
                dataType: "json",
                success: function (data) {
                    var book = data.book;
                    var dataSpace = '<input name="bookId" type="hidden" value="' + book.id + '" />' + '<div class="row">' +
                        '<form class="form-horizontal" role="form">' +
                        '<div class="form-group col-sm-6">' +
                        '<label class="margin-left-minus-fifty col-sm-4 control-label">书籍编码</label>' +
                        '<div class="col-sm-8">' +
                        '<input type="text" class="form-control" value="' + book.bookCode + '" disabled></div>' +
                        '</div>' +
                        '<div class="margin-left-minus-fifty form-group col-sm-6">' +
                        '<label class="col-sm-4 control-label">借书证号</label>' +
                        '<div class="col-sm-8"><input type="text" name="libraryCardNo" class="form-control" placeholder="借书证号"></div>' +
                        '</div>' +
                        '</form>' +
                        '</div>' +
                        '<div class="row">' +
                        '<form class="form-horizontal" role="form">' +
                        '<div class="form-group col-sm-6">' +
                        '<label class="margin-left-minus-fifty col-sm-4 control-label">录入操作员</label>' +
                        '<div class="col-sm-8"><input type="text" class="form-control" placeholder="录入操作员"></div>' +
                        '</div>' +
                        '<div class="margin-left-minus-fifty form-group col-sm-6">' +
                        '<label class="col-sm-4 control-label">录入时间</label>' +
                        '<div class="col-sm-8"><input type="text" class="pick-time form-control" placeholder="默认当前时间" readonly></div>' +
                        '</div>' +
                        '</form>' +
                        '</div>' +
                        '<div class="row">' +
                        '<form class="form-horizontal" role="form">' +
                        '<div class="form-group col-sm-6">' +
                        '<label class="margin-left-minus-fifty col-sm-4 control-label">锁定本数</label>' +
                        '<div class="col-sm-8">' +
                        '<input type="text" class="form-control" value="' + book.lockNum + '" disabled></div>' +
                        '</div>' +
                        '<div class="margin-left-minus-fifty form-group col-sm-6">' +
                        '<label class="col-sm-4 control-label">归还日期</label>' +
                        '<div class="col-sm-8"><input type="text" class="pick-time form-control" placeholder="归还日期" readonly></div>' +
                        '</div>' +
                        '</form>' +
                        '</div>' +
                        '<div align="center">' +
                        '<button type="button" class="btn lock-book-lend btn-default">图书借出</button>' +
                        '</div>';
                    $("#lendModal").find(".modal-body").html(dataSpace);
                }
            });
        },

        leadToReturnBooks: function ($retObj) {
            var bookId = $retObj.parent().parent().find("input").val();
            $.ajax({
                url: leadToLendBooksUrl,
                type: "post",
                data: {bookId: bookId},
                dataType: "json",
                success: function (data) {
                    var book = data.book;
                    var dataSpace = '<input name="bookId" type="hidden" value="' + book.id + '" />' + '<div class="row">' +
                        '<form class="form-horizontal" role="form">' +
                        '<div class="form-group col-sm-6">' +
                        '<label class="margin-left-minus-fifty col-sm-4 control-label">书籍编码</label>' +
                        '<div class="col-sm-8">' +
                        '<input type="text" class="form-control" value="' + book.bookCode + '" disabled></div>' +
                        '</div>' +
                        '<div class="margin-left-minus-fifty form-group col-sm-6">' +
                        '<label class="col-sm-4 control-label">借书证号</label>' +
                        '<div class="col-sm-8"><input type="text" name="libraryCardNo" class="form-control" placeholder="借书证号"></div>' +
                        '</div>' +
                        '</form>' +
                        '</div>' +
                        '<div class="row">' +
                        '<form class="form-horizontal" role="form">' +
                        '<div class="form-group col-sm-6">' +
                        '<label class="margin-left-minus-fifty col-sm-4 control-label">录入操作员</label>' +
                        '<div class="col-sm-8"><input type="text" class="form-control" placeholder="录入操作员"></div>' +
                        '</div>' +
                        '<div class="margin-left-minus-fifty form-group col-sm-6">' +
                        '<label class="col-sm-4 control-label">录入时间</label>' +
                        '<div class="col-sm-8"><input type="text" class="pick-time form-control" placeholder="默认当前时间" readonly></div>' +
                        '</div>' +
                        '</form>' +
                        '</div>' +
                        '<div class="row">' +
                        '<form class="form-horizontal" role="form">' +
                        '<div class="form-group col-sm-6">' +
                        '<label class="margin-left-minus-fifty col-sm-4 control-label">锁定本数</label>' +
                        '<div class="col-sm-8">' +
                        '<input type="text" class="form-control" value="' + book.lockNum + '" disabled></div>' +
                        '</div>' +
                        '<div class="margin-left-minus-fifty form-group col-sm-6">' +
                        '<label class="col-sm-4 control-label">归还日期</label>' +
                        '<div class="col-sm-8"><input type="text" class="pick-time form-control" placeholder="归还日期" readonly></div>' +
                        '</div>' +
                        '</form>' +
                        '</div>' +
                        '<div align="center">' +
                        '<button type="button" class="btn lock-book-return btn-default">图书归还</button>' +
                        '</div>';
                    $("#returnModal").find(".modal-body").html(dataSpace);
                }
            })
        },
        //借出锁定书处理
        lendLockBooks: function ($bookInfo) {
            var bookId = $bookInfo.parent().parent().find("input[name='bookId']").val();
            var libraryCardNo = $bookInfo.parent().parent().find("input[name='libraryCardNo']").val();
            $.ajax({
                type: "post",
                url: lendBookUrl,
                data: {
                    bookId: bookId,
                    lendType: true,
                    libraryCardNo: libraryCardNo
                },
                dataType: "json",
                success: function (data) {
                    swal("Good job!", "借书成功", "success");
                }
            });
        },
        lendBooksByCode: function ($bookInfo) {
            var bookCode = $("#lend-book-code").val();
            var libraryCardNo = $bookInfo.parent().parent().find("input[name='libraryCardNo']").val();
            if ($.checkEmpty(bookCode)) {
                swal("opps...", "请输入书籍编码", "error");
            }
            if ($.checkEmpty(libraryCardNo)) {
                swal("opps...", "请输入图书证号", "error");
            }
            $.ajax({
                type: "post",
                url: lendBooksByCodeUrl,
                data: {
                    bookCode: bookCode,
                    lendType: true,
                    libraryCardNo: libraryCardNo
                },
                dataType: "json",
                success: function (data) {
                    swal("Good job!", "借书成功", "success");
                }
            });

        },
        //图书归还
        returnLockBooks: function ($bookInfo) {
            var bookId = $bookInfo.parent().parent().find("input[name='bookId']").val();
            var libraryCardNo = $bookInfo.parent().parent().find("input[name='libraryCardNo']").val();
            $.ajax({
                type: "post",
                url: returnBooksUrl,
                data: {
                    bookId: bookId,
                    libraryCardNo: libraryCardNo
                },
                dataType: "json",
                success: function (data) {
                    if (data.flag) {
                        sweetAlert("Good job!", "还书成功", "success");
                    }
                }
            });
        },
        returnBooksByCode: function ($bookInfo) {
            var bookCode = $("#return-book-code").val();
            var libraryCardNo = $bookInfo.parent().parent().find("input[name='libraryCardNo']").val();
            if ($.checkEmpty(bookCode)) {
                swal("opps...", "请输入书籍编码", "error");
            }
            if ($.checkEmpty(libraryCardNo)) {
                swal("opps...", "请输入图书证号", "error");
            }
            $.ajax({
                type: "post",
                url: returnBooksByCodeUrl,
                data: {
                    bookCode: bookCode,
                    libraryCardNo: libraryCardNo
                },
                dataType: "json",
                success: function (data) {
                    if (data.flag) {
                        sweetAlert("Good job!", "还书成功", "success");
                    }
                }
            });
        }
    }

    var Condition = function (bookCode, bookName, type, author) {
        this.bookCode = bookCode;
        this.bookName = bookName;
        this.type = type;
        this.author = author;
    }
    Condition.prototype.search = function () {
        var param = {};
        param.bookCode = this.bookCode;
        param.bookName = this.bookName;
        param.type = this.type;
        param.author = this.author;
        $.ajax({
            url: searchBookInfoUrl,
            type: "post",
            data: param,
            dataType: "json",
            success: function (data) {
                readInfo.initPager(1, data.bookInfo.length, 10, 7, 'book-read-info-pager', 'book-read-info-pager-div',
                    data.bookInfo, BookManager.checkBookCondition, 1);
            }
        })
    }
    Condition.prototype.searchBookInfo = function () {
        var param = {};
        param.bookCode = this.bookCode;
        param.bookName = this.bookName;
        param.type = this.type;
        param.author = this.author;
        $.ajax({
            url: searchBookInfoUrl,
            type: "post",
            data: param,
            dataType: "json",
            success: function (data) {
                bookInfoPage.initPager(1, data.bookInfo.length, 10, 7, 'book-info-pager', 'book-info-pager-div',
                    data.bookInfo, BookManager.getBookInfoData, 0);
            }
        })
    }


    var AuthorityCheck = function (student) {
        this.student = student;
    }
    AuthorityCheck.prototype.initCheck = function () {
        $(".personInfo").hide();
        $(".bookInfo").hide();
        $(".putInBook").hide();
        $(".checkInLendInfo").hide();
        $(".lendBook").hide();
        $(".returnBook").hide();
        $(".putInUser").hide();
        this.checkUser();
    }
    AuthorityCheck.prototype.checkUser = function () {
        if (this.student.id <= 0) {
            $(".bookInfo").show();
        } else if (this.student.userType == 0) {
            $(".putInBook").show();
            $(".checkInLendInfo").show();
            $(".lendBook").show();
            $(".returnBook").show();
            $(".putInUser").show();
        } else if (this.student.userType == 1) {
            $(".personInfo").show();
            $(".bookInfo").show();
        }
    }

    var Book = function (bookCode, bookName, type,
                         price, author, publishingHouse,
                         num, version, applyInStaff,
                         libraryRow, libraryColumn, pages, bookBriefIntroduction) {
        this.bookCode = bookCode;
        this.bookName = bookName;
        this.type = type;
        this.price = price;
        this.author = author;
        this.publishingHouse = publishingHouse;
        this.num = num;
        this.version = version;
        this.applyInStaff = applyInStaff;
        this.libraryRow = libraryRow;
        this.libraryColumn = libraryColumn;
        this.pages = pages;
        this.bookBriefIntroduction = bookBriefIntroduction;
    }

    Book.prototype.checkIsNotEmpty = function () {
        if ($.checkEmpty(this.bookCode)) {
            sweetAlert("Oops...", "书籍编码不能为空", "error");
            return false;
        }
        if ($.checkEmpty(this.bookName)) {
            sweetAlert("Oops...", "书籍名称不能为空", "error");
            return false;
        }
        if ($.checkEmpty(this.price)) {
            sweetAlert("Oops...", "书籍价格不能为空", "error");
            return false;
        }
        if ($.checkEmpty(this.author)) {
            sweetAlert("Oops...", "作者不能为空", "error");
            return false;
        }
        if ($.checkEmpty(this.publishingHouse)) {
            sweetAlert("Oops...", "出版社不能为空", "error");
            return false;
        }
        if ($.checkEmpty(this.num)) {
            sweetAlert("Oops...", "录入数量不能为空", "error");
            return false;
        }
        if ($.checkEmpty(this.version)) {
            sweetAlert("Oops...", "版本不能为空", "error");
            return false;
        }
        if ($.checkEmpty(this.applyInStaff)) {
            sweetAlert("Oops...", "录入操作员不能为空", "error");
            return false;
        }
        if ($.checkEmpty(this.libraryRow)) {
            sweetAlert("Oops...", "排数不能为空", "error");
            return false;
        }
        if ($.checkEmpty(this.libraryColumn)) {
            sweetAlert("Oops...", "列数不能为空", "error");
            return false;
        }
        if ($.checkEmpty(this.bookBriefIntroduction)) {
            sweetAlert("Oops...", "简介不能为空", "error");
        }
        return true;
    }

    Book.prototype.applyInStore = function () {
        var param = {
            bookCode: this.bookCode,
            bookName: this.bookName,
            type: this.type,
            price: this.price,
            author: this.author,
            publishingHouse: this.publishingHouse,
            num: this.num,
            version: this.version,
            applyInStaff: this.applyInStaff,
            libraryRow: this.libraryRow,
            libraryColumn: this.libraryColumn,
            pages: this.pages,
            bookBriefIntroduction: this.bookBriefIntroduction
        }
        $.ajax({
            url: bookApplyInStoreUrl,
            type: "post",
            data: param,
            dataType: "json",
            success: function (data) {
                if (data) {
                    sweetAlert("Good job!", "插入成功", "success");
                }
            }
        })
    }

    var UserLink = function (id, telephone, anotherTphone, qq, email) {
        this.id = id;
        this.telephone = telephone;
        this.anotherTphone = anotherTphone;
        this.qq = qq;
        this.email = email;
    }
    UserLink.prototype.checkIsNotEmpty = function () {
        var mailRegularity = /\w@\w*\.\w/;
        if ($.checkEmpty(this.telephone)) {
            sweetAlert("Oops...", "电话号码不能为空", "error");
            return false;
        } else if (this.telephone.length != 11) {
            sweetAlert("Oops...", "电话号码格式不正确", "error");
            return false;
        }
        if ($.checkEmpty(this.anotherTphone)) {
            sweetAlert("Oops...", "第二联系号码不能为空", "error");
            return false;
        }
        else if (this.anotherTphone.length != 11) {
            sweetAlert("Oops...", "电话号码格式格式", "error");
            return false;
        }
        if ($.checkEmpty(this.qq)) {
            sweetAlert("Oops...", "qq号码不能为空", "error");
            return false;
        }
        if ($.checkEmpty(this.email)) {
            sweetAlert("Oops...", "邮箱号码不能为空", "error");
            return false;
        } else if (!mailRegularity.test(this.email)) {
            sweetAlert("Oops...", "邮箱格式不对", "error");
            return false;
        }
        return true;
    }

    var UserLinkModel = {
        showModel: function () {
            $(".need-to-modify").hide();
            $(".need-to-display").show();
            $("#modify-link").val("联系方式修改");
            $("#modify-link").removeClass("sure-to-modify");
        },
        modifyModel: function () {
            $(".need-to-modify").show();
            $(".need-to-display").hide();
            $("#modify-link").text("确认修改");
            $("#modify-link").addClass("sure-to-modify");
        },
        sureToModify: function () {
            var link = new UserLink(
                $("#user-id").val(),
                $("input[name='telephone']").val(),
                $("input[name='anotherTphone']").val(),
                $("input[name='qq']").val(),
                $("input[name='email']").val());
            if (!link.checkIsNotEmpty()) {
                return;
            }
            var param = {};
            param.id = link.id;
            param.telephone = link.telephone;
            param.anotherTphone = link.anotherTphone;
            param.qq = link.qq;
            param.email = link.email;

            $.ajax({
                url: sureToModifyUrl,
                data: param,
                dataType: "json",
                success: function (data) {
                    if (data.student) {
                        BookManager.setSelfInfo(data.student);
                    }
                }
            });
        }
    }

    var RegisterUser = function (username, password, name, sex, studyNum, classId, userType) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.sex = sex;
        this.studyNum = studyNum;
        this.classId = classId;
        this.userType = userType;
    }

    RegisterUser.prototype.checkIsNotEmpty = function () {
        if ($.checkEmpty(this.userType)) {
            sweetAlert("Oops...", "请选择用户类型", "error");
            return false;
        }
        if (this.userType == 0) {
            if ($.checkEmpty(this.username)) {
                sweetAlert("Oops...", "用户名不能为空", "error");
                return false;
            }
            if ($.checkEmpty(this.password)) {
                sweetAlert("Oops...", "密码不能为空", "error");
                return false;
            }
            if ($.checkEmpty(this.name)) {
                sweetAlert("Oops...", "姓名不能为空", "error");
                return false;
            }
        } else if (this.userType == 1) {
            if ($.checkEmpty(this.username)) {
                sweetAlert("Oops...", "用户名不能为空", "error");
                return false;
            }
            if ($.checkEmpty(this.password)) {
                sweetAlert("Oops...", "密码不能为空", "error");
                return false;
            } else if (this.password.length < 6) {
                sweetAlert("Oops...", "密码最少6位", "error");
                return false;
            }
            if ($.checkEmpty(this.name)) {
                sweetAlert("Oops...", "姓名不能为空", "error");
                return false;
            }
            if ($.checkEmpty(this.sex)) {
                sweetAlert("Oops...", "请选择性别", "error");
                return false;
            }
            if ($.checkEmpty(this.studyNum)) {
                sweetAlert("Oops...", "学号不能为空", "error");
                return false;
            }
            if ($.checkEmpty(this.classId)) {
                sweetAlert("Oops...", "班级号不能为空", "error");
                return false;
            }
        }
        return true;
    }


    RegisterUser.prototype.register = function () {
        var param = {
            username: this.username,
            password: this.password,
            name: this.name,
            sex: this.sex,
            studentId: this.studyNum,
            classId: this.classId,
            userType: this.userType
        };
        $.ajax({
            url: registerUrl,
            type: "post",
            data: param,
            dataType: "json",
            success: function (data) {
                if (data.flag) {
                    sweetAlert("Oops...", "录入成功", "success");
                }
            }
        })


    }


    $(window).load(function () {
        var bookInfo = data.bookList;
        bookInfoPage.initPager(1, bookInfo.length, 10, 7, 'book-info-pager', 'book-info-pager-div',
            bookInfo, BookManager.getBookInfoData, 0);
        readInfo.initPager(1, bookInfo.length, 10, 7, 'book-read-info-pager', 'book-read-info-pager-div',
            bookInfo, BookManager.checkBookCondition, 1);
        BookManager.setSelfInfo(data.student);
        var authority = new AuthorityCheck(data.student);
        authority.initCheck();
    });

    $("#book-info-pager").on("click", ".show-detail-info", function () {
        BookManager.showBookDetailInfo($(this));
    });

    $("#userInfo").on("click", "#change-link-info", function () {
        BookManager.changeMyLinkInfo();
    });
    $("#book-detail-info").on("click", ".lend-the-book", function () {
        BookManager.lendBook($(this));
    });

    $(".close-and-refresh").on("click", function () {
        BookManager.closeAndRefresh();
    })

    $("#apply-in-book").on("click", function () {
        var bookCode = $("#bookCode").val();
        var bookName = $("#bookName").val();
        var type = $("#type").val();
        var price = $("#price").val();
        var author = $("#author").val();
        var publishingHouse = $("#publishingHouse").val();
        var num = $("#num").val();
        var version = $("#version").val();
        var applyInStaff = $("#applyInStaff").val();
        var libraryRow = $("#libraryRow").val();
        var libraryColumn = $("#libraryColumn").val();
        var bookBriefIntroduction = $("#bookBriefIntroduction").val();
        var page = $("#page").val();
        var book = new Book(bookCode, bookName, type,
            price, author, publishingHouse,
            num, version, applyInStaff,
            libraryRow, libraryColumn, page, bookBriefIntroduction);
        if (book.checkIsNotEmpty()) {
            book.applyInStore();
            BookManager.closeAndRefresh();
        }
    })


    $("#search-books").on("click", function () {
        BookManager.renderBookInfoByCondition();
    })


    $("#search-books-info").on("click", function () {
        BookManager.renderBookInfoByConditionUser();
    })

    $("#book-read-info-pager").on("click", ".lend-book", function () {
        BookManager.leadToLendBooks($(this));
    })

    $("#book-read-info-pager").on("click", ".return-book", function () {
        BookManager.leadToReturnBooks($(this));
    })


    $("#lendModal").on("click", ".lock-book-lend", function () {
        BookManager.lendLockBooks($(this));
    })

    $("#returnModal").on("click", ".lock-book-return", function () {
        BookManager.returnLockBooks($(this));
    })

    $("#lend-books-by-code").on("click", function () {
        BookManager.lendBooksByCode($(this));
    })

    $("#return-books-by-code").on("click", function () {
        BookManager.returnBooksByCode($(this));
    })

    $("#userInfo").on("click", "#modify-link", function () {
        UserLinkModel.modifyModel();
    })

    $("#userInfo").on("click", ".sure-to-modify", function () {
        UserLinkModel.sureToModify();
    })

    $("body").delegate(".pick-time", "focusin", function () {
        $(this).datetimepicker({
            format: "dd MM yyyy - hh:ii",
            autoclose: true,
            todayBtn: true,
            pickerPosition: "bottom-left"
        });
    })

    $("#sign-up-user-admin").on("click", function () {
        var registerIn = new RegisterUser($("#register-username").val(), $("#register-password").val(),
            $("#register-name").val(), $("#register-sex").val(), $("#register-study-num").val(),
            $("#register-class-id").val(), $("#register-user-type").val());
        if (registerIn.checkIsNotEmpty()) {
            registerIn.register();
        }
    });
});
