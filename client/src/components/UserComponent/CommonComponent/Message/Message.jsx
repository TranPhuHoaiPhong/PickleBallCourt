// src/utils/message.js
import { message } from 'antd';

let messageApi;

export const setMessageApi = (api) => {
  messageApi = api;
};

export const showSuccess = (content) => {
  if (messageApi) {
    messageApi.open({ type: 'success', content });
  } else {
    message.success(content);
  }
};

export const showError = (content) => {
  if (messageApi) {
    messageApi.open({ type: 'error', content });
  } else {
    message.error(content);
  }
};

export const showWarning = (content) => {
  if (messageApi) {
    messageApi.open({ type: 'warning', content });
  } else {
    message.warning(content);
  }
};
