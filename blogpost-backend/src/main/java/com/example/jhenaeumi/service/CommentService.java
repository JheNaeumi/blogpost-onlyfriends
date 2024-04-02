package com.example.jhenaeumi.service;

import com.example.jhenaeumi.dto.CommentDto;

public interface CommentService {

    CommentDto createComment(CommentDto commentDto, Long postId);

    void deleteComment(Long postId, Long userId, Long commentId);
}
