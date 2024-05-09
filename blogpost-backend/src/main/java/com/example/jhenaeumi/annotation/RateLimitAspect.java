package com.example.jhenaeumi.annotation;

import com.example.jhenaeumi.exceptions.AppException;
import com.example.jhenaeumi.service.impl.UserServiceImpl;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Refill;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Aspect
@Component
public class RateLimitAspect {

    private final Map<String, Bucket> userBuckets = new ConcurrentHashMap<>();
    @Autowired
    private UserServiceImpl userService;
    @Pointcut("@annotation(rateLimited)")
    public void rateLimitedMethods(RateLimited rateLimited) {}

    @Around("rateLimitedMethods(rateLimited) && args(token,..)") // Receive the token as a parameter
    public Object checkRateLimit(ProceedingJoinPoint joinPoint, RateLimited rateLimited, String token) throws Throwable {
        String userId = getUserId(token); // Get user ID using the token

        String key = rateLimited.name() + "_" + userId; // Unique key for each user's rate limit bucket
        if (!userBuckets.containsKey(key)) {
            synchronized (this) {
                if (!userBuckets.containsKey(key)) {
                    // Define rate limit parameters
                    Bandwidth limit = Bandwidth.classic(rateLimited.value(), Refill.intervally(rateLimited.value(), Duration.ofMinutes(rateLimited.minutes())));

                    // Create a Bucket using Bucket4j
                    Bucket bucket = Bucket4j.builder().addLimit(limit).build();
                    userBuckets.put(key, bucket);
                }
            }
        }

        Bucket bucket = userBuckets.get(key);

        // Try to consume a token from the bucket
        if (bucket.tryConsume(1)) {
            // If token is available, proceed with the method execution
            return joinPoint.proceed();
        } else {
            // If rate limit exceeded, throw an exception or handle it as needed
            throw new AppException("Rate limit exceeded", HttpStatus.TOO_MANY_REQUESTS);
        }
    }

    private String getUserId(String token) {
        String logintoken = userService.validateToken(token);
        return logintoken; 
    }
}


         //