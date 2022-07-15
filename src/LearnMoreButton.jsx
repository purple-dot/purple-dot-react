/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
import React from 'react';

const HOST = 'https://www.purpledotprice.com';

const LearnMoreButton = () => (
  <>
    <style>
      {
           `
            .pd-learn-more {
                text-decoration: underline;
                cursor: pointer;
                background: none;
                border: none;
            }
           `
       }
    </style>
    <button
      className="pd-learn-more"
      type="button"
      onClick={onClick}
    >
      Learn more
    </button>
  </>
);

function onClick() {
  const iframeCommsId = 'd323029f-c21e-458b-9a73-957e7d87db32';
  const id = 'pd-learn-more-iframe';

  const iframe = createOverlayIframe({
    id,
    src: learnMoreIframeSrc({ iframeCommsId }),
  });
  document.body.appendChild(iframe);

  const interval = setInterval(sendHandshake, 500);

  function onMessage(ev) {
    const { data } = ev;

    if (!data) {
      return;
    }

    if (data.meta && data.meta.messageType === 'handshake-reply') {
      clearInterval(interval);
      return;
    }

    if (data.data && data.data.eventName === 'dismiss-iframe') {
      const dismissIframe = document.querySelector(`#${id}`);
      if (dismissIframe) {
        dismissIframe.parentNode.removeChild(dismissIframe);
      }
    }
  }

  function sendHandshake() {
    if (!iframe) {
      return;
    }

    iframe.contentWindow.postMessage(
      {
        meta: {
          messageType: 'handshake',
        },
        data: {
          iframeId: iframeCommsId,
        },
      },
      HOST,
    );
  }

  window.addEventListener('message', onMessage, false);
}

function createOverlayIframe({ id, src }) {
  const iframe = document.createElement('iframe');
  iframe.id = id;
  iframe.src = src;

  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.bottom = '0';
  iframe.style.right = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style['z-index'] = 1000;

  return iframe;
}

function learnMoreIframeSrc({ iframeCommsId }) {
  return `${HOST}/embedded-checkout/pre-order-value-prop?#!iframeId=${iframeCommsId}`;
}

export { LearnMoreButton };
