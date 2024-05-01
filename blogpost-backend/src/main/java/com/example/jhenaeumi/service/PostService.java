package com.example.jhenaeumi.service;

import com.example.jhenaeumi.dto.PostDto;
import com.example.jhenaeumi.dto.ListPostDto;

import java.util.List;

public interface PostService {

    PostDto createPost(String token, PostDto postDto, Long categoryId);

    ListPostDto getAllPost(Integer pageNumber, Integer pageSize, String sortBy);

    List<PostDto> getAllPostByUser(Long id);

    PostDto updatePost(String token ,PostDto postDto, Long postId);
    void deletePost(String token, Long postId);
}
