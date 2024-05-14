package com.example.jhenaeumi.repository;

import com.example.jhenaeumi.entity.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {
    @Query(value = "SELECT * FROM categories WHERE id IS NOT NULL", nativeQuery = true)
    Category getAllCategory();
}
