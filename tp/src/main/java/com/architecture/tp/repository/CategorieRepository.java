package com.architecture.tp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.architecture.tp.model.Categorie;

public interface CategorieRepository extends JpaRepository<Categorie,Long> {
    
}
