package com.example.jhenaeumi.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class LoginDto {
    private String login;
    private char[] password;
}
