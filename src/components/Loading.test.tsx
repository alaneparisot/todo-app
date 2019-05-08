import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Loading from './Loading'

configure({ adapter: new Adapter() })

describe('<Loading />', () => {
  test('should render a loading message', () => {
    const wrapper = shallow(<Loading />)
    expect(wrapper.contains(<span>🚚 Loading...</span>)).toBeTruthy()
  })
})
