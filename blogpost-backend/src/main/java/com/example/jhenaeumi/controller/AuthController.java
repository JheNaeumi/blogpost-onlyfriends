package com.example.jhenaeumi.controller;

import com.example.jhenaeumi.annotation.RateLimited;
import com.example.jhenaeumi.config.UserAuthenticationProvider;
import com.example.jhenaeumi.dto.LoginDto;
import com.example.jhenaeumi.dto.SignUpDto;
import com.example.jhenaeumi.dto.UserDto;
import com.example.jhenaeumi.service.impl.UserServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RequiredArgsConstructor
@RestController
public class AuthController {
    private final UserServiceImpl userService;
    private final UserAuthenticationProvider userAuthenticationProvider;
    @PostMapping("/api/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid LoginDto loginDto, HttpServletResponse response) {
        UserDto userDto = userService.login(loginDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto));
        ResponseCookie cookie = ResponseCookie.from("accessToken", userDto.getToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(120)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
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
    //@RequestHeader("Authorization") String token
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
