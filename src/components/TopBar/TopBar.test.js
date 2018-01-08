import React from "react";
import { shallow } from "enzyme";
import store from '../../redux/store';
import TopBar from "./TopBar.js";


it("+++ check Prop matches with initialState", () => {
    const test = shallow(<TopBar store={store} />);
    expect(test.prop("user")).toEqual({});
});
