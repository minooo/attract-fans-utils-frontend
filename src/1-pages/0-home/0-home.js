import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Button } from "antd-mobile";
import { Layout, RequestStatus } from "0-components";
import { http } from "4-utils";

class Home extends Component {
  state = {};
  componentDidMount() {
    http.get("applications").then(response => {
      console.log(response, "rrr");
    });
  }
  onClick = () => {
    const { user } = this.props;
    user.changeName("zhuang");
  };
  render() {
    const { user } = this.props;
    return (
      <Layout title="首页">
        营销活动首页 {user.name}
        <RequestStatus />
        <Button onClick={this.onClick}>click me to change name!</Button>
      </Layout>
    );
  }
}

export default inject("user")(observer(Home));
