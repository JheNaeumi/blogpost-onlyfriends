package com.example.jhenaeumi.service.impl;

import com.example.jhenaeumi.dto.CommentDto;
import com.example.jhenaeumi.entity.Comment;
import com.example.jhenaeumi.entity.Post;
import com.example.jhenaeumi.entity.User;
import com.example.jhenaeumi.exceptions.AppException;
import com.example.jhenaeumi.repository.CommentRepo;
import com.example.jhenaeumi.repository.PostRepo;
import com.example.jhenaeumi.repository.UserRepo;
import com.example.jhenaeumi.service.CommentService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CommentServiceImpl implements CommentService {

    private CommentRepo commentRepo;

    private PostRepo postRepo;

    private ModelMapper modelMapper;

    private UserServiceImpl userService;

    private UserRepo userRepo;
    @Override
    public CommentDto createComment(String token, CommentDto commentDto, Long postId) {
        String logintoken = userService.validateToken(token);
        User user = userRepo.findByLogin(logintoken).orElseThrow(()-> new AppException("Unknown User", HttpStatus.NOT_FOUND));
        Post post = postRepo.findById(postId).orElseThrow(() -> new AppException("Unknown User", HttpStatus.NOT_FOUND));
        Comment comment = modelMapper.map(commentDto, Comment.class);
        comment.setUser(user);
        comment.setPost(post);

        Comment saveComment = commentRepo.save(comment);
        return modelMapper.map(saveComment, CommentDto.class);
    }

    @Override
    public CommentDto updateComment(String token, CommentDto commentDto, Long commentId) {
        String logintoken = userService.validateToken(token);
        Comment comment = commentRepo.findById(commentId).orElseThrow(() -> new AppException("Unknown comment", HttpStatus.NOT_FOUND));
        User user = comment.getUser();
        if(user.getLogin().equals(logintoken)) {
            comment.setCommentContent(commentDto.getCommentContent());
            comment.setUser(comment.getUser());
            comment.setPost(comment.getPost());
            Comment savedComment = commentRepo.save(comment);

            return modelMapper.map(savedComment, CommentDto.class);
        }
        else {

            throw new AppException("Unauthorize Request", HttpStatus.UNAUTHORIZED);

        }

    }

    //TODO: updateCommentService (Must Be user own Comment) same with Delete
    @Override
    public void deleteComment(String token, Long commentId) {
        Comment comment = commentRepo.findById(commentId).orElseThrow(() -> new AppException("Unknown comment", HttpStatus.NOT_FOUND));
        User user  = comment.getUser();
        String logintoken = userService.validateToken(token);
        if(user.getLogin().equals(logintoken)) {
            commentRepo.delete(comment);
        }
        else {
            throw new AppException("Unauthorize Request", HttpStatus.UNAUTHORIZED);
        }
    }


}
