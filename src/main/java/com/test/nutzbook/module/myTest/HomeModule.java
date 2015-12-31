package com.test.nutzbook.module.myTest;

import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.By;
import org.nutz.mvc.annotation.Filters;
import org.nutz.mvc.annotation.Ok;
import org.nutz.mvc.filter.CheckSession;

/**
 * @author chejingchi
 *         创建时间:15/12/31 上午11:24
 *         项目名称:github-nutz
 * @author 车竞驰
 * @version 1.0
 * @since JDK 1.7
 * 类说明:
 */
@At("/home")
@IocBean
@Filters(@By(type = CheckSession.class ,args = {"me" , "/login/init"}))
@Ok("json:{locked:'password|salt',ignoreNull:true}")
public class HomeModule {
    @Inject
    protected Dao dao;

    @At("/index")
    @Ok("jsp:jsp.bootstrap-jsp.home.index")
    public void init(){
    }

    @At("")
    @Ok("jsp:jsp.bootstrap-jsp.home.index")
    public void about(){

    }

    @At("")
    @Ok("jsp:jsp.bootstrap-jsp.home.index")
    public void contact(){

    }

}
