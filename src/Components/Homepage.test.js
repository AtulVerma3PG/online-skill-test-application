/* eslint-disable */
import React from "react";
import renderer from "react-test-renderer";
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import HomePage from "./HomePage";

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
test("HomePage Snapshot test", () => {
  localStorage.setItem("userDetails", JSON.stringify(state));
  const component = renderer.create(
    <HomePage />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  localStorage.removeItem("userDetails");
});
