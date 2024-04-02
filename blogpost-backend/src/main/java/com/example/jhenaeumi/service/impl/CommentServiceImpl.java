package com.example.jhenaeumi.service.impl;

import com.example.jhenaeumi.dto.CommentDto;
import com.example.jhenaeumi.entity.Comment;
import com.example.jhenaeumi.entity.Post;
import com.example.jhenaeumi.entity.User;
import com.example.jhenaeumi.exceptions.AppException;
import com.example.jhenaeumi.repository.CommentRepo;
import com.example.jhenaeumi.repository.PostRepo;
import com.example.jhenaeumi.service.CommentService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


@Service
public class CommentServiceImpl implements CommentService {

    private CommentRepo commentRepo;

    private PostRepo postRepo;

    private ModelMapper modelMapper;

    @Override
    public CommentDto createComment(CommentDto commentDto, Long postId) {
        Post post = postRepo.findById(postId).orElseThrow(() -> new AppException("Unknown User", HttpStatus.NOT_FOUND));
        Comment comment = modelMapper.map(commentDto, Comment.class);

        comment.setPost(post);

        Comment saveComment = commentRepo.save(comment);
        return modelMapper.map(saveComment, CommentDto.class);
    }

    @Override
    public void deleteComment(Long postId, Long userId, Long commentId) {
        Comment comment = commentRepo.findById(commentId).orElseThrow(() -> new AppException("Unknown comment", HttpStatus.NOT_FOUND));
        Post post = comment.getPost();
        User user  = post.getUser();
        if(user.getId().equals(userId)){
            commentRepo.delete(comment);
        }else {
            throw new AppException("Unauthorize Request", HttpStatus.UNAUTHORIZED);
        }
    }


}
