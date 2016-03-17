package com.test.nutzbook.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author chejingchi
 *         创建时间:16/3/17 上午12:00
 *         项目名称:github-nutz
 * @author 车竞驰
 * @version 1.0
 * @since JDK 1.7
 * 类说明:
 */
public class SqlStringBuilder {
    private String sqlStr = "";


    private static final Logger logger = LoggerFactory.getLogger(SqlStringBuilder.class);

    public SqlStringBuilder sqlUseLike(String s1, String s2) {
        if (!"".equals(s2)) {
            sqlStr += "and " + s1 + "like" + s2 + " ";
        }
        return this;
    }

    public SqlStringBuilder sqlUseEqual(String s1, String s2) {
        if (!"".equals(s2)) {
            sqlStr += "and " + s1 + "=" + s2 + " ";
        }
        return this;
    }

    public String build() {
        sqlStr = sqlStr.substring(3,sqlStr.length());
        logger.info("updateOrderInfoSql : {}", sqlStr);
        return sqlStr;
    }
}
