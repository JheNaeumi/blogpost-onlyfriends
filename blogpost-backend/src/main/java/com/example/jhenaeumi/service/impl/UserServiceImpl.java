package com.example.jhenaeumi.service.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.jhenaeumi.dto.CredentialsDto;
import com.example.jhenaeumi.dto.PostUserDto;
import com.example.jhenaeumi.dto.SignUpDto;
import com.example.jhenaeumi.dto.UserDto;
import com.example.jhenaeumi.entity.User;
import com.example.jhenaeumi.enums.Role;
import com.example.jhenaeumi.exceptions.AppException;
import com.example.jhenaeumi.mappers.UserMapper;
import com.example.jhenaeumi.repository.UserRepo;
import com.example.jhenaeumi.service.UserService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    private final UserRepo userRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserMapper userMapper;


    @Autowired
    private ModelMapper modelMapper;

    @PostConstruct
    protected void init() {
        // this is to avoid having the raw secret key available in the JVM
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }
    @Override
    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByLogin(credentialsDto.getLogin())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    @Override
    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalUser = userRepository.findByLogin(userDto.getLogin());

        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(userDto);
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));

        User savedUser = userRepository.save(user);

        return userMapper.toUserDto(savedUser);
    }
    @Override
    public UserDto findByLogin(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }

    @Override
    public UserDto updateUserProfile(String logintoken, SignUpDto signUpDto) {
        String login = validateToken(logintoken);
        if(!login.equals(signUpDto.getLogin())){
            throw new AppException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        User user = userRepository.findByLogin(signUpDto.getLogin())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        user.setFirstName(signUpDto.getFirstName());
        user.setLastName(signUpDto.getLastName());
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUpDto.getPassword())));
        User savedUser = userRepository.save(user);
        return userMapper.toUserDto(savedUser);
    }

    @Override
    public PostUserDto getUserProfile(String logintoken) {
        String login = validateToken(logintoken);
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        return modelMapper.map(user, PostUserDto.class);
    }

    @Override
    public String validateToken(String logintoken) {
        String[] authElements = logintoken.split(" ");
        String login = authElements[1];
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        JWTVerifier verifier = JWT.require(algorithm)
                .build();

        DecodedJWT decoded = verifier.verify(login);
        return decoded.getSubject();
    }

    @Override
    public List<PostUserDto> listAllUser(String name) {
        List<User> user = userRepository.findByFirstNameOrLastName(name);
        List<PostUserDto> userDto = user.stream().map((user1)->modelMapper.map(user1, PostUserDto.class )).collect(Collectors.toList());
        return userDto;
    }

}
