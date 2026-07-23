package com.heidi.springboot.interstellartransportsystem.dao;

import com.heidi.springboot.interstellartransportsystem.entity.Planets;

import java.util.List;

public interface PlanetsDAO {
    void save(Planets thePlanet);
    Planets findById(Integer id);
    List<Planets> findAll();
    void delete (Integer id);
    void update(Planets thePlanet);
}
