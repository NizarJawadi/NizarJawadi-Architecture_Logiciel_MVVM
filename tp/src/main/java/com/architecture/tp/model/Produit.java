package com.architecture.tp.model;


import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Produit {
    
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 private String libelle;
 private String description ;
 private Double prix;

 private String imagePath;
 private Integer qteStock; 

 @ManyToOne
 @JoinColumn(name = "categorie_id", referencedColumnName = "id", columnDefinition = "BIGINT")
 private Categorie categorie;
 


}