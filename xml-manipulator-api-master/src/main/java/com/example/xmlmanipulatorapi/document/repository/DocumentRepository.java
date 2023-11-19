package com.example.xmlmanipulatorapi.document.repository;

import com.example.xmlmanipulatorapi.document.model.DocumentXml;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DocumentRepository extends MongoRepository<DocumentXml, Integer> {
}
