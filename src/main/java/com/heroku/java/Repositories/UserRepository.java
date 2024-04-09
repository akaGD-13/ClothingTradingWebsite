package com.heroku.java.Repositories;

import org.springframework.data.repository.CrudRepository;

import com.heroku.java.Objects.User;

public interface UserRepository extends CrudRepository<User, Integer> {
	  User findByUsername(String username);
}