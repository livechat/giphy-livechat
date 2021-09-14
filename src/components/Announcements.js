/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { useState, Fragment } from "react";
import { InAppMessage } from "@livechat/design-system";

const Announcements = ({ onCtaClick }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    isOpen && (
      <InAppMessage
        onClose={toggleOpen}
        image={{
          src: "https://cdn.livechat-static.com/api/file/v2/lc/att-old/8656216/fe28d6850106f65c9207f3dcea091099/product-cards-shopify-preview.gif",
        }}
        header={{
          avatar: {
            src: "https://cdn.livechat-static.com/api/file/developers/img/applications/iJH005LGg/icons/wzm90cYGR-960x960.png",
            alt: "Giphy",
          },
          text: (
            <Fragment>
              <strong>Giphy</strong> for LiveChat
            </Fragment>
          ),
        }}
        footerButtons={{
          cta: {
            children: "Check it out!",
            onClick: () => {
              toggleOpen();
              onCtaClick();
            },
          },
          remind: {
            children: "Remind me later!",
            onClick: toggleOpen,
          },
        }}
      >
        <h2>Monitor your Agents GIFs usage</h2>
        <p>
          New you are able to analyze and monitor what kind of GIFs your Agents
          are using.
        </p>
      </InAppMessage>
    )
  );
};

export default Announcements;
