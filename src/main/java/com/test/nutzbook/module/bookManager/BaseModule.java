package com.test.nutzbook.module.bookManager;

import com.alibaba.druid.util.StringUtils;
import com.test.nutzbook.bean.Book;
import com.test.nutzbook.bean.User;
import com.test.nutzbook.bean.enumerate.BookType;
import com.test.nutzbook.common.MapUtils;
import com.test.nutzbook.common.RMap;
import org.nutz.dao.Cnd;
import org.nutz.dao.Dao;
import org.nutz.dao.FieldFilter;
import org.nutz.dao.util.Daos;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpSession;
import java.io.*;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * @author chejingchi
 *         创建时间:16/3/12 下午1:18
 *         项目名称:github-nutz
 * @author 车竞驰
 * @version 1.0
 * @since JDK 1.7
 * 类说明:
 */
@IocBean

public class BaseModule {
    @Inject
    protected Dao dao;

    public List<Book> getBookList() {
        List<Book> bookList = dao.query(Book.class, null);
        for (Book book : bookList) {
            book.setTypeName(BookType.useBookType(book.getType()));
        }
        return bookList;
    }

    public User getStaffInfo(HttpSession session) {
        return Daos.ext(dao, FieldFilter.create(User.class, null, "^password", true))
                .fetch(User.class, Cnd.where("id", "=", (Integer) session.getAttribute("me")));
    }

    private static Logger logger = LoggerFactory.getLogger(BaseModule.class);

    /**
     * 导出订单
     *
     * @param fileName     文件名称
     * @param exportOrders 订单数据
     * @param columnNames  导出文件列名称
     * @param columnCodes  导出文件列名称对应的数据库字段
     */
    public void export(String fileName, List<Map> exportOrders, List<String> columnNames, List<String> columnCodes) {
        this.fileName = fileName;
        this.exportOrders = exportOrders;
        this.columnNames = columnNames;
        this.columnCodes = columnCodes;
    }

    /**
     * 判断是否可以执行导出操作
     *
     * @param exportOrders
     */
    public Map canExport(List<Map> exportOrders) {
        if (exportOrders.size() > 50000) {
            return RMap.asMap("CAN_EXPORT", "NO", "ERR_MSG", "查询结果数据量太大，请调整查询条件后重试。");
        }
        return RMap.asMap("CAN_EXPORT", "YES");
    }

    /**
     * 生成CSV文件(字符串).
     *
     * @return
     */
    public StringBuffer gernateCSVFile() {
        logger.debug("生成CSV文件(字符串),开始执行----->");
        StringBuffer retStr = new StringBuffer();
        retStr.append(generateCSVTitle());
        if (!isEmpty(exportOrders)) {
            for (Map order : exportOrders) {
                retStr.append(generateSimpRow(order));
            }
        }
        logger.debug("生成CSV文件(字符串),开始结束<-----");
        return retStr;
    }

    /**
     * 生成CSV 标题行字符串.
     *
     * @return
     */
    private StringBuffer generateCSVTitle() {
        StringBuffer sb = new StringBuffer("");
        int columnSize = columnNames.size();
        for (int i = 0; i < columnSize; i++) {
            sb.append(columnNames.get(i));
            if (i != columnSize - 1) {
                sb.append(",");
            }
        }
        return sb.append("\n");
    }

    /**
     * 生成单行记录.
     *
     * @param order
     * @return
     */
    private StringBuffer generateSimpRow(Map order) {
        StringBuffer sb = new StringBuffer();
        int count = 0;
        for (String column : columnCodes) {
            count++;
            String columnValue = MapUtils.getString(order, column, "");
            String columnValueFormat = StringUtils.isEmpty(columnValue) ? "" : count == columnCodes.size() ? "\""
                    + columnValue.replaceAll("\t|\r|\n", "") + "\"" : "=\"" + columnValue.replaceAll("\t|\r|\n", "")
                    + "\"";
            if (columnValueFormat.indexOf(",") != -1) {
                columnValueFormat = columnValueFormat.replaceAll(",", "，");
            }

            sb.append(columnValueFormat).append(",");
        }
        sb = new StringBuffer(sb.substring(0, sb.length() - 1)).append("\n");
        return sb;
    }

    public String getFileName() throws UnsupportedEncodingException {
        return new String(fileName.getBytes("GB2312"), "ISO8859-1");
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    public InputStream getInputStream() throws UnsupportedEncodingException {
        return new ByteArrayInputStream(gernateCSVFile().toString().getBytes("GBK"));
    }

    public File getFile() throws UnsupportedEncodingException {
        return byte2File(gernateCSVFile().toString().getBytes("GBK"),fileName);
    }


    public File byte2File(byte[] buf, String fileName) {
        BufferedOutputStream bos = null;
        FileOutputStream fos = null;
        File file = null;
        try {
            file = new File(fileName);
            fos = new FileOutputStream(file);
            bos = new BufferedOutputStream(fos);
            bos.write(buf);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (bos != null) {
                try {
                    bos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return file;
    }


    public static boolean isEmpty(Collection c) {
        return c == null || c.isEmpty();
    }

    /**
     * 订单列表
     */
    private List<Map> exportOrders;

    /**
     * 文件名称
     */
    private String fileName;

    /**
     * 数据输入流
     */
    @SuppressWarnings("unused")
    private InputStream inputStream;

    /**
     * 文件列名称
     */
    private List<String> columnNames;
    /**
     * 文件列名称对应的数据库字段
     */
    private List<String> columnCodes;

    @SuppressWarnings("unused")
    private File file;
}
