package com.example.jhenaeumi.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RateLimited {
    String name() default ""; // This can be used to identify different rate limit configurations
    String token() default ""; // Parameter for passing the token

    int value() default 2;

    long minutes() default 1;
}