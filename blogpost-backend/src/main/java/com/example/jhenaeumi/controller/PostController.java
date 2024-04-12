package com.example.jhenaeumi.controller;

import com.example.jhenaeumi.config.ApplicationConstants;
import com.example.jhenaeumi.dto.PostDto;
import com.example.jhenaeumi.dto.PostResponseDto;
import com.example.jhenaeumi.entity.Post;
import com.example.jhenaeumi.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    PostService postService;

    @PostMapping("/user/category/{categoryId}")
    public ResponseEntity<PostDto> createPost(@RequestHeader("Authorization") String token, @Valid @RequestBody PostDto postDto, @PathVariable Long categoryId){
        PostDto createdPost = this.postService.createPost(token, postDto,categoryId);

        return new ResponseEntity<PostDto>(createdPost, HttpStatus.CREATED);
    }
    @GetMapping("/user/all")
    public ResponseEntity<PostResponseDto> getAllPost(
            @RequestParam(value = "pageNumber", defaultValue = ApplicationConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = ApplicationConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = ApplicationConstants.SORT_BY, required = false) String sortBy){
        PostResponseDto responeDto = this.postService.getAllPost(pageNumber,pageSize, sortBy);
        return new ResponseEntity<PostResponseDto>(responeDto, HttpStatus.OK);
    }
    @GetMapping("/user/{name}/all")
    public ResponseEntity<List<PostDto>> getPostByUser(@PathVariable("name") String name){
        List<PostDto> postDto = postService.getAllPostByUser(name);
        return new ResponseEntity<List<PostDto>>(postDto, HttpStatus.OK);
    }

    @PatchMapping("/user/update/{postId}")
    public ResponseEntity<PostDto> updatePost(@RequestHeader("Authorization") String token, @Valid @RequestBody PostDto postDto, @PathVariable("postId") Long postId){
        PostDto updatedPost = postService.updatePost(token, postDto, postId);
        return new ResponseEntity<PostDto>(updatedPost, HttpStatus.CREATED);
    }
    @DeleteMapping("/user/delete/{postId}")
    public ResponseEntity<String> deletePost(@RequestHeader("Authorization") String token, @PathVariable("postId") Long postId){
        postService.deletePost(token, postId);

        return new ResponseEntity<>("Post Deleted",HttpStatus.OK);
    }
}
