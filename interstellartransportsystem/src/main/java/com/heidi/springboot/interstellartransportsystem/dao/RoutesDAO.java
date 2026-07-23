package com.heidi.springboot.interstellartransportsystem.dao;

import com.heidi.springboot.interstellartransportsystem.entity.Routes;

import java.util.List;

public interface RoutesDAO {
    void save(Routes theRoute);
    //maybe instead of findById, we do find by planet node
    Routes findById(Integer id);
    List<Routes> findAll();
    void delete (Integer id);
    void update(Routes theRoute);
}
