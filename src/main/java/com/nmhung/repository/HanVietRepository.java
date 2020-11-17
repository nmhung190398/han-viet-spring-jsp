package com.nmhung.repository;

import com.nmhung.entity.HanVietEntity;
import com.nmhung.repository.custom.CustomHanVietRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HanVietRepository extends JpaRepository<HanVietEntity,Long>,CustomHanVietRepository {
}
