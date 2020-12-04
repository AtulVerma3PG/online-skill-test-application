/* eslint-disable */
import React from "react";
import renderer from "react-test-renderer";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { createMemoryHistory } from "history";
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

const history = createMemoryHistory();
history.push('/Questionaire');
describe('Test Homepage Button component', () => {
  it('Test HomePage click event', () => {
  localStorage.setItem("userDetails", JSON.stringify(state));
    const historyMock = { push: jest.fn() };
    const shallowCopy = shallow(<HomePage history={historyMock} />);
    shallowCopy.find("#selectLevel").simulate("onClick");
    expect(history.location.pathname).toEqual('/Questionaire')
    localStorage.removeItem("userDetails");
  });
});
