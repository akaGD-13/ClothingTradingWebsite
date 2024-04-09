package com.heroku.java.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "PostTable")
public class Post {
	private String postTitle;
	private String imageUrl_;
	private double itemPrice_;
	private String description_;
	private Boolean sold_;
	private int user_id;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int postID_;

	public Post() {
	}

	public Post(String postTitle, String imageUrl, double itemPrice, String description, Boolean sold, int user_id) {
		this.postTitle = postTitle;
		this.imageUrl_ = imageUrl;
		this.itemPrice_ = itemPrice;
		this.description_ = description;
		this.sold_ = sold;
		this.user_id = user_id;
	}

	// Getters
	public int getUser_id() {
		return user_id;
	}

	public String getPostTitle() {
		return postTitle;
	}

	public String getImageUrl() {
		return imageUrl_;
	}

	public double getItemPrice() {
		return itemPrice_;
	}

	public String getDescription() {
		return description_;
	}

	public Boolean isSold() {
		return sold_;
	}

	public int getPostID() {
		return postID_;
	}

	// Setters
	public void setPostTitle(String postTitle) {
		this.postTitle = postTitle;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl_ = imageUrl;
	}

	public void setItemPrice(double itemPrice) {
		this.itemPrice_ = itemPrice;
	}

	public void setDescription(String description) {
		this.description_ = description;
	}

	public void setSold(Boolean sold) {
		this.sold_ = sold;
	}

	public void setPostID(int postID) {
		this.postID_ = postID;
	}

}
