/* eslint-disable */
import React from "react";
import renderer from "react-test-renderer";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Questionaire from "./Questionaire";

const state = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "",
  isRegistered: false,
  formErrors: {
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
  },
  firstNameValid: false,
  lastNameValid: false,
  emailValid: false,
  passwordValid: false,
  genderValid: false,
  formValid: false,
}

configure({adapter: new Adapter()});
test("First Submit Test Snapshot test", () => {
  localStorage.setItem("userDetails", JSON.stringify(state));
  const component = renderer.create(
    <Questionaire />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  localStorage.removeItem("userDetails");
});