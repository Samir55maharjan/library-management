import { Button, Form } from "react-bootstrap";
import BaseLayout from "../../components/layout/BaseLayout";
import CustomInput from "../../components/customInput/customInput";
import { useState } from "react";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

const inputs = [
  { name: "email", label: "Email", placeholder: "abc@abc.com", type: "email", required: true },
  { name: "password", label: "Password", placeholder: "********", type: "password", required: true, minLength: 6 },
]

const Login = () => {
  
  const [formData, setFormData] = useState({});

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
    // Todo: 
    try{

    
    await signInWithEmailAndPassword(auth, formData.email, formData.password );
    toast("login successful")
    }catch(error){
      toast('invalid email or password')
    }

    // toast("Logged in!");
  }

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