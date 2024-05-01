package com.example.jhenaeumi.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class UserProfileDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String login;
}
