package com.heidi.springboot.interstellartransportsystem.dao;

import com.heidi.springboot.interstellartransportsystem.entity.Routes;
import com.heidi.springboot.interstellartransportsystem.entity.RoutesTravelled;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.heidi.springboot.interstellartransportsystem.entity.Planets;

import java.util.Map;
import java.util.stream.Collectors;

import java.util.List;

@Repository
public class RoutesTravelledDAOImpl implements RoutesTravelledDAO {
    private EntityManager entityManager;

    @Autowired
    public RoutesTravelledDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(RoutesTravelled routeTravelled) {
        entityManager.persist(routeTravelled);
    }

    @Override
    public RoutesTravelled findByPlanetDestination(String planetDestination) {
        return entityManager.find(RoutesTravelled.class, planetDestination);
    }

    @Override
    public List<RoutesTravelled> findAll() {
        List<RoutesTravelled> routesTravelledList = entityManager
                .createQuery("FROM RoutesTravelled", RoutesTravelled.class)
                .getResultList();

        Map<String, String> nodeToName = entityManager
                .createQuery("FROM Planets", Planets.class)
                .getResultList()
                .stream()
                .collect(Collectors.toMap(Planets::getNode, Planets::getName));

        for (RoutesTravelled routeTravelled : routesTravelledList) {
            String names = java.util.Arrays.stream(routeTravelled.getPlanetsOnRoute().split(","))
                    .map(nodeToName::get)
                    .collect(Collectors.joining(","));
            routeTravelled.setPlanetNamesOnRoute(names);
            routeTravelled.setPlanetDestinationName(nodeToName.get(routeTravelled.getPlanetDestination()));;
        }

        return routesTravelledList;
    }

    @Override
    public void delete(Integer id) {
        RoutesTravelled routeTravelled = entityManager.find(RoutesTravelled.class, id);
        entityManager.remove(routeTravelled);
    }

    @Override
    public void update(RoutesTravelled routeTravelled) {
        entityManager.merge(routeTravelled);
    }
}
