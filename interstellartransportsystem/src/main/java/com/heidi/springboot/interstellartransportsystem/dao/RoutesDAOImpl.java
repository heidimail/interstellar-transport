package com.heidi.springboot.interstellartransportsystem.dao;

import com.heidi.springboot.interstellartransportsystem.entity.Planets;
import com.heidi.springboot.interstellartransportsystem.entity.Routes;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoutesDAOImpl implements RoutesDAO {
    private EntityManager entityManager;

    @Autowired
    public RoutesDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
    @Transactional
    public void save(Routes theRoute) {
        entityManager.persist(theRoute);
    }

    @Override
    public Routes findById(Integer id) {
        return entityManager.find(Routes.class, id);
    }

    @Override
    public List<Routes> findAll() {
        TypedQuery<Routes> theQuery = entityManager.createQuery("FROM Routes", Routes.class);

        //return query results
        return theQuery.getResultList();
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        Routes theRoute = entityManager.find(Routes.class, id);
        entityManager.remove(theRoute);
    }

    @Override
    @Transactional
    public void update(Routes theRoute) {
        entityManager.merge(theRoute);
    }
}
