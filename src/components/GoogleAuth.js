import React from 'react'
import { connect } from 'react-redux'
import { signIn, signOut} from '../action'

class GoogleAuth extends React.Component{

    state = { isSignedIn:null}

    componentDidMount(){
        window.gapi.load('client:auth2', () =>{
            window.gapi.client.init({
                clientId:'149229598661-ftm93idi498lb6octs9mtqgun5serm08.apps.googleusercontent.com',
                scope:'email'
            }).then(() =>{
                this.auth = window.gapi.auth2.getAuthInstance()
                this.setState({ isSignedIn: this.auth.isSignedIn.get()})
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn()
        }
        else{
            this.props.signOut()
        }
    }

    OnSignInClick = () =>{
        this.auth.signIn()
    }
    OnSignOutClick = () =>{
        this.auth.signOut()
    }

    renderAuthButton(){
        if(this.state.isSignedIn === null){
            return null
        }
        else if(this.state.isSignedIn){
            return(
                <button onClick={this.OnSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        }
        else{
            return (
                <button onClick={this.OnSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In with google
                </button>
            )
        }
    }

    render(){
        return(
        <div>{this.renderAuthButton()}</div>
        )
    }
}
export default connect(null ,{signIn,signOut})(GoogleAuth);