package com.example.jhenaeumi.service;

import com.example.jhenaeumi.dto.PostDto;
import com.example.jhenaeumi.dto.PostResponseDto;

import java.util.List;

public interface PostService {

    PostDto createPost(PostDto postDto, Long userId, Long postId);

    PostResponseDto getAllPost(Integer pageNumber, Integer pageSize, String sortBy);

    List<PostDto> getAllPostByUser(String name);

    void deletePost(Long userId, Long postId);
}
