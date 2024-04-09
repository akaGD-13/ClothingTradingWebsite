package com.heroku.java.Repositories;
import org.springframework.data.repository.CrudRepository;

import com.heroku.java.Objects.Post;

public interface PostRepository extends CrudRepository<Post, Integer>{
	Post findByPostTitle(String postTitle_);
}
