package com.architecture.tp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.architecture.tp.model.LigneStock;
import com.architecture.tp.model.Stock;
import com.architecture.tp.repository.StockRepository;
import com.architecture.tp.service.StockService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/stocks")
public class StockController {
    @Autowired
    private StockService stockService;
    private StockRepository stockRepository ;

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockService.getAllStocks();
    }

    // @PostMapping
    // public Stock createStock(@RequestBody Stock stock) {
    //     return stockService.saveStock(stock);
    // }

    @PostMapping
    public Stock createStock(@RequestBody Stock stock) {
        stock.getLignesStock().forEach(ligne -> ligne.setStock(stock));
        return stockService.saveStock(stock);
    }
    

    public Stock saveStock(Stock stock) {
        return stockRepository.save(stock); // Cascade sur les lignes de stock
    }
    

    @GetMapping("/{id}")
    public Stock getStockById(@PathVariable Long id) {
        return stockService.getStockById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteStock(@PathVariable Long id) {
        stockService.deleteStock(id);
    }
}
