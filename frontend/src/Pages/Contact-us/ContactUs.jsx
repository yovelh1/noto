import {useRef} from "react";
import "./ContactUs.css";
import ContactUsCard from "./ContactUsCard";

export default function ContactUs() {
  const cardRefs = {0: useRef(null), 1: useRef(null), 2: useRef(null)};

  const openCard = (cardID) => {
    closeCards();
    cardRefs[cardID].current.addExtend();
  };

  const closeCards = () => {
    cardRefs["0"].current.removeExtend();
    cardRefs["1"].current.removeExtend();
    cardRefs["2"].current.removeExtend();
  };

  return (
    <div className="contact-us page">
      <h1 className="contact-us__title">Contact us</h1>
      <h4 className="contact-us__subtitle">Have any questions? Want hear from us?</h4>
      <div className="contact-us__card-container">
        <ContactUsCard
          ref={cardRefs["0"]}
          id="0"
          title="Newsletter"
          description="Are you intrested in our latest news or working and need to get in touch?"
          buttonText="Register"
          position="left"
          openCard={openCard}
          closeCards={closeCards}
        />
        <ContactUsCard
          ref={cardRefs["1"]}
          id="1"
          title="Help & Support"
          description="Our support team is spread across the country to give you answers fast."
          buttonText="Send Massege"
          position="center"
          openCard={openCard}
          closeCards={closeCards}
        />
        <ContactUsCard
          ref={cardRefs["2"]}
          id="2"
          title="Sales"
          description="Get in touch with our sales team to see how we can work together."
          buttonText="Contact Sales"
          position="right"
          openCard={openCard}
          closeCards={closeCards}
        />
      </div>
    </div>
  );
}
