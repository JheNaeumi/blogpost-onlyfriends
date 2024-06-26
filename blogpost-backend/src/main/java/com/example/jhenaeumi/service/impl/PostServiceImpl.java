package com.example.jhenaeumi.service.impl;

import com.example.jhenaeumi.dto.ListPostDto;
import com.example.jhenaeumi.dto.PostDto;
import com.example.jhenaeumi.entity.Category;
import com.example.jhenaeumi.entity.Post;
import com.example.jhenaeumi.entity.User;
import com.example.jhenaeumi.exceptions.AppException;
import com.example.jhenaeumi.repository.CategoryRepo;
import com.example.jhenaeumi.repository.PostRepo;
import com.example.jhenaeumi.repository.UserRepo;
import com.example.jhenaeumi.service.PostService;
import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

import java.util.stream.Collectors;


@RequiredArgsConstructor
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

    @Autowired
    private UserServiceImpl userService;
    @Override
    public PostDto createPost(String token, PostDto postDto, Long categoryId) {
        String logintoken = userService.validateToken(token);
        User user = userRepo.findByLogin(logintoken).orElseThrow(()-> new AppException("Unknown User", HttpStatus.NOT_FOUND));

        Post post = this.modelMapper.map(postDto, Post.class);

        post.setPostCreatedDate(new Date());
        post.setUser(user);

        Category category = categoryRepo.getAllCategory();
        //check if there is an existing category
        if(category==null){
            category = new Category();
            category.setId(1L);
            category.setCategoryTitle("Latest");
            category.setCategoryDescription("List all latest post");
            categoryRepo.save(category);
        }
        //otherwise set the current category
        Category category1 = categoryRepo.findById(categoryId).orElseThrow(null);
        post.setCategory(category1);

        Post savedPost = this.postRepo.save(post);

       return this.modelMapper.map(savedPost, PostDto.class);
    }

    @Override
    public ListPostDto getAllPost(Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());

        pageOfPost = this.postRepo.findAll(pageable);

        List<Post> findAllPost = pageOfPost.getContent();

        List<PostDto> postDto = findAllPost.stream().map((post) -> this.modelMapper.map(post, PostDto.class)).collect(Collectors.toList());

        ListPostDto postResponseDto = new ListPostDto();

        postResponseDto.setContent(postDto);
        postResponseDto.setPageNumber(pageOfPost.getNumber());
        postResponseDto.setPageSize(pageOfPost.getSize());
        postResponseDto.setTotalElements(pageOfPost.getTotalElements());
        postResponseDto.setTotalPages(pageOfPost.getTotalPages());
        postResponseDto.setLastPage(pageOfPost.isLast());
        return postResponseDto;
    }

    @Override
    public List<PostDto> getAllPostByUser(Long id) {
        User user = userRepo.findById(id).orElseThrow(()-> new AppException("Unknown User", HttpStatus.NOT_FOUND));
        List<Post> listofPostByUser = postRepo.findByUser(user);
        List<PostDto> postDto = listofPostByUser.stream().map((post)-> modelMapper.map(post, PostDto.class)).collect(Collectors.toList());
        return postDto;
    }

    @Override
    public PostDto updatePost(String token, PostDto postDto, Long postId) {
        String logintoken = userService.validateToken(token);
        Post post = postRepo.findById(postId).orElseThrow(() -> new AppException("Unknown Post", HttpStatus.NOT_FOUND));
        User user = post.getUser();
        if(user.getLogin().equals(logintoken)){
            post.setPostTitle(postDto.getPostTitle());
            post.setPostContent(postDto.getPostContent());
            post.setPostCreatedDate(new Date());
            Post savedpost = postRepo.save(post);
            return modelMapper.map(savedpost, PostDto.class);
        }else {
            throw new AppException("Unauthorize Own User Post", HttpStatus.UNAUTHORIZED);
        }
    }

   
    @Override
    public void deletePost(String token,Long postId) {
        String logintoken = userService.validateToken(token);
        Post post = postRepo.findById(postId).orElseThrow(() -> new AppException("Unknown Post", HttpStatus.NOT_FOUND));
        User user = post.getUser();
        if(user.getLogin().equals(logintoken))
        {
            postRepo.delete(post);
        }else {
            throw new AppException("Unauthorize Deletion", HttpStatus.UNAUTHORIZED);

        }
    }


}
