package com.example.jhenaeumi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class PostDto {
    private Long id;
    @NotBlank
    @Size(min = 5)
    private String postTitle;

    @NotBlank
    @Size(min = 10)
    private String postContent;

    private UserProfileDto user;

    private Date postCreatedDate;

    private CategoryDto category;

    private Set<CommentDto> comments =  new HashSet<>();
}
