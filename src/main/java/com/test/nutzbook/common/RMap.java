package com.test.nutzbook.common;

import java.text.NumberFormat;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

public class RMap {
    public static <K, V> Map<K, V> of(K k1, V v1) {
        Map<K, V> map = newHashMap();
        map.put(k1, v1);

        return map;
    }

    public static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2) {
        Map<K, V> map = of(k1, v1);
        map.put(k2, v2);

        return map;
    }

    public static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2, K k3, V v3) {
        Map<K, V> map = of(k1, v1, k2, v2);
        map.put(k3, v3);

        return map;
    }

    public static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2, K k3, V v3, K k4, V v4) {
        Map<K, V> map = of(k1, v1, k2, v2, k3, v3);
        map.put(k4, v4);

        return map;
    }

    public static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2, K k3, V v3, K k4, V v4, K k5, V v5) {
        Map<K, V> map = of(k1, v1, k2, v2, k3, v3, k4, v4);
        map.put(k5, v5);

        return map;
    }

    public static <T> Map<T, T> of(T... keyAndValues) {
        Map<T, T> map = newHashMap();
        for (int i = 0; i < keyAndValues.length; i += 2) {
            T key = keyAndValues[i];
            T value = i + 1 < keyAndValues.length ? keyAndValues[i + 1] : null;
            map.put(key, value);
        }

        return map;
    }

    public static Map<Object, Object> asMap(Object... keyAndValues) {
        Map<Object, Object> map = newHashMap();
        for (int i = 0; i < keyAndValues.length; i += 2) {
            Object key = keyAndValues[i];
            Object value = i + 1 < keyAndValues.length ? keyAndValues[i + 1] : null;
            map.put(key, value);
        }

        return map;
    }

    public static <K, V> Map<K, V> newHashMap() {
        return new HashMap<K, V>();
    }

    public static boolean isEmpty(Map<?, ?> map) {
        return map == null || map.isEmpty();
    }

    public static String getStr(Map m, Object key) {
        return getStr(m, key, null);
    }

    public static String getStr(Map m, Object key, String defaultValue) {
        if (m == null) return defaultValue;
        Object value = m.get(key);
        if (value == null) return defaultValue;
        return value.toString();
    }

    public static Number getNum(Map m, Object key) {
        if (m == null) return null;
        Object value = m.get(key);
        if (value == null) return null;
        if (value instanceof Number) return (Number) value;
        if (!(value instanceof String)) return null;
        try {
            return NumberFormat.getInstance().parse((String) value);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    public static Integer getInt(Map m, Object key) {
        Number value = getNum(m, key);
        if (value == null) return null;
        return value instanceof Integer ? (Integer) value : new Integer(value.intValue());
    }

    public static Long getLong(Map m, Object key) {
        Number value = getNum(m, key);
        if (value == null) return null;
        return value instanceof Long ? (Long) value : new Long(value.longValue());
    }
}
