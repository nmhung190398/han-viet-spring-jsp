package com.nmhung.conver;

import org.springframework.stereotype.Component;

import com.nmhung.entity.UserEntity;
import com.nmhung.model.UserModel;

@Component
public class UserConver extends AbstractConver<UserEntity, UserModel>{

	@Override
	public UserModel toModel(UserEntity entity) {
		// TODO Auto-generated method stub
		if(entity == null){
			return null;
		}
		return modelMapper.map(entity,UserModel.class);
	}

	@Override
	public UserEntity toEtity(UserModel dto) {
		// TODO Auto-generated method
		if(dto == null){
			return null;
		}
		return modelMapper.map(dto,UserEntity.class);
	}



}
