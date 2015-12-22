package com.test.nutzbook.mvc;

import org.nutz.mvc.NutFilter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/**
 * @author chejingchi
 *         创建时间:15/12/22 下午4:37
 *         项目名称:github-nutz
 * @author 车竞驰
 * @version 1.0
 * @since JDK 1.8
 * 类说明:
 */
public class NutzTestNutFilter extends NutFilter{

    protected Set<String> prefixs = new HashSet<String>();

    public void init(FilterConfig config) throws ServletException{
        super.init(config);
        prefixs.add(config.getServletContext().getContextPath() + "/druid/");
        prefixs.add(config.getServletContext().getContextPath() + "/rs/");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException{
        if (request instanceof HttpServletRequest) {
            String uri = ((HttpServletRequest) request).getRequestURI();
            for (String prefix : prefixs) {
                if (uri.startsWith(prefix)) {
                    chain.doFilter(request, response);
                    return;
                }
            }
        }
        super.doFilter(request, response, chain);
    }

}
