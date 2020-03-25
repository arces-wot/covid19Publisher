const Git = require("nodegit")
const publisher = require("./publish")
const loader = require("./loader")
const fs = require("fs"); 


async function publishLatest() {
    const regionsObs = loader.loadFromRegions("./tmp/dati-json/dpc-covid19-ita-regioni-latest.json")
    const provinceObs = loader.loadFromProvince("./tmp/dati-json/dpc-covid19-ita-province-latest.json")

    console.log("Publishing latest data", provinceObs.length, regionsObs.length);
    await publisher.clearLiveGraph()
    await publishAll(regionsObs)
    await publishAll(provinceObs)
    await publisher.logLiveData()
    console.log("Done");
}

async function publishAll(observations){
    let count= 0
    for (const obs of observations) {
        try {
            console.log(++count,observations.length);
            
            await publisher.publishData(obs)
        } catch (error) {
            console.log(error)
            console.log("err", obs)
        }
    }
}

function main() {
    if (!fs.existsSync("./tmp")) {
        console.log("Repository not found cloning into ./tmp")
        Git.Clone("https://github.com/pcm-dpc/COVID-19.git", "./tmp").then(() => {
            console.log("Cloned data repo");
            return publishLatest()
        }).catch(e => {
            console.log(e)
        });
    } else {
        console.log("Syncing repository");
        Git.Repository.open("./tmp").then(function (repo) {
            repository = repo;

            return repository.fetchAll({
                callbacks: {
                    credentials: function (url, userName) {
                        return Git.Cred.sshKeyFromAgent(userName);
                    },
                    certificateCheck: function () {
                        return 0;
                    }
                }
            });
        })
            // Now that we're finished fetching, go ahead and merge our local branch
            // with the new one
            .then(function () {
                return repository.mergeBranches("master", "origin/master");
            })
            .then(function () {
                console.log("Repository sync done");
                return publishLatest()
            }).catch(e =>{
                console.log(e)
            });
    }
}


if (process.env.RUN_NOW) {
    main()
} else {
    var cron = require('node-cron');
    console.log("Cron mode; scheduling task * * 19 * *")
    cron.schedule('* * 19 * *', () => {
        console.log('Uploading covid19 data from git');
        console.log(new Date())
        main()
    });
}