package com.example.xmlmanipulatorapi.document.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Ide {

    @JsonProperty("cUF")
    private Integer cUF;

    @JsonProperty("cCT")
    private Integer cCT;

    @JsonProperty("CFOP")
    private Integer CFOP;

    @JsonProperty("natOp")
    private String natOp;

    @JsonProperty("mod")
    private Integer mod;

    @JsonProperty("serie")
    private Integer serie;

    @JsonProperty("nCT")
    private Integer nCT;

    @JsonProperty("dhEmi")
    private Date dhEmi;

    @JsonProperty("tpImp")
    private Integer tpImp;

    @JsonProperty("tpEmis")
    private Integer tpEmis;

    @JsonProperty("cDV")
    private Integer cDV;

    @JsonProperty("tpAmb")
    private Integer tpAmb;

    @JsonProperty("tpCTe")
    private Integer tpCTe;

    @JsonProperty("procEmi")
    private Integer procEmi;

    @JsonProperty("verProc")
    private Integer verProc;

    @JsonProperty("cMunEnv")
    private Integer cMunEnv;

    @JsonProperty("xMunEnv")
    private String xMunEnv;

    @JsonProperty("UFEnv")
    private String UFEnv;

    @JsonProperty("modal")
    private Integer modal;

    @JsonProperty("tpServ")
    private Integer tpServ;

    @JsonProperty("cMunIni")
    private Integer cMunIni;

    @JsonProperty("xMunIni")
    private String xMunIni;

    @JsonProperty("UFIni")
    private String UFIni;

    @JsonProperty("cMunFim")
    private Integer cMunFim;

    @JsonProperty("xMunFim")
    private String xMunFim;

    @JsonProperty("UFFim")
    private String UFFim;

    @JsonProperty("retira")
    private Integer retira;

    @JsonProperty("indIEToma")
    private Integer indIEToma;

    @JsonProperty("toma3")
    private Toma3 toma3;

}
