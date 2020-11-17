package com.nmhung.model;

import java.util.List;

public class NewsModel extends BaseModel {

	public static class ResultApiNews{
		private String status;
		private String url;
		List<NewsModel> lists;


		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public String getUrl() {
			return url;
		}
		public void setUrl(String url) {
			this.url = url;
		}
		public List<NewsModel> getLists() {
			return lists;
		}
		public void setLists(List<NewsModel> lists) {
			this.lists = lists;
		}


	}

	private String title;

	private String author;

	private String source;

	private String description;

	private String content;

	private String imgTitle;

	private String uri;



	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

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
