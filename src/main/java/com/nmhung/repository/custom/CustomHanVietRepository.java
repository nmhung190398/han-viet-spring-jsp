package com.nmhung.repository.custom;

import com.nmhung.entity.HanVietEntity;
import com.nmhung.request.HanVietSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface CustomHanVietRepository {
    Page<HanVietEntity> search(HanVietSearchRequest request);
    List<HanVietEntity> gets(HanVietSearchRequest request);
}
