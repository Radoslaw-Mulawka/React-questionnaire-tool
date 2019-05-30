import React, { Component, createContext } from 'react';
import NavigationColumn from './containers/NavigationColumn';
import ContentColumn from './containers/ContentColumn';
import $ from 'jquery';
import axios from 'axios';
import { withRouter } from 'react-router-dom';




export const AppContext = createContext();

class App extends Component {
    state = {
        userCredentials: null
    }


    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = "Bearer " + window.localStorage.getItem('token');

        axios.get('/profile').then(response => {
            let userCredentials = {
                profileFirstName: response.data.data.profileFirstName,
                profileLastName: response.data.data.profileLastName,
                profileEmail: response.data.data.profileEmail
            }
            window.sessionStorage.setItem('userCredentials', JSON.stringify(userCredentials));
            this.setState({
                userCredentials
            })
        })

        $(".arrow-block").one('click', handler1);
        function handler1(event) {
            if ($('.arrow-block').hasClass('arrow-reverse')) {
                $('.arrow-block').removeClass('arrow-reverse')
            }
            else {
                $('.arrow-block').addClass('arrow-reverse');
            }
            $(this).removeAttr('style');

            $(".navigation-column-visible nav>a").removeAttr('id rel data-trigger');

            $(".navigation-column-visible").width("332px");
            $("#progressBar").css("left", "275px");
            $(".user-avatar img").animate({
                height: '95px'
            }, 300);
            $(".user-avatar").animate({
                top: '33%'
            }, 300);
            $('.logo-block').animate({
                height: 80
            }, 300);
            $('.logo-block img').animate({
                'max-height': 56,
                top: 5,
                left: 27
            }, 300);
            $(".user-settings").show(400);
            $(".user-name").fadeIn(500);
            $(".user-block").css('height', '237px');
            $(".nav-item-name").fadeIn();

            if ($('.arrow-block').css('left') == '0px') {
                $(this).css('left', 'initial');
                $(this).animate({
                    'right': '0'
                }, 300);
            }
            else {

            }

            $(this).one("click", handler2);
            // $(".arrow-block").unbind('click');
        }
        function handler2() {
            if ($('.arrow-block').hasClass('arrow-reverse')) {
                // $('.arrow-block').removeClass('arrow-reverse')
                // alert($('.arrow-block').hasClass('arrow-reverse'));
            }
            else {
                // alert($('.arrow-block').hasClass('arrow-reverse'));
                $('.arrow-block').addClass('arrow-reverse');
            }
            $('.logo-block').animate({
                height: 84
            }, 300);
            $('.logo-block img').animate({
                'max-height': 47,
                top: 17,
                left: 18
            }, 300)
            $(".user-avatar img").animate({
                height: '36px'
            }, 300);
            $(".user-avatar").animate({
                top: '50%'
            }, 300);
            $(".navigation-column-visible").width("85px");
            $("#progressBar").css("left", "100px");
            $(".user-settings").hide();
            $(".user-name").fadeOut(100);
            $(".user-block").css('height', '63px');
            $(".nav-item-name").fadeOut(100);

            if ($('.arrow-block').css('left') == '0px') {

            }
            else {
                $(this).animate({
                    'left': '0'
                }, 300);
            }



            // console.log(  $._data(this, "events").click  );
            $(this).one("click", handler1);
            // $(".arrow-block").unbind('click');
        }

        // Nav is minimizing when other field but the nav is clicked
        $(".content-column, .nav-item, .user-settings a, .user-avatar a").click(function () {   // nawigacja on blur
            if ($(window).width() > 610) {
                $(".navigation-column-visible").width("85px");
                $("#progressBar").css("left", "100px");
                $(".user-settings").hide();
                $(".user-name").fadeOut(100);
                $(".user-avatar img").animate({
                    height: '36px'
                }, 100);
                $(".user-avatar").animate({
                    top: '50%'
                }, 300);
                $('.logo-block').animate({
                    height: 84
                }, 300);
                $('.logo-block img').animate({
                    'max-height': 47,
                    top: 17,
                    left: 18
                }, 300)
                $(".user-block").css('height', '63px');
                $(".nav-item-name").fadeOut(100);
                $(".arrow-block").animate({
                    'left': '0'
                }, 300);
                if ($('.arrow-block').hasClass('arrow-reverse')) {
                    return null;
                }
                else {
                    $('.arrow-block').addClass('arrow-reverse');
                }

                $(".arrow-block").unbind('click');
                $(".arrow-block").one("click", handler1);
            }
            else {
                $(".navigation-column-visible nav").slideUp();
            }
            // $(".arrow-block").unbind('click');
        });
    }

    changeUserCredentials = () => {
        this.setState({
            userCredentials: JSON.parse(window.sessionStorage.getItem('userCredentials'))
        })
    }
    render() {
        return (
            <div className="row row-flex-nav-wrap">
                <AppContext.Provider value={{
                    actions: {
                        changeUserCredentials: this.changeUserCredentials
                    }
                }} />
                <NavigationColumn userCredentials={this.state.userCredentials} />
                <ContentColumn stateToDefault={this.props.stateToDefault} 
                               changeUserCredentials={this.changeUserCredentials} 
                    />
                <AppContext.Provider />
            </div>
        );
    }
}

export default withRouter(App);
