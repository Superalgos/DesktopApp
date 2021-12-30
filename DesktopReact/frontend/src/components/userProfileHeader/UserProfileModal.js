import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    CardContent,
    CardMedia,
    FormControl,
    FormHelperText,
    InputLabel,
    Modal,
    OutlinedInput,
    Typography
} from "@mui/material";
import "./UserProfileModal.css"
import {CloseOutlined, Input} from "@mui/icons-material";
import styled from "@emotion/styled";
import {updateProfile} from "../../api/profile.httpService";
import {STATUS_OK} from "../../api/httpConfig";


const UserProfileModal = ({user, show, close, updateProfileCallback}) => {
    useEffect(() => {
        return () => {
            setUserInfo(user);
        };
    }, []);

    const Input = styled('input')({
        display: 'none',
    });

    const [errorState, setErrorState] = useState(false);
    const [userInfo, setUserInfo] = useState(user);
    const [changed, setChanged] = useState(false);

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const selectProfilePic = async (e) => {
        let profilePic = e.target.files[0];
        if (profilePic) {
            let newInfo = {...userInfo};
            newInfo.profilePic = await toBase64(profilePic);
            setUserInfo(newInfo)
        }
    }

    const selectBannerPic = async (e) => {
        let bannerPic = e.target.files[0];
        if (bannerPic) {
            let newInfo = {...userInfo};
            newInfo.bannerPic = await toBase64(bannerPic);
            setUserInfo(newInfo)
        }
    }

    const handleChange = (event) => {
        if (userInfo[name]) {
            setErrorState(true);
        } else {
            setErrorState(false);
            setUserInfo({
                ...userInfo,
                [event.target.id]: event.target.value
            });
        }
        setChanged(user === userInfo)
    }

    const saveProfile = async () => {
        console.log(userInfo)
        let {result} = await updateProfile(userInfo).then(response => response.json());
        if (result === STATUS_OK) {
            setTimeout(() => {
                updateProfileCallback();
                close();
            }, 5000)
            console.log('profile should be updated')
            //todo show a toast that the profile saved
        }
    }

    return (<>
        {show ? <Modal open={show}
                       onClose={close}>
            <Box className="editUserBox" component="form" noValidate autoComplete="off">
                <CardContent className="userSection">
                    <div className="editProfileHeader">
                        <div className="editProfileCloseBtn">
                            <CloseOutlined onClick={close}/>
                        </div>
                        <div className="editProfileHeaderTitleAndBtn">
                            <Typography className="editProfileTitle" variant="h5">
                                Edit Profile
                            </Typography>
                        </div>
                    </div>
                    <div className="editBannerAvatarContainer">
                        <CardMedia className="banner"
                                   component="img"
                                   src={`${userInfo.bannerPic}`}
                                   alt="PP"
                        />
                        <div className="editAvatar">
                            <div className="profileCard">
                                <div className="profilePicBG">
                                    <CardMedia className="profileAvatar"
                                               component="img"
                                               src={`${userInfo.profilePic}`}
                                               alt="ProfilePic"
                                    />
                                </div>
                                <label htmlFor="profilePic">
                                    <Input className="input" accept="image/*" id="profilePic" multiple type="file"
                                           onChange={selectProfilePic}/>
                                    <Button variant="contained" component="span">
                                        Upload Profile Picture
                                    </Button>
                                </label>
                                <div>
                                    <label htmlFor="bannerPic">
                                        <Input className="input" accept="image/*" id="bannerPic" multiple type="file"
                                               onChange={selectBannerPic}/>
                                        <Button variant="contained" component="span">
                                            Upload Banner Picture
                                        </Button>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="editProfileInputBoxes">
                            <FormControl className="editProfile" required error={errorState}>
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <OutlinedInput
                                    id="name"
                                    value={userInfo.name}
                                    onChange={handleChange}
                                    label="Name"
                                />
                                {errorState ? (
                                    <FormHelperText id="name-error">Name can't be blank</FormHelperText>
                                ) : null}
                            </FormControl>
                            <FormControl className="editProfile">
                                <InputLabel htmlFor="bio">bio</InputLabel>
                                <OutlinedInput
                                    id="bio"
                                    value={userInfo.bio}
                                    onChange={handleChange}
                                    label="bio"
                                />
                            </FormControl>
                            <FormControl className="editProfile">
                                <InputLabel htmlFor="location">location</InputLabel>
                                <OutlinedInput
                                    id="location"
                                    value={userInfo.location}
                                    onChange={handleChange}
                                    label="location"
                                />
                            </FormControl>
                            <FormControl className="editProfile">
                                <InputLabel htmlFor="web">Web</InputLabel>
                                <OutlinedInput
                                    id="web"
                                    value={userInfo.web}
                                    onChange={handleChange}
                                    label="web"
                                />
                            </FormControl></div>
                        <div className="editProfileFooter">
                            <Button disabled={changed} onClick={saveProfile} variant="outlined">Save</Button>
                        </div>
                    </div>
                </CardContent>
            </Box>
        </Modal> : null}
    </>);
};

export default UserProfileModal;