import { useState, useContext } from "react"
import FormInput from "../form-input/form-input.component"
import Button from '../button/button.component';
import './sign-in-form.styles.scss'
import { UserContext } from '../../contexts/user.context'
import {
  signInwithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
  } from '../../Utils/firebase/firebase.utils';
  
  const defaultFormFields = {
    email: '',
    password: '',
  };


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const {setCurrentUser} = useContext(UserContext)


    const signInWithGoogle = async () => {
      const {user} = await signInwithGooglePopup();

      const userDocRef = await createUserDocumentFromAuth(user);
  }
  
    const resetFormFields = () => {
      setFormFields(defaultFormFields);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();

  
      try {
        const {user} =  await signInAuthUserWithEmailAndPassword(email, password);
        setCurrentUser(user)
        console.log('response', {user});
        resetFormFields();
      } catch (error) {
          switch(error.code){
            case 'auth/wrong-password':
              alert('incorrect password for email')
              break;
            case 'auth/user-not-found':
              alert('no user associated with this email')
              break;
            default:
              console.log('user sign in error', error)
          }
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <span>Sign in with you email and password</span>
            <h2> Already have an account?</h2>                        
            <form onSubmit={handleSubmit}>               
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <div className='buttons-container'>
                  <Button type='submit'>Sign In</Button>
                  <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm
