/* */
import React from 'react'

/* */
import styles from './Home.scss'
import Login from 'component/Login/'
import MainScreen from 'component/MainScreen/'
import ProjectList  from 'component/ProjectList/'

class Home extends React.Component {

    constructor() {
        super();
        this.state = {isLogIn: true};

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin = () => {
        this.setState({isLogIn : true});
    };
    handleLogout = () => {
        this.setState({isLogIn:false});
    };

    renderPage() {
        if(this.state.isLogIn) {
            return <ProjectList />
        }
        else{
            return <MainScreen />
        }
    }
    render() {
        return (
            <div className={styles.wrapper}>
               <Login />
                {this.renderPage()}
            </div>
        )
    }
}

export default Home
