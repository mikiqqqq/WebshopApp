package com.spring_boot.webshop_app.service;

import com.spring_boot.webshop_app.model.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {
    User findByEmail(String email);
    void save(User user);
    UserDetails loadUserByUsername(String email);
}
