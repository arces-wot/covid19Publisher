const fs = require('fs');
const propMapping = {
    totale_casi: "http://covid19#TotalCases",
    ricoverati_con_sintomi: "http://covid19#HospitalisedWithSymptoms",
    terapia_intensiva: "http://covid19#IntensiveCare",
    totale_ospedalizzati: "http://covid19#TotalHospitalised",
    isolamento_domiciliare: "http://covid19#HomeConfinement",
    totale_attualmente_positivi: "http://covid19#TotalPositiveCases",
    nuovi_attualmente_positivi: "http://covid19#DailyPositiveCases",
    dimessi_guariti: "http://covid19#Recovered",
    deceduti: "http://covid19#Death",
    tamponi: "http://covid19#TestPerformed"
}

const baseURIPlace = "http://covid19/Italy/Province/"
const baseURIPlaceRegion = "http://covid19/Italy/Region/"

module.exports = {
    loadFromRegions(file){
       var obj = JSON.parse(fs.readFileSync(file, 'utf8'));
        let obs = []
        obj.forEach(pRecord => {
            pRecord.data = pRecord.data.replace(" ", "T") + "Z"
            Object.keys(propMapping).forEach( property =>{
                if(!propMapping.hasOwnProperty(property))return;
                obs.push({
                    place: baseURIPlaceRegion + fillBlanks(pRecord.denominazione_regione),
                    value: pRecord[property],
                    timestamp: pRecord.data,
                    property: propMapping[property]
                })
            })
        });
        return obs
    },

    loadFromProvince(file){
        var obj = JSON.parse(fs.readFileSync(file, 'utf8'));
        let obs = []
        obj.forEach(pRecord => {
            pRecord.data = pRecord.data.replace(" ","T") + "Z"
            obs.push({
                place: baseURIPlace + fillBlanks(pRecord.denominazione_provincia),
                value: pRecord.totale_casi,
                timestamp: pRecord.data,
                property: propMapping.totale_casi
            })
        });

        return obs
    }
}

function fillBlanks(name) {
    return name.replace(/\ /g,"_")
}