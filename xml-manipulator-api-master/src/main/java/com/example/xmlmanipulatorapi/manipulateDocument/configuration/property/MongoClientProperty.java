package com.example.xmlmanipulatorapi.manipulateDocument.configuration.property;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@NoArgsConstructor
@Configuration
@ConfigurationProperties(prefix = "lagacione.xmlmanipulatorapi.mongoclient")
public class MongoClientProperty {

    private String host;
    private String databaseName;

}
