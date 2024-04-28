package com.example.jhenaeumi.service;

import com.example.jhenaeumi.dto.CredentialsDto;
import com.example.jhenaeumi.dto.PostUserDto;
import com.example.jhenaeumi.dto.SignUpDto;
import com.example.jhenaeumi.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto login(CredentialsDto credentialsDto);

    UserDto register(SignUpDto signUpDto);

    UserDto findByLogin(String login);

    UserDto updateUserProfile(String logintoken, SignUpDto signUpDto);

    PostUserDto getUserProfile(String logintoken);

    String validateToken(String logintoken);

    List<PostUserDto> listAllUser(String name);
}
