package com.example.jhenaeumi.service.impl;

import com.example.jhenaeumi.dto.PostDto;
import com.example.jhenaeumi.dto.PostResponseDto;
import com.example.jhenaeumi.entity.Category;
import com.example.jhenaeumi.entity.Post;
import com.example.jhenaeumi.entity.User;
import com.example.jhenaeumi.repository.CategoryRepo;
import com.example.jhenaeumi.repository.PostRepo;
import com.example.jhenaeumi.repository.UserRepo;
import com.example.jhenaeumi.service.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private CategoryRepo categoryRepo;

    private Page<Post> pageOfPost;
    @Override
    public PostDto createPost(PostDto postDto, Long userId, Long categoryId) {
        User user = userRepo.findById(userId).orElseThrow(null);
       Category category = categoryRepo.findById(categoryId).orElseThrow(null);

        Post post = this.modelMapper.map(postDto, Post.class);

        post.setPostCreatedDate(new Date());
        post.setUser(user);
        post.setCategory(category);

        Post savedPost = this.postRepo.save(post);

       return this.modelMapper.map(savedPost, PostDto.class);
    }

    @Override
    public PostResponseDto getAllPost(Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).ascending());

        Page<Post> pageOfPost = this.postRepo.findAll(pageable);

        List<Post> findAllPost = pageOfPost.getContent();

        List<PostDto> postDto = findAllPost.stream().map((post) -> this.modelMapper.map(post, PostDto.class)).collect(Collectors.toList());

        PostResponseDto postResponseDto = new PostResponseDto();

        postResponseDto.setContent(postDto);
        postResponseDto.setPageNumber(pageOfPost.getNumber());
        postResponseDto.setPageSize(pageOfPost.getSize());
        postResponseDto.setTotalElements(pageOfPost.getTotalElements());
        postResponseDto.setTotalPages(pageOfPost.getTotalPages());
        postResponseDto.setLastPage(pageOfPost.isLast());
        return postResponseDto;
    }


}
