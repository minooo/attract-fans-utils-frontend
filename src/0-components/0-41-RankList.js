import React from "react";

export default ({ rank, item, index }) => (
  <div className="h80 flex ai-center jc-between mb40">
    <div className="flex ai-center equal overflow-h">
      {rank && <div className="font60 ccc pr20">{index + 1}</div>}
      <div className="w80 h80">
        {item.headimgurl ? (
          <img
            className="circle h-100 w-100 common-img-bg"
            src={item.headimgurl}
            alt=""
          />
        ) : (
          <div className="circle h-100 w-100 common-img-bg" />
        )}
      </div>
      <div className="pl20 font24 equal text-overflow-one">{item.nickname}</div>
    </div>
    <div className="flex ai-center w100">
      <i className="i-fans font50 pr20" />
      <div className="font24">{item.fans_number}</div>
    </div>
  </div>
);
