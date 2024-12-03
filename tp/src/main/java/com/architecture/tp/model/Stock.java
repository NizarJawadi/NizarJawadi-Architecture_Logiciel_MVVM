package com.architecture.tp.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.antlr.v4.runtime.misc.NotNull;

import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Id;
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
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDate dateDepot;

    @Enumerated(EnumType.STRING)
    private TypeOperation typeOperation; // ENUM : ENTRÉE/SORTIE

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL)
    private List<LigneStock> lignesStock = new ArrayList<>();

    // Getters et Setters
}
