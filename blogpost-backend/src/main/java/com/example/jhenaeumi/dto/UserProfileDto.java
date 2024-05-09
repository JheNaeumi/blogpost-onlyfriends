package com.example.jhenaeumi.dto;


import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserProfileDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String login;

}
