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
	//FOR testing locally
	public CommandLineRunner commandLineRunner(PlanetsDAO planetsDAO) {
		return runner -> {
			//queryForPlanets(planetsDAO);
			//queryForPlanetById(planetsDAO);
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

		System.out.println("saved planet, generated id: " + tempPlanet.getId());
	}

	private void updatePlanet(PlanetsDAO planetsDAO) {
		System.out.println("Updating planet");

		int planetId = 1;
		System.out.println("getting planet with id:" + planetId);
		Planets myPlanet = planetsDAO.findById(planetId);

		System.out.println("updating Planet....");
		myPlanet.setNode("L'");

		planetsDAO.update(myPlanet);

		System.out.println("updated planet" + myPlanet);

	}
	private void deletePlanet(PlanetsDAO planetsDAO) {
		int planetId = 3;
		System.out.println("deleting planet with id:"+ planetId);
		planetsDAO.delete(planetId);
	}

}
