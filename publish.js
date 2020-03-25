const jsap = require("./jsap")
const SAP = require("@arces-wot/sepa-js").Jsap

const sap = new SAP(jsap)

module.exports = {
    clearLiveGraph(){
        return sap.CLEAR_LIVE_GRAPH()
    },
    publishData(observation){
        return sap.ADD_SIMPLE_OBSERVATION(observation)
    },
    logLiveData(){
        return sap.COPY_LIVE_GRAPH()
    },
    logHistoryObservation(observation){
        return sap.LOG_SIMPLE_OBSERVATION(observation)
    }
}