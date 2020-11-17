package com.nmhung.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nmhung.conver.UserConver;
import com.nmhung.model.UserModel;
import com.nmhung.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;

	@Autowired
	UserConver userConver;

	public UserModel login(String username,String password) {
		return userConver.toModel(userRepository.findByUsernameAndPassword(username, password));
	}
}
