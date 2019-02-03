import React from 'react';
import '../styles/index.css';

const Piggybot = () => {
  return (
    <div>
      <div id="chatbot">
        <iframe
          title="piggybot"
          name="myiFrame"
          allow="microphone;"
          width="350"
          height="430"
          src="https://console.dialogflow.com/api-client/demo/embedded/8da1c4ff-793f-4de9-9ec9-d5168b87c73d"
        />
      </div>
    </div>
  );
};

export default Piggybot;
