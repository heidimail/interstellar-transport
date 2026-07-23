package com.heidi.springboot.interstellartransportsystem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "routesTravelled")
public class RoutesTravelled {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "planetDestination")
    private String planetDestination;

    @Column(name = "totalDistance", precision = 10, scale = 2)
    private java.math.BigDecimal totalDistance;

    @Column(name = "planetsOnRoute")
    private String planetsOnRoute;

    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Transient
    private String planetNamesOnRoute;

    @Transient
    private String planetDestinationName;

    public RoutesTravelled() {

    }

    public RoutesTravelled(Integer id, String planetDestination, BigDecimal totalDistance, String planetsOnRoute) {
        this.id = id;
        this.planetDestination = planetDestination;
        this.totalDistance = totalDistance;
        this.planetsOnRoute = planetsOnRoute;
    }

    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPlanetDestination() {
        return planetDestination;
    }

    public void setPlanetDestination(String planetDestination) {
        this.planetDestination = planetDestination;
    }

    public BigDecimal getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(BigDecimal totalDistance) {
        this.totalDistance = totalDistance;
    }

    public String getPlanetsOnRoute() {
        return planetsOnRoute;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public void setPlanetsOnRoute(String planetsOnRoute) {
        this.planetsOnRoute = planetsOnRoute;
    }

    public String getPlanetNamesOnRoute() {
        return planetNamesOnRoute;
    }

    public void setPlanetNamesOnRoute(String planetNamesOnRoute) {
        this.planetNamesOnRoute = planetNamesOnRoute;
    }

    public String getPlanetDestinationName() {
        return planetDestinationName;
    }

    public void setPlanetDestinationName(String planetDestinationName) {
        this.planetDestinationName = planetDestinationName;
    }

    @Override
    public String toString() {
        return "RoutesTravelled{" +
                "id=" + id +
                ", planetDestination='" + planetDestination + '\'' +
                ", totalDistance=" + totalDistance +
                ", planetsOnRoute='" + planetsOnRoute + '\'' +
                '}';
    }
}
