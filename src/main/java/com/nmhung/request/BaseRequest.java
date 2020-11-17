package com.nmhung.request;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class BaseRequest {

    public BaseRequest() {
        page = 0;
        size = 30;
    }

    public BaseRequest(int size, int page) {
        if(size < 0 || size > 1000){
            size = 30;
        }
        this.size = size;
        this.page = page;
    }

    public int size;
    public int page;
    public String  sortBy;
    public boolean isAsc;

    public Pageable pageable(){
        return PageRequest.of(page,size);
    }
}
