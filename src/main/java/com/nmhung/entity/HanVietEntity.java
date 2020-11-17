package com.nmhung.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "han_viet")
public class HanVietEntity extends BaseEntity {

    @Column(name = "amDoc")
    private String amDoc;

    @Column(name = "chuViet")
    private String chuViet;

    @Column(name = "nghia",length = 1024)
    private String nghia;

    @Column(name = "tuGhep",length = 1024)
    private String tuGhep;

    @Column(name = "nghiaHan",columnDefinition="TEXT")
    private String nghiaHan;

    @Column(name = "thanhNgu",length = 1024)
    private String thanhNgu;

    @Column(name = "boThu")
    private String boThu;

    @Column(name = "chuThich",columnDefinition="TEXT")
    private String chuThich;

    @Override
    public HanVietEntity setAdd(){
        createdDate = new Date();
        modifiedDate = new Date();
        createdBy = "admin";
        modifiedDate = null;
        return this;
    }

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


    public String getNghiaHan() {
        return nghiaHan;
    }

    public void setNghiaHan(String nghiaHan) {
        this.nghiaHan = nghiaHan;
    }

    public String getNghia() {
        return nghia;
    }

    public void setNghia(String nghia) {
        this.nghia = nghia;
    }

    public String getTuGhep() {
        return tuGhep;
    }

    public void setTuGhep(String tuGhep) {
        this.tuGhep = tuGhep;
    }

    public String getThanhNgu() {
        return thanhNgu;
    }

    public void setThanhNgu(String thanhNgu) {
        this.thanhNgu = thanhNgu;
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
