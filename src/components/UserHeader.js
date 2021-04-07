import React from 'react'
import {connect} from 'react-redux'


class UserHeader extends React.Component{

    // we don't want userheader to fetch it's own data through the action creators
    // componentDidMount(){
    //     // call action creator fetchUser and pass in the userId prop from Postlist 
    //     this.props.fetchUser(this.props.userId)
    // }

    render(){
        const{user} =this.props
        // when the app loads initially there will be no user
        if(!user){
            return null
        }
        // when a user is able to be returned
    return(
        <div className='header'>{user.name}</div>
    )
}
}
//rather than letting the  component find the user let mapstatetoprops find it
// mapstatetoprops gets a second argument that allows access to passed in props
// props are passed into mapstatetoprops before the component
const mapStateToProps = (state,ownProps) =>{
        // find the user with the userId passed in
        // when condition is met the element that returns true will be returned to user variable
    return{user: state.users.find(user=>user.id===ownProps.userId)}
}

export default connect(mapStateToProps)(UserHeader)