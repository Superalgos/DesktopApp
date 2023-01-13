import axios from 'axios';
import store from '../store/index'

const http = axios.create({
    baseURL: "http://localhost:33248",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});



    // This function retrieves the users profile data and saves it in the store.
    async function getSocialPersona() {
        return http.get('/users/social-persona')
                .then(response => {
                    // If defined all is well and we save the data.
                    if (response.data.nodeCodeName !== undefined) {
                        console.log("RESPONSE DATA " + JSON.stringify(response.data))
                        store.commit("ADD_PROFILE", response.data);
                        return;
                    } else {
                        // The user does not have a Social Trading App Profile setup yet and needs to create one.
                        store.commit("SHOW_CREATE_PROFILE", true);
                    }
                });
    };


    // Used at the Sign Up process when to create a new Superalgos User Profile or to use an existing one.
    async function createProfile(profileData, personaName) {
        return http.post('/users/create-profile', profileData)
                .then(response => {
                    if (response.data.address !== undefined) {
                        console.log('A new user profile has been created! This is your address: ', response.data.address, 'and private key: ', response.data.privateKey)
                    }
                    createSocialPersona(personaName);
                    getSocialPersona();
                    return;
                }).finally(response => {
                    let message = {
                        originSocialPersonaId: store.state.profile.nodeId,
                        name: store.state.profile.userProfileHandle
                    }
                    updateProfile(message);
                    return;
                });
    }


    // This is to create a Social Entity and also it's Storage. 
    async function createSocialPersona(profileData) {
        console.log("inside createSocial Persona ")
        return http.post('/users/social-entities', profileData)
    }


    // Save a Social Entity's information (bio, profile pic, and others) using Open Storage.
    async function updateProfile(profileData) {
        return http.post('/users/profile', profileData)
    }


    // This is to retrieve a list of Social Personas or Social Trading Bots belonging to the User Profile created at Sign Up.
    async function getProfiles() {
        console.log("Getting profiles")
        return http.get('/users/social-entities')
            .then(response => {
                let allUsers = response.data
                console.table(allUsers)
            });
    }

    // Load a Social Entity's information from Open Storage.
    async function getProfile(socialPersonaId) {
        return http.get('/users/profile', socialPersonaId)
            .then(response => {
                console.log(JSON.stringify(response))
                console.log("RESPONSE>DATA = " + JSON.stringify(response.data))
                return response
            });
    }

    async function getPaginationProfiles(initialPaginationIndex, pagination) {
        const body = {
            initialIndex: initialPaginationIndex,
            pagination: pagination
        }
        return http.post('/users/paginate-profiles', body)
    }



    async function getProfileData(profileData) {
        console.log("GETING PROFILE DATA + " + JSON.stringify(profileData))
        return http.get('/users/profileData', profileData)
            .then(response => {
                console.log("RESPONSE == " + JSON.stringify(response))
                return response.data
            });
    }



export {
    getProfiles,
    getProfile,
    updateProfile,
    getPaginationProfiles,
    getSocialPersona,
    createProfile,
    getProfileData,
    createSocialPersona
}