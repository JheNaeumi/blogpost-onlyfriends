package com.example.jhenaeumi.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CommentDto {
    private Long id;

    private String content;

    private PostDto postDto;

    private PostUserDto postUserDto;

}
