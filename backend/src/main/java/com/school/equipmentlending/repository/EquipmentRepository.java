package com.school.equipmentlending.repository;

import com.school.equipmentlending.model.Equipment;
import com.school.equipmentlending.util.HibernateUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Equipment entities using JPA EntityManager
 */
@Slf4j
public class EquipmentRepository {

    public List<Equipment> findAll() {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            TypedQuery<Equipment> query = em.createQuery(
                "SELECT e FROM Equipment e ORDER BY e.createdAt DESC", Equipment.class);
            return query.getResultList();
        } finally {
            em.close();
        }
    }

    public Optional<Equipment> findById(Long id) {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            Equipment equipment = em.find(Equipment.class, id);
            return Optional.ofNullable(equipment);
        } finally {
            em.close();
        }
    }

    public List<Equipment> searchByKeyword(String keyword) {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            TypedQuery<Equipment> query = em.createQuery(
                "SELECT e FROM Equipment e WHERE " +
                "LOWER(e.name) LIKE LOWER(:keyword) OR " +
                "LOWER(e.description) LIKE LOWER(:keyword) OR " +
                "LOWER(e.category) LIKE LOWER(:keyword)", 
                Equipment.class);
            query.setParameter("keyword", "%" + keyword + "%");
            return query.getResultList();
        } finally {
            em.close();
        }
    }

    public List<Equipment> findByFilters(String category, Boolean available) {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            StringBuilder jpql = new StringBuilder("SELECT e FROM Equipment e WHERE 1=1");
            
            if (category != null && !category.isEmpty()) {
                jpql.append(" AND e.category = :category");
            }
            
            if (available != null && available) {
                jpql.append(" AND e.availableQty > 0");
            }
            
            jpql.append(" ORDER BY e.createdAt DESC");
            
            TypedQuery<Equipment> query = em.createQuery(jpql.toString(), Equipment.class);
            
            if (category != null && !category.isEmpty()) {
                query.setParameter("category", category);
            }
            
            return query.getResultList();
        } finally {
            em.close();
        }
    }

    public Equipment save(Equipment equipment) {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            if (equipment.getId() == null) {
                em.persist(equipment);
            } else {
                equipment = em.merge(equipment);
            }
            em.getTransaction().commit();
            log.info("Equipment saved: {}", equipment.getName());
            return equipment;
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            log.error("Error saving equipment", e);
            throw e;
        } finally {
            em.close();
        }
    }

    public void delete(Equipment equipment) {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            Equipment managed = em.merge(equipment);
            em.remove(managed);
            em.getTransaction().commit();
            log.info("Equipment deleted: {}", equipment.getName());
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            log.error("Error deleting equipment", e);
            throw e;
        } finally {
            em.close();
        }
    }
}
