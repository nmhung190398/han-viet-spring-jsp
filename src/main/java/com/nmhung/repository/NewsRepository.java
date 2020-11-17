package com.nmhung.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nmhung.entity.NewsEntity;

public interface NewsRepository extends JpaRepository<NewsEntity, Long>{
	Page<NewsEntity> findAll(Pageable pageable);

	List<NewsEntity> findByUri(String uri);
	Integer countByUri(String uri);
}
