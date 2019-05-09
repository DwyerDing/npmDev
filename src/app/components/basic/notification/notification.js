import React, { Component } from 'react';
import RcNotification from 'rc-notification';

import './notification.scss';

class Notification {
  notification;

  constructor () {
    RcNotification.newInstance(
      {
        prefixCls: 'aiwen-notification'
      },
      instance => (this.notification = instance)
    );
  }

  show (msg) {
    this.notification.notice({
      duration: 2,
      maxCount: 5,
      content: <div> {msg} </div>
    });
  }
}

const notification = new Notification();
export default notification;
