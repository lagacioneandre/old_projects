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
public class InfCarga {

    @JsonProperty("vCarga")
    private Double vCarga;

    @JsonProperty("proPred")
    private String proPred;

    @JsonProperty("infQ")
    private InfQ infQ;

    @JsonProperty("vCargaAverb")
    private Double vCargaAverb;

}
