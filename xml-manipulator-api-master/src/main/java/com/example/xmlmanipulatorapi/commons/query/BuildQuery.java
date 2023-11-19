package com.example.xmlmanipulatorapi.commons.query;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class BuildQuery {

    public Query findById(String documentId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(documentId));
        return query;
    }

}
