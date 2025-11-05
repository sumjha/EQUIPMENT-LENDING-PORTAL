package com.school.equipmentlending.repository;

import com.school.equipmentlending.model.BorrowRequest;
import com.school.equipmentlending.util.HibernateUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

/**
 * Repository for BorrowRequest entities using JPA EntityManager
 */
@Slf4j
public class BorrowRequestRepository {

    public List<BorrowRequest> findAll() {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            TypedQuery<BorrowRequest> query = em.createQuery(
                "SELECT br FROM BorrowRequest br ORDER BY br.createdAt DESC", 
                BorrowRequest.class);
            return query.getResultList();
        } finally {
            em.close();
        }
    }

    public Optional<BorrowRequest> findById(Long id) {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            BorrowRequest request = em.find(BorrowRequest.class, id);
            return Optional.ofNullable(request);
        } finally {
            em.close();
        }
    }

    public List<BorrowRequest> findByUserId(Long userId) {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            TypedQuery<BorrowRequest> query = em.createQuery(
                "SELECT br FROM BorrowRequest br WHERE br.userId = :userId ORDER BY br.createdAt DESC", 
                BorrowRequest.class);
            query.setParameter("userId", userId);
            return query.getResultList();
        } finally {
            em.close();
        }
    }

    public BorrowRequest save(BorrowRequest request) {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            if (request.getId() == null) {
                em.persist(request);
            } else {
                request = em.merge(request);
            }
            em.getTransaction().commit();
            log.info("BorrowRequest saved: ID {}", request.getId());
            return request;
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            log.error("Error saving borrow request", e);
            throw e;
        } finally {
            em.close();
        }
    }
}
