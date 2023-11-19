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
public class VPrest {

    @JsonProperty("vTPrest")
    private Double vTPrest;

    @JsonProperty("vRec")
    private Double vRec;

    @JsonProperty("Comp")
    private Comp Comp;

}
