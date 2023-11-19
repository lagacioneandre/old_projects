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
@ConfigurationProperties(prefix = "lagacione.xmlmanipulatorapi.tag.destinatario")
public class TagDestinatarioProperty {

    private String tagsDefault;

}
