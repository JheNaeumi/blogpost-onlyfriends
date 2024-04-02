package com.example.jhenaeumi.controller;

import com.example.jhenaeumi.config.UserAuthenticationProvider;
import com.example.jhenaeumi.dto.PostUserDto;
import com.example.jhenaeumi.dto.SignUpDto;
import com.example.jhenaeumi.dto.UserDto;
import com.example.jhenaeumi.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserServiceImpl userService;

    @PutMapping("/profile/update")
    public ResponseEntity<UserDto> updateProfile(@RequestHeader("Authorization") String token, @RequestBody @Valid SignUpDto user){
        UserDto updatedUser = userService.updateUserProfile(token, user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
    @GetMapping("/profile")
    public ResponseEntity<PostUserDto> getProfile(@RequestHeader("Authorization") String token){
        PostUserDto getuser = userService.getUserProfile(token);
        return new ResponseEntity<>(getuser, HttpStatus.OK);
    }

}
