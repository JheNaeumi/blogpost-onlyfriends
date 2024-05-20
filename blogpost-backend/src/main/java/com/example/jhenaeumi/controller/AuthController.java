package com.example.jhenaeumi.controller;

import com.example.jhenaeumi.annotation.RateLimited;
import com.example.jhenaeumi.config.UserAuthenticationProvider;
import com.example.jhenaeumi.dto.LoginDto;
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
    public ResponseEntity<?> register(@RequestBody @Valid SignUpDto user) {
        UserDto createdUser = userService.register(user);
        return ResponseEntity.ok("User Registered");
    }

    @GetMapping("/api/verify")
    public ResponseEntity<?> verifyUser(@RequestParam(name = "email", required = true) String email, @RequestParam(name = "otp", required = true) String otp){
        try{
            userService.verify(email, otp);
            return new ResponseEntity<>("User verified successfully", HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/api/token")
    public ResponseEntity<?> checkToken(@RequestHeader("Authorization") String token){
        try{
            userService.validateToken(token);
            return new ResponseEntity<>("Token is Valid", HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>("Token is Invalid", HttpStatus.UNAUTHORIZED);
        }
    }
}
