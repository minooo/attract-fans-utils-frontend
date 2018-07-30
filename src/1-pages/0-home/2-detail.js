import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Button } from "antd-mobile";
import { RequestStatus, Layout } from "0-components";
import { http } from "4-utils";

class Home extends Component {
  state = {};
  componentDidMount() {
    http.get("applications").then(response => {
      console.log(response, "rrr");
    });
  }
  onClick = () => {
    const { user, history } = this.props;
    user.changeName("liu");
    history.push("/search", { state: { age: 111 } });
  };
  render() {
    const { user } = this.props;
    return (
      <Layout title="详情">
        列表详情 {user.name}
        <RequestStatus />
        <Button onClick={this.onClick}>click me to change name!</Button>
      </Layout>
    );
  }
}

export default inject("user")(observer(Home));
