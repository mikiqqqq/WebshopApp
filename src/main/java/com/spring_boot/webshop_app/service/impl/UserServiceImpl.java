package com.spring_boot.webshop_app.service.impl;

import com.spring_boot.webshop_app.model.User;
import com.spring_boot.webshop_app.repository.UserRepo;
import com.spring_boot.webshop_app.service.AuthLevelService;
import com.spring_boot.webshop_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthLevelService authLevelService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email);

        // Resolve the role name using the role ID
        String roleName = authLevelService.findById(user.getAuthLevelId()).getTitle();

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(roleName))
        );
    }

    @Override
    public User findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public void save(User user) {
        userRepo.save(user);
    }
}
