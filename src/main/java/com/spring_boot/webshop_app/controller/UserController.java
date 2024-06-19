package com.spring_boot.webshop_app.controller;

import com.spring_boot.webshop_app.form.UserForm;
import com.spring_boot.webshop_app.model.User;
import com.spring_boot.webshop_app.service.AuthLevelService;
import com.spring_boot.webshop_app.service.UserService;
import com.spring_boot.webshop_app.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping(value = "/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthLevelService authLevelService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email is already taken.");
        }

        user.setName(user.getName());
        user.setEmail(user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setAuthLevelId(authLevelService.findIdByTitle("USER"));

        userService.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody UserForm userForm) {
        User user = userService.findByEmail(userForm.getEmail());

        if (!passwordEncoder.matches(userForm.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        final String jwt = jwtUtil.generateToken(user);
        return ResponseEntity.ok(jwt); // Return the token directly
    }
}
