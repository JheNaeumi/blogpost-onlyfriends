package com.example.jhenaeumi.service;

import com.example.jhenaeumi.dto.PostDto;
import com.example.jhenaeumi.dto.PostResponseDto;

import java.util.List;

public interface PostService {

    PostDto createPost(String token, PostDto postDto, Long categoryId);

    PostResponseDto getAllPost(Integer pageNumber, Integer pageSize, String sortBy);

    List<PostDto> getAllPostByUser(String name);

    PostDto updatePost(String token ,PostDto postDto, Long postId);
    void deletePost(String token, Long postId);
}
