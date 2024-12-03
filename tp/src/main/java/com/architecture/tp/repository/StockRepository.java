package com.architecture.tp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.architecture.tp.model.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long>{

    // Requêtes personnalisées si nécessaire
} 