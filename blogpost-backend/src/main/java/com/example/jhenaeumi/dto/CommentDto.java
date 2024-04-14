package com.example.jhenaeumi.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class CommentDto {
    private Long id;

    private String commentContent;

    private PostUserDto user;

}
