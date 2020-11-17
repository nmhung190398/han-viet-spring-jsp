package com.nmhung.api;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.nmhung.constant.WebConstant;

import com.nmhung.model.NewsModel;
import com.nmhung.model.UserModel;
import com.nmhung.service.NewsService;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
public class NewsAPI {

	@Autowired
	private NewsService newsService;

	@GetMapping(value = "/api/tin-tuc")
	public ResponseEntity<List<NewsModel>> getDataJson(@RequestParam(value = "page", defaultValue = "1") Integer page,
			@RequestParam(value = "pageItem", defaultValue = "10") Integer pageItem) {
		if (page <= 0) {
			page = 1;
		}
		Page<NewsModel> news = newsService
				.findAll(PageRequest.of(page - 1, pageItem, Sort.by(Direction.DESC, "createdDate")));
		List<NewsModel> list = news.getContent();

		return new ResponseEntity<List<NewsModel>>(list, HttpStatus.OK);
	}

//	@GetMapping(value = "/api/tin-tuc/jsoup/{page}")
//	public ResponseEntity<List<NewsModel>> jsoup(@PathVariable int page) {
//		List<NewsModel> list = new ArrayList<NewsModel>();
//
//		VnExpress vnExpress;
//		try {
//			vnExpress = new VnExpress(page);
//			list = vnExpress.getModels();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//
//		return new ResponseEntity<List<NewsModel>>(list, HttpStatus.OK);
//	}

	@PutMapping(value = "/api/tin-tuc")
	public ResponseEntity<String> edit(NewsModel model){
		newsService.edit(model);
		return new ResponseEntity<String>("Thanh Cong", HttpStatus.OK);
	}

//	@PostMapping(value = "/api/tin-tuc/jsoup")
//	public ResponseEntity<String> addList(@RequestBody List<NewsModel> list, HttpSession session) {
//		UserModel userLogin = (UserModel) session.getAttribute(WebConstant.USER_LOGIN);
//
//		if (list.isEmpty() || userLogin == null) {
//
//			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		} else {
//			StringBuilder msg = new StringBuilder();
//			List<NewsModel> listAdd = new ArrayList<NewsModel>();
//			for (NewsModel item : list) {
//				item.setCreatedBy(userLogin.getUsername());
//				item.setAuthor(userLogin.getFullname());
//				// set URI
//				if (item.getUri() == null || item.getUri().equalsIgnoreCase("")) {
//
//					item.setUri(StringUtils.encodeURI(item.getTitle()));
//
//				}
//
//				// check URI
//				if (newsService.checkURI(item.getUri())) {
//					listAdd.add(item);
//				} else {
//					msg.append(item.getTitle() + " Trung URI");
//				}
//			}
//			if (listAdd.isEmpty()) {
//				return new ResponseEntity<String>("error" + msg.toString(),
//						HttpStatus.BAD_REQUEST);
//			}
//
//			listAdd = newsService.adds(listAdd);
//			if (listAdd == null) {
//				return new ResponseEntity<String>("error", HttpStatus.BAD_REQUEST);
//			}
//			if (listAdd.isEmpty()) {
//				return new ResponseEntity<String>("error" + msg.toString(),
//						HttpStatus.BAD_REQUEST);
//			}
//
//			listAdd.forEach(item -> {
//				msg.append(item.getUri() + " Thanh Cong").append("\n");
//			});
//			return new ResponseEntity<String>(msg.toString(), HttpStatus.OK);
//		}
//
//	}
}
