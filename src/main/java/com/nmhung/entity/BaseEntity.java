package com.nmhung.entity;
import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;


@MappedSuperclass
public class BaseEntity {

	public BaseEntity() {
		setAdd();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;

	@Column(name = "created_by")
	//@CreatedBy
	protected String createdBy;

	@Column(name = "modified_by")
	//@ModifiedBy
	protected String modifiedBy;

	@Column(name = "created_date")
	//@CreatedDate
	protected Date createdDate;

	@Column(name = "modified_date")
	//@ModifiedDate
	protected Date modifiedDate;

	public void MaintainData(BaseEntity entity){
		createdBy = entity.createdBy;
		modifiedDate = new Date();
		if(createdDate == null){
			createdDate = new Date();
		}
	}

	public BaseEntity setAdd(){
		createdDate = new Date();
		modifiedDate = new Date();
		createdBy = "admin";
		modifiedDate = null;
		return this;
	}



	public Long getId() {
		return id;
	}
	public void setId(Long id){this.id=id;}
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
	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}
	public Date getModifiedDate() {
		return modifiedDate;
	}
	public void setModifiedDate(Timestamp modifiedDate) {
		this.modifiedDate = modifiedDate;
	}
}
