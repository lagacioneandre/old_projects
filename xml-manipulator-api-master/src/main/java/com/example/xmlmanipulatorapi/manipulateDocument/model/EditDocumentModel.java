package com.example.xmlmanipulatorapi.manipulateDocument.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EditDocumentModel {

    private String documentId;
    private String oldTagName;
    private String newTagName;
    private String tagValue;
    private Boolean isEdited;

}
