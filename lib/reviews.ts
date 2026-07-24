/** WhatsApp testimonials from the design handoff, shared by Home and Order. */
export const REVIEWS = [
  {
    initials: "CA",
    color: "#B52126",
    name: "Chef Andrew",
    text: "Yes madam, I did — and they are far better than the other brands I have tasted.",
  },
  {
    initials: "HC",
    color: "#1FAD52",
    name: "Home cook",
    text: "The sausages are delicious, with a smooth, pleasant texture. Their taste is distinct from the usual options on the market — truly refreshing. Well done on a great product.",
  },
  {
    initials: "PF",
    color: "#E24F02",
    name: "A picky family",
    text: "We tasted the frankfurters and we all loved them. My wife, who is not easy to impress, says they're better than Farmer's Choice.",
  },
  {
    initials: "CC",
    color: "#5C1A16",
    name: "Chef Chris",
    text: "Your sausage is tasting good — I like the seasoning.",
  },
  {
    initials: "WG",
    color: "#1FAD52",
    name: "Weekend griller",
    text: "The seasoning had a slight kick of spice but stayed balanced. They stayed juicy after cooking and didn't dry out like some sausages I've had before.",
  },
  {
    initials: "BP",
    color: "#B52126",
    name: "Busy parent",
    text: "The sausages were extremely on point — my kids really loved them so much. I tried them today: a solid 10 out of 10.",
  },
];

export type Review = (typeof REVIEWS)[number];
