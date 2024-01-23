import { Button, Form } from "react-bootstrap";
import BaseLayout from "../../components/layout/BaseLayout";
import CustomInput from "../../components/customInput/customInput";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db} from "../../firebase-config";
import { setUserInfo } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getUserInfoAction } from "../../redux/auth/authAction";

const inputs = [
  { name: "email", label: "Email", placeholder: "abc@abc.com", type: "email", required: true },
  { name: "password", label: "Password", placeholder: "********", type: "password", required: true, minLength: 6 },
]

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const { userInfo } = useSelector(state => state.auth);

  const handleChange = (e) => {
    const { name, value }  = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate inputs
    // Todo: {
    const {email, password} = formData;
    try{
    const signInPromise = signInWithEmailAndPassword(auth, email, password)
    const userCredential = await signInPromise;
    // toast("login successful")
    const { user } = userCredential;
    
    dispatch(getUserInfoAction(user.uid));
    
    }catch(error){
      toast('invalid email or password')
    }
    

    
  };

  useEffect(() => {
    if (userInfo.uid){
      navigate ("/dashboard");
    }
  }, [userInfo]);

  return (
    <>
      <BaseLayout>
        <div className="p-3 border shadow rounded admin-form">
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>
            {inputs.map(input => (
              <CustomInput key={input.name} label={input.label} {...input} onChange={handleChange} />
            ))}

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </BaseLayout>
    </>
  )
}

export default Login;