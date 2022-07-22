package com.spring_boot.webshop_app.repository.impl;

import com.spring_boot.webshop_app.model.Item;
import com.spring_boot.webshop_app.repository.ItemCustomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class ItemCustomRepositoryImpl implements ItemCustomRepository {
    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Item> findByName(String name) {

        return entityManager
                .createQuery("select i from Item i where i.name = :name", Item.class)
                .setParameter("name", name)
                .getResultList();

    }
}
