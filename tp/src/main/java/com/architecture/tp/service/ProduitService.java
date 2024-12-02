package com.architecture.tp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.architecture.tp.model.Produit;
import com.architecture.tp.repository.ProduitRepository;

@Service
public class ProduitService {
    @Autowired
    private ProduitRepository produitRepository;
   
   
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }
    public Produit saveProduit(Produit produit) {
        
        return produitRepository.save(produit);
    }
    public Produit findById(Long id) {
    Optional<Produit> produit = produitRepository.findById(id);
    return produit.orElse(null);
    }
    public void delete(Long id) {
    produitRepository.deleteById(id);
    }

    public List<Produit> searchByLibelleAndPrix(String libelle, Double prix) {
        return produitRepository.findByLibelleContainingAndPrixLessThanEqual(libelle, prix);
    }
   }

 