const observations = require("./jsap_observations")
module.exports = {
    "host": "mml.arces.unibo.it",
    "oauth": {
        "enable": false,
        "register": "https://localhost:8443/oauth/register",
        "tokenRequest": "https://localhost:8443/oauth/token"
    },
    "sparql11protocol": {
        "protocol": "http",
        "port": 8666,
        "query": {
            "path": "/query",
            "method": "POST",
            "format": "JSON"
        },
        "update": {
            "path": "/update",
            "method": "POST",
            "format": "JSON"
        }
    },
    "sparql11seprotocol": {
        "protocol": "ws",
        "availableProtocols": {
            "ws": {
                "port": 9666,
                "path": "/subscribe"
            },
            "wss": {
                "port": 9443,
                "path": "/secure/subscribe"
            }
        }
    },
    "namespaces": {
        "schema": "http://schema.org/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "sosa": "http://www.w3.org/ns/sosa/",
        "qudt": "http://qudt.org/schema/qudt#",
        "unit": "http://qudt.org/vocab/unit#",
        "covid19": "http://covid19#",
        "time": "http://www.w3.org/2006/time#",
        "wgs84_pos": "http://www.w3.org/2003/01/geo/wgs84_pos#",
        "gn": "http://www.geonames.org/ontology#"
    },
    queries : observations.queries,
    updates : observations.updates 
}