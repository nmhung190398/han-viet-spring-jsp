package com.nmhung.conver;

import org.springframework.stereotype.Component;

import com.nmhung.entity.NewsEntity;
import com.nmhung.model.NewsModel;

@Component
public class NewsConver extends AbstractConver<NewsEntity, NewsModel>{

	@Override
	public NewsModel toModel(NewsEntity entity) {
		// TODO Auto-generated method stub
		return modelMapper.map(entity,NewsModel.class);
	}

	@Override
	public NewsEntity toEtity(NewsModel dto) {
		// TODO Auto-generated method stub
		return modelMapper.map(dto,NewsEntity.class);
	}

}
