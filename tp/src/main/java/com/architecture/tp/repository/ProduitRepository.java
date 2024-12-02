package com.architecture.tp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.architecture.tp.model.Produit;

public interface ProduitRepository extends JpaRepository<Produit,Long>{

    List<Produit> findByLibelleContainingAndPrixLessThanEqual(String libelle, Double prix);


}