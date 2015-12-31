package com.test.nutzbook.module.myTest;

import com.test.nutzbook.bean.User;
import com.test.nutzbook.common.RMap;
import org.nutz.dao.Cnd;
import org.nutz.dao.Dao;
import org.nutz.dao.QueryResult;
import org.nutz.dao.pager.Pager;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.Strings;
import org.nutz.lang.util.NutMap;
import org.nutz.mvc.annotation.*;
import org.nutz.mvc.filter.CheckSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.Map;

/**
 * @author chejingchi
 *         创建时间:15/12/14 上午9:58
 *         项目名称:myFirstNutzTest
 * @author 车竞驰
 * @version 1.0
 * @since JDK 1.8
 * 类说明:
 */
@Filters(@By(type=CheckSession.class, args={"me", "/login/init"}))
@IocBean
@At("/user")
@Ok("json:{locked:'password|salt',ignoreNull:true}")
@Fail("http:500")
public class UserModule {
    @Inject
    protected Dao dao;

    Logger logger = LoggerFactory.getLogger(UserModule.class);



    @At("/mytest")
    public int count(){

        return dao.count(User.class);
    }



    @At
    public Object add(@Param("..")User user){
        NutMap re = new NutMap();
        String msg = checkUser(user,true);
        if(null != msg){
            return re.setAll((Map) RMap.of("ok",false,"msg",msg));
        }
        user.setCreateTime(new Date());
        user.setUpdateTime(new Date());
        user = dao.insert(user);
        return re.setv("ok",true).setv("data",user);
    }

    @At
    public Object update(@Param("..")User user){
        NutMap re = new NutMap();
        String msg = checkUser(user,false);
        if(null != msg){
            return re.setv("ok",false).setv("msg",msg);
        }
        user.setName(null);
        user.setCreateTime(null);
        user.setUpdateTime(new Date());
        dao.updateIgnoreNull(user);
        return re.setv("ok",true);
    }

    @At
    public Object delete(@Param("id")int id, @Attr("me") int me){
        if(me == id){
            return new NutMap().setv("ok",false).setv("msg","不能删除当前用户");
        }
        int flag = dao.delete(User.class,id);
        if(0 == flag){
            return new NutMap().setv("ok",false).setv("msg","没有要删除的用户");
        }else{
            return  new NutMap().setv("ok",true);
        }
    }

    @At
    public Object query(String name,@Param("..")Pager pager){
        Cnd cnd = Strings.isBlank(name)? null:Cnd.where("name","like","%"+name+"%");
        QueryResult qr = new QueryResult();
        qr.setList(dao.query(User.class,cnd,pager));
        qr.setPager(pager);
        return qr;
    }

    @At("/")
    @Ok("jsp:jsp.bootstrap-jsp.user-list") // 真实路径是 /WEB-INF/jsp/bootstrap-jsp/user-list.jsp
    public void index() {
    }


    private String checkUser(User user,boolean create){
        if (user == null) {
            return "空对象";
        }
        if (create) {
            if (Strings.isBlank(user.getName()) || Strings.isBlank(user.getPassword()))
                return "用户名/密码不能为空";
        } else {
            if (Strings.isBlank(user.getPassword()))
                return "密码不能为空";
        }
        String passwd = user.getPassword().trim();
        if (6 > passwd.length() || passwd.length() > 12) {
            return "密码长度错误";
        }
        user.setPassword(passwd);
        if (create) {
            int count = dao.count(User.class, Cnd.where("name", "=", user.getName()));
            if (count != 0) {
                return "用户名已经存在";
            }
        } else {
            if (user.getId() < 1) {
                return "用户Id非法";
            }
        }
        if (user.getName() != null)
            user.setName(user.getName().trim());
        return null;
    }

}
