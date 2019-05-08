import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/Action';

class Buttons extends Component {
  render() {
    const {Actions} = this.props;
    return(
      <div>
          {/*데이터 불러오기*/}
        <button
          onClick={Actions.getData}
        >GET DOGS</button>

          {/*데이터 클리어*/}
        <button
          onClick={Actions.clearData}
        >CLEAR DOGS</button>
      </div>
    );
  }
}

export default connect(
    (state) => ({
        dogData: state.dogData,
    }),
    (dispatch) => ({
        Actions: bindActionCreators(Actions, dispatch),
    })
)(Buttons);