package com.example.jhenaeumi.service;

import com.example.jhenaeumi.dto.CommentDto;

public interface CommentService {

    CommentDto createComment(String token, CommentDto commentDto, Long postId);

    CommentDto updateComment(String token, CommentDto commentDto, Long postId);
    void deleteComment(String token, Long commentId);
}
