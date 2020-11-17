package com.nmhung.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {

	@GetMapping(value = {"/admin","/admin/home"})
	public String homeAdmin() {
		return "admin/home";
	}


	@GetMapping(value = {"/home","/"})
	public String homeWeb(Model model) {

		return "admin/home";
	}
}
