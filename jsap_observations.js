module.exports = {
    "updates": {
        "CLEAR_LIVE_GRAPH": {
            "sparql": "CLEAR SILENT GRAPH <http://covid19/observation>"
        },
        "COPY_LIVE_GRAPH": {
            "sparql": "ADD SILENT GRAPH <http://covid19/observation> TO GRAPH <http://covid19/observation/history>"
        },
        "ADD_SIMPLE_OBSERVATION": {
            "sparql": "INSERT {GRAPH <http://covid19/observation> {_:obs rdf:type sosa:Observation ; sosa:hasFeatureOfInterest ?place ; sosa:resultTime ?timestamp ; sosa:hasSimpleResult ?value ; sosa:observedProperty ?property}} WHERE {}",
            "forcedBindings": {
                "place": {
                    "type": "uri",
                    "value": "covid19:Mars"
                },
                "value": {
                    "type": "literal",
                    "value": "unit:DegreeCelsius"
                },
                "timestamp": {
                    "type": "literal",
                    "datatype": "xsd:dateTime",
                    "value": "2020-03-21T17:00:00Z"
                },
                "property": {
                    "type": "uri",
                    "value": "covid19:Recovered"
                }
            }
        },
        "LOG_SIMPLE_OBSERVATION": {
            "sparql": "INSERT {GRAPH <http://covid19/observation/history> {_:obs rdf:type sosa:Observation ; sosa:hasFeatureOfInterest ?place ; sosa:resultTime ?timestamp ; sosa:hasSimpleResult ?value ; sosa:observedProperty ?property}} WHERE {}",
            "forcedBindings": {
                "place": {
                    "type": "uri",
                    "value": "covid19:Mars"
                },
                "value": {
                    "type": "literal",
                    "value": "unit:DegreeCelsius"
                },
                "timestamp": {
                    "type": "literal",
                    "datatype": "xsd:dateTime",
                    "value": "2020-03-21T17:00:00Z"
                },
                "property": {
                    "type": "uri",
                    "value": "covid19:Recovered"
                }
            }
        },
        "ADD_OBSERVATION": {
            "sparql": "INSERT {GRAPH <http://covid19/observation> {_:obs rdf:type sosa:Observation ; sosa:hasFeatureOfInterest ?place ; sosa:resultTime ?timestamp ; sosa:hasResult _:res ; sosa:observedProperty ?property . _:res rdf:type qudt:QuantityValue ; qudt:unit ?unit ; qudt:numericValue ?value}} WHERE {}",
            "forcedBindings": {
                "place": {
                    "type": "uri"
                },
                "value": {
                    "type": "literal"
                },
                "timestamp": {
                    "type": "literal",
                    "datatype": "xsd:dateTime",
                    "value": "2020-03-21T17:00:00Z"
                },
                "property": {
                    "type": "uri",
                    "value": "covid19:Recovered"
                },
                "unit": {
                    "type": "uri",
                    "value": "unit:Number"
                }
            }
        },
        "ADD_OBSERVABLE_PROPERTY": {
            "sparql": "INSERT DATA {GRAPH <http://covid19/observation> {?property rdf:type sosa:ObservableProperty ; rdfs:label ?label}}",
            "forcedBindings": {
                "property": {
                    "type": "uri",
                    "value": "covid19:HospitalisedWithSymptoms"
                },
                "label": {
                    "type": "literal",
                    "value": "Ospedalizzati con sintomi"
                }
            }
        }
    },
    "queries": {
        "OBSERVATIONS_COUNT": {
            "sparql": "SELECT (COUNT(?observation) AS ?count) WHERE {GRAPH <http://covid19/observation> {?observation rdf:type sosa:Observation}}"
        },
        "SIMPLE_OBSERVATIONS": {
            "sparql": "SELECT * WHERE {GRAPH <http://covid19/observation> {?observation rdf:type sosa:Observation ; sosa:hasFeatureOfInterest ?place ; sosa:resultTime ?timestamp ; sosa:hasSimpleResult ?value ; sosa:observedProperty ?property . ?property rdfs:label ?label} GRAPH <http://covid19/context> {?place gn:name ?name ;  gn:lat ?lat ; gn:long ?lon}}"
        },
        "OBSERVATIONS": {
            "sparql": "SELECT * WHERE {GRAPH <http://covid19/observation> {?observation rdf:type sosa:Observation ; sosa:hasFeatureOfInterest ?place ; sosa:resultTime ?timestamp ; sosa:hasResult ?result ; sosa:observedProperty ?property . ?result rdf:type qudt:QuantityValue ; qudt:unit ?unit ; qudt:numericValue ?value . ?property rdfs:label ?label} GRAPH <http://covid19/context> {?place gn:name ?name ;  gn:lat ?lat ; gn:long ?lon} OPTIONAL {?unit qudt:symbol ?symbol}}"
        },
        "OBSERVABLE_PROPERTIES": {
            "sparql": "SELECT * WHERE {GRAPH <http://covid19/observation> {?property rdf:type sosa:ObservableProperty ; rdfs:label ?label}}"
        }
    }
}