import { Button, Form } from "react-bootstrap";
import BaseLayout from "../../components/layout/BaseLayout";
import CustomInput from "../../components/customInput/customInput";
import { useState } from "react";
import { toast } from "react-toastify";

const inputs = [
  { name: "email", label: "Email", placeholder: "abc@abc.com", type: "email", required: true },
]

const ResetPassword = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value }  = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate inputs
    // Todo: 

    toast("Password reset!");
  }

  return (
    <>
      <BaseLayout>
        <div className="p-3 border shadow rounded admin-form">
          <h1>Password Reset</h1>
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

export default ResetPassword;