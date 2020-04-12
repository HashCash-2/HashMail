import { action } from "easy-peasy";

export default {
  sent: [
    {
      from: "kautukkundan@gmail.com",
      to: "vanshkapoor@gmail.com",
      date: "Sun, 12 Apr 2020 21:27:17 GMT",
      subject: "Ordering 100 pieces of 3D printed parts",
      body:
        "Please send 100 pieces of 3D printed parts of Facemasks. It is very crucial for fighting against Corona.",
    },
    {
      from: "kautukkundan@gmail.com",
      to: "vanshkapoor@gmail.com",
      date: "Sun, 11 Apr 2020 21:27:17 GMT",
      subject: "I have a Brilliant Idea",
      body:
        "How about we use malaria vaccine for combat against corona virus? I feel this will be a very effective method.",
    },
    {
      from: "kautukkundan@gmail.com",
      to: "vaibhavchellani@gmail.com",
      date: "Sun, 10 Apr 2020 21:27:17 GMT",
      subject: "Please send BTC ASAP",
      body:
        "I want 1000 BTC asap. Please transfer the requested amount in my wallet",
    },
    {
      from: "kautukkundan@gmail.com",
      to: "elonmusk@tesla.com",
      date: "Sun, 10 Apr 2020 21:27:17 GMT",
      subject: "I have an Idea for Tesla model S to make it fly",
      body: "I have a brilliant Idea which can make the Tesla model S fly",
    },
    {
      from: "kautukkundan@gmail.com",
      to: "sundarpichai@google.com",
      date: "Sun, 1 Apr 2020 21:27:17 GMT",
      subject: "I want to become the CEO of Google",
      body:
        "Please make me the CEO of Google. I will buy 3 Pixel 4 in exchange. Thank you.",
    },
  ],
  inbox: [
    {
      from: "vanshkapoor@gmail.com",
      to: "kautukkundan@gmail.com",
      date: "Sun, 12 Jan 2020 21:27:17 GMT",
      subject: "I can help end world hunger and overpopulation.",
      body:
        "If we can select random people and feed it to the people who are suffering from hunger we can solve overpopulation and world hunger in a single step. the only caviat will be that people have to adopt cannibalism.",
    },
    {
      from: "vanshkapoor@gmail.com",
      to: "kautukkundan@gmail.com",
      date: "Sun, 11 Jan 2020 21:27:17 GMT",
      subject: "I have a Brilliant Idea",
      body: "What if we kill all the corrupt politicians?",
    },
    {
      from: "vaibhavchellani@gmail.com",
      to: "kautukkundan@gmail.com",
      date: "Sun, 10 Jan 2020 21:27:17 GMT",
      subject: "I want to send you BTC",
      body:
        "Please share your wallet. I have 1000 BTC and I want to transfer 990 BTC to you.",
    },
    {
      from: "elonmusk@tesla.com",
      to: "kautukkundan@gmail.com",
      date: "Sun, 10 Feb 2020 21:27:17 GMT",
      subject: "I want to send you to mars.",
      body:
        "I was looking for people who can go to mars. I thought you can make a perfect fit for the purpose.",
    },
  ],

  //actions
  setInbox: action((state, emails) => {
    state.inbox = emails;
  }),
  setOutbox: action((state, emails) => {
    state.sent = emails;
  }),
};
