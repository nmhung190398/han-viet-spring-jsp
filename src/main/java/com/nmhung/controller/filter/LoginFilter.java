package com.nmhung.controller.filter;


import com.nmhung.model.UserModel;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Component
public class LoginFilter implements Filter {

    public static  final String KEY_USERLOGIN = "USERLOGIN";
    public static  final String KEY_USER_FULLNAME = "USER_FULLNAME";
    public static  final String KEY_IS_LOGIN = "IS_LOGIN";

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        HttpSession session = request.getSession();
        request.setAttribute(KEY_IS_LOGIN,false);
        try{
            UserModel userLogin = (UserModel) session.getAttribute(KEY_USERLOGIN);
            if(userLogin != null){
                request.setAttribute(KEY_IS_LOGIN,true);
                request.setAttribute(KEY_USER_FULLNAME,userLogin.getFullname());
            }
            chain.doFilter(request,response);
            return;
        }catch (Exception e){
        }
        response.sendRedirect(request.getContextPath() + "/redirected");

    }

    @Override
    public void destroy() {

    }
}
