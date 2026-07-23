package com.heidi.springboot.interstellartransportsystem.dao;

import com.heidi.springboot.interstellartransportsystem.entity.RoutesTravelled;

import java.util.List;

public interface RoutesTravelledDAO {
    void save(RoutesTravelled routeTravelled);
    RoutesTravelled findByPlanetDestination(String planetDestination);
    List<RoutesTravelled> findAll();
    void delete (Integer id);
    void update(RoutesTravelled routeTravelled);
}
