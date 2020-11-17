package com.nmhung.model;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class BaseModel {




    public BaseModel(Long id) {
        this.id = id;
    }

    public BaseModel() {
    }

    private Long id;

    //@CreatedBy
    private String createdBy;

    //@ModifiedBy
    private String modifiedBy;

    //@CreatedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createdDate;

    //@ModifiedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date modifiedDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }
}
