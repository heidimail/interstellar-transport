package com.heidi.springboot.interstellartransportsystem;

import com.heidi.springboot.interstellartransportsystem.dao.PlanetsDAO;
import com.heidi.springboot.interstellartransportsystem.entity.Planets;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class InterstellartransportsystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(InterstellartransportsystemApplication.class, args);
	}

	@Bean
	//TO DO: Move these to use later, right now all this happens on app initialization on command line
	//TO DO: move all functions to restContoller to use in front end.
	public CommandLineRunner commandLineRunner(PlanetsDAO planetsDAO) {
		return runner -> {
			//queryForPlanets(planetsDAO);
			queryForPlanetById(planetsDAO);
			//createPlanet(planetsDAO);
			//updatePlanet(planetsDAO);
			//deletePlanet(planetsDAO);
		};

	}

	private void queryForPlanets(PlanetsDAO planetsDAO) {
		List<Planets> thePlanets = planetsDAO.findAll();
		for (Planets tempPlanet : thePlanets) {
			System.out.println(tempPlanet);
		}
	}

	private void queryForPlanetById(PlanetsDAO planetsDAO) {
			Planets planet = planetsDAO.findById(1);
			System.out.println("Found planet: " + planet.getName());
	}

	private void createPlanet(PlanetsDAO planetsDAO) {
		//create the new planet object
		//node //name
		System.out.println("Creating new planet object...");
		Planets tempPlanet = new Planets("L'", "Gilese 777" );

		System.out.println("saving the planet...");
		planetsDAO.save(tempPlanet);

		//display id of the saved student
		System.out.println("saved student, generated id: " + tempPlanet.getId());
	}

//	private void updatePlanet(planetsDAO planetsDAO) {
//		System.out.println("Updating planet");
//		//TO DO: add update function
//	}
//
//	private void deletePlanet(planetsDAO planetsDAO){
//		System.out.println("Deleting planet");
//	}

	//TO DO: Add crud functions for routes
}
