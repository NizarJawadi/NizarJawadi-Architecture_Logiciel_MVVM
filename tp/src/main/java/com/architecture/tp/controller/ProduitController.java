package com.architecture.tp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.architecture.tp.model.Produit;
import com.architecture.tp.service.ProduitService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "http://localhost:4200") 
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @GetMapping
    public List<Produit> getAllProduits() {
        return produitService.getAllProduits();
    }

    @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteProduit(@PathVariable Long id) {
    try {
        produitService.delete(id);
        return ResponseEntity.ok().build(); // Renvoie un code 200 avec un corps vide
    } catch (EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 si l'entité n'existe pas
    } catch (Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 pour toute autre erreur
    }
}
    @PostMapping
    public Produit createProduit(@RequestBody Produit produit) {
        return produitService.saveProduit(produit);
    }

     @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable Long id) {
        Produit produit = produitService.findById(id);
        if (produit == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(produit);
    }


    @GetMapping("/search")
    public ResponseEntity<List<Produit>> filterProduit(@RequestParam("searchValue") String label) {
        List<Produit> produit = produitService.findByLabel(label);
        if (produit == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(produit);
    }


      @PutMapping("/{id}")
    public ResponseEntity<Produit> updateProduit(@PathVariable Long id, @RequestBody Produit produitDetails) {
        Produit updatedProduit = produitService.updateProduit(id, produitDetails);
        return updatedProduit != null ? new ResponseEntity<>(updatedProduit, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

  


}