﻿exports.newBitcoinFactoryBotModulesTestServer = function (processIndex) {

    const MODULE_NAME = "Test-Server"

    let thisObject = {
        utilities: undefined,
        dataBridge: undefined,
        testCasesManager: undefined,
        testClientsManager: undefined,
        forecastsManager: undefined,
        initialize: initialize,
        finalize: finalize,
        start: start
    }

    let networkCodeName = TS.projects.foundations.globals.taskConstants.TASK_NODE.bot.config.networkCodeName

    thisObject.utilities = TS.projects.bitcoinFactory.utilities.miscellaneous
    thisObject.dataBridge = TS.projects.bitcoinFactory.botModules.dataBridge.newDataBridge(processIndex)
    thisObject.testCasesManager = TS.projects.bitcoinFactory.botModules.testCasesManager.newTestCasesManager(processIndex, networkCodeName)
    thisObject.testClientsManager = TS.projects.bitcoinFactory.botModules.testClientsManager.newTestClientsManager(processIndex, networkCodeName)
    thisObject.forecastCasesManager = TS.projects.bitcoinFactory.botModules.forecastCasesManager.newForecastCasesManager(processIndex, networkCodeName)
    thisObject.forecastClientsManager = TS.projects.bitcoinFactory.botModules.forecastClientsManager.newForecastClientsManager(processIndex, networkCodeName)
    TS.projects.foundations.globals.taskConstants.TEST_SERVER = thisObject
    return thisObject

    async function initialize(pStatusDependenciesModule, callBackFunction) {
        try {
            thisObject.utilities.initialize()
            thisObject.dataBridge.initialize()
            await thisObject.testCasesManager.initialize()
            await thisObject.testClientsManager.initialize()
            thisObject.forecastCasesManager.initialize()
            await thisObject.forecastClientsManager.initialize()
            callBackFunction(TS.projects.foundations.globals.standardResponses.DEFAULT_OK_RESPONSE)
        } catch (err) {
            TS.projects.foundations.globals.processVariables.VARIABLES_BY_PROCESS_INDEX_MAP.get(processIndex).UNEXPECTED_ERROR = err
            TS.projects.foundations.globals.loggerVariables.VARIABLES_BY_PROCESS_INDEX_MAP.get(processIndex).BOT_MAIN_LOOP_LOGGER_MODULE_OBJECT.write(MODULE_NAME,
                "[ERROR] initialize -> err = " + err.stack)
            callBackFunction(TS.projects.foundations.globals.standardResponses.DEFAULT_FAIL_RESPONSE)
        }
    }

    function finalize() {
        thisObject.utilities.finalize()
        thisObject.dataBridge.finalize()
        thisObject.testCasesManager.finalize()
        thisObject.testClientsManager.finalize()
        thisObject.forecastCasesManager.finalize()
        thisObject.forecastClientsManager.initialize()
    }

    async function start(callBackFunction) {
        try {

            let queryMessage = {
                sender: 'Test-Server'
            }

            let messageHeader = {
                requestType: 'Query',
                networkService: 'Machine Learning',
                queryMessage: JSON.stringify(queryMessage)
            }
            while (true) {
                if (TS.projects.foundations.globals.taskConstants.P2P_NETWORK.p2pNetworkClient.machineLearningNetworkServiceClient === undefined) {
                    console.log((new Date()).toISOString(), "Not connected to the Superalgos Network.")
                    await SA.projects.foundations.utilities.asyncFunctions.sleep(5000)
                } else {
                    let response = await TS.projects.foundations.globals.taskConstants.P2P_NETWORK.p2pNetworkClient.machineLearningNetworkServiceClient.sendMessage(messageHeader)

                    if (response.data.clientData === undefined) {
                        /*
                        In this case there were no requests for the server, we will prepare for the next message and go to sleep.
                        */
                        queryMessage = {
                            sender: 'Test-Server'
                        }
    
                        messageHeader = {
                            requestType: 'Query',
                            networkService: 'Machine Learning',
                            queryMessage: JSON.stringify(queryMessage)
                        }
                        await SA.projects.foundations.utilities.asyncFunctions.sleep(1000)
                    } else {
                        /*
                        In this case there is a request that needs to be processed.
                        */
                        //console.log((new Date()).toISOString(), 'Query received at Test Server: ' + JSON.stringify(response))
    
                        let clientData = JSON.parse(response.data.clientData)
                        let managerResponse
                        switch (clientData.recipient) {
                            case 'Test Client Manager': {
                                managerResponse = await thisObject.testClientsManager.onMessageReceived(clientData.message, clientData.userProfile, clientData.clientInstanceName)
                                break
                            }
                            case 'Forecast Client Manager': {
                                managerResponse = await thisObject.forecastClientsManager.onMessageReceived(clientData.message, clientData.userProfile, clientData.clientInstanceName)
                                break
                            }
                        }
    
                        queryMessage = {
                            messageId: clientData.messageId,
                            sender: 'Test-Server',
                            response: managerResponse
                        }
    
                        messageHeader = {
                            requestType: 'Query',
                            networkService: 'Machine Learning',
                            queryMessage: JSON.stringify(queryMessage)
                        }
                    }
                }
            }
        }
        catch (err) {
            TS.projects.foundations.globals.processVariables.VARIABLES_BY_PROCESS_INDEX_MAP.get(processIndex).UNEXPECTED_ERROR = err
            if (err !== undefined) {
                TS.projects.foundations.globals.loggerVariables.VARIABLES_BY_PROCESS_INDEX_MAP.get(processIndex).BOT_MAIN_LOOP_LOGGER_MODULE_OBJECT.write(MODULE_NAME,
                    "[ERROR] start -> err = " + err.stack)
            }
            callBackFunction(TS.projects.foundations.globals.standardResponses.DEFAULT_FAIL_RESPONSE)
        }
    }
}
