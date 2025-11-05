package com.school.equipmentlending.util;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import lombok.extern.slf4j.Slf4j;

/**
 * Utility class for managing Hibernate EntityManagerFactory
 */
@Slf4j
public class HibernateUtil {
    
    private static final EntityManagerFactory entityManagerFactory;
    
    static {
        try {
            entityManagerFactory = Persistence.createEntityManagerFactory("equipment-lending-pu");
            log.info("EntityManagerFactory initialized successfully");
        } catch (Throwable ex) {
            log.error("Failed to initialize EntityManagerFactory", ex);
            throw new ExceptionInInitializerError(ex);
        }
    }
    
    public static EntityManagerFactory getEntityManagerFactory() {
        return entityManagerFactory;
    }
    
    public static EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
    }
    
    public static void shutdown() {
        if (entityManagerFactory != null && entityManagerFactory.isOpen()) {
            entityManagerFactory.close();
            log.info("EntityManagerFactory shut down");
        }
    }
}

