package com.example.jhenaeumi.service;

import com.example.jhenaeumi.dto.CredentialsDto;
import com.example.jhenaeumi.dto.SignUpDto;
import com.example.jhenaeumi.dto.UserDto;

public interface UserService {
    UserDto login(CredentialsDto credentialsDto);

    UserDto register(SignUpDto signUpDto);

    UserDto findByLogin(String login);
}
