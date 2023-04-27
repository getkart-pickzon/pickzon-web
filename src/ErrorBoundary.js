import React from "react";
import { Header, Icon } from 'semantic-ui-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  };
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  };

  render() {
    if (this.state.errorInfo) {
      return (
        // <h2>Something went wrong!</h2>
        <>
          <Header as='h2' icon textAlign="center" style={{ marginTop: "15%" }}>
            <Icon name='exclamation triangle' />
            Oops...!
            <Header.Subheader>
              Something Went Wrong
            </Header.Subheader>
          </Header>
        </>
      )
    };
    return this.props.children;
  };
};