package com.test.nutzbook.module.myTest;

import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Fail;
import org.nutz.mvc.annotation.Ok;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author chejingchi
 *         创建时间:15/12/22 下午5:49
 *         项目名称:github-nutz
 * @author 车竞驰
 * @version 1.0
 * @since JDK 1.8
 * 类说明:
 */
@At("/login")
@Ok("json:{locked:'password|salt',ignoreNull:true}")
@Fail("http:500")
public class LoginModule {
    Logger logger = LoggerFactory.getLogger(LoginModule.class);
    @At
    @Ok("jsp:jsp.bootstrap-jsp.login")
    public void init(){
    }

}
