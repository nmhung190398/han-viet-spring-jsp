package com.nmhung.repository.custom.impl;


import com.nmhung.entity.HanVietEntity;
import com.nmhung.repository.custom.CustomHanVietRepository;
import com.nmhung.request.HanVietSearchRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;


public class CustomHanVietRepositoryImpl implements CustomHanVietRepository {
    @PersistenceContext
    EntityManager entityManager;


    public List<HanVietEntity> gets(HanVietSearchRequest request){

        Pageable pageable = request.pageable();
        String hql = "FROM com.nmhung.entity.HanVietEntity H ";

        Map<String, Object> values = new HashMap<>();
        hql += createWhereQuery(request, values);
        hql += createOrderQuery(request);

        Query query =entityManager.createQuery(hql,HanVietEntity.class);
        values.forEach(query::setParameter);

        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());
        return query.getResultList();
    }

    public Long count(HanVietSearchRequest request){
        String hql = "select count(H) FROM com.nmhung.entity.HanVietEntity H ";

        Map<String, Object> values = new HashMap<>();
        hql += createWhereQuery(request, values);
        hql += createOrderQuery(request);
        Query query =entityManager.createQuery(hql,Long.class);
        values.forEach(query::setParameter);

        return (Long) query.getSingleResult();
    }

    @Transactional
    public Page<HanVietEntity> search(HanVietSearchRequest request){
        List list = gets(request);
        Long count = count(request);
        return new PageImpl(list,request.pageable(),count);
    }

    private String createOrderQuery(HanVietSearchRequest request) {
        return "";
    }

    private String createWhereQuery(HanVietSearchRequest request, Map<String, Object> values) {
        String hql =  " where 1 = 1 ";
        if(StringUtils.isNotBlank(request.keyword)){
            hql += "AND ( lower(H.amDoc) like :amDoc " +
                    "OR lower(H.nghia) like :nghia " +
                    "OR lower(H.nghiaHan) like :nghiaHan " +
                    "OR lower(H.tuGhep) like :tuGhep " +
                    "OR lower(H.boThu) like :boThu " +
                    "OR lower(H.chuViet) like :chuViet " +
                    " ) ";
            values.put("amDoc","%" + request.keyword + "%");
            values.put("nghia","%" + request.keyword + "%");
            values.put("nghiaHan","%" + request.keyword + "%");
            values.put("tuGhep","%" + request.keyword + "%");
            values.put("boThu","%" + request.keyword + "%");
            values.put("chuViet","%" + request.keyword + "%");
        }

        return hql;
    }



}
