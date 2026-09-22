/**
 * Every word on /earn-from-instagram, in English and Hindi, with the same
 * shape so the page cannot render a mix. Functions take the live numbers
 * (prices, thresholds) so the two languages never drift from the code.
 */
export type Lang = "en" | "hi";

export interface EarnCopy {
  langName: string;
  toggleAria: string;
  breadcrumb: { home: string; current: string };
  hero: { h1: string; lead: string; join: string; openQr: string; seeLevels: string; trust: string[] };
  calc: {
    h2: string;
    intro: string;
    newHere: string;
    seeSplit: string;
    and: string;
    howToGetCode: string;
    productLabel: string;
    option: (name: string, distribution: string) => string;
    directLabel: string;
    teamLabel: string;
    buyersValue: (n: number) => string;
    referredValue: (n: number) => string;
    monthOnPaper: string;
    level1Line: (n: number, unit: string) => string;
    level2Line: (n: number, unit: string) => string;
    disclaimer: (percents: string) => string;
  };
  answer: { h2: string; p1: string; p2: string };
  compare: {
    h2: string;
    intro: string;
    headers: string[];
    rows: { method: string; followers: string; cost: string; payout: string; bestFor: string; highlight?: boolean }[];
    blurbs: { h: string; p: string }[];
  };
  how: { h2: string; intro: string; steps: { name: string; text: string }[] };
  levels: {
    h2: string;
    p1: string;
    p2: (levelOnePercent: number) => string;
    p3: (cashback: string) => string;
    ladder: {
      example: (productName: string, distribution: string) => string;
      level: (n: number) => string;
      directSale: string;
      footnote: string;
      aria: string;
    };
  };
  post: {
    h2: string;
    intro: string;
    show: string;
    stickers: string;
    templates: { title: string; show: string; caption: string; sticker: string }[];
    whereH3: string;
    where: string[];
    discloseH3: string;
    disclose: string;
  };
  products: { h2: string; intro: string; youEarn: (amount: string) => string; browse: string; browseTail: string };
  before: {
    h2: string;
    intro: string;
    lines: (v: { cashback: string; threshold: string; pct: number; free: string; min: string }) => string[];
  };
  faq: { h2: string; items: { question: string; answer: string }[] };
  contact: {
    h2: string;
    p: string;
    address: string;
    mapLink: string;
    aria: string;
    whatsappLabel: string;
    whatsappAction: string;
    callLabel: string;
    callAction: string;
    emailLabel: string;
    emailAction: string;
    whatsappMessage: string;
    emailSubject: string;
  };
  closing: { h2: string; p: string };
  phone: { aria: string; scan: string; caption: (productName: string) => string; sendMessage: string; handle: string; time: string };
}

