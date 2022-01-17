import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from './home/App';
import UserProfile from "./userProfile/UserProfile";
import NotFound from "./notFound/NotFound";
import Feed from "./feed/Feed";
import PostPlaceholder from "./postPlaceholder/PostPlaceholder";
import Post from "./post/Post";
import Signup from "./signup/Signup";

const Root = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App/>}>
                    <Route path='' element={<Feed/>}/>
                    <Route path='profile' element={<UserProfile/>}>
                        <Route path=':userId' element={<UserProfile/>}/>
                    </Route>
                    <Route path='postPlaceholder' element={<PostPlaceholder/>}/>
                    <Route path='post'>
                        <Route path={':postId'} element={<Post/>}/> {/* TODO handle this post data*/}
                    </Route>
                </Route>
                <Route path='/signUp' element={<Signup/>}/>
                <Route
                    path="*"
                    element={
                        <NotFound/>
                    }
                />
            </Routes>
        </BrowserRouter>)
}

export default Root;