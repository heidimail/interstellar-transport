package com.heidi.springboot.interstellartransportsystem.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name="routes")
public class Routes {

    //map to DB

    //define fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "planetOrigin")
    private String planetOrigin;

    @Column(name = "planetDestination")
    private String planetDestination;

    @Column(name = "distance", precision = 10, scale = 2)
    private java.math.BigDecimal distance;

    public Routes() {
    }

    public Routes(int id, String planetOrigin, String planetDestination, BigDecimal distance) {
        this.id = id;
        this.planetOrigin = planetOrigin;
        this.planetDestination = planetDestination;
        this.distance = distance;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPlanetOrigin() {
        return planetOrigin;
    }

    public void setPlanetOrigin(String planetOrigin) {
        this.planetOrigin = planetOrigin;
    }

    public String getPlanetDestination() {
        return planetDestination;
    }

    public void setPlanetDestination(String planetDestination) {
        this.planetDestination = planetDestination;
    }

    public BigDecimal getDistance() {
        return distance;
    }

    public void setDistance(BigDecimal distance) {
        this.distance = distance;
    }

    @Override
    public String toString() {
        return "routes{" +
                "id=" + id +
                ", planetOrigin='" + planetOrigin + '\'' +
                ", planetDestination='" + planetDestination + '\'' +
                ", distance='" + distance + '\'' +
                '}';
    }
}