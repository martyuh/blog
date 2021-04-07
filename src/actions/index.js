import _ from 'lodash'
import jsonPlaceholder from "../apis/jsonPlaceholder"

// to prevent repeated calls to the server, create a main action creator that can manage the other action creators to prevent repetitive api requests. As a result fetchpost and fetchuser will no longer be called by the component. Instead fetchpostsandusers will be called.
export const fetchPostsAndUsers = ()=>async (dispatch,getState) =>{
    // since the action creator is no longer being called or dispatched by the component to the reducer it needs to be dispatched by fetchpostsandusers. this allows thunk to have the inner function dispatched to it. 
    // an async request is made, we need to wait for the list and to dispatch the action object from the fetchposts action creator
    
    await dispatch(fetchPosts())
    // getstate will allow you to fetch the state/posts after the fetchposts thunk dispatches it to the reducer. so it'll be the posts key from the combinedreducer
    // use lodash's map function
    // pass in the string to grab the userId property off of the posts which will create an array of all the userIds
    //to grab the unique userIds use the _uniq function, which will return an array of the unique user ids
    // const userIds = _.uniq(_.map(getState().posts,'userId'))
    // use foreach function to iterate the array where you then dispatch the fetchuser action creator to grab the user data.
    //await is not necessary because no commands are taking place after the user is being called. we don't care if the users are being fetched. if we had other resources to get we would use await. foreach does not allow async
    // the user data will then be dispatched to the reducer which will allow the postlist component to access it via props
    // userIds.forEach(id=>dispatch(fetchUser(id)))

    // special function that allows you to chain on functions to allow you to manipulate data
    _.chain(getState().posts)
    // the first argument in the chain function is passed in as an argument into the subsequent function chained on. therefore you just have to pass in the second argument
    .map('userId')
    // whatever result you get from the above function will be passed into the subsequent method below as an argument
    .uniq()
    // whatever result you get from the above function will be passed into the subsequent method below as an argument. a function can then be called for each unique id 
    .forEach(id=>dispatch(fetchUser(id)))
    // ending the chain with .value will execute the chain
    .value()

}

export const fetchPosts =() =>{
// use async syntax
//return a function to the thunk middleware so that you can dispatch the action manually
return async dispatch=>{
       // use the json api created
   const response =  await jsonPlaceholder.get('/posts')
   // you return an action by manually dispatching it
   dispatch({
    type: 'FETCH_POSTS',
    // the payload should not waste bandwidth. make sure to dispatch the action object with the data only.
    payload: response.data
})
//    within a function being returned by thunk yo do not return an action
    // return{
    //     type:'FETCH_POSTS',
    //     // assign the response from the api call to the payload
    //     payload:response
// }
    }
}
// es15 format of a function returning a function
export const fetchUser = id =>async dispatch =>{
const response  = await jsonPlaceholder.get(`/users/${id}`)
    dispatch({
        type:'FETCH_USER',
        payload: response.data
    })
}
// es15 format of a function returning a function 
// export const fetchUser = (id) => dispatch =>{
    // call the memoized version of fetchuser
    // id and dispatch arguments passed in
//     _fetchUser(id,dispatch);
// }
// define a function outside of the action creator that will make the request and return the action object, and it gets memoized outside of the action creator so that it only gets memoized exactly one time and not rememoized evertime fetchuser is called
// underscore indicates it's a private function
// memoize to cache data inorder to prevent repeated api request to the server
// this will use the async await syntax
// problem with memoizing is that changes to the user will not cause the memozation to recognize it and will not refetch it
// const _fetchUser = _.memoize(async(id,dispatch)=>{
//     const response  = await jsonPlaceholder.get(`/users/${id}`)
//     dispatch({
//         type:'FETCH_USER',
//         payload: response.data
//     })

// })

// es15 format of a function returning a function
// export const fetchUser = function(id) {
// use lodash to cache data to prevent a constant api request to a server
// cannot memoize the async function because a new one is created everytime fetchuser is called so although it is memoizing it is doing it for every new function
// return _.memoize(async function(dispatch){
//     const response  = await jsonPlaceholder.get(`/users/${id}`)
//     dispatch({
//         type:'FETCH_USER',
//         payload: response.data
//     })
// })
// }