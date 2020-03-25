const publisher = require("./publish")
const loader = require("./loader")

const regionsObs = loader.loadFromRegions("./tmp/dati-json/dpc-covid19-ita-regioni.json")
const provinceObs = loader.loadFromProvince("./tmp/dati-json/dpc-covid19-ita-province.json")


publishLatest(provinceObs, regionsObs)

async function publishLatest(fromProvince, fromRegion) {
    console.log("Publishing latest data", fromProvince.length, fromRegion.length);
    
    await publishAll(fromProvince)
    await publishAll(fromRegion)
    console.log("Done");
}

async function publishAll(observations) {
    let count = 0;
    for (const obs of observations) {
        try {
            console.log(++count, observations.length);
            await publisher.logHistoryObservation(obs)
        } catch (error) {
            console.log(error)
            console.log("err", obs)
        }
    }
}
