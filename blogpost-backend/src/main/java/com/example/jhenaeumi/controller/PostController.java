package com.example.jhenaeumi.controller;

import com.example.jhenaeumi.config.ApplicationConstants;
import com.example.jhenaeumi.dto.PostDto;
import com.example.jhenaeumi.dto.PostResponseDto;
import com.example.jhenaeumi.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    PostService postService;

    @PostMapping("/user/{userId}/category/{categoryId}/posts")
    public ResponseEntity<PostDto> createPost(@Valid @RequestBody PostDto postDto, @PathVariable Long userId, @PathVariable Long categoryId){
        PostDto createdPost = this.postService.createPost(postDto, userId, categoryId);

        return new ResponseEntity<PostDto>(createdPost, HttpStatus.CREATED);
    }
    @GetMapping("/getAllPost")
    public ResponseEntity<PostResponseDto> getAllPost(
            @RequestParam(value = "pageNumber", defaultValue = ApplicationConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = ApplicationConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = ApplicationConstants.SORT_BY, required = false) String sortBy){
        PostResponseDto responeDto = this.postService.getAllPost(pageNumber,pageSize, sortBy);
        return new ResponseEntity<PostResponseDto>(responeDto, HttpStatus.OK);
    }
}
