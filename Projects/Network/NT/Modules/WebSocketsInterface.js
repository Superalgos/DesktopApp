exports.newNetworkModulesWebSocketsInterface = function newNetworkModulesWebSocketsInterface() {

    let thisObject = {
<<<<<<< HEAD
=======
        networkClients: undefined,
        networkPeers: undefined,
        callersMap: undefined,
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
        initialize: initialize,
        finalize: finalize
    }

    let socketServer
    let clientInterface
    let peerInterface

    let web3 = new SA.nodeModules.web3()

    return thisObject

    function finalize() {
<<<<<<< HEAD
=======
        thisObject.networkClients = undefined
        thisObject.networkPeers = undefined
        callersMap = undefined

>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
        socketServer = undefined
        clientInterface = undefined
        peerInterface = undefined

        web3 = undefined
    }

    function initialize() {
        socketServer = new SA.nodeModules.ws.Server({ port: global.env.NETWORK_WEB_SOCKETS_INTERFACE_PORT })
        clientInterface = NT.projects.socialTrading.modules.clientInterface.newSocialTradingModulesClientInterface()
        peerInterface = NT.projects.socialTrading.modules.peerInterface.newSocialTradingModulesPeerInterface()

<<<<<<< HEAD
=======
        thisObject.networkClients = []
        thisObject.networkPeers = []
        thisObject.callersMap = new Map()

>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
        setUpWebSocketServer()
    }

    function setUpWebSocketServer() {
        try {
<<<<<<< HEAD
            socketServer.on('connection', onConnection)

            function onConnection(socket) {
                let caller = {}
                let calledTimestamp = (new Date()).valueOf()

                socket.on('message', onMenssage)
=======
            socketServer.on('connection', onConnectionOpened)

            function onConnectionOpened(socket)

            /*
            This function is executed every time a new Websockets connection
            is stablished.  
            */ {
                let caller = {
                    socket: socket,
                    userProfile: undefined,
                    role: undefined
                }

                caller.socket.id = SA.projects.foundations.utilities.miscellaneousFunctions.genereteUniqueId()
                caller.socket.on('close', onConnectionClosed)

                let calledTimestamp = (new Date()).valueOf()

                caller.socket.on('message', onMenssage)
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef

                async function onMenssage(message) {
                    try {
                        let messageHeader
                        try {
                            messageHeader = JSON.parse(message)
                        } catch (err) {
                            let response = {
                                result: 'Error',
                                message: 'messageHeader Not Coorrect JSON Format.'
                            }
<<<<<<< HEAD
                            socket.send(JSON.stringify(response))
=======
                            caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                            return
                        }
                        /*
                        We will run some validations.
                        */
                        if (messageHeader.messageType === undefined) {
                            let response = {
                                result: 'Error',
                                message: 'messageType Not Provided.'
                            }
<<<<<<< HEAD
                            socket.send(JSON.stringify(response))
=======
                            caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                            return
                        }

                        switch (messageHeader.messageType) {
                            case "Handshake": {
<<<<<<< HEAD
                                handshakeProducedure(socket, caller, calledTimestamp, messageHeader)
=======
                                handshakeProducedure(caller, calledTimestamp, messageHeader)
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                                break
                            }
                            case "Request": {

                                if (caller.userProfile === undefined) {
                                    let response = {
                                        result: 'Error',
                                        message: 'Handshake Not Done Yet.'
                                    }
<<<<<<< HEAD
                                    socket.send(JSON.stringify(response))
                                    return
                                }

                                switch (caller.role) {
                                    case 'Network Client': {
                                        let response = await clientInterface.messageReceived(messageHeader.payload, caller.userProfile)
                                        socket.send(JSON.stringify(response))
                                        break
                                    }
                                    case 'Network Peer': {
                                        let response = await peerInterface.messageReceived(messageHeader.payload)
                                        socket.send(JSON.stringify(response))
                                        break
                                    }
                                }
=======
                                    caller.socket.send(JSON.stringify(response))
                                    return
                                }

                                let response
                                switch (caller.role) {
                                    case 'Network Client': {
                                        response = await clientInterface.messageReceived(messageHeader.payload, caller.userProfile)
                                        caller.socket.send(JSON.stringify(response))
                                        break
                                    }
                                    case 'Network Peer': {
                                        response = await peerInterface.messageReceived(messageHeader.payload)
                                        caller.socket.send(JSON.stringify(response))
                                        break
                                    }
                                }
                                if (response.result === 'Ok' && messageHeader.payload.requestType === 'Event') {
                                    broadcastToPeers(messageHeader, caller)
                                    broadcastToClients(messageHeader, caller)
                                }
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                                break
                            }
                            default: {
                                let response = {
                                    result: 'Error',
                                    message: 'messageType Not Supported.'
                                }
<<<<<<< HEAD
                                socket.send(JSON.stringify(response))
=======
                                caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                                break
                            }
                        }
                    } catch (err) {
                        console.log('[ERROR] Web Sockets Interface -> setUpWebSocketServer -> err.stack = ' + err.stack)
                    }
                }
            }

<<<<<<< HEAD
            function handshakeProducedure(socket, caller, calledTimestamp, messageHeader) {
=======
            function onConnectionClosed() {
                let socketId = this.id
                let caller = thisObject.callersMap.get(socketId)
                removeCaller(caller)
            }

            function handshakeProducedure(caller, calledTimestamp, messageHeader) {
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                /*
                The handshage producedure have 2 steps, we need to know 
                now which one we are at. 
                */
                if (messageHeader.step === undefined) {
                    let response = {
                        result: 'Error',
                        message: 'step Not Provided.'
                    }
<<<<<<< HEAD
                    socket.send(JSON.stringify(response))
=======
                    caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                    return
                }
                if (messageHeader.step !== 'One' && messageHeader.step !== 'Two') {
                    let response = {
                        result: 'Error',
                        message: 'step Not Supported.'
                    }
<<<<<<< HEAD
                    socket.send(JSON.stringify(response))
=======
                    caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                    return
                }
                switch (messageHeader.step) {
                    case 'One': {
                        handshakeStepOne()
                        break
                    }
                    case 'Two': {
                        handshakeStepTwo()
                        break
                    }
                }
                function handshakeStepOne() {
                    /*
                    The caller needs to identify itself as either a Network Client or Peer.
                    */
                    if (messageHeader.callerRole === undefined) {
                        let response = {
                            result: 'Error',
                            message: 'callerRole Not Provided.'
                        }
<<<<<<< HEAD
                        socket.send(JSON.stringify(response))
=======
                        caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                        return
                    }

                    if (messageHeader.callerRole !== 'Network Client' && messageHeader.callerRole !== 'Network Peer') {
                        let response = {
                            result: 'Error',
                            message: 'callerRole Not Supported.'
                        }
<<<<<<< HEAD
                        socket.send(JSON.stringify(response))
=======
                        caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                        return
                    }

                    caller.role = messageHeader.callerRole
                    /*
                    The caller needs to provide it's User Profile Handle.
                    */
                    if (messageHeader.callerProfileHandle === undefined) {
                        let response = {
                            result: 'Error',
                            message: 'callerProfileHandle Not Provided.'
                        }
<<<<<<< HEAD
                        socket.send(JSON.stringify(response))
=======
                        caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                        return
                    }

                    caller.userProfileHandle = messageHeader.callerProfileHandle
                    /*
                    The caller needs to provide a callerTimestamp.
                    */
                    if (messageHeader.callerTimestamp === undefined) {
                        let response = {
                            result: 'Error',
                            message: 'callerTimestamp Not Provided.'
                        }
<<<<<<< HEAD
                        socket.send(JSON.stringify(response))
=======
                        caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                        return
                    }
                    /*
                    The callerTimestamp can not be more that 1 minute old.
                    */
                    if (calledTimestamp - messageHeader.callerTimestamp > 60000) {
                        let response = {
                            result: 'Error',
                            message: 'callerTimestamp Too Old.'
                        }
<<<<<<< HEAD
                        socket.send(JSON.stringify(response))
=======
                        caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                        return
                    }
                    /*
                    We will sign for the caller it's handle to prove our
                    Network Node identity.
                    */
                    let signedMessage = {
                        callerProfileHandle: messageHeader.callerProfileHandle,
                        calledProfileHandle: NT.NETWORK_NODE_USER_PROFILE_HANDLE,
                        callerTimestamp: messageHeader.callerTimestamp,
                        calledTimestamp: calledTimestamp
                    }
                    let signature = web3.eth.accounts.sign(JSON.stringify(signedMessage), NT.NETWORK_NODE_USER_PROFILE_PRIVATE_KEY)

                    let response = {
                        result: 'Ok',
                        message: 'Handshake Step One Complete',
                        signature: JSON.stringify(signature)
                    }
<<<<<<< HEAD
                    socket.send(JSON.stringify(response))
=======
                    caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                }

                function handshakeStepTwo() {
                    /*
                    We will check that the caller role has beed defined at Step One. 
                    */
                    if (caller.role === undefined) {
                        let response = {
                            result: 'Error',
                            message: 'Handshake Step One Not Completed.'
                        }
<<<<<<< HEAD
                        socket.send(JSON.stringify(response))
=======
                        caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                        return
                    }
                    /*
                    We will check the signature at the message. 
                    */
                    if (messageHeader.signature === undefined) {
                        let response = {
                            result: 'Error',
                            message: 'signature Not Provided.'
                        }
<<<<<<< HEAD
                        socket.send(JSON.stringify(response))
=======
                        caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                        return
                    }

                    let signature = JSON.parse(messageHeader.signature)
                    caller.blockchainAccount = web3.eth.accounts.recover(signature)

                    if (caller.blockchainAccount === undefined) {
                        let response = {
                            result: 'Error',
                            message: 'Bad Signature.'
                        }
<<<<<<< HEAD
                        socket.send(JSON.stringify(response))
=======
                        caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                        return
                    }
                    /*
                    The signature gives us the blockchain account, and the account the user profile.
                    */
                    let witnessUserProfile = NT.projects.socialTrading.globals.memory.maps.USER_PROFILES_BY_BLOCHAIN_ACCOUNT.get(caller.blockchainAccount)

                    if (witnessUserProfile === undefined) {
                        let response = {
                            result: 'Error',
                            message: 'userProfile Not Found.'
                        }
<<<<<<< HEAD
                        socket.send(JSON.stringify(response))
=======
                        caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                        return
                    }
                    /*
                    The user profile based on the blockchain account, based on the signature,
                    it is our witness user profile, to validate the caller.
                    */
                    let signedMessage = JSON.parse(signature.message)

                    if (signedMessage.callerProfileHandle !== witnessUserProfile.userProfileHandle) {
                        let response = {
                            result: 'Error',
                            message: 'callerProfileHandle Does Not Match witnessUserProfile.'
                        }
<<<<<<< HEAD
                        socket.send(JSON.stringify(response))
=======
                        caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                        return
                    }
                    /*
                    We will check that the signature includes this Network Node handle, to avoid
                    man in the middle attackts.
                    */
                    if (signedMessage.calledProfileHandle !== NT.NETWORK_NODE_USER_PROFILE_HANDLE) {
                        let response = {
                            result: 'Error',
                            message: 'calledProfileHandle Does Not Match This Network Node Handle.'
                        }
<<<<<<< HEAD
                        socket.send(JSON.stringify(response))
=======
                        caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                        return
                    }
                    /*
                    We will check that the timestamp in the signature is the one we sent to the caller.
                    */
                    if (signedMessage.calledTimestamp !== calledTimestamp) {
                        let response = {
                            result: 'Error',
                            message: 'calledTimestamp Does Not Match calledTimestamp On Record.'
                        }
<<<<<<< HEAD
                        socket.send(JSON.stringify(response))
=======
                        caller.socket.send(JSON.stringify(response))
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                        return
                    }
                    /*
                    All validations have been completed, the Handshake Prcedure finished well.
                    */
                    /*
                    We will remember the user profile behind this caller.
                    */
                    caller.userProfile = witnessUserProfile
<<<<<<< HEAD
=======
                    /*
                    We will remember the caller itself.
                    */
                    addCaller(caller)
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef

                    let response = {
                        result: 'Ok',
                        message: 'Handshake Successful.'
                    }
<<<<<<< HEAD
                    socket.send(JSON.stringify(response))
=======
                    caller.socket.send(JSON.stringify(response))
                }
            }

            function addCaller(caller) {

                thisObject.callersMap.set(caller.socket.id, caller)

                switch (caller.role) {
                    case 'Network Client': {
                        addToArray(thisObject.networkClients, caller)
                        break
                    }
                    case 'Network Peer': {
                        addToArray(thisObject.networkPeers, caller)
                        break
                    }
                }

                function addToArray(callersArray, caller) {
                    /*
                    We will add the caller to the existing array, first the ones with highest ranking.
                    */
                    for (let i = 0; i < callersArray.length; i++) {
                        let callerInArray = callersArray[i]
                        if (caller.userProfile.ranking > callerInArray.userProfile.ranking) {
                            callersArray.splice(i, 0, caller)
                            return
                        }
                    }
                    callersArray.push(caller)
                }
            }

            function removeCaller(caller) {

                thisObject.callersMap.delete(caller.socket.id)

                switch (caller.role) {
                    case 'Network Client': {
                        removeFromArray(thisObject.networkClients, caller)
                        break
                    }
                    case 'Network Peer': {
                        removeFromArray(thisObject.networkPeers, caller)
                        break
                    }
                }

                function removeFromArray(callersArray, caller) {
                    for (let i = 0; i < callersArray.length; i++) {
                        let callerInArray = callersArray[i]
                        if (caller.socket.id === callerInArray.socket.id) {
                            callersArray.splice(i, 1)
                            return
                        }
                    }
                }
            }

            function broadcastToPeers(messageHeader, caller) {
                let callerIdToAVoid
                if (caller.role === 'Network Peer') {
                    callerIdToAVoid = caller.socket.id
                }
                for (let i = 0; i < thisObject.networkPeers.length; i++) {
                    let networkPeer = thisObject.networkPeers[i]
                    if (networkPeer.socket.id === callerIdToAVoid) { continue }
                    networkPeer.socket.send(messageHeader)
                }
            }

            function broadcastToClients(messageHeader, caller) {
                let callerIdToAVoid
                if (caller.role === 'Network Client') {
                    callerIdToAVoid = caller.socket.id
                }
                for (let i = 0; i < thisObject.networkClients.length; i++) {
                    let networkClient = thisObject.networkClients[i]
                    if (networkClient.socket.id === callerIdToAVoid) { continue }
                    networkClient.socket.send(messageHeader)
>>>>>>> d641a7e3b4a9f76cadee3d5dc0a02ed29d6b88ef
                }
            }

        } catch (err) {
            console.log('[ERROR] Web Sockets Interface -> setUpWebSocketServer -> err.stack = ' + err.stack)
        }
    }
}