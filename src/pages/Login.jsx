// import { Input } from "../components/Inputs";
import {useState ,useEffect} from "react"
import supabase from "../config/supabaseClient";
import './login.css' 
import { useNavigate } from "react-router-dom";

export const Login =()=>{
    const navigate = useNavigate();
    //* all states that must be edited when creating a new account 
    const [Name ,setName] = useState('');
    const [Surname ,setSurname] = useState('');
    const [Email ,setEmail] = useState('');
    const [Age ,setAge] = useState('');
    const [Password ,setPassword] = useState('');
    //* incase the form is not completed or some kind of error occurs
    const [FormError,setFormError] = useState(null);

    const handleSubmit = async(e)=> {
        e.preventDefault()
        if(!Name || !Surname || !Email || !Age || !Password){
            setFormError('Please fill in all the boxes');
            console.log("bitch im empty");
            return
            }

            //*inserting the new rows of user information
            const {data ,error} = await supabase
            .from('Users')
            //*one object represents a new row being added to the table
            .insert([{Name,Surname,Email,Age,Password}])
            setFormError(null)

                if(error){
                    console.log(error);
                    setFormError("Error occurred please try again")
                }
                if(data){
                    setFormError(null)
                    alert('Thank you for signing up you may now log in' )
        }
                
    }
//! Validates and checks if user exists  
const [userInfo , setUserInfo] = useState(null);
//! to be used when we switch pages
const [Change ,setChange] = useState(false);

const getUser= async () =>{
     const {data, error} =   await supabase
                    .from('Users')
                    .select('*')
                    .eq('Email', Email)
                    .eq('Password', Password)
                    
                if(error){
                console.log(error)
                setFormError('There has been an error please try again')}
                if(data && data.length >0){
                    //* array of an object that is returned
                setUserInfo(data[0])
                setChange(true)
                setFormError(null)
                }else{
                    setFormError('Email and/or password are incorrect please try again')
                }
}

    const handleSignIn = async(e)=>{
        e.preventDefault()
        if(!Email || !Password){
            setFormError('Please fill in your information')
            console.log('fields have not been filled in ')
            return}
                //!not getting access from supabase
               getUser()
                console.log(userInfo)
                console.log(Change)
    }

    // dependent on the navigate and change state 
    useEffect(() => {
        if (Change) {
          navigate('/home');
        }
      }, [Change, navigate]);
    
        

    //! must be used when displaying the users information incase of account detail changes
    // const [FetchError, setFetchError] = useState(null);
    // const [Register, setRegister] = useState(null)

    //! Best way of fetching data from an api (needs mor time to be learnt and understood)

    //* This is for the usage of supabase hence why .from has users because it the specified table that we want to receive our information from

    //* has an empty array because it needs to only run once 
    // useEffect(()=>{
    //     //* create a async function within the useEffect to avoid using await 
    //         //! this function is tto receive all the data from the api and look for error if there are some
    //         const fetchUsers = async()=>{
    //             const {data , error} = await supabase
    //             .from('Users')
    //             //* to get all data from the table users we leave select empty however if you want specific information from the table then you can pass an argument containing the title of the table
    //             .select()

    //             if(error) {
    //                 //* Reminder that set is used to update the variable without the word 'set' 
    //                 setFetchError("Did'nt fetch records mission failure!!!");
    //                 //* incase a value had been set for Register it needs to be updated to be null
    //                 setRegister(null);
    //                 console.log(error);
    //             }
                
    //             if(data){
    //                 setRegister(data);
    //                 //* this is just a precaution
    //                 setFetchError(null);
    //             }
    //         }
    //         //! have to run the function 
    //         fetchUsers()
    // },[])

    //*handle changes 
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSurnameChange = (e) => {
        setSurname(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    //* Changes the container component in order for the animation to work
    const [isActive, setIsActive] = useState(false);

    const handleRegisterClick = () => {
      setIsActive(true);
    };
  
    const handleLoginClick = () => {
      setIsActive(false);
    };

    return(
    
        <div className={`Container ${isActive ? 'active' : ''}`}>
            <div className="form-container signUp">
                <form onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <input
                    className="boxes"
                    type="text"
                    placeholder="Name"
                    value={Name}
                    onChange={handleNameChange}/>

                    <input
                    className="boxes"
                    type="text"
                    placeholder="Surname"
                    value={Surname}
                    onChange={handleSurnameChange}/>

                    <input
                    className="boxes"
                    type="email"
                    placeholder="Email"
                    value={Email}
                    onChange={handleEmailChange}/>

                    <input
                    className="boxes"
                    type="text"
                    placeholder="Age"
                    value={Age}
                    onChange={handleAgeChange}/>

                    <input
                    className="boxes"
                    type="password"
                    placeholder="Password"
                    value={Password}
                    onChange={handlePasswordChange}/>

                    <button>Sign Up</button>

                    {FormError && <p>{FormError}</p>}
                </form>
            </div>

            <div className="form-container signIn">
                <form onSubmit={handleSignIn}>
                    <h1>Sign In</h1>

                    <input
                    className="boxes"
                    type="email"
                    placeholder="Email"
                    value={Email}
                    onChange={handleEmailChange}/>

                    <input
                    className="boxes"
                    type="password"
                    placeholder="Password"
                    value={Password}
                    onChange={handlePasswordChange}/>

                    <a href="#">forgot password?</a>

                    <button>Sign In</button>
                    {FormError && <p>{FormError}</p>}

                </form>
            </div>

            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back</h1>
                        <p>
                            Enter your information to enter the excitement of the world of podcast!!!
                        </p>
                        <button className="Hidden" id="login" onClick={handleLoginClick}>Sign in</button>
                    </div>

                    <div className="toggle-panel toggle-right">
                        <h1>Whats up</h1>
                        <p>
                            Do not have an account? Do not stress you can register here to enjoy the beauty of the podcast world:
                        </p>
                        <button className="Hidden" id="register" onClick={handleRegisterClick}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}