/*
default

invented button

google sign in button

*/
import './button.styles.scss'


const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
  };


const Button = ({children, buttonType, ...otherProps}) => {
    return (

        /** generic button 
         * {children}- any insde or p tags or span tags in the button 
         *  */
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
        
            { children }

        </button>
    )

}

export default Button;