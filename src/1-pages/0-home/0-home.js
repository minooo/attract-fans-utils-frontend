import React, { Component } from "react";
import { Toast } from "antd-mobile";
import { Layout, WrapLink, RankList, RequestStatus } from "0-components";
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
            list: {
              self_spreader,
              self_rank,
              self_fans_number,
              self_call,
              self_img
            }
          } = res;
          if (self_spreader.length === 0) {
            this.setState(() => ({
              loading: false,
              noData: true
            }));
          } else {
            this.setState(() => ({
              loading: false,
              data: self_spreader,
              self_rank,
              self_fans_number,
              self_call,
              self_img
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
    const {
      data,
      self_img,
      self_call,
      fans_number,
      self_fans_number,
      noData,
      loading,
      netBad
    } = this.state;
    const { type } = searchToObj(window.location.hash);
    return (
      <Layout title="人气排行榜">
        <div className="common-bg equal plr40 flex column">
          <div className="equal overflow-y">
            <div
              className="r10 relative bg-white"
              style={{ marginTop: "1.1rem", height: "2.4rem" }}
            >
              <div className="h144 w144 home-avatar">
                {self_img ? (
                  <img
                    className="circle w-100 h-100 common-img-bg"
                    src={self_img}
                    alt=""
                  />
                ) : (
                  <div className="circle w-100 h-100 common-img-bg" />
                )}
              </div>
              <div className="flex column">
                <div
                  className="font28 flex ai-center jc-center bold c333 pt10 text-center lh100"
                  style={{ paddingTop: "1rem" }}
                >
                  还差<span className="font34 common-color-red">
                    {self_call || 0}
                  </span>个call就可以完成任务，求助攻~
                </div>
                <div
                  className="flex jc-between ai-center font24"
                  style={{
                    paddingLeft: "0.7rem",
                    paddingRight: "0.4rem",
                    paddingBottom: "0.4rem",
                    paddingTop: "0.5rem"
                  }}
                >
                  <div>人气：{fans_number || 0}</div>
                  <div className="cut-line" />
                  <div>排名：{self_fans_number || 0}</div>
                  <div className="cut-line" />
                  <WrapLink path={`/list?type=${type}`} className="c-main">
                    查看人气排行
                  </WrapLink>
                </div>
              </div>
            </div>
            <div
              className="mt20 bg-white r10 pt40 plr40"
              style={{ paddingBottom: "0.01rem" }}
            >
              {data &&
                data.length > 0 &&
                data.map(item => <RankList item={item} key={item.id} />)}
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
