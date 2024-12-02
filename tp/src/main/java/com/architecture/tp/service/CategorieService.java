package com.architecture.tp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.architecture.tp.model.Categorie;
import com.architecture.tp.repository.CategorieRepository;

@Service
public class CategorieService {
    

    @Autowired
    private CategorieRepository categorieRepository ;

    public List<Categorie> findAll() {
        return categorieRepository.findAll();
    }

    public Categorie save(Categorie categorie) {
        return categorieRepository.save(categorie);
    }
}
