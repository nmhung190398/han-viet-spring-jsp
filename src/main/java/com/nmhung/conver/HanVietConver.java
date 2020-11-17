package com.nmhung.conver;

import com.nmhung.entity.HanVietEntity;
import com.nmhung.entity.NewsEntity;
import com.nmhung.model.HanVietModel;
import com.nmhung.model.NewsModel;
import org.springframework.stereotype.Component;

@Component
public class HanVietConver extends AbstractConver<HanVietEntity, HanVietModel>{

	@Override
	public HanVietModel toModel(HanVietEntity entity) {
		// TODO Auto-generated method stub
		HanVietModel rs =  modelMapper.map(entity,HanVietModel.class);
		rs.setTuGheps(this.converToArray(entity.getTuGhep()));
		rs.setThanhNgus(this.converToArray(entity.getThanhNgu()));
		rs.setNghias(this.converToArray(entity.getNghia()));

		return  rs;
	}

	@Override
	public String converToString(String[] data) {
		if(data != null){
			for(String item : data){
				item = item.trim();
			}
			return super.converToString(data);
		}
		return null;
	}

	@Override
	public HanVietEntity toEtity(HanVietModel dto) {
		// TODO Auto-generated method stub

		HanVietEntity rs = modelMapper.map(dto,HanVietEntity.class);
		rs.setTuGhep(this.converToString(dto.getTuGheps()));
		rs.setThanhNgu(this.converToString(dto.getThanhNgus()));
		rs.setNghia(this.converToString(dto.getNghias()));

		return rs;
	}

}
