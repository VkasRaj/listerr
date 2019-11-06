import React, { Fragment } from "react";
import { SubmitHandler } from "../@types/types";
import FormikTextField from "../components/Form/FormikTextField";
import FormikSubmitButton from "../components/Form/FormikSubmitButton";
import FormikForm from "../components/Form/FormikForm";
import FormWrapper from "../components/Form/FormWrapper";
import FormCaption from "../components/Form/FormCaption";
import SEO from "../components/SEO";

const initValues = { username: "", email: "", password: "" };

const Home = () => {
    const handleSubmit: SubmitHandler<typeof initValues> = values => {
        console.log(values);
    };

    return (
        <Fragment>
            <SEO title="Signup" />
            <FormWrapper>
                <FormikForm onSubmit={handleSubmit} initialValues={initValues}>
                    <FormikTextField name="username" label="Username" />
                    <FormikTextField name="email" label="Email" type="email" />
                    <FormikTextField
                        name="password"
                        label="Password"
                        type="password"
                    />
                    <FormikSubmitButton>Submit</FormikSubmitButton>
                </FormikForm>
            </FormWrapper>
            <FormCaption
                primary="Already have an account?"
                secondary="Login"
                href="/login"
            />
        </Fragment>
    );
};

export default Home;