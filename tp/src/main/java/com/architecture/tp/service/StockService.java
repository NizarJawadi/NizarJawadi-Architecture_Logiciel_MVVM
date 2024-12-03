package com.architecture.tp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.architecture.tp.model.Stock;
import com.architecture.tp.repository.StockRepository;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    /**
     * Récupère tous les stocks.
     *
     * @return une liste de tous les stocks
     */
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    /**
     * Enregistre un nouveau stock ou met à jour un stock existant.
     *
     * @param stock Le stock à enregistrer
     * @return Le stock enregistré
     */
    public Stock saveStock(Stock stock) {
        return stockRepository.save(stock);
    }

    /**
     * Récupère un stock par son ID.
     *
     * @param id L'ID du stock
     * @return Le stock correspondant ou null s'il n'existe pas
     */
    public Stock getStockById(Long id) {
        Optional<Stock> stock = stockRepository.findById(id);
        return stock.orElse(null);
    }

    /**
     * Supprime un stock par son ID.
     *
     * @param id L'ID du stock à supprimer
     */
    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }
}
