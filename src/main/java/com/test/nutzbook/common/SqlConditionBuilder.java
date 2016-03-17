package com.test.nutzbook.common;

import org.nutz.dao.Cnd;
import org.nutz.dao.Condition;
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
public class SqlConditionBuilder {
    private String sqlStr = "";
    private Condition condition;

    private static final Logger logger = LoggerFactory.getLogger(SqlConditionBuilder.class);

    public SqlConditionBuilder sqlUseLike(String s1, String s2) {
        s2 = fuzzycName(s2);
        if (!"".equals(s2)) {
            sqlStr += "and " + s1 + " like " + "'" + s2 + "'" + " ";
        }
        return this;
    }

    public SqlConditionBuilder sqlUseEqual(String s1, String s2) {
        if (!"".equals(s2)) {
            sqlStr += "and " + s1 + " = " + "'" + s2 + "'" + " ";
        }
        return this;
    }

    public Condition build() {
        if ("".equals(sqlStr)) {
            return null;
        } else {
            sqlStr = sqlStr.substring(3, sqlStr.length());
            logger.info("updateOrderInfoSql : {}", sqlStr);
            condition = Cnd.wrap(sqlStr);
            return condition;
        }

    }


    /**
     * 把书籍名,处理成模糊查询条件
     */
    private String fuzzycName(String cName) {
        StringBuilder sb = new StringBuilder();
        if (!"".equals(cName)) {
            for (int i = 0; i < cName.length(); i++) {
                sb.append("%" + cName.charAt(i));
            }
            sb.append("%");
        }

        return sb.toString();
    }
}
