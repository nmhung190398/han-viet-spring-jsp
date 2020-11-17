package com.nmhung.response;
import org.springframework.data.domain.Page;

import java.util.*;

public class PagingResponse<T> {
    public List<T> items;
    public long totalElements;
    public int pageSize;
    public int pageNumber;
    public int totalPage;

    public PagingResponse(Page<T> page){
        items = page.getContent();
        totalElements = page.getTotalElements();
        pageSize = page.getSize();
        pageNumber = page.getNumber();
        totalPage = page.getTotalPages();
    }
    public static PagingResponse of(Page page){
        return new PagingResponse(page);
    }
}
