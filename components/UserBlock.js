import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Popup } from 'semantic-ui-react';

// <Link to="/profile">
// <img src="/assets/img/avatar_circle_blue.png" alt="user-avatar" />
// </Link>

const UserBlock = (props) => {
    const logoutHandler = () => {
        window.localStorage.removeItem('token');
        props.history.push('/login-page')
    }

    let userCredentials;
    if(props.userCredentials !== null){
        if(props.userCredentials.profileFirstName != null && props.userCredentials.profileLastName != null) {
            userCredentials = <span>{`${props.userCredentials.profileFirstName}  ${props.userCredentials.profileLastName}`}</span>;
        }
        else {
            userCredentials = props.userCredentials.profileEmail
        }
    }
    else {
        userCredentials = 'Unknown'
    }
    return (

        <Popup
            trigger={
                <div className="user-block">
                    <div className="user-avatar">
                        <Link to="/profile">
                            <img src="/assets/img/avatar_circle_blue.png" alt="user-avatar" />
                        </Link>
                    </div>

                    <span className="user-name">
                        {userCredentials}
                    </span>

                    <div className="user-settings">
                        <span onClick={logoutHandler}><a >Wyloguj</a></span>

                        <div className="division-line"></div>

                        <span>
                            <Link to="/profile">Profil</Link>
                        </span>

                        {/*<span>
                    <a href="http://">Język: </a>
                    <span className="actual-lang">PL</span>
                </span> */}
                    </div>
                </div>
            }
            content={
                <div className="user-block-tooltip">
                    <span>
                        {userCredentials}
                    </span>
                    <div><span></span> <Link to='/profile'><p>Edytuj profil</p></Link></div>
                    <div><span></span> <p onClick={logoutHandler}>Wyloguj</p></div>
                </div>
            }
            position='right center'
            on='hover'
            hoverable={true}
            className="nav-tooltip nav-tooltip-bottom-remove"
        />

    )
}

export default withRouter(UserBlock);