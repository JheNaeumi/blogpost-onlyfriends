package com.example.jhenaeumi.service.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.jhenaeumi.dto.LoginDto;
import com.example.jhenaeumi.dto.UserProfileDto;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    private final UserRepo userRepository;

    private final PasswordEncoder passwordEncoder;

    // private final UserMapper userMapper;  (Mapstruct)

    private final ModelMapper modelMapper; //ModelMapper

    private final EmailService emailService;

    @PostConstruct
    protected void init() {
        // this is to avoid having the raw secret key available in the JVM
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    @Override
    public UserDto login(LoginDto loginDto) {
        User user = userRepository.findByLogin(loginDto.getLogin())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        //check if enabled
        if(!user.isVerified()){
            throw new AppException("Account not Verfiied", HttpStatus.UNAUTHORIZED);
        }
        //check password
        if (passwordEncoder.matches(CharBuffer.wrap(loginDto.getPassword()), user.getPassword())) {
            return modelMapper.map(user, UserDto.class);//userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    @Override
    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalUser = userRepository.findByLogin(userDto.getLogin());

        if (optionalUser.isPresent()) {
            throw new AppException("User already exists", HttpStatus.BAD_REQUEST);
        }

        User user = modelMapper.map(userDto, User.class);//userMapper.signUpToUser(userDto);
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));

        String otp = generateOTP();
        user.setOtp(otp);

        User savedUser = userRepository.save(user);
        sendVerificationEmail(savedUser.getLogin(), otp);
        return modelMapper.map(savedUser, UserDto.class);//userMapper.toUserDto(savedUser);
    }

    @Override
    public UserDto findByLogin(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return modelMapper.map(user, UserDto.class);//userMapper.toUserDto(user);
    }

    @Override
    public UserDto updateUserProfile(String logintoken, SignUpDto signUpDto) {
        String login = validateToken(logintoken);
        if (!login.equals(signUpDto.getLogin())) {
            throw new AppException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        User user = userRepository.findByLogin(signUpDto.getLogin())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        user.setFirstName(signUpDto.getFirstName());
        user.setLastName(signUpDto.getLastName());
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUpDto.getPassword())));
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDto.class);//userMapper.toUserDto(savedUser);
    }

    @Override
    public UserProfileDto getUserProfile(String logintoken) {
        String login = validateToken(logintoken);
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        return modelMapper.map(user, UserProfileDto.class);//userMapper.toUserProfileDto(user);modelMapper.map(user, UserProfileDto.class);
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
    public List<UserProfileDto> listAllUser(String name) {
        Pageable pageable = PageRequest.of(0, 3);
        List<User> user = userRepository.findByFirstNameOrLastName(name, pageable);
        List<UserProfileDto> userDto = user.stream().map((user1) -> modelMapper.map(user1, UserProfileDto.class)).collect(Collectors.toList()); //modelMapper.map(user1, UserProfileDto.class )
        return userDto;
    }

    @Override
    public void verify(String email, String otp) {
        User users = userRepository.findByLogin(email).orElseThrow(() -> new RuntimeException("Unknown user"));
        if (users.isVerified()) {
             throw new RuntimeException("User is already verified");
         } else if (otp.equals(users.getOtp())) {
            users.setVerified(true);
            userRepository.save(users);
        }else {
            throw new RuntimeException("Internal Server error");
        }
    }

    private String generateOTP(){
        Random random = new Random();
        int otpValue = 100000 + random.nextInt(900000);
        return String.valueOf(otpValue);
    }

    private void sendVerificationEmail(String email,String otp){
        String subject = "Email verification";
        //String verificationLink = "http://localhost:8080/verify?email=" + email + "&otp=" + otp; //localhost
        String verificationLink = " https://onlyfriendsblogpost.online/verify?email=" + email + "&otp=" + otp; //production
        String body = "Click <a href=\"" + verificationLink + "\">here</a> to verify your email.";
        emailService.sendEmail(email,subject,body);
    }

}



