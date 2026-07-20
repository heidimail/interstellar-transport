package com.heidi.springboot.interstellartransportsystem.dao;

import com.heidi.springboot.interstellartransportsystem.entity.Planets;
import com.heidi.springboot.interstellartransportsystem.entity.Routes;

import java.util.List;

//TO DO: could create CRUD respository instead
public interface PlanetsDAO {
    void save(Planets thePlanet);
    Planets findById(Integer id);
    List<Planets> findAll();
    List<Routes> findAllRoutes();
    //List<Routes> findStartingPoint(String planetOrigin);
}
