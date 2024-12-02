package com.architecture.tp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.architecture.tp.model.Produit;
import com.architecture.tp.service.ProduitService;


@Controller
@RequestMapping("/produits")
public class ProduitController {

 @Autowired
 private ProduitService produitService;
 @GetMapping
 public String getAllProduits(Model model) {
 model.addAttribute("produits", produitService.findAll());
 return "produits"; // Nom de la vue
 }



 @PostMapping("/add")
 public String addProduit(Produit produit) {
 produitService.save(produit);
 return "redirect:/produits"; // Rediriger vers la liste des produits
 }



  

    @GetMapping("/details/{id}")
    public String productDetails(@PathVariable Long id, Model model) {
        Produit produit = produitService.findById(id);
        if (produit != null) {
            model.addAttribute("produit", produit);
            return "details";
        } else {
            return "redirect:/produits"; // Redirige si l'ID est invalide
        }
    }

    // Affiche le formulaire de modification pour un produit spécifique
    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable Long id, Model model) {
        Produit produit = produitService.findById(id);
        if (produit != null) {
            model.addAttribute("produit", produit);
            return "edit"; // Renvoie vers le template edit.html
        } else {
            return "redirect:/produits"; // Redirige vers la liste des produits si l'ID est invalide
        }
    }

    // Enregistre les modifications du produit
    @PostMapping("/update/{id}")
    public String updateProduit(@PathVariable Long id, Produit produitDetails) {
        Produit produit = produitService.findById(id);
        if (produit != null) {
            produit.setLibelle(produitDetails.getLibelle());
            produit.setPrix(produitDetails.getPrix());
            produit.setQteStock(produitDetails.getQteStock());
            produitService.save(produit); // Enregistre les modifications
        }
        return "redirect:/produits"; // Redirige vers la liste des produits après modification
    }


    @GetMapping("/search")
public String searchProduits(String libelle, Double prix, Model model) {
    model.addAttribute("produits", produitService.searchByLibelleAndPrix(libelle, prix));
    return "produits"; // Renvoie vers la vue produits.html avec les résultats de la recherche
}


}

