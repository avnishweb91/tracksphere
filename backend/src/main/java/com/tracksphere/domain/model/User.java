package com.tracksphere.domain.model;
import jakarta.persistence.*; import lombok.*; import java.time.Instant; import java.util.*;
@Entity @Table(name="users") @Getter @NoArgsConstructor(access=AccessLevel.PROTECTED)
public class User {
 @Id private UUID id; @Column(nullable=false,unique=true,length=254) private String email; @Column(name="password_hash",nullable=false,length=100) private String passwordHash; @Column(name="first_name",nullable=false,length=100) private String firstName; @Column(name="last_name",nullable=false,length=100) private String lastName; @Column(nullable=false) private boolean enabled=true;
 @ManyToMany(fetch=FetchType.EAGER) @JoinTable(name="user_roles",joinColumns=@JoinColumn(name="user_id"),inverseJoinColumns=@JoinColumn(name="role_id")) private Set<Role> roles=new HashSet<>();
 @Column(name="created_at",nullable=false,updatable=false) private Instant createdAt; @Column(name="updated_at",nullable=false) private Instant updatedAt;
 public User(String email,String passwordHash,String firstName,String lastName,Set<Role> roles){id=UUID.randomUUID();this.email=email;this.passwordHash=passwordHash;this.firstName=firstName;this.lastName=lastName;this.roles=roles;}
 @PrePersist void create(){createdAt=Instant.now();updatedAt=createdAt;} @PreUpdate void update(){updatedAt=Instant.now();}
}
