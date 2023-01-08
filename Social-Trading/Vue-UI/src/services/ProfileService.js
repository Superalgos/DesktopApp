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
                        store.commit("ADD_PROFILE", response.data);
                        return;
                    } else {
                        // The user does not have a Social Trading App Profile setup yet and needs to create one.
                        store.commit("SHOW_CREATE_PROFILE", true);
                    }
                });
    };


    // Creates a new profile or updates an existing one
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


    // Creates new repo for the social persona + create social persona
    async function createSocialPersona(profileData) {
        console.log("inside createSocial Persona ")
        return http.post('/users/social-entities', profileData)
    }


    // Update profile data on github storage
    async function updateProfile(profileData) {
        return http.post('/users/profile', profileData)
    }


    async function getProfiles() {
        return http.get('/users/profiles');
    }

    // Loads Profile
    async function getProfile(socialPersonaId) {
        return http.get('/users/profile', undefined, socialPersonaId)
    }

    async function getPaginationProfiles(initialPaginationIndex, pagination) {
        const body = {
            initialIndex: initialPaginationIndex,
            pagination: pagination
        }
        return http.post('/users/paginate-profiles', body)
    }



    async function getProfileData(profileData) {
        return http.post('/users/profileData', profileData)
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