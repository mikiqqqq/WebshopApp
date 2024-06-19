package com.spring_boot.webshop_app.service.impl;

import com.spring_boot.webshop_app.model.AuthorizationLevel;
import com.spring_boot.webshop_app.repository.AuthLevelRepo;
import com.spring_boot.webshop_app.service.AuthLevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthLevelServiceImpl implements AuthLevelService {
    @Autowired
    AuthLevelRepo authLevelRepo;

    @Override
    public AuthorizationLevel findById(int id){
        return authLevelRepo.findById(id);
    }

    @Override
    public int findIdByTitle(String title) {
        return authLevelRepo.findIdByTitle(title);
    }
}
