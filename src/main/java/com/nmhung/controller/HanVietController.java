package com.nmhung.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HanVietController {
    @GetMapping(value = {"/admin/han-viet"})
    public String homeAdmin() {
        return "admin/han-viet/han-viet";
    }

}
