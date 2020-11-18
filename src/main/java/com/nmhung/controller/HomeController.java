package com.nmhung.controller;

import com.nmhung.controller.filter.LoginFilter;
import com.nmhung.model.UserModel;
import com.nmhung.repository.UserRepository;
import com.nmhung.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;


@Controller
public class HomeController {

	@Autowired
	UserService service;

	@GetMapping(value = {"/admin","/admin/home"})
	public String homeAdmin() {
		return "admin/home";
	}


	@GetMapping(value = {"/home","/"})
	public String homeWeb(Model model) {

		return "admin/han-viet/han-viet";
	}

	@PostMapping(value = {"/login"})
	public String login(HttpSession session, @RequestParam String username,@RequestParam String password) {
		UserModel userLogin = service.login(username,password);
		String messger = "";
		if(userLogin == null){
			messger = "?error=login-error";
		}else{
			messger = "";
			session.setAttribute(LoginFilter.KEY_USERLOGIN,userLogin);
		}
		return "redirect:/home" + messger;
	}
	@GetMapping(value = {"/logout"})
	public String login(HttpSession session) {
		session.removeAttribute(LoginFilter.KEY_USERLOGIN);
		return "redirect:/home";
	}
}
