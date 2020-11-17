package com.nmhung.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.nmhung.conver.NewsConver;
import com.nmhung.entity.NewsEntity;
import com.nmhung.model.NewsModel;
import com.nmhung.repository.NewsRepository;


@Service
public class NewsService {
	@Autowired
	NewsConver newsConver;

	@Autowired
	NewsRepository newsRepository;

//	public boolean add(NewsModel model) {
//		model.setUri(StringUtils.encodeURI(model.getTitle()));
//		newsConver.setAdd(model);
//		NewsEntity entity = newsConver.toEtity(model);
//
//		entity = newsRepository.save(entity);
//		return entity != null;
//	}

	public Page<NewsModel> findAll(Pageable pageable){

		Page<NewsEntity> page = newsRepository.findAll(pageable);

		return page.map(newsConver::toModel);
	}

	public List<NewsModel> adds(List<NewsModel> models) {
		for (NewsModel model : models) {
			newsConver.setAdd(model);
		}

		List<NewsEntity> entities = models.stream().map(newsConver::toEtity).collect(Collectors.toList());

		entities = newsRepository.saveAll(entities);

		return entities.stream().map(newsConver::toModel).collect(Collectors.toList());
	}

	public NewsModel findByUri(String uri) {
		List<NewsEntity> list = newsRepository.findByUri(uri);
		return list.isEmpty()?new NewsModel() : newsConver.toModel(list.get(0));
	}

	public boolean checkURI(String uri) {
		return newsRepository.countByUri(uri) <= 0;
	}

	public NewsModel findById(Long id) {
		// TODO Auto-generated method stub
		return newsConver.toModel(newsRepository.findById(id).get());
	}

	public void edit(NewsModel model) {
		newsConver.setUpdate(model);
		newsRepository.save(newsConver.toEtity(model));

	}


}
