package com.spring_boot.webshop_app.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class UserForm {
    @NotEmpty(message = "Email is required")
    @Email(message = "Invalid email address")
    private String email;


    @NotEmpty(message = "Password is required")
    @Size(min = 5, message = "Password should have at least 5 characters")
    private String password;
}
