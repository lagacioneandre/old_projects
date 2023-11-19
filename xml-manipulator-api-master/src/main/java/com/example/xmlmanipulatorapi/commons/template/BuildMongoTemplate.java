package com.example.xmlmanipulatorapi.commons.template;

import com.example.xmlmanipulatorapi.manipulateDocument.configuration.property.MongoClientProperty;
import com.mongodb.MongoClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class BuildMongoTemplate {

    private final MongoClientProperty mongoClientProperty;

    @Autowired
    public BuildMongoTemplate(MongoClientProperty mongoClientProperty) {
        this.mongoClientProperty = mongoClientProperty;
    }

    public MongoTemplate build() {
        return new MongoTemplate(new MongoClient(
                this.mongoClientProperty.getHost()),
                this.mongoClientProperty.getDatabaseName()
        );
    }

    public String getHost() {
        return this.mongoClientProperty.getHost();
    }

    public String getBataBaseName() {
        return this.mongoClientProperty.getDatabaseName();
    }
}
