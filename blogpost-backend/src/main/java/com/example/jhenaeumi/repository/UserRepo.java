package com.example.jhenaeumi.repository;

import com.example.jhenaeumi.entity.Post;
import com.example.jhenaeumi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByLogin(String login);

    @Query(value = "SELECT * FROM user WHERE CONCAT(first_name, ' ', last_name) LIKE %:name% OR CONCAT(first_name, last_name) LIKE %:name%", nativeQuery = true)
    List<User> findByFirstNameOrLastName(String name);
}
