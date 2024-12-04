package com.architecture.tp.service;

import java.io.Console;
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
    public List<Produit> findByLabel(String libelle) {
        return produitRepository.findByLibelle(libelle);
    }


    public Produit updateProduit(Long id, Produit produitDetails) {
        Optional<Produit> produitOptional = produitRepository.findById(id);
        if (produitOptional.isPresent()) {
            Produit produit = produitOptional.get();
            produit.setLibelle(produitDetails.getLibelle());
            produit.setDescription(produitDetails.getDescription());
            produit.setPrix(produitDetails.getPrix());
            produit.setImagePath(produitDetails.getImagePath());
            produit.setQteStock(produitDetails.getQteStock());
            produit.setCategorie(produitDetails.getCategorie());
            return produitRepository.save(produit);
        } else {
            return null; 
        }
    }
   }

 