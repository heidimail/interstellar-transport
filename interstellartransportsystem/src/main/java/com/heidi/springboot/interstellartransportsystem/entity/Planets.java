package com.heidi.springboot.interstellartransportsystem.entity;

import jakarta.persistence.*;

@Entity
@Table(name="planets")
public class Planets {

    //map to DB

    //define fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="node")
    private String node;

    @Column(name="name")
    private String name;

    //define constructors
    public Planets() {

    }

    public Planets(int id, String node, String name) {
        this.id = id;
        this.node = node;
        this.name = name;
    }

    //define getters/setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNode() {
        return node;
    }

    public void setNode(String node) {
        this.node = node;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    //deinf toString()

    @Override
    public String toString() {
        return "planets{" +
                "id=" + id +
                ", node='" + node + '\'' +
                ", name='" + name + '\'' +
                '}';
    }



}
