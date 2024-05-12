package com.example.jhenaeumi.controller;

import com.example.jhenaeumi.config.UserAuthenticationProvider;
import com.example.jhenaeumi.dto.LoginDto;
import com.example.jhenaeumi.dto.SignUpDto;
import com.example.jhenaeumi.dto.UserDto;
import com.example.jhenaeumi.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AuthController {
    private final UserServiceImpl userService;
    private final UserAuthenticationProvider userAuthenticationProvider;
    @PostMapping("/api/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid LoginDto loginDto) {
        UserDto userDto = userService.login(loginDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto));
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/api/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
        UserDto createdUser = userService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(createdUser));
        return ResponseEntity.ok(createdUser);
    }

    @PostMapping("/api/verify")
    public ResponseEntity<?> verifyUser(@RequestParam String email, @RequestParam String otp){
        try {
            userService.verify(email, otp);
            return new ResponseEntity<>("User verified successfully", HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

}
