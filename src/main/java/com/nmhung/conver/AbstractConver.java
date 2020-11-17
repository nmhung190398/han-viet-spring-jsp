package com.nmhung.conver;


import java.sql.Timestamp;
import java.util.Date;

import com.nmhung.entity.BaseEntity;
import com.nmhung.model.BaseModel;

import org.apache.commons.lang.StringUtils;
import org.modelmapper.ModelMapper;

abstract class AbstractConver<E extends BaseEntity, D extends BaseModel> {

    protected static ModelMapper modelMapper = new ModelMapper();
    private final String keyworldSplit = ",";

    abstract D toModel(E entity);

    abstract E toEtity(D dto);

    public String[] converToArray(String data) {
        if (StringUtils.isNotBlank(data)) {
            return data.split(keyworldSplit);
        }
        return null;
    }

    public String converToString(String[] data) {
        if (data != null) {
            return StringUtils.join(data, keyworldSplit);
        }
        return null;
    }

    public void setAdd(D d) {
        d.setId(null);
        d.setCreatedDate(new Date(System.currentTimeMillis()));
    }

    public void setAdd(E d) {

        d.setId(null);
        d.setCreatedDate(new Timestamp(System.currentTimeMillis()));
    }


    public void setUpdate(D d) {
        d.setModifiedDate(new Date(System.currentTimeMillis()));
    }
}
