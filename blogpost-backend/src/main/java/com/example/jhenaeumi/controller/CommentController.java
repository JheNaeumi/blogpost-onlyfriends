package com.example.jhenaeumi.controller;

import com.example.jhenaeumi.dto.CommentDto;
import com.example.jhenaeumi.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    private CommentService commentService;

    @PostMapping("/create")
    public ResponseEntity<CommentDto> createComment(@RequestBody @Valid CommentDto commentDto, Long postId){
        CommentDto createdComment = commentService.createComment(commentDto, postId);
        return new ResponseEntity<CommentDto>(createdComment, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{userId}/{postId}/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable("userId") Long userId, @PathVariable("postId") Long postId, @PathVariable("commentId") Long commentId){
        commentService.deleteComment(postId, userId, commentId);
        return new ResponseEntity<>("Comment Deleted",HttpStatus.OK);
    }
}
