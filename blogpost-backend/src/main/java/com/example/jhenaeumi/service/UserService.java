package com.example.jhenaeumi.service;

import com.example.jhenaeumi.dto.LoginDto;
import com.example.jhenaeumi.dto.UserProfileDto;
import com.example.jhenaeumi.dto.SignUpDto;
import com.example.jhenaeumi.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto login(LoginDto loginDto);

    UserDto register(SignUpDto signUpDto);

    UserDto findByLogin(String login);

    UserDto updateUserProfile(String logintoken, SignUpDto signUpDto);

    UserProfileDto getUserProfile(String logintoken);

    String validateToken(String logintoken);

    List<UserProfileDto> listAllUser(String name);
}
