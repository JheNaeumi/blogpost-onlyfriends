package com.example.jhenaeumi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "User")
public class User {

    @Id
    @GeneratedValue
    private String id;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;

}
