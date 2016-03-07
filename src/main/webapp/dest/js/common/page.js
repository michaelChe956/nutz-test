/**
 * Created by chejingchi on 15/11/9.
 */
var PAGER = {
    currentPage: 1,  //当前页
    totalPages: 0,  //总页数
    pageNums: 10,  //显示的页码数
    pageNumArr: new Array(),  //页码数组
    pager: null,  //显示分页的html对象
    callbackFun: null,  //回调函数, 入参: 当前页码
    pageSize: null,
    pageDivName: null,
    finalData: [],
    /**
     * 初始化分页参数
     * currentPage: 当前页码
     * total: 总页数
     * pageSize: 每页显示条目数
     * pageNums: 显示的页码数
     * pageDivName:分页显示的div
     * obj: 显示分页的html对象id
     * callbackFun: 分页回调函数
     */
    initPager: function (currentPage, total, pageSize, pageNums, obj, pageDivName, finalData, callbackFun) {
        if (total % pageSize == 0) {
            this.totalPages = total / pageSize;
        } else {
            this.totalPages = total / pageSize + 1;
        }
        this.totalPages = parseInt(this.totalPages);
        this.currentPage = currentPage;
        this.pageNums = pageNums;
        this.pager = document.getElementById(obj);
        this.callbackFun = callbackFun;
        this.pageSize = pageSize;
        this.pageDivName = pageDivName;
        this.finalData = finalData;
        this.renderPager();
    },
    /**
     * 执行回调函数
     */
    doCallBack: function () {
        if (this.callbackFun) {
            this.callbackFun(this.currentPage, this.pageSize, this.finalData);
        }
    },
    /**
     * 跳转到首页
     */
    gotoFirstPage: function () {
        this.currentPage = 1;
        this.renderPager();
    },
    /**
     * 跳转到尾页
     */
    gotoLastPage: function () {
        this.currentPage = this.totalPages;
        this.renderPager();
    },
    /**
     * 跳转到上一页
     */
    gotoPrePage: function () {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderPager();
        }
    },
    /**
     * 跳转到下一页
     */
    gotoNextPage: function () {
//if(this.currentPage<this.pageNumArr[this.pageNumArr.length-1]) {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.renderPager();
        }
    },
    /**
     * 跳转到指定页
     */
    gotoPage: function (targetPage) {
        if (targetPage < 1) {
            targetPage = 1;
        } else if (targetPage > this.totalPages) {
            targetPage = this.totalPages;
        }
        this.currentPage = targetPage;
        this.renderPager();
    },
    /**
     * 渲染分页数据
     */
    renderPager: function () {
//alert(this.currentPage);
        var begin = 1;
        this.pageNumArr = new Array();
        var midPage = Math.floor(this.pageNums / 2);
        if (this.totalPages > this.pageNums) {
            if (this.currentPage > midPage) {
                begin = this.currentPage - midPage;
            }
            if (this.totalPages - this.currentPage < midPage) {
                begin = this.totalPages - (this.pageNums - 1);
            }
        }
        for (var i = begin; i <= this.totalPages && i < this.pageNums + begin; i++) {
            this.pageNumArr.push(i);
        }
        var pageStr = "<div id='" + this.pageDivName + "'></div>";
        var preStr = '<ul id = "paging" class = "pagination">';
        preStr += '<li><a>共' + this.totalPages + '页</a></li>'
        preStr += "<li><a id='prePage' onclick='PAGER.gotoPrePage()'>&laquo;</a></li>";
        var nextStr = "<li><a id='nextPage' onclick='PAGER.gotoNextPage()'>&raquo;</a></li>";
        nextStr += '<li><label class="paging-style">至</label><input type="text" value="" class="paging-style" ' +
            'id="inputPageNo" name="inputPageNo"><label class="paging-style">页</label></li>';
        nextStr += '<li><a href="javascript:void(0);" class="fontC36cS12 jump" title="" ' +
            'onclick="PAGER.gotoPage(inputPageNo.value)">跳转</a></li>';
        var cenStr = "";
        for (var i = 0; i < this.pageNumArr.length; i++) {
            if (this.currentPage == this.pageNumArr[i]) {
                cenStr += "<li><a onclick='PAGER.gotoPage(" + this.pageNumArr[i] + ")'>" + this.pageNumArr[i] + "</a></li>";
            } else {
                cenStr += "<li><a onclick='PAGER.gotoPage(" + this.pageNumArr[i] + ")'>" + this.pageNumArr[i] + "</a></li>";
            }
        }
        pageStr = pageStr + preStr + cenStr + nextStr + "</ul>";
        this.pager.innerHTML = pageStr;
        this.doCallBack();
    }
}
