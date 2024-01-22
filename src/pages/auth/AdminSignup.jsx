import { Button, Form } from "react-bootstrap";
import BaseLayout from "../../components/layout/BaseLayout";
import CustomInput from "../../components/customInput/customInput";
import { useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db} from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";


const inputs = [
  { name: "fName", label: "First Name", placeholder: "Enter first name", type: "text", required: true },
  { name: "lName", label: "Last Name", placeholder: "Enter last name", type: "text", required: true },
  { name: "phone", label: "Phone", placeholder: "04## ### ###", type: "number", required: true },
  { name: "email", label: "Email", placeholder: "abc@abc.com", type: "email", required: true },
  { name: "password", label: "Password", placeholder: "********", type: "password", required: true, minLength: 6 },
  { name: "confirmPassword", label: "Confirm Password", placeholder: "********", type: "password", required: true },
]
const AdminSignup = () => {
  const navigate = useNavigate();
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

    // check if password match
    const {password, confirmPassword, ...restFormData} = formData;
    const {email}= formData;
    if (password !== confirmPassword) {
      return toast.error("Password did not match!");
    }

    const signupPromise = createUserWithEmailAndPassword(auth, email, password);
    toast.promise(signupPromise, {
      pending: "In progress..."
    });

    try {
      const userCredential = await signupPromise;
      console.log(userCredential.user);
      const {uid} = userCredential.user;

      // intialize firestore database
      // setDoc -> create a document in db
      // Add a new document in collection "cities"
      await setDoc(doc(db, "users", uid),{
        ...restFormData,
        uid
      });
      
      // send formData -> except password, confirmPassword
      // link uid
      // once success -> see result 
      // user data
      // navigate to login

      toast("User created successfully!");
      navigate("/login");
    } catch (error) {
      const errorCode = error.code;
        if(errorCode.includes("auth/email-already-in-use")) {
          toast.error("Account already exists!");
        } else {
          toast.error(error.message);
        }
    }
    
  }
  return (
    <>
      <BaseLayout>
        <div className="p-3 border shadow rounded admin-form">
          <h1>Admin Signup</h1>
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

export default AdminSignup;