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
	//because it will be a command line application
	public CommandLineRunner commandLineRunner(PlanetsDAO planetsDAO) {
		return runner -> {
			//queryForPlanets(planetsDAO);
		};

	}

	private void queryForPlanets(PlanetsDAO planetsDAO) {
		List<Planets> thePlanets = planetsDAO.findAll();
		for (Planets tempPlanet : thePlanets) {
			System.out.println(tempPlanet);
		}
	}

	//TO DO: ADD GETTERS AND SETTER FUNCTIONS
}
