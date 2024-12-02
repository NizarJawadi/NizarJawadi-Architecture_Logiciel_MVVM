package com.architecture.tp.configuration;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig implements WebMvcConfigurer{
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Autorise les requêtes sur toutes les routes
                .allowedOrigins("http://localhost:4200")  // Autorise les requêtes provenant de localhost:4200
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Méthodes autorisées
                .allowedHeaders("*");  // Autorise tous les headers
    }
}
