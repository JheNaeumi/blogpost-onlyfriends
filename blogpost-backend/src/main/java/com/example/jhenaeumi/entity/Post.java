package com.example.jhenaeumi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column( name = "post_title", length = 100, nullable = false)
    private String title;

    @Column(name = "post_content", length=2000)
    private String postContent;

    @Column(name = "post_image")
    private String postImage;

    @Column(name = "post_date")
    private Date postCreatedDate;


    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private Set<Comment> comments= new HashSet<>();


}
