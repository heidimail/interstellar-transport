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
public class PlanetsDAOImpl implements PlanetsDAO {

    private EntityManager entityManager;

    @Autowired
    public PlanetsDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
    @Transactional
    public void save(Planets thePlanet) {
        entityManager.persist(thePlanet);
    }

    @Override
    public Planets findById(Integer id) {
        return entityManager.find(Planets.class, id);
    }

    @Override
    public List<Planets> findAll() {
        TypedQuery<Planets> theQuery = entityManager.createQuery("FROM Planets", Planets.class);

        //return query results
        return theQuery.getResultList();

    }

    //TO DO: use CRUD repository or create separate DAO files for Routes
    @Override
    public List<Routes> findAllRoutes() {
        TypedQuery<Routes> theQuery = entityManager.createQuery("FROM Routes", Routes.class);

        //return query results
        return theQuery.getResultList();
    }

}
