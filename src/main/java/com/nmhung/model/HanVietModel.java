package com.nmhung.model;

import com.nmhung.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


public class HanVietModel extends BaseModel {

    private String amDoc;

    private String chuViet;

    private String[] nghias;

    private String[] tuGheps;

    private String nghiaHan;

    private String[] thanhNgus;

    private String boThu;

    private String chuThich;

    public String getAmDoc() {
        return amDoc;
    }

    public void setAmDoc(String amDoc) {
        this.amDoc = amDoc;
    }

    public String getChuViet() {
        return chuViet;
    }

    public void setChuViet(String chuViet) {
        this.chuViet = chuViet;
    }



    public String[] getTuGheps() {
        return tuGheps;
    }

    public void setTuGheps(String[] tuGheps) {
        this.tuGheps = tuGheps;
    }

    public String getNghiaHan() {
        return nghiaHan;
    }

    public void setNghiaHan(String nghiaHan) {
        this.nghiaHan = nghiaHan;
    }

    public String[] getNghias() {
        return nghias;
    }

    public void setNghias(String[] nghias) {
        this.nghias = nghias;
    }

    public String[] getThanhNgus() {
        return thanhNgus;
    }

    public void setThanhNgus(String[] thanhNgus) {
        this.thanhNgus = thanhNgus;
    }

    public String getBoThu() {
        return boThu;
    }

    public void setBoThu(String boThu) {
        this.boThu = boThu;
    }

    public String getChuThich() {
        return chuThich;
    }

    public void setChuThich(String chuThich) {
        this.chuThich = chuThich;
    }
}
