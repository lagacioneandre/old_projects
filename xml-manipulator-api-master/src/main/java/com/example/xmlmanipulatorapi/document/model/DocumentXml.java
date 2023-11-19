package com.example.xmlmanipulatorapi.document.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "document")
@JsonIgnoreProperties(ignoreUnknown = true)
public class DocumentXml {

    @Id
    @JsonProperty
    private String id;

    @JsonProperty("cteProc")
    private CteProc cteProc;

}