const en: EarnCopy = {
  langName: "English",
  toggleAria: "Choose language",
  breadcrumb: { home: "Home", current: "Earn from Instagram" },
  hero: {
    h1: "How to earn money from Instagram in India, even with a small account",
    lead:
      "Post one story with your Attri QR code and referral code. When your followers buy natural Ayurvedic products through it, you earn a commission on that sale, and on the sales of the people they bring in, seven levels deep. Free to join. Paid to your bank.",
    join: "Join free and get your QR code",
    openQr: "Open my QR code",
    seeLevels: "See how the 7 levels pay",
    trust: ["Free to join", "No follower minimum", "Commission on 7 levels", "Withdraw to your bank"],
  },
  calc: {
    h2: "Work out what a month could look like",
    intro:
      "Every product has a distribution value: the part of its price shared with the people who brought the buyer. Pick a product, slide the number of followers who buy it, and the number of people each of them goes on to refer. Values are live from the catalogue.",
    newHere: "New here?",
    seeSplit: "See how the 7 levels are split",
    and: "and",
    howToGetCode: "how to get your code",
    productLabel: "Product your followers buy",
    option: (name, d) => `${name} — distribution value ${d}`,
    directLabel: "Followers who buy it this month",
    teamLabel: "People each of them refers who also buy",
    buyersValue: (n) => `${n} buyers`,
    referredValue: (n) => `${n} referred buyers each`,
    monthOnPaper: "Your month, on paper",
    level1Line: (n, unit) => `Level 1 (25%): ${n} direct ${n === 1 ? "sale" : "sales"} × ${unit}`,
    level2Line: (n, unit) => `Level 2 (21%): ${n} team ${n === 1 ? "sale" : "sales"} × ${unit}`,
    disclaimer: (p) =>
      `Levels 3 to 7 (${p}) keep paying as your team grows, and are not counted here. This is an illustration based on the product's current distribution value. Real earnings depend entirely on what people actually buy; nothing on this page is a guarantee of income.`,
  },
  answer: {
    h2: "The short answer",
    p1: "You do not need a big following to make money on Instagram. The quickest route for a small account is a referral programme: you recommend products you actually use, and you are paid when people buy. With Attri, joining is free, you get a personal QR code and referral code the moment you sign up, and you earn 25% of a product's distribution value when a follower buys through your code, then 21%, 18%, 12%, 9%, 7% and 5% on the purchases of the people your team brings in, down to seven levels.",
    p2: "India now has more than 93 lakh active direct sellers, nearly half of them women, and wellness and personal care make up over 80% of what they sell. This page shows you how to do it with a phone, a story and a QR code, and what it honestly pays.",
  },
  compare: {
    h2: "Six ways people earn from Instagram in India, compared honestly",
    intro:
      "Most guides list these without saying who they actually work for. Here is the same list with the follower counts, costs and waiting times filled in.",
    headers: ["Method", "Followers you need", "Upfront cost", "When you see money", "Works best for"],
    rows: [
      {
        method: "Brand deals and sponsored posts",
        followers: "Usually 10,000+ with steady engagement",
        cost: "₹0",
        payout: "After weeks of pitching; paid per post",
        bestFor: "Niche creators who post daily",
      },
      {
        method: "Reels ads and creator bonuses",
        followers: "Eligibility rules, often invite-only",
        cost: "₹0",
        payout: "Unpredictable and small at first",
        bestFor: "Accounts already getting lakhs of views",
      },
      {
        method: "Affiliate links (Amazon, Flipkart, Meesho)",
        followers: "None",
        cost: "₹0",
        payout: "1–10% per sale, paid after 30–60 days",
        bestFor: "Deal and haul pages",
      },
      {
        method: "Selling your own products",
        followers: "None",
        cost: "Stock, packaging, shipping",
        payout: "Only after you sell",
        bestFor: "Makers and home businesses",
      },
      {
        method: "Subscriptions, badges and gifts",
        followers: "Around 500+ for gifts, 10,000+ for subscriptions",
        cost: "₹0",
        payout: "Small until you have loyal fans",
        bestFor: "Live and video-first creators",
      },
      {
        method: "A referral programme like Attri",
        followers: "None",
        cost: "₹0",
        payout: "Credited to your wallet as soon as an order is paid",
        bestFor: "Small accounts, students, homemakers, first-time earners",
        highlight: true,
      },
    ],
    blurbs: [
      {
        h: "Stories reach the people who know you",
        p: "A story is seen by your closest followers first: friends, family, classmates, colleagues. Those are exactly the people who will buy a shampoo because you said it worked.",
      },
      {
        h: "A QR code works off Instagram too",
        p: "The same code goes on your WhatsApp status, a printed card at your shop or salon, or a college notice board. Every scan is yours.",
      },
      {
        h: "Your team's sales pay you as well",
        p: "Affiliate links pay once per click. Here, when the people you referred start referring, their sales pay you too, seven levels down.",
      },
    ],
  },
  how: {
    h2: "How the Attri Creator Program works",
    intro: "Four steps. The first two take about ten minutes.",
    steps: [
      {
        name: "Create your free Attri account",
        text: "Sign up with your phone number. There is no joining fee, no starter kit and nothing to buy. If nobody invited you, pick one of the suggested referral codes on the signup page.",
      },
      {
        name: "Get your QR code and referral code",
        text: "Both are waiting in My Account under Share & earn. Save the QR as an image, copy your code, and you are ready to post.",
      },
      {
        name: "Post a story with your code",
        text: "Add the QR image to a story about a product you actually use, add a link sticker to your signup link, and write one honest line. Pin it to a highlight so it keeps working after 24 hours.",
      },
      {
        name: "Earn every time they buy",
        text: "When someone joins with your code and pays for an order, your commission lands in your wallet balance. You also earn on the purchases of the people they bring in, down to seven levels. Withdraw to your bank account whenever your balance crosses ₹100.",
      },
    ],
  },
  levels: {
    h2: "The 7-level earning plan, explained with a real product",
    p1: "Every Attri product carries a distribution value: the part of its price that is set aside for the people who brought the customer. It is fixed per product and shown in the calculator above, so you can see exactly what a sale pays before you post.",
    p2: (pct) =>
      `When an order is paid, that value is split up the buyer's referral chain. The person whose code the buyer joined with is level 1 and receives ${pct}%. The person who referred them is level 2, and so on to level 7. The split is front-loaded on purpose: the direct recommendation earns the most, but the whole chain is rewarded for building the team.`,
    p3: (cashback) =>
      `On top of that, you receive ₹10 the moment someone joins with your code, and they receive ${cashback} of welcome cashback, which is what gets a first order over the line.`,
    ladder: {
      example: (name, d) => `Example: one ${name} is bought (distribution value ${d}). Each person in the buyer's chain receives:`,
      level: (n) => `Level ${n}`,
      directSale: "direct sale",
      footnote:
        "Level 1 is the person whose code the buyer joined with. Level 2 is the person who referred them, and so on up the chain. When your follower brings in a friend who buys, you are their Level 2.",
      aria: "Commission by level",
    },
  },
  post: {
    h2: "What to post: three stories that actually get scanned",
    intro:
      "Stories reach a small slice of your followers, so make each one do a job. These three formats work for accounts of every size. Rotate them; do not post the same one twice in a row.",
    show: "Show",
    stickers: "Stickers",
    templates: [
      {
        title: "The seven-day check-in",
        show: "You, using the product for a week. Shampoo in the shower caddy, the cream on your dresser, the juice on your desk.",
        caption: "Day 7 with the onion shampoo. Less hair in the drain, honestly. Scan for ₹200 off your first order. #partnership",
        sticker: "QR sticker bottom-right, link sticker on your signup URL.",
      },
      {
        title: "The QR flash",
        show: "Full-screen QR code on a plain background with your referral code typed large underneath. Nothing else.",
        caption: "Joining Attri is free. My code is inside. New members get ₹200 cashback. #partnership",
        sticker: "Pin this one to a highlight called Shop with me.",
      },
      {
        title: "The routine and the poll",
        show: "Your morning or night routine with the product in frame. Add a poll sticker: Want the link?",
        caption: "Everyone who votes yes gets the link in their DMs. That reply converts far better than a link tap.",
        sticker: "Poll sticker over the product, QR small in a corner.",
      },
    ],
    whereH3: "Where else your code should live",
    where: [
      "Your bio link, pointing at your signup URL, so it works between stories.",
      "A highlight named Shop with me, holding your QR flash story permanently.",
      "The last two seconds of every Reel about the product.",
      "Your WhatsApp status and any family or college broadcast group.",
      "A printed card wherever you already talk to people: your shop, salon, tuition centre or hostel.",
    ],
    discloseH3: "Say that you earn from it",
    disclose:
      "Earning a commission is a material connection under ASCI's influencer guidelines, so disclose it where people will see it: #ad or #partnership in the first line of the caption, and as on-screen text for video. It is the rule, and it is also why people trust small creators more than ads. Stick to what the product did for you and avoid medical claims; these are Ayurvedic personal care products, not medicines.",
  },
  products: {
    h2: "Products your followers already want, and what each one pays",
    intro:
      "Level 1 commission on a direct sale, from the live distribution values. Combos pay the most per order; everyday items like shampoo and face wash sell most often.",
    youEarn: (amt) => `You earn ${amt} per direct sale`,
    browse: "Browse the full range",
    browseTail: "to find the products your audience will care about.",
  },
  before: {
    h2: "Read this before your first story",
    intro: "The plain facts, so you can answer your followers' questions before they ask.",
    lines: ({ cashback, threshold, pct, free, min }) => [
      "There is no joining fee, no starter kit and no stock to buy. Ever.",
      "Commission is paid only on real product purchases, in line with India's Consumer Protection (Direct Selling) Rules, 2021. Nobody is paid for recruiting.",
      "Earnings depend entirely on what people buy. Most creators start with a few hundred rupees a month; the calculator shows illustrations, not promises.",
      `Your followers get ${cashback} welcome cashback when they join, ${pct}% cashback on orders of ${threshold} or more, and free delivery from ${free}.`,
      `Commission is credited to your wallet once the order is paid. Withdraw to a bank account you have added in My Account; the minimum is ${min}.`,
      "Disclose that you earn (#ad or #partnership) and keep your claims to your own experience.",
    ],
  },
  faq: {
    h2: "Questions creators ask before they join",
    items: [
      {
        question: "Can I earn from Instagram with fewer than 1,000 followers?",
        answer:
          "Yes. Attri has no follower minimum. What matters is that the people who see your story trust you. A small account with 300 real followers who buy converts better than a large account nobody listens to. You are paid on purchases, not on reach.",
      },
      {
        question: "Do I have to pay anything to join?",
        answer:
          "No. Creating an Attri account is free, there is no starter kit, and you are never required to buy stock. You only need a phone number and a referral code, and the signup page suggests codes if nobody invited you.",
      },
      {
        question: "How much commission do I earn per sale?",
        answer:
          "Every product has a distribution value, the part of its price set aside for the people who brought the customer. When an order is paid, that value is split across the buyer's chain: 25% to level 1, then 21%, 18%, 12%, 9%, 7% and 5% to levels 2 to 7. If a follower joins with your code and buys a product with a ₹100 distribution value, you receive ₹25. If they refer a friend who buys the same product, you receive ₹21 as their level 2.",
      },
      {
        question: "How do I get my QR code and referral code?",
        answer:
          "Log in and open My Account. Under Share & earn you will find your referral code with a copy button, a WhatsApp share button, and your personal QR code. Take a screenshot of the QR or save it, and it is ready to drop into a story.",
      },
      {
        question: "How do I put a QR code in an Instagram story?",
        answer:
          "Open the story camera, choose the QR image from your gallery or add it as a photo sticker on top of your own photo, then tap the sticker tray and add a Link sticker pointing to your signup link. Publish, then add the story to a highlight so it stays on your profile after 24 hours. Anyone can add link stickers; the old 10,000-follower rule is gone.",
      },
      {
        question: "When and how do I get paid?",
        answer:
          "Commission is credited to your wallet balance when the order is paid, not when it is placed. From the Withdraw page you can transfer your balance to a bank account you have added to your profile. The minimum withdrawal is ₹100.",
      },
      {
        question: "What does my follower get for joining with my code?",
        answer:
          "New members receive ₹200 welcome cashback to use on their orders, 10% cashback on any order of ₹299 or more, and free delivery from ₹699. You also receive ₹10 the moment they join, before they buy anything.",
      },
      {
        question: "Is this a pyramid scheme? Is it legal in India?",
        answer:
          "No. Nobody earns anything for recruiting alone. Every rupee of commission comes from a real product purchase, which is what the Consumer Protection (Direct Selling) Rules, 2021 require. There is no joining fee and no compulsory purchase. Attri Industries is a registered Indian company based in Laxmi Nagar, Delhi; you can call or WhatsApp the team before you join.",
      },
      {
        question: "Instagram se paise kaise kamaye, bina followers ke?",
        answer:
          "Chhote account se bhi kama sakte hain. Attri par free join karo, My Account se apna QR code aur referral code lo, aur unhe apni story mein lagao. Jab koi aapke code se join karke Ayurvedic products kharidta hai, aapko commission milta hai, aur unke referrals ki kharid par bhi, 7 levels tak. Koi joining fee nahi, koi stock kharidna nahi.",
      },
      {
        question: "Do I have to tell my followers that I earn a commission?",
        answer:
          "Yes. Under ASCI's influencer guidelines, earning a commission is a material connection and must be disclosed clearly and upfront: a tag like #ad or #partnership in the first lines of the caption, and on-screen text for video. It also builds trust, which is what makes stories convert.",
      },
      {
        question: "Can I use the same code on WhatsApp, YouTube or offline?",
        answer:
          "Yes. Your referral code and QR code work anywhere. Put the QR on your WhatsApp status, in a YouTube description, on a card at your salon, shop or college notice board. Every signup through it is yours.",
      },
    ],
  },
  contact: {
    h2: "Talk to a real person before you post",
    p: "Not sure how the plan fits your account, or want help planning your first story? Call or message the Attri team in Delhi. We answer in English and Hindi, and we will walk you through the 7 levels, your QR code and what to post.",
    address: "Attri Industries, Laxmi Nagar, Delhi 110092.",
    mapLink: "Full address and map",
    aria: "Ways to contact Attri",
    whatsappLabel: "WhatsApp us, fastest reply",
    whatsappAction: "Chat now",
    callLabel: "Call us",
    callAction: "Call now",
    emailLabel: "Email us",
    emailAction: "Send email",
    whatsappMessage: "Hi Attri, I read the Earn from Instagram page and want to know more about the Creator Program.",
    emailSubject: "Attri Creator Program: I want to know more",
  },
  closing: {
    h2: "Your first story can go up today",
    p: "Sign up in two minutes, save your QR code, and post it with a product you already use. Your wallet starts counting from the first paid order.",
  },
  phone: {
    aria: "Example Instagram story with an Attri QR code sticker",
    scan: "Scan to join free",
    caption: (product) => `Day 7 with the ${product}. Use my code for ₹200 cashback on your first order. #partnership`,
    sendMessage: "Send message",
    handle: "your.handle",
    time: "2h",
  },
};

