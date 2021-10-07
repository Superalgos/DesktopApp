function newMachineLearningActionSwitch() {

    let thisObject = {
        executeAction: executeAction,
        initialize: initialize,
        finalize: finalize
    }

    return thisObject

    function finalize() {

    }

    function initialize() {
        /* Nothing to initialize since a Function Library does not hold any state. */
    }

    async function executeAction(action) {
        switch (action.name) {
            case 'Run Learning Session':
                {
                    UI.projects.machineLearning.functionLibraries.learningSessionFunctions.runSession(action.node, false, action.callBackFunction)
                }
                break
            case 'Resume Learning Session':
                {
                    UI.projects.machineLearning.functionLibraries.learningSessionFunctions.runSession(action.node, true, action.callBackFunction)
                }
                break
            case 'Stop Learning Session':
                {
                    UI.projects.machineLearning.functionLibraries.learningSessionFunctions.stopSession(action.node, action.callBackFunction)
                }
                break
        }
    }
}
