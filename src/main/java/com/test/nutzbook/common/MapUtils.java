package com.test.nutzbook.common;

import java.util.Map;

/**
 * Created by 吴楠 on 2016/3/20.
 * 操作Map的工具类
 */
public class MapUtils {

    public static String getString(final Map map, final Object key) {
        if (map != null) {
            Object answer = map.get(key);
            if (answer != null) {
                return answer.toString();
            }
        }
        return null;
    }

    public static String getString(Map map, Object key, String defaultValue) {
        String answer = getString(map, key);
        if (answer == null) {
            answer = defaultValue;
        }
        return answer;
    }

}
