package com.heidi.springboot.interstellartransportsystem.rest;


import com.heidi.springboot.interstellartransportsystem.dao.RoutesTravelledDAO;
import com.heidi.springboot.interstellartransportsystem.entity.Planets;
import com.heidi.springboot.interstellartransportsystem.entity.RoutesTravelled;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class RoutesTravelledController {
    private RoutesTravelledDAO routesTravelledDAO;

    public RoutesTravelledController(RoutesTravelledDAO routesTravelledDAO) {
        this.routesTravelledDAO = routesTravelledDAO;
    }

    @GetMapping("/routesTravelled")
    public List<RoutesTravelled> getRoutesTravelled() {
        return routesTravelledDAO.findAll();
    }

    @PostMapping("/routeTravelled")
    public RoutesTravelled addRouteTravelled(@RequestBody RoutesTravelled routeTravelled) {
        routesTravelledDAO.save(routeTravelled);
        return routeTravelled;
    }

    @GetMapping("/routesTravelled/bPlanetDestination")
    public RoutesTravelled getRouteByPlanetDestination(@PathVariable String planetDestination){
       return routesTravelledDAO.findByPlanetDestination(planetDestination);
    }
}
