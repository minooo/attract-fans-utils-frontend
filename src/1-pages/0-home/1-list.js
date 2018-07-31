import React, { Component } from "react";
import { Toast } from "antd-mobile";
import { Layout, RankList, RequestStatus } from "0-components";
import { http, common } from "4-utils";

const { searchToObj } = common;
export default class extends Component {
  state = {
    data: [],
    noData: false,
    loading: false,
    netBad: false
  };
  componentDidMount() {
    const { type } = searchToObj(window.location.hash);
    const url =
      parseInt(type, 10) === 1 ? "server_callback" : "subscribe_callback";
    this.setState(() => ({ loading: true }));
    http
      .get(url, null)
      .then(res => {
        if (res.code === 0) {
          const {
            list: { fans_rank }
          } = res;
          if (fans_rank.length === 0) {
            this.setState(() => ({
              loading: false,
              noData: true
            }));
          } else {
            this.setState(() => ({
              loading: false,
              data: fans_rank
            }));
          }
        } else {
          this.setState(
            () => ({
              loading: false,
              netBad: true
            }),
            () => Toast.info(res.message, 2)
          );
        }
      })
      .catch(err => {
        this.setState(
          () => ({
            loading: false,
            netBad: true
          }),
          () => Toast.fail("网络出错，请稍后再试！", 2)
        );
      });
  }
  render() {
    const { data, noData, loading, netBad } = this.state;
    return (
      <Layout title="人气排行榜">
        <div className="common-bg equal plr40 flex column pt40">
          <div className="equal overflow-y">
            <div
              className="mt20 bg-white r10 pt40 plr40"
              style={{ paddingBottom: "0.01rem" }}
            >
              {data &&
                data.length > 0 &&
                data.map((item, index) => (
                  <RankList item={item} key={item.id} index={index} rank />
                ))}
              {netBad ? (
                <RequestStatus type="no-net" />
              ) : noData ? (
                <RequestStatus type="no-data" />
              ) : loading ? (
                <RequestStatus />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="text-center pb30 common-foot-color">
            嘟嘟插件技术支持咨询 400-99258
          </div>
        </div>
      </Layout>
    );
  }
}
