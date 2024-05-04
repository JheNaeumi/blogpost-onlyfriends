package com.example.jhenaeumi.controller;

import com.example.jhenaeumi.annotation.RateLimited;
import com.example.jhenaeumi.dto.CommentDto;
import com.example.jhenaeumi.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @RateLimited(name = "createComment", token = "{token}", value = 2)
    @PostMapping("/create/{postId}")
    public ResponseEntity<CommentDto> createComment(@RequestHeader("Authorization") String token,@RequestBody @Valid CommentDto commentDto, @PathVariable("postId") Long postId){
        CommentDto createdComment = commentService.createComment(token, commentDto, postId);
        return new ResponseEntity<CommentDto>(createdComment, HttpStatus.CREATED);
    }
    @RateLimited(name = "updateComment", token = "{token}", value = 2)
    @PatchMapping("/update/{commentId}")
    public ResponseEntity<CommentDto> updateComment(@RequestHeader("Authorization") String token,@RequestBody @Valid CommentDto commentDto,@PathVariable("commentId")  Long commentId){
        CommentDto updateComment = commentService.updateComment(token, commentDto, commentId);
        return new ResponseEntity<CommentDto>(updateComment, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<String> deleteComment(@RequestHeader("Authorization") String token, @PathVariable("commentId") Long commentId){
        commentService.deleteComment(token, commentId);
        return new ResponseEntity<>("Comment Deleted",HttpStatus.OK);
    }
}
