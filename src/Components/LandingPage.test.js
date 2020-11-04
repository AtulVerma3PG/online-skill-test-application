/* eslint-disable */
import React from "react";
import renderer from "react-test-renderer";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import LandingPage from "./LandingPage";
import { createMemoryHistory } from "history";

configure({adapter: new Adapter()});
test("First Submit Test Snapshot test", () => {
  const component = renderer.create(
    <LandingPage />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

const history = createMemoryHistory();
history.push('/');
describe('Test Button component', () => {
  it('Test click event', () => {
    const historyMock = { push: jest.fn() };
    const shallowCopy = shallow(<LandingPage history={historyMock}/>);
    shallowCopy.find('button').simulate('onClick');
    expect(history.location.pathname).toEqual('/')
  });
});
