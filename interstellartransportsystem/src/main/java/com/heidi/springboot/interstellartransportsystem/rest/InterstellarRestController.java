package com.heidi.springboot.interstellartransportsystem.rest;


import com.heidi.springboot.interstellartransportsystem.dao.PlanetsDAO;
import com.heidi.springboot.interstellartransportsystem.entity.Planets;
import com.heidi.springboot.interstellartransportsystem.entity.Routes;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@CrossOrigin(origins="http://localhost:4200")
public class InterstellarRestController {
    private final PlanetsDAO planetsDAO;

    public InterstellarRestController(PlanetsDAO planetsDAO) {
        this.planetsDAO = planetsDAO;
    }

    //expose  "/" that will return data
    @GetMapping("/")
    public String showData() {
        return "Hello World";
    }

    @GetMapping("/bestRoute")
    public String getBestRoute() {
        return "loading route....";
    }

    @GetMapping("/planets")
    public List<Planets> getPlanets() {
        return planetsDAO.findAll();
    }

    @GetMapping("/api/test-400")
    public String triggerBadRequest() {
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Custom test error: The request parameters are invalid."
        );
    }

    //return random planet
    @GetMapping("/planet")
    public String getPlanet() {
        return "Random planet";
    }


    @GetMapping("/planets/{id}")
    public Planets getPlanetById(@PathVariable Integer id) {
        return planetsDAO.findById(id);
    }

    @GetMapping("/routes")
    public List<Routes> getRoutes() {
        return planetsDAO.findAllRoutes();
    }


    @PostMapping("/planets")
    public Planets addPlanet(@RequestBody Planets planet) {
        planetsDAO.save(planet);
        return planet;
    }






}
