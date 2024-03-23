package com.example.jhenaeumi.repository;

import com.example.jhenaeumi.entity.Post;
import com.example.jhenaeumi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {
    List<Post> findByUser(User user);
}
