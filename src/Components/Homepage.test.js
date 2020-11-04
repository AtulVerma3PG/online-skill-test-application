/* eslint-disable */
import React from "react";
import renderer from "react-test-renderer";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { createMemoryHistory } from "history";
import HomePage from "./HomePage";

configure({adapter: new Adapter()});
test("HomePage Snapshot test", () => {
  const component = renderer.create(
    <HomePage />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

const history = createMemoryHistory();
history.push('/Questionaire');
describe('Test Homepage Button component', () => {
  it('Test HomePage click event', () => {
    const historyMock = { push: jest.fn() };
    const shallowCopy = shallow(<HomePage history={historyMock} />);
    shallowCopy.find("#selectLevel").simulate("onClick");
    expect(history.location.pathname).toEqual('/Questionaire')
  });
});
