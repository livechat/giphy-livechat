import axios from "axios";

const apiUrl = "https://api.livechatinc.com/v3.1";

const getHeaders = (accessToken) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const sendRichMessage = async ({ chatId, imageUrl, accessToken }) => {
  const body = {
    chat_id: chatId,
    event: {
      type: "rich_message",
      template_id: "cards",
      recipients: "all",
      elements: [
        {
          image: {
            url: imageUrl,
          },
        },
      ],
    },
  };

  try {
    await axios.post(
      `${apiUrl}/agent/action/send_event`,
      body,
      getHeaders(accessToken)
    );
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
