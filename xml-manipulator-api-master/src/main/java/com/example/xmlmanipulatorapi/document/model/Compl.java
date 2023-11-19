package com.example.xmlmanipulatorapi.document.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Compl {

    @JsonProperty("xCaracAd")
    private String xCaracAd;

    @JsonProperty("xObs")
    private String xObs;

    @JsonProperty("ObsCont")
    private ObsCont ObsCont;

}