const hi: EarnCopy = {
  langName: "हिन्दी",
  toggleAria: "भाषा चुनें",
  breadcrumb: { home: "होम", current: "इंस्टाग्राम से कमाई" },
  hero: {
    h1: "इंस्टाग्राम से पैसे कैसे कमाएँ, छोटे अकाउंट से भी",
    lead:
      "अपने Attri QR कोड और रेफ़रल कोड के साथ बस एक स्टोरी पोस्ट करें। जब आपके फ़ॉलोअर उससे नैचुरल आयुर्वेदिक प्रोडक्ट खरीदते हैं, तो आपको उस बिक्री पर कमीशन मिलता है, और उनके लाए लोगों की बिक्री पर भी, सात लेवल तक। जुड़ना फ़्री है। पैसा सीधे आपके बैंक में।",
    join: "फ़्री जुड़ें और अपना QR कोड पाएँ",
    openQr: "मेरा QR कोड खोलें",
    seeLevels: "देखें 7 लेवल कैसे पे करते हैं",
    trust: ["जुड़ना फ़्री", "फ़ॉलोअर की कोई शर्त नहीं", "7 लेवल पर कमीशन", "सीधे बैंक में निकासी"],
  },
  calc: {
    h2: "देखें, आपका एक महीना कैसा दिख सकता है",
    intro:
      "हर प्रोडक्ट की एक डिस्ट्रिब्यूशन वैल्यू होती है: कीमत का वह हिस्सा जो खरीदार लाने वालों में बाँटा जाता है। प्रोडक्ट चुनें, इसे खरीदने वाले फ़ॉलोअर की संख्या स्लाइड करें, और यह भी कि उनमें से हर एक आगे कितने लोगों को रेफ़र करता है। वैल्यू कैटलॉग से लाइव हैं।",
    newHere: "नए हैं?",
    seeSplit: "देखें 7 लेवल कैसे बँटते हैं",
    and: "और",
    howToGetCode: "अपना कोड कैसे पाएँ",
    productLabel: "आपके फ़ॉलोअर कौन-सा प्रोडक्ट खरीदते हैं",
    option: (name, d) => `${name} — डिस्ट्रिब्यूशन वैल्यू ${d}`,
    directLabel: "इस महीने इसे खरीदने वाले फ़ॉलोअर",
    teamLabel: "उनमें से हर एक जितने लोगों को रेफ़र करता है, जो खरीदते भी हैं",
    buyersValue: (n) => `${n} खरीदार`,
    referredValue: (n) => `हर एक के ${n} रेफ़र किए खरीदार`,
    monthOnPaper: "आपका महीना, काग़ज़ पर",
    level1Line: (n, unit) => `लेवल 1 (25%): ${n} सीधी बिक्री × ${unit}`,
    level2Line: (n, unit) => `लेवल 2 (21%): ${n} टीम बिक्री × ${unit}`,
    disclaimer: (p) =>
      `लेवल 3 से 7 (${p}) आपकी टीम बढ़ने के साथ पे करते रहते हैं, और यहाँ नहीं गिने गए हैं। यह प्रोडक्ट की मौजूदा डिस्ट्रिब्यूशन वैल्यू पर आधारित एक उदाहरण है। असली कमाई पूरी तरह इस पर निर्भर है कि लोग सच में क्या खरीदते हैं; इस पेज पर कुछ भी आय की गारंटी नहीं है।`,
  },
  answer: {
    h2: "छोटा जवाब",
    p1: "इंस्टाग्राम से कमाने के लिए बड़ी फ़ॉलोइंग ज़रूरी नहीं है। छोटे अकाउंट के लिए सबसे तेज़ रास्ता रेफ़रल प्रोग्राम है: आप वे प्रोडक्ट सुझाते हैं जो आप सच में इस्तेमाल करते हैं, और जब लोग खरीदते हैं तो आपको पैसे मिलते हैं। Attri के साथ जुड़ना फ़्री है, साइन अप करते ही आपको अपना QR कोड और रेफ़रल कोड मिल जाता है, और जब कोई फ़ॉलोअर आपके कोड से खरीदता है तो आपको प्रोडक्ट की डिस्ट्रिब्यूशन वैल्यू का 25% मिलता है, फिर आपकी टीम के लाए लोगों की खरीद पर 21%, 18%, 12%, 9%, 7% और 5%, सात लेवल तक।",
    p2: "भारत में अब 93 लाख से ज़्यादा सक्रिय डायरेक्ट सेलर हैं, जिनमें लगभग आधी महिलाएँ हैं, और वे जो बेचते हैं उसका 80% से ज़्यादा वेलनेस और पर्सनल केयर है। यह पेज बताता है कि एक फ़ोन, एक स्टोरी और एक QR कोड से यह कैसे करें, और ईमानदारी से इसमें कितना मिलता है।",
  },
  compare: {
    h2: "भारत में लोग इंस्टाग्राम से कमाने के छह तरीके, ईमानदार तुलना के साथ",
    intro:
      "ज़्यादातर गाइड ये तरीके गिना देती हैं, पर यह नहीं बतातीं कि ये किसके लिए सच में काम करते हैं। यहाँ वही सूची है, फ़ॉलोअर की संख्या, खर्च और इंतज़ार के समय के साथ।",
    headers: ["तरीका", "कितने फ़ॉलोअर चाहिए", "शुरुआती खर्च", "पैसा कब दिखता है", "किसके लिए सबसे सही"],
    rows: [
      {
        method: "ब्रांड डील और स्पॉन्सर्ड पोस्ट",
        followers: "आम तौर पर 10,000+ और लगातार एंगेजमेंट",
        cost: "₹0",
        payout: "हफ़्तों की पिचिंग के बाद; हर पोस्ट पर भुगतान",
        bestFor: "रोज़ पोस्ट करने वाले निश क्रिएटर",
      },
      {
        method: "रील्स ऐड और क्रिएटर बोनस",
        followers: "पात्रता की शर्तें, अक्सर इनवाइट-ओनली",
        cost: "₹0",
        payout: "अनिश्चित और शुरू में कम",
        bestFor: "जिन अकाउंट पर पहले से लाखों व्यूज़ आते हैं",
      },
      {
        method: "एफ़िलिएट लिंक (Amazon, Flipkart, Meesho)",
        followers: "कोई नहीं",
        cost: "₹0",
        payout: "हर बिक्री पर 1–10%, 30–60 दिन बाद भुगतान",
        bestFor: "डील और हॉल पेज",
      },
      {
        method: "अपने प्रोडक्ट बेचना",
        followers: "कोई नहीं",
        cost: "स्टॉक, पैकेजिंग, शिपिंग",
        payout: "सिर्फ़ बिकने के बाद",
        bestFor: "मेकर और घर से चलने वाले बिज़नेस",
      },
      {
        method: "सब्सक्रिप्शन, बैज और गिफ़्ट",
        followers: "गिफ़्ट के लिए लगभग 500+, सब्सक्रिप्शन के लिए 10,000+",
        cost: "₹0",
        payout: "वफ़ादार फ़ैन बनने तक कम",
        bestFor: "लाइव और वीडियो-फ़र्स्ट क्रिएटर",
      },
      {
        method: "Attri जैसा रेफ़रल प्रोग्राम",
        followers: "कोई नहीं",
        cost: "₹0",
        payout: "ऑर्डर का भुगतान होते ही आपके वॉलेट में",
        bestFor: "छोटे अकाउंट, स्टूडेंट, होममेकर, पहली बार कमाने वाले",
        highlight: true,
      },
    ],
    blurbs: [
      {
        h: "स्टोरी उन तक पहुँचती है जो आपको जानते हैं",
        p: "स्टोरी सबसे पहले आपके सबसे क़रीबी फ़ॉलोअर देखते हैं: दोस्त, परिवार, क्लासमेट, सहकर्मी। यही वे लोग हैं जो शैम्पू इसलिए खरीदेंगे क्योंकि आपने कहा कि यह काम करता है।",
      },
      {
        h: "QR कोड इंस्टाग्राम के बाहर भी काम करता है",
        p: "वही कोड आपके WhatsApp स्टेटस पर, आपकी दुकान या सैलून में छपे कार्ड पर, या कॉलेज के नोटिस बोर्ड पर जा सकता है। हर स्कैन आपका है।",
      },
      {
        h: "आपकी टीम की बिक्री भी आपको पे करती है",
        p: "एफ़िलिएट लिंक हर क्लिक पर एक बार पे करता है। यहाँ, जब आपके रेफ़र किए लोग खुद रेफ़र करना शुरू करते हैं, तो उनकी बिक्री भी आपको पे करती है, सात लेवल नीचे तक।",
      },
    ],
  },
  how: {
    h2: "Attri Creator Program कैसे काम करता है",
    intro: "चार स्टेप। पहले दो में लगभग दस मिनट लगते हैं।",
    steps: [
      {
        name: "अपना फ़्री Attri अकाउंट बनाएँ",
        text: "अपने फ़ोन नंबर से साइन अप करें। कोई जॉइनिंग फ़ीस नहीं, कोई स्टार्टर किट नहीं, कुछ खरीदना नहीं। अगर किसी ने आपको इनवाइट नहीं किया, तो साइन अप पेज पर सुझाए गए रेफ़रल कोड में से एक चुन लें।",
      },
      {
        name: "अपना QR कोड और रेफ़रल कोड पाएँ",
        text: "दोनों My Account में Share & earn के नीचे तैयार मिलेंगे। QR को इमेज के रूप में सेव करें, अपना कोड कॉपी करें, और आप पोस्ट करने के लिए तैयार हैं।",
      },
      {
        name: "अपने कोड के साथ स्टोरी पोस्ट करें",
        text: "जो प्रोडक्ट आप सच में इस्तेमाल करते हैं उसकी स्टोरी में QR इमेज जोड़ें, अपने साइन अप लिंक का लिंक स्टिकर लगाएँ, और एक ईमानदार लाइन लिखें। इसे हाइलाइट में पिन करें ताकि 24 घंटे बाद भी काम करती रहे।",
      },
      {
        name: "जब भी वे खरीदें, कमाएँ",
        text: "जब कोई आपके कोड से जुड़कर ऑर्डर का भुगतान करता है, तो आपका कमीशन आपके वॉलेट बैलेंस में आ जाता है। उनके लाए लोगों की खरीद पर भी आप कमाते हैं, सात लेवल तक। बैलेंस ₹100 पार होते ही अपने बैंक अकाउंट में निकालें।",
      },
    ],
  },
  levels: {
    h2: "7-लेवल कमाई प्लान, एक असली प्रोडक्ट के साथ समझें",
    p1: "हर Attri प्रोडक्ट की एक डिस्ट्रिब्यूशन वैल्यू होती है: कीमत का वह हिस्सा जो ग्राहक लाने वाले लोगों के लिए अलग रखा जाता है। यह हर प्रोडक्ट के लिए तय है और ऊपर कैलकुलेटर में दिखती है, ताकि पोस्ट करने से पहले ही आप देख सकें कि एक बिक्री पर क्या मिलेगा।",
    p2: (pct) =>
      `ऑर्डर का भुगतान होने पर वह वैल्यू खरीदार की रेफ़रल चेन में ऊपर की ओर बाँटी जाती है। जिसके कोड से खरीदार जुड़ा, वह लेवल 1 है और उसे ${pct}% मिलता है। जिसने उसे रेफ़र किया, वह लेवल 2 है, और इसी तरह लेवल 7 तक। बँटवारा जान-बूझकर आगे की तरफ़ भारी है: सीधी सिफ़ारिश सबसे ज़्यादा कमाती है, पर टीम बनाने के लिए पूरी चेन को इनाम मिलता है।`,
    p3: (cashback) =>
      `इसके ऊपर, जब कोई आपके कोड से जुड़ता है तो आपको उसी पल ₹10 मिलते हैं, और उन्हें ${cashback} का वेलकम कैशबैक मिलता है, जो पहला ऑर्डर पूरा कराने में मदद करता है।`,
    ladder: {
      example: (name, d) => `उदाहरण: एक ${name} खरीदा गया (डिस्ट्रिब्यूशन वैल्यू ${d})। खरीदार की चेन में हर व्यक्ति को मिलता है:`,
      level: (n) => `लेवल ${n}`,
      directSale: "सीधी बिक्री",
      footnote:
        "लेवल 1 वह व्यक्ति है जिसके कोड से खरीदार जुड़ा। लेवल 2 वह है जिसने उसे रेफ़र किया, और इसी तरह चेन में ऊपर तक। जब आपका फ़ॉलोअर किसी दोस्त को लाता है जो खरीदता है, तो आप उसके लेवल 2 हैं।",
      aria: "लेवल के हिसाब से कमीशन",
    },
  },
  post: {
    h2: "क्या पोस्ट करें: तीन स्टोरी जो सच में स्कैन होती हैं",
    intro:
      "स्टोरी आपके फ़ॉलोअर के एक छोटे हिस्से तक पहुँचती है, इसलिए हर स्टोरी से एक काम कराएँ। ये तीन फ़ॉर्मेट हर साइज़ के अकाउंट पर काम करते हैं। इन्हें बदल-बदल कर पोस्ट करें; एक ही फ़ॉर्मेट लगातार दो बार न डालें।",
    show: "दिखाएँ",
    stickers: "स्टिकर",
    templates: [
      {
        title: "सात दिन का अपडेट",
        show: "आप, एक हफ़्ते से प्रोडक्ट इस्तेमाल करते हुए। शावर कैडी में शैम्पू, ड्रेसर पर क्रीम, डेस्क पर जूस।",
        caption: "ओनियन शैम्पू के साथ 7वाँ दिन। नाली में बाल कम, सच में। पहले ऑर्डर पर ₹200 की छूट के लिए स्कैन करें। #partnership",
        sticker: "QR स्टिकर नीचे-दाएँ, लिंक स्टिकर आपके साइन अप URL पर।",
      },
      {
        title: "QR फ़्लैश",
        show: "सादे बैकग्राउंड पर फ़ुल-स्क्रीन QR कोड, नीचे आपका रेफ़रल कोड बड़े अक्षरों में। और कुछ नहीं।",
        caption: "Attri से जुड़ना फ़्री है। मेरा कोड अंदर है। नए मेंबर को ₹200 कैशबैक। #partnership",
        sticker: "इसे 'Shop with me' नाम की हाइलाइट में पिन करें।",
      },
      {
        title: "रूटीन और पोल",
        show: "आपका सुबह या रात का रूटीन, फ़्रेम में प्रोडक्ट के साथ। पोल स्टिकर लगाएँ: लिंक चाहिए?",
        caption: "जो 'हाँ' वोट करेगा, उसे DM में लिंक मिलेगा। यह जवाब लिंक टैप से कहीं बेहतर कन्वर्ट करता है।",
        sticker: "प्रोडक्ट के ऊपर पोल स्टिकर, कोने में छोटा QR।",
      },
    ],
    whereH3: "आपका कोड और कहाँ-कहाँ होना चाहिए",
    where: [
      "आपके बायो लिंक में, आपके साइन अप URL पर, ताकि स्टोरी के बीच में भी काम करे।",
      "'Shop with me' नाम की हाइलाइट, जिसमें आपकी QR फ़्लैश स्टोरी हमेशा रहे।",
      "प्रोडक्ट से जुड़ी हर रील के आख़िरी दो सेकंड।",
      "आपका WhatsApp स्टेटस और परिवार या कॉलेज का कोई भी ब्रॉडकास्ट ग्रुप।",
      "जहाँ भी आप पहले से लोगों से बात करते हैं वहाँ एक छपा कार्ड: आपकी दुकान, सैलून, ट्यूशन सेंटर या हॉस्टल।",
    ],
    discloseH3: "बताएँ कि आप इससे कमाते हैं",
    disclose:
      "ASCI की इन्फ़्लुएंसर गाइडलाइन के तहत कमीशन कमाना एक 'मटीरियल कनेक्शन' है, इसलिए इसे वहाँ बताएँ जहाँ लोग देखें: कैप्शन की पहली लाइन में #ad या #partnership, और वीडियो में ऑन-स्क्रीन टेक्स्ट के रूप में। यह नियम है, और यही वजह है कि लोग विज्ञापनों से ज़्यादा छोटे क्रिएटर पर भरोसा करते हैं। बस यह बताएँ कि प्रोडक्ट ने आपके लिए क्या किया और मेडिकल दावों से बचें; ये आयुर्वेदिक पर्सनल केयर प्रोडक्ट हैं, दवाइयाँ नहीं।",
  },
  products: {
    h2: "वे प्रोडक्ट जो आपके फ़ॉलोअर पहले से चाहते हैं, और हर एक पर क्या मिलता है",
    intro:
      "सीधी बिक्री पर लेवल 1 कमीशन, लाइव डिस्ट्रिब्यूशन वैल्यू से। कॉम्बो हर ऑर्डर पर सबसे ज़्यादा देते हैं; शैम्पू और फ़ेस वॉश जैसी रोज़मर्रा की चीज़ें सबसे ज़्यादा बिकती हैं।",
    youEarn: (amt) => `हर सीधी बिक्री पर आप ${amt} कमाते हैं`,
    browse: "पूरी रेंज देखें",
    browseTail: "और वे प्रोडक्ट चुनें जो आपके ऑडियंस को पसंद आएँगे।",
  },
  before: {
    h2: "अपनी पहली स्टोरी से पहले यह पढ़ लें",
    intro: "साफ़ बातें, ताकि फ़ॉलोअर के सवाल पूछने से पहले ही आपके पास जवाब हों।",
    lines: ({ cashback, threshold, pct, free, min }) => [
      "कोई जॉइनिंग फ़ीस नहीं, कोई स्टार्टर किट नहीं, और कोई स्टॉक खरीदना नहीं। कभी नहीं।",
      "कमीशन सिर्फ़ असली प्रोडक्ट खरीद पर दिया जाता है, भारत के Consumer Protection (Direct Selling) Rules, 2021 के अनुसार। सिर्फ़ लोगों को जोड़ने के लिए किसी को पैसे नहीं मिलते।",
      "कमाई पूरी तरह इस पर निर्भर है कि लोग क्या खरीदते हैं। ज़्यादातर क्रिएटर महीने के कुछ सौ रुपये से शुरू करते हैं; कैलकुलेटर उदाहरण दिखाता है, वादे नहीं।",
      `आपके फ़ॉलोअर को जुड़ने पर ${cashback} वेलकम कैशबैक, ${threshold} या उससे ज़्यादा के ऑर्डर पर ${pct}% कैशबैक, और ${free} से फ़्री डिलीवरी मिलती है।`,
      `ऑर्डर का भुगतान होने पर कमीशन आपके वॉलेट में आता है। My Account में जोड़े गए बैंक अकाउंट में निकालें; न्यूनतम ${min} है।`,
      "बताएँ कि आप कमाते हैं (#ad या #partnership) और अपने दावे अपने अनुभव तक रखें।",
    ],
  },
  faq: {
    h2: "जुड़ने से पहले क्रिएटर जो सवाल पूछते हैं",
    items: [
      {
        question: "क्या 1,000 से कम फ़ॉलोअर के साथ इंस्टाग्राम से कमाई हो सकती है?",
        answer:
          "हाँ। Attri में फ़ॉलोअर की कोई न्यूनतम शर्त नहीं है। ज़रूरी यह है कि आपकी स्टोरी देखने वाले लोग आप पर भरोसा करें। 300 असली फ़ॉलोअर वाला छोटा अकाउंट, जो खरीदते हैं, उस बड़े अकाउंट से बेहतर कन्वर्ट करता है जिसे कोई सुनता नहीं। आपको खरीद पर पैसे मिलते हैं, पहुँच पर नहीं।",
      },
      {
        question: "क्या जुड़ने के लिए कुछ देना पड़ता है?",
        answer:
          "नहीं। Attri अकाउंट बनाना फ़्री है, कोई स्टार्टर किट नहीं है, और आपको कभी स्टॉक खरीदने की ज़रूरत नहीं है। बस एक फ़ोन नंबर और एक रेफ़रल कोड चाहिए, और अगर किसी ने आपको इनवाइट नहीं किया तो साइन अप पेज कोड सुझाता है।",
      },
      {
        question: "हर बिक्री पर मुझे कितना कमीशन मिलता है?",
        answer:
          "हर प्रोडक्ट की एक डिस्ट्रिब्यूशन वैल्यू होती है, कीमत का वह हिस्सा जो ग्राहक लाने वालों के लिए अलग रखा जाता है। ऑर्डर का भुगतान होने पर वह वैल्यू खरीदार की चेन में बाँटी जाती है: लेवल 1 को 25%, फिर लेवल 2 से 7 को 21%, 18%, 12%, 9%, 7% और 5%। अगर कोई फ़ॉलोअर आपके कोड से जुड़कर ₹100 डिस्ट्रिब्यूशन वैल्यू का प्रोडक्ट खरीदता है, तो आपको ₹25 मिलते हैं। अगर वह किसी दोस्त को रेफ़र करता है जो वही प्रोडक्ट खरीदता है, तो उसके लेवल 2 के रूप में आपको ₹21 मिलते हैं।",
      },
      {
        question: "मुझे अपना QR कोड और रेफ़रल कोड कैसे मिलेगा?",
        answer:
          "लॉग इन करके My Account खोलें। Share & earn के नीचे आपको कॉपी बटन के साथ अपना रेफ़रल कोड, WhatsApp शेयर बटन और अपना QR कोड मिलेगा। QR का स्क्रीनशॉट लें या सेव करें, और यह स्टोरी में डालने के लिए तैयार है।",
      },
      {
        question: "इंस्टाग्राम स्टोरी में QR कोड कैसे लगाएँ?",
        answer:
          "स्टोरी कैमरा खोलें, गैलरी से QR इमेज चुनें या अपनी फ़ोटो के ऊपर उसे फ़ोटो स्टिकर के रूप में जोड़ें, फिर स्टिकर ट्रे से अपने साइन अप लिंक का लिंक स्टिकर लगाएँ। पब्लिश करें, फिर स्टोरी को हाइलाइट में जोड़ें ताकि 24 घंटे बाद भी प्रोफ़ाइल पर रहे। लिंक स्टिकर अब हर कोई लगा सकता है; पुराना 10,000-फ़ॉलोअर वाला नियम ख़त्म हो गया है।",
      },
      {
        question: "पैसे कब और कैसे मिलते हैं?",
        answer:
          "कमीशन ऑर्डर का भुगतान होने पर आपके वॉलेट बैलेंस में आता है, ऑर्डर प्लेस होने पर नहीं। Withdraw पेज से आप अपना बैलेंस प्रोफ़ाइल में जोड़े गए बैंक अकाउंट में ट्रांसफ़र कर सकते हैं। न्यूनतम निकासी ₹100 है।",
      },
      {
        question: "मेरे कोड से जुड़ने पर मेरे फ़ॉलोअर को क्या मिलता है?",
        answer:
          "नए मेंबर को ऑर्डर पर इस्तेमाल के लिए ₹200 वेलकम कैशबैक, ₹299 या उससे ज़्यादा के हर ऑर्डर पर 10% कैशबैक, और ₹699 से फ़्री डिलीवरी मिलती है। उनके जुड़ते ही, कुछ खरीदने से पहले ही, आपको ₹10 मिलते हैं।",
      },
      {
        question: "क्या यह पिरामिड स्कीम है? क्या यह भारत में क़ानूनी है?",
        answer:
          "नहीं। सिर्फ़ लोगों को जोड़ने से किसी को कुछ नहीं मिलता। कमीशन का हर रुपया किसी असली प्रोडक्ट खरीद से आता है, जो Consumer Protection (Direct Selling) Rules, 2021 की शर्त है। कोई जॉइनिंग फ़ीस नहीं और कोई अनिवार्य खरीद नहीं। Attri Industries लक्ष्मी नगर, दिल्ली की एक रजिस्टर्ड भारतीय कंपनी है; जुड़ने से पहले आप टीम को कॉल या WhatsApp कर सकते हैं।",
      },
      {
        question: "बिना फ़ॉलोअर के इंस्टाग्राम से पैसे कैसे कमाएँ?",
        answer:
          "छोटे अकाउंट से भी कमा सकते हैं। Attri पर फ़्री जुड़ें, My Account से अपना QR कोड और रेफ़रल कोड लें, और उन्हें अपनी स्टोरी में लगाएँ। जब कोई आपके कोड से जुड़कर आयुर्वेदिक प्रोडक्ट खरीदता है, तो आपको कमीशन मिलता है, और उसके रेफ़रल की खरीद पर भी, 7 लेवल तक। कोई जॉइनिंग फ़ीस नहीं, कोई स्टॉक खरीदना नहीं।",
      },
      {
        question: "क्या मुझे फ़ॉलोअर को बताना होगा कि मैं कमीशन कमाता/कमाती हूँ?",
        answer:
          "हाँ। ASCI की इन्फ़्लुएंसर गाइडलाइन के तहत कमीशन कमाना एक मटीरियल कनेक्शन है और इसे साफ़ और शुरुआत में ही बताना ज़रूरी है: कैप्शन की पहली लाइनों में #ad या #partnership जैसा टैग, और वीडियो के लिए ऑन-स्क्रीन टेक्स्ट। इससे भरोसा भी बनता है, और भरोसा ही स्टोरी को कन्वर्ट कराता है।",
      },
      {
        question: "क्या मैं वही कोड WhatsApp, YouTube या ऑफ़लाइन इस्तेमाल कर सकता/सकती हूँ?",
        answer:
          "हाँ। आपका रेफ़रल कोड और QR कोड हर जगह काम करते हैं। QR को अपने WhatsApp स्टेटस पर, YouTube डिस्क्रिप्शन में, अपने सैलून, दुकान या कॉलेज के नोटिस बोर्ड पर कार्ड में लगाएँ। उससे हुआ हर साइन अप आपका है।",
      },
    ],
  },
  contact: {
    h2: "पोस्ट करने से पहले किसी असली इंसान से बात करें",
    p: "पक्का नहीं कि यह प्लान आपके अकाउंट पर कैसे बैठेगा, या पहली स्टोरी प्लान करने में मदद चाहिए? दिल्ली में Attri टीम को कॉल या मैसेज करें। हम हिंदी और अंग्रेज़ी में जवाब देते हैं, और आपको 7 लेवल, आपका QR कोड और क्या पोस्ट करना है, सब समझा देंगे।",
    address: "Attri Industries, लक्ष्मी नगर, दिल्ली 110092।",
    mapLink: "पूरा पता और नक़्शा",
    aria: "Attri से संपर्क के तरीके",
    whatsappLabel: "WhatsApp करें, सबसे तेज़ जवाब",
    whatsappAction: "चैट करें",
    callLabel: "कॉल करें",
    callAction: "अभी कॉल करें",
    emailLabel: "ईमेल करें",
    emailAction: "ईमेल भेजें",
    whatsappMessage: "नमस्ते Attri, मैंने Earn from Instagram पेज पढ़ा और Creator Program के बारे में और जानना चाहता/चाहती हूँ।",
    emailSubject: "Attri Creator Program: और जानकारी चाहिए",
  },
  closing: {
    h2: "आपकी पहली स्टोरी आज ही जा सकती है",
    p: "दो मिनट में साइन अप करें, अपना QR कोड सेव करें, और उसे किसी ऐसे प्रोडक्ट के साथ पोस्ट करें जो आप पहले से इस्तेमाल करते हैं। पहले पेड ऑर्डर से ही आपका वॉलेट गिनना शुरू कर देता है।",
  },
  phone: {
    aria: "Attri QR कोड स्टिकर के साथ इंस्टाग्राम स्टोरी का उदाहरण",
    scan: "स्कैन करें, फ़्री जुड़ें",
    caption: (product) => `${product} के साथ 7वाँ दिन। मेरे कोड से पहले ऑर्डर पर ₹200 कैशबैक। #partnership`,
    sendMessage: "मैसेज भेजें",
    handle: "your.handle",
    time: "2h",
  },
};

export const COPY: Record<Lang, EarnCopy> = { en, hi };

export const LANG_STORAGE_KEY = "attri.earnLang";

export function isLang(v: unknown): v is Lang {
  return v === "en" || v === "hi";
}
