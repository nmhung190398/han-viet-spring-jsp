package com.nmhung.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "news")
public class NewsEntity extends BaseEntity {


	@Column(name = "title",columnDefinition="TEXT")
	private String title;

	@Column(name = "author")
	private String author;

	@Column(name = "source")
	private String source;

	@Column(name = "description",columnDefinition="TEXT")
	private String description;

	@Column(name = "content",columnDefinition="TEXT")
	private String content;

	@Column(name = "uri",columnDefinition="TEXT")
	private String uri;



	public String getUri() {
		return uri;
	}
	public void setUri(String uri) {
		this.uri = uri;
	}
	@Column(name = "img_title")
	private String imgTitle;
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getImgTitle() {
		return imgTitle;
	}
	public void setImgTitle(String imgTitle) {
		this.imgTitle = imgTitle;
	}



}
