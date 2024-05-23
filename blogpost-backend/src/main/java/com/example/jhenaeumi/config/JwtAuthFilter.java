package com.example.jhenaeumi.config;

import com.example.jhenaeumi.exceptions.AppException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;


import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final UserAuthenticationProvider userAuthenticationProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse,
            FilterChain filterChain) throws ServletException, IOException {
        String header = null;
        if(httpServletRequest.getCookies() != null){
            for(Cookie cookie: httpServletRequest.getCookies()){
                if(cookie.getName().equals("accessToken")){
                    header = cookie.getValue();
                }
            }
        }
        //TODO: Change Logic Using Cookies
        if (header != null) {
            //String[] authElements = header.split(" ");
            try {
                SecurityContextHolder.getContext().setAuthentication(
                        userAuthenticationProvider.validateToken(header));
            } catch (RuntimeException e) {
                SecurityContextHolder.clearContext();
                throw e;
            }
//            if (authElements.length == 2
//                    && "Bearer".equals(authElements[0])) {
//
//            }
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
