import * as TestRenderer from 'react-test-renderer';
import React from 'react';
import InlineError from './messages/InlineError';


it('Basic test to see if InlineError is working', () => {
    const component = TestRenderer.create(<InlineError text="Error msg"/>);
    expect(component.root.findByType('span').props.children).toBe('Error msg');
})
