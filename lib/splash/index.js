'use strict';

module.exports = {
  name: require('./package').name,
  contentFor: function (type) {
    if (type === 'head') {
      //inline this CSS so it is parsed the fastest
      return `
        <style type="text/css">
          #splash {
            background-color: #506380;
            display: grid;
            height: 100vh;
            left: 0;
            position: fixed;
            width: 100vw;
            grid-template-columns: 1fr;
            grid-template-rows: 100vh;
            align-items: center;
            justify-items: center;
            margin-top: -15px;
          }
          #splash.removing {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s 1s, opacity 1s linear;
          }
        </style>
      `;
    }

    if (type === 'body') {
      return `<div id='splash'></div>
      `;
    }
  },
};
