package com.heidi.springboot.interstellartransportsystem.rest;


import com.heidi.springboot.interstellartransportsystem.dao.PlanetsDAO;
import com.heidi.springboot.interstellartransportsystem.dao.RoutesDAO;
import com.heidi.springboot.interstellartransportsystem.entity.Planets;
import com.heidi.springboot.interstellartransportsystem.entity.Routes;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class InterstellarRestController {
    private PlanetsDAO planetsDAO;
    private RoutesDAO routesDAO;

    //TO DO: separate controllers, Planets controller vs route contoller
    public InterstellarRestController(PlanetsDAO planetsDAO, RoutesDAO routesDAO) {
        this.planetsDAO = planetsDAO;
        this.routesDAO = routesDAO;
    }

    //routes used in front end: planets & routes
    @GetMapping("/planets")
    public List<Planets> getPlanets() {
        return planetsDAO.findAll();
    }

    @GetMapping("/routes")
    public List<Routes> getRoutes() {
        return routesDAO.findAll();
    }

    //testing sending error
    @GetMapping("/api/test-400")
    public String triggerBadRequest() {
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Custom test error: The request parameters are invalid."
        );
    }

    //CRUD operations for planets: currently not used but ready for future
    @GetMapping("/planets/{id}")
    public Planets getPlanetById(@PathVariable Integer id) {
        return planetsDAO.findById(id);
    }

    @PostMapping("/planets")
    public Planets addPlanet(@RequestBody Planets planet) {
        planetsDAO.save(planet);
        return planet;
    }

    @PutMapping("/planets/{id}")
    public Planets updatePlanet(@PathVariable Integer id,
                                @RequestParam(required = false) String name,
                                @RequestParam(required = false) String node) {
        Planets planet = planetsDAO.findById(id);
        if (planet == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Planet id not found - " + id);
        }
        if (name != null) {
            planet.setName(name);
        }
        if (node != null) {
            planet.setNode(node);
        }
        planetsDAO.update(planet);
        return planet;
    }

    //delete planet by id
    @DeleteMapping("/planets/{id}")
    public String deletePlanet(@PathVariable Integer id) {
        Planets tempPlanet = planetsDAO.findById(id);
        if (tempPlanet == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Planet id not found - " + id);
        }
        planetsDAO.delete(id);
        return "Deleted planet id - " + id;
    }

    //TO DO: Add CRUD operations for Routes like Planets above
}
