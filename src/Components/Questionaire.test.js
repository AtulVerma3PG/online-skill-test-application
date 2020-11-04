/* eslint-disable */
import React from "react";
import renderer from "react-test-renderer";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Questionaire from "./Questionaire";

configure({adapter: new Adapter()});
test("First Submit Test Snapshot test", () => {
  const component = renderer.create(
    <Questionaire />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});