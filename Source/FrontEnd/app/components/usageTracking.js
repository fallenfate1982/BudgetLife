import ReactGA from 'react-ga';

ReactGA.initialize('UA-145430466-1');

export function trackUserUploadResume(){
    ReactGA.event({
        category: 'User',
        action: 'User uploaded a resume'
      });
}


export function trackUserChangePassowrd(){
    ReactGA.event({
        category: 'User',
        action: 'User Changed their passowrd'
      });
}

export function trackUserSetForgottonPassowrd(){
    ReactGA.event({
        category: 'User',
        action: 'User set their forgotton password'
      });
}

export function trackUserForgotPassowrd(){
    ReactGA.event({
        category: 'User',
        action: 'User forgot password'
      });
}

export function trackUserSignedOut(){
    ReactGA.event({
        category: 'User',
        action: 'User signed out'
      });
}

export function trackUserSignedUp(){
    ReactGA.event({
        category: 'User',
        action: 'User created account Successfully'
      });
}

export function trackUserSignUpFail(){
    ReactGA.event({
        category: 'User',
        action: 'User attempted to create an account by failed'
      });
}

export function trackAppStarted(){
    ReactGA.event({
        category: 'User',
        action: 'User Accessed Site'
      });
}

export function trackUserLoggedIn(){
    ReactGA.event({
        category: 'User',
        action: 'User Logged into Site Successfully'
      });
}

export function trackUserLogInFail(){
    ReactGA.event({
        category: 'User',
        action: 'User Attempted to login, but failed'
      });
}

export function trackPageView(page){
    ReactGA.pageview(page);
}
