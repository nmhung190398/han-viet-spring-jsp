package com.nmhung.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nmhung.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long>{
	UserEntity findByUsernameAndPassword(String username,String password);
}
