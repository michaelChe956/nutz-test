package com.test.nutzbook.module;

import org.nutz.mvc.annotation.*;
import org.nutz.mvc.ioc.provider.ComboIocProvider;

/**
 * @author chejingchi
 *         创建时间:15/12/11 下午5:21
 *         项目名称:myFirstNutzTest
 * @author 车竞驰
 * @version 1.0
 * @since JDK 1.8
 * 类说明:
 */
@SetupBy(value=MainSetup.class)
@IocBy(type=ComboIocProvider.class, args={"*js", "ioc/",
        "*anno", "com.test.nutzbook",
        "*tx"})
@Modules(scanPackage = true)
@Ok("json:full")
@Fail("jsp:jsp.500")
@Localization(value="msg/", defaultLocalizationKey="zh-CN")
public class MainModule {
}
