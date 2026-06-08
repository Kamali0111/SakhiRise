
import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════
const T = {
  saffron: "#E8680A",
  saffronLight: "#FF8C2A",
  gold: "#F4A228",
  goldLight: "#FFCA60",
  turmeric: "#D4860B",
  rose: "#C94B6D",
  roseSoft: "#E8698A",
  clay: "#A0522D",
  terracotta: "#C1603A",
  earth: "#6B3E26",
  jade: "#2E7D6B",
  jadeLight: "#3DAA8F",
  cream: "#FDF6EE",
  creamWarm: "#FAE8D0",
  parchment: "#F5E6C8",
  inkDark: "#1C0A00",
  inkMid: "#4A2C17",
  inkSoft: "#7A5235",
  border: "#EDD5A3",
  borderSoft: "#F3E4C0",
  white: "#FFFFFF",
  shadow: "rgba(92,40,0,0.12)",
  shadowMed: "rgba(92,40,0,0.2)",
};

// ═══════════════════════════════════════════════════════════════════
// TRANSLATIONS  (extended with new screen keys)
// ═══════════════════════════════════════════════════════════════════
const TRANSLATIONS = {
  en: {
    appName:"SakhiRise", tagline:"Your Digital Mentor",
    welcome:"Welcome to SakhiRise", welcomeSub:"Empowering rural women through skills & entrepreneurship",
    getStarted:"Get Started", chooseLanguage:"Choose Your Language", languageSub:"You can change this later in settings",
    continue:"Continue", mobileNumber:"Mobile Number", enterMobile:"Enter 10-digit number",
    sendOTP:"Send OTP", enterOTP:"Enter OTP", otpSent:"OTP sent to", verify:"Verify",
    demoHint:"Demo: enter any 4 digits", profileSetup:"Set Up Your Profile",
    yourName:"Your Name", yourLocation:"Location (Village/District)",
    yourSkills:"Your Skills", selectSkills:"Select all that apply", saveProfile:"Save & Start",
    home:"Home", aiSakhi:"AI Sakhi", market:"Market", learn:"Learn", community:"Community",
    goodMorning:"Good Morning", namaste:"Namaste", journeyProgress:"Your Journey",
    points:"Points", badges:"Badges", todayTip:"Tip of the Day", quickActions:"Quick Actions",
    businessIdeas:"Business Ideas", myProducts:"My Products", exploreMarket:"Explore Market",
    askSakhi:"Ask AI Sakhi", typeMessage:"Type your message...", voiceInput:"Voice Input", send:"Send",
    suggestFor:"Try asking:", skillBusiness:"Skill → Business", enterYourSkill:"Enter your skill",
    generateIdeas:"Generate Business Ideas", backToSkill:"← Back", businessIdeasFor:"Business Ideas for",
    incomeRange:"Income Range", materialsNeeded:"Materials Needed", howToStart:"How to Start",
    whereToSell:"Where to Sell", askSakhiMore:"Ask AI Sakhi for More",
    marketplace:"Marketplace", addProduct:"+ Add Product", searchProducts:"Search products...",
    allCategories:"All", byLabel:"by", buyNow:"Buy Now", contactSeller:"Contact Seller",
    addYourProduct:"List Your Product", uploadPhoto:"Upload Product Photo",
    photoHint:"Clear photos get more buyers!", productName:"Product Name", productPrice:"Price (₹)",
    productCategory:"Category", productDesc:"Description", listProduct:"List Product 🚀",
    learningHub:"Learning Hub", learnSub:"Learn in your language, earn badges",
    startCourse:"Start Course", continueCourse:"Continue", badgeEarned:"Badge Earned!", completed:"Completed",
    communityTitle:"Community", communitySub:"Sakhi se Sakhi tak",
    shareSomething:"Share something with the community...", post:"Post", likes:"Likes", comments:"Comments",
    achievements:"Achievements", achieveSub:"Your badges & milestones",
    earnedBadges:"Earned Badges", lockedBadges:"Keep going to unlock!",
    rewardPoints:"Reward Points", rewardSub:"Points you have earned", howToEarn:"How to Earn More Points",
    myProfile:"My Profile", settings:"Settings", language:"Language", changeLanguage:"Change Language",
    signOut:"Sign Out", skills:"Skills", location:"Location",
    // NEW KEYS
    expand:"Expand Business", expandSub:"Sell on bigger platforms",
    platforms:"Platforms", connectPlatform:"Connect", connected:"Connected ✓",
    salesDash:"Sales Dashboard", totalSales:"Total Sales", ordersToday:"Orders Today",
    revenue:"Revenue", topProduct:"Top Product", analyzeProduct:"AI Product Analyzer",
    analyzeSub:"Upload photo for AI suggestions", uploadForAnalysis:"Upload Product Photo",
    analysisTip:"AI will suggest pricing, packaging & branding",
    analyzeBtn:"Analyze My Product ✨", analysisResult:"AI Suggestions",
    learnInLang:"Learn in Your Language", watchLesson:"Watch Lesson", readGuide:"Read Guide",
    listenLesson:"Listen", voiceMode:"Voice Mode", tapToSpeak:"Tap to Speak",
    listeningNow:"Listening...", speakingNow:"Speaking...", voiceReady:"Ready — tap mic",
    productAnalyzer:"Product Analyzer",
  },
  hi: {
    appName:"सखीराइज़", tagline:"आपकी डिजिटल सखी",
    welcome:"सखीराइज़ में आपका स्वागत है", welcomeSub:"कौशल और उद्यमिता से ग्रामीण महिलाओं को सशक्त बनाना",
    getStarted:"शुरू करें", chooseLanguage:"अपनी भाषा चुनें", languageSub:"आप इसे बाद में बदल सकती हैं",
    continue:"आगे बढ़ें", mobileNumber:"मोबाइल नंबर", enterMobile:"10 अंकों का नंबर दर्ज करें",
    sendOTP:"OTP भेजें", enterOTP:"OTP दर्ज करें", otpSent:"OTP भेजा गया", verify:"सत्यापित करें",
    demoHint:"डेमो: कोई भी 4 अंक डालें", profileSetup:"अपनी प्रोफ़ाइल बनाएं",
    yourName:"आपका नाम", yourLocation:"स्थान (गाँव/जिला)",
    yourSkills:"आपके कौशल", selectSkills:"सभी लागू विकल्प चुनें", saveProfile:"सहेजें और शुरू करें",
    home:"होम", aiSakhi:"AI सखी", market:"बाज़ार", learn:"सीखें", community:"समुदाय",
    goodMorning:"सुप्रभात", namaste:"नमस्ते", journeyProgress:"आपकी यात्रा",
    points:"अंक", badges:"बैज", todayTip:"आज की सलाह", quickActions:"त्वरित कार्य",
    businessIdeas:"व्यापार के विचार", myProducts:"मेरे उत्पाद", exploreMarket:"बाज़ार देखें",
    askSakhi:"AI सखी से पूछें", typeMessage:"अपना संदेश लिखें...", voiceInput:"आवाज़ से बोलें", send:"भेजें",
    suggestFor:"पूछकर देखें:", skillBusiness:"कौशल → व्यापार", enterYourSkill:"अपना कौशल लिखें",
    generateIdeas:"व्यापार के विचार पाएं", backToSkill:"← वापस", businessIdeasFor:"व्यापार के विचार",
    incomeRange:"संभावित आय", materialsNeeded:"ज़रूरी सामान", howToStart:"कैसे शुरू करें",
    whereToSell:"कहाँ बेचें", askSakhiMore:"AI सखी से और पूछें",
    marketplace:"बाज़ार", addProduct:"+ उत्पाद जोड़ें", searchProducts:"उत्पाद खोजें...",
    allCategories:"सभी", byLabel:"द्वारा", buyNow:"अभी खरीदें", contactSeller:"संपर्क करें",
    addYourProduct:"अपना उत्पाद लिस्ट करें", uploadPhoto:"उत्पाद की फ़ोटो अपलोड करें",
    photoHint:"अच्छी फ़ोटो = ज़्यादा खरीदार!", productName:"उत्पाद का नाम", productPrice:"कीमत (₹)",
    productCategory:"श्रेणी", productDesc:"विवरण", listProduct:"उत्पाद लिस्ट करें 🚀",
    learningHub:"सीखने का केंद्र", learnSub:"अपनी भाषा में सीखें, बैज पाएं",
    startCourse:"कोर्स शुरू करें", continueCourse:"जारी रखें", badgeEarned:"बैज मिला!", completed:"पूर्ण",
    communityTitle:"समुदाय", communitySub:"सखी से सखी तक",
    shareSomething:"समुदाय के साथ कुछ साझा करें...", post:"पोस्ट करें", likes:"पसंद", comments:"टिप्पणी",
    achievements:"उपलब्धियां", achieveSub:"आपके बैज और मील के पत्थर",
    earnedBadges:"अर्जित बैज", lockedBadges:"आगे बढ़ती रहें!",
    rewardPoints:"पुरस्कार अंक", rewardSub:"आपने जो अंक कमाए हैं", howToEarn:"अधिक अंक कैसे कमाएं",
    myProfile:"मेरी प्रोफ़ाइल", settings:"सेटिंग्स", language:"भाषा", changeLanguage:"भाषा बदलें",
    signOut:"साइन आउट", skills:"कौशल", location:"स्थान",
    expand:"व्यापार बढ़ाएं", expandSub:"बड़े प्लेटफ़ॉर्म पर बेचें",
    platforms:"प्लेटफ़ॉर्म", connectPlatform:"जोड़ें", connected:"जुड़ा है ✓",
    salesDash:"बिक्री डैशबोर्ड", totalSales:"कुल बिक्री", ordersToday:"आज के ऑर्डर",
    revenue:"आय", topProduct:"शीर्ष उत्पाद", analyzeProduct:"AI उत्पाद विश्लेषक",
    analyzeSub:"AI सुझाव के लिए फ़ोटो अपलोड करें", uploadForAnalysis:"उत्पाद फ़ोटो अपलोड करें",
    analysisTip:"AI कीमत, पैकेजिंग और ब्रांडिंग सुझाएगा",
    analyzeBtn:"मेरे उत्पाद का विश्लेषण करें ✨", analysisResult:"AI सुझाव",
    learnInLang:"अपनी भाषा में सीखें", watchLesson:"वीडियो देखें", readGuide:"गाइड पढ़ें",
    listenLesson:"सुनें", voiceMode:"वॉइस मोड", tapToSpeak:"बोलने के लिए दबाएं",
    listeningNow:"सुन रही हूँ...", speakingNow:"बोल रही हूँ...", voiceReady:"तैयार — माइक दबाएं",
    productAnalyzer:"उत्पाद विश्लेषक",
  },
  te: {
    appName:"సఖిరైజ్", tagline:"మీ డిజిటల్ సఖి",
    welcome:"సఖిరైజ్‌కు స్వాగతం", welcomeSub:"నైపుణ్యాలు మరియు వ్యాపారం ద్వారా గ్రామీణ మహిళలకు శక్తి",
    getStarted:"ప్రారంభించండి", chooseLanguage:"మీ భాష ఎంచుకోండి", languageSub:"మీరు తర్వాత మార్చవచ్చు",
    continue:"కొనసాగించు", mobileNumber:"మొబైల్ నంబర్", enterMobile:"10 అంకెల నంబర్ నమోదు చేయండి",
    sendOTP:"OTP పంపండి", enterOTP:"OTP నమోదు చేయండి", otpSent:"OTP పంపబడింది", verify:"ధృవీకరించండి",
    demoHint:"డెమో: ఏవైనా 4 అంకెలు నమోదు చేయండి", profileSetup:"మీ ప్రొఫైల్ సెట్ చేయండి",
    yourName:"మీ పేరు", yourLocation:"స్థానం (గ్రామం/జిల్లా)",
    yourSkills:"మీ నైపుణ్యాలు", selectSkills:"వర్తించే అన్నీ ఎంచుకోండి", saveProfile:"సేవ్ చేసి ప్రారంభించండి",
    home:"హోమ్", aiSakhi:"AI సఖి", market:"మార్కెట్", learn:"నేర్చుకో", community:"సమాజం",
    goodMorning:"శుభోదయం", namaste:"నమస్తే", journeyProgress:"మీ ప్రయాణం",
    points:"పాయింట్లు", badges:"బ్యాడ్జ్‌లు", todayTip:"నేటి చిట్కా", quickActions:"త్వరిత చర్యలు",
    businessIdeas:"వ్యాపార ఆలోచనలు", myProducts:"నా ఉత్పత్తులు", exploreMarket:"మార్కెట్ చూడండి",
    askSakhi:"AI సఖిని అడగండి", typeMessage:"మీ సందేశం టైప్ చేయండి...", voiceInput:"మాట్లాడండి", send:"పంపు",
    suggestFor:"అడిగి చూడండి:", skillBusiness:"నైపుణ్యం → వ్యాపారం", enterYourSkill:"మీ నైపుణ్యం నమోదు చేయండి",
    generateIdeas:"వ్యాపార ఆలోచనలు పొందండి", backToSkill:"← వెనక్కి", businessIdeasFor:"వ్యాపార ఆలోచనలు",
    incomeRange:"ఆదాయ పరిధి", materialsNeeded:"అవసరమైన వస్తువులు", howToStart:"ఎలా ప్రారంభించాలి",
    whereToSell:"ఎక్కడ అమ్మాలి", askSakhiMore:"AI సఖిని మరింత అడగండి",
    marketplace:"మార్కెట్‌ప్లేస్", addProduct:"+ ఉత్పత్తి జోడించు", searchProducts:"ఉత్పత్తులు వెతకండి...",
    allCategories:"అన్నీ", byLabel:"ద్వారా", buyNow:"ఇప్పుడు కొనండి", contactSeller:"సంప్రదించండి",
    addYourProduct:"మీ ఉత్పత్తిని జాబితా చేయండి", uploadPhoto:"ఉత్పత్తి ఫోటో అప్‌లోడ్ చేయండి",
    photoHint:"మంచి ఫోటో = ఎక్కువ కొనుగోలుదారులు!", productName:"ఉత్పత్తి పేరు", productPrice:"ధర (₹)",
    productCategory:"వర్గం", productDesc:"వివరణ", listProduct:"ఉత్పత్తి జాబితా చేయండి 🚀",
    learningHub:"లెర్నింగ్ హబ్", learnSub:"మీ భాషలో నేర్చుకోండి, బ్యాడ్జ్‌లు సంపాదించండి",
    startCourse:"కోర్సు ప్రారంభించండి", continueCourse:"కొనసాగించు", badgeEarned:"బ్యాడ్జ్ సంపాదించారు!", completed:"పూర్తయింది",
    communityTitle:"సమాజం", communitySub:"సఖి నుండి సఖి వరకు",
    shareSomething:"సమాజంతో ఏదైనా పంచుకోండి...", post:"పోస్ట్", likes:"లైక్స్", comments:"వ్యాఖ్యలు",
    achievements:"విజయాలు", achieveSub:"మీ బ్యాడ్జ్‌లు మరియు మైలురాళ్ళు",
    earnedBadges:"సంపాదించిన బ్యాడ్జ్‌లు", lockedBadges:"ముందుకు సాగండి!",
    rewardPoints:"రివార్డ్ పాయింట్లు", rewardSub:"మీరు సంపాదించిన పాయింట్లు", howToEarn:"మరిన్ని పాయింట్లు ఎలా సంపాదించాలి",
    myProfile:"నా ప్రొఫైల్", settings:"సెట్టింగ్స్", language:"భాష", changeLanguage:"భాష మార్చండి",
    signOut:"సైన్ అవుట్", skills:"నైపుణ్యాలు", location:"స్థానం",
    expand:"వ్యాపారం విస్తరించు", expandSub:"పెద్ద ప్లాట్‌ఫారమ్‌లలో అమ్మండి",
    platforms:"ప్లాట్‌ఫారమ్‌లు", connectPlatform:"కనెక్ట్ చేయి", connected:"కనెక్ట్ అయింది ✓",
    salesDash:"అమ్మకాల డాష్‌బోర్డ్", totalSales:"మొత్తం అమ్మకాలు", ordersToday:"నేటి ఆర్డర్లు",
    revenue:"ఆదాయం", topProduct:"టాప్ ఉత్పత్తి", analyzeProduct:"AI ఉత్పత్తి విశ్లేషకుడు",
    analyzeSub:"AI సూచనల కోసం ఫోటో అప్‌లోడ్ చేయండి", uploadForAnalysis:"ఉత్పత్తి ఫోటో అప్‌లోడ్ చేయండి",
    analysisTip:"AI ధర, ప్యాకేజింగ్ & బ్రాండింగ్ సూచిస్తుంది",
    analyzeBtn:"నా ఉత్పత్తిని విశ్లేషించు ✨", analysisResult:"AI సూచనలు",
    learnInLang:"మీ భాషలో నేర్చుకోండి", watchLesson:"వీడియో చూడండి", readGuide:"గైడ్ చదవండి",
    listenLesson:"వినండి", voiceMode:"వాయిస్ మోడ్", tapToSpeak:"మాట్లాడటానికి నొక్కండి",
    listeningNow:"వింటున్నాను...", speakingNow:"మాట్లాడుతోంది...", voiceReady:"సిద్ధం — మైక్ నొక్కండి",
    productAnalyzer:"ఉత్పత్తి విశ్లేషకుడు",
  },
};

// ═══════════════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════════════
const PRODUCTS = [
  { id:1, name:"Handwoven Silk Saree", price:1400, seller:"Meena Devi", loc:"Varanasi, UP", cat:"Textiles", rating:4.9, emoji:"🧣", reviews:42 },
  { id:2, name:"Mango Pickle (500g)", price:185, seller:"Sunita Bai", loc:"Lucknow, UP", cat:"Food", rating:4.8, emoji:"🫙", reviews:78 },
  { id:3, name:"Embroidered Cushion Cover", price:520, seller:"Fatima Shaikh", loc:"Ahmedabad", cat:"Home Decor", rating:4.7, emoji:"🪡", reviews:25 },
  { id:4, name:"Pure Desi Ghee 1kg", price:680, seller:"Radha Kumari", loc:"Patna, Bihar", cat:"Food", rating:5.0, emoji:"🍯", reviews:103 },
  { id:5, name:"Clay Diyas Set (12 pcs)", price:130, seller:"Parvati Devi", loc:"Jaipur, Raj", cat:"Handicraft", rating:4.6, emoji:"🪔", reviews:56 },
  { id:6, name:"Hand-stitched Blouse", price:380, seller:"Kamla Joshi", loc:"Pune, MH", cat:"Clothing", rating:4.8, emoji:"👗", reviews:19 },
  { id:7, name:"Organic Turmeric Powder", price:220, seller:"Lakshmi Reddy", loc:"Hyderabad", cat:"Food", rating:4.9, emoji:"🌿", reviews:67 },
  { id:8, name:"Terracotta Jewellery Set", price:650, seller:"Anjali Singh", loc:"Kolkata", cat:"Jewellery", rating:4.7, emoji:"💍", reviews:33 },
];

const COURSES = [
  { id:1, title:"Starting Your Business", emoji:"🚀", modules:5, done:5, time:"45 min", badge:"Business Beginner", badgeEmoji:"🌱", color:T.saffron },
  { id:2, title:"Smart Product Pricing", emoji:"💰", modules:4, done:2, time:"30 min", badge:"Pricing Pro", badgeEmoji:"💡", color:T.jade },
  { id:3, title:"Packaging & Branding", emoji:"📦", modules:3, done:0, time:"25 min", badge:"Brand Builder", badgeEmoji:"✨", color:T.turmeric },
  { id:4, title:"WhatsApp Marketing", emoji:"📱", modules:6, done:0, time:"50 min", badge:"Marketing Star", badgeEmoji:"⭐", color:T.rose },
  { id:5, title:"UPI & Digital Payments", emoji:"💳", modules:4, done:4, time:"35 min", badge:"Digital Seller", badgeEmoji:"🔥", color:T.clay },
  { id:6, title:"Customer Relationships", emoji:"🤝", modules:5, done:1, time:"40 min", badge:"Trust Builder", badgeEmoji:"🏆", color:T.terracotta },
];

const ALL_BADGES = [
  { id:1, name:"Business Beginner", emoji:"🌱", earned:true, color:T.saffron, desc:"Completed your first business course" },
  { id:2, name:"Digital Seller", emoji:"🔥", earned:true, color:T.clay, desc:"Completed UPI & Digital Payments" },
  { id:3, name:"Community Star", emoji:"⭐", earned:true, color:T.gold, desc:"Made 5 community posts" },
  { id:4, name:"Pricing Pro", emoji:"💡", earned:false, color:T.jade, desc:"Complete Smart Pricing course" },
  { id:5, name:"Marketing Star", emoji:"📱", earned:false, color:T.rose, desc:"Complete WhatsApp Marketing" },
  { id:6, name:"Brand Builder", emoji:"✨", earned:false, color:T.turmeric, desc:"Complete Packaging & Branding" },
  { id:7, name:"Trust Builder", emoji:"🏆", earned:false, color:T.terracotta, desc:"Complete Customer Relationships" },
  { id:8, name:"Market Queen", emoji:"👑", earned:false, color:T.gold, desc:"Sell 10 products on marketplace" },
];

const POSTS = [
  { id:1, author:"Meena Devi", avatar:"🌸", time:"2h ago", text:"Started my pickle business last month — already 10 regular customers! AI Sakhi helped me with pricing strategy. So grateful 🙏", likes:48, comments:12, tag:"Success Story", tagColor:T.jade },
  { id:2, author:"Sunita Bai", avatar:"🌺", time:"4h ago", text:"Question for the community: How do I pack my clay diyas so they don't break during delivery? Any sisters with experience please help!", likes:15, comments:23, tag:"Question", tagColor:T.turmeric },
  { id:3, author:"Fatima Shaikh", avatar:"💐", time:"1d ago", text:"Completed the Digital Payments course today — UPI is not scary at all! Got the Digital Seller badge 🔥 Feeling so proud!", likes:92, comments:18, tag:"Achievement", tagColor:T.rose },
  { id:4, author:"Radha Kumari", avatar:"🌻", time:"2d ago", text:"Sold my first product on SakhiRise marketplace! ₹680 for 1kg pure desi ghee. My hands were shaking when the payment came in 😂❤️", likes:134, comments:41, tag:"Success Story", tagColor:T.jade },
];

const SKILL_DATA = {
  cooking: { en: "Cooking", hi: "खाना बनाना", te: "వంట", ideas:[
    { title:"Homemade Snack Packets", emoji:"🍿", income:"₹5,000–15,000/mo", steps:["Make 3–4 signature snacks","Get free FSSAI basic license","Pack in branded bags","Sell to neighbors & WhatsApp groups"], materials:["Ingredients ₹500–2000","Airtight packs ₹300","Printed labels ₹200"], where:["Neighbors & friends","Local kirana shops","SakhiRise marketplace","WhatsApp broadcast"] },
    { title:"Pickle & Preserve Business", emoji:"🫙", income:"₹3,000–10,000/mo", steps:["Start with mango/lemon/chili","Use glass jars with labels","250g, 500g, 1kg packs","Approach nearby grocery stores"], materials:["Raw ingredients ₹400","Glass jars ₹500","Labels & stickers ₹150"], where:["Grocery stores","Office tiffin groups","Online via marketplace","Festival gift hampers"] },
    { title:"Home Tiffin Service", emoji:"🍱", income:"₹8,000–22,000/mo", steps:["Start with 5–10 customers","Target office workers & students","Offer weekly/monthly plans","Maintain strict hygiene & timing"], materials:["Steel tiffin boxes ₹800","Carry bags ₹200","Printed menu card ₹100"], where:["Local offices & schools","Student hostels","Residential areas","WhatsApp marketing"] },
  ]},
  tailoring: { en: "Tailoring", hi: "सिलाई", te: "కుట్టుపని", ideas:[
    { title:"Blouse Stitching Service", emoji:"👗", income:"₹6,000–20,000/mo", steps:["Charge ₹200–400 per blouse","Partner with nearby saree shops","Offer pickup & home delivery","Keep a sample book of designs"], materials:["Sewing machine (existing)","Thread & needles ₹200","Measuring tape","Design catalogue ₹100"], where:["Saree & fabric shops","Local women's groups","WhatsApp catalog","SakhiRise marketplace"] },
    { title:"School Uniform Contracts", emoji:"🎓", income:"₹15,000–40,000 seasonal", steps:["Contact schools every March","Quote per-piece + bulk discount","Deliver before June opening","Build multi-year school relationships"], materials:["Fabric as per school colors","Buttons & zips ₹300","School measurement charts"], where:["Local schools directly","Parent WhatsApp groups","Education offices"] },
    { title:"Eco Cloth Bag Production", emoji:"👜", income:"₹4,000–14,000/mo", steps:["Create reusable cotton/jute bags","Get corporate & NGO orders","Custom logo printing adds value","Start with 50-piece batches"], materials:["Cotton/jute fabric ₹600","Printing stencils ₹400","Handles & thread ₹200"], where:["Corporate gifting","NGO & government orders","Eco-friendly markets","Online marketplace"] },
  ]},
  handicrafts: { en: "Handicrafts", hi: "हस्तकला", te: "హస్తకళలు", ideas:[
    { title:"Festival Decoration Business", emoji:"🪔", income:"₹8,000–35,000 seasonal", steps:["Focus on Diwali, Navratri, Holi","Make diyas, torans, rangoli","Start taking orders 2 months ahead","Offer customization for premium pricing"], materials:["Clay / raw materials ₹1,000","Paints & tools ₹500","Packaging materials ₹300"], where:["Local markets & melas","Festival pop-up stalls","Corporate Diwali orders","Etsy & Amazon Handmade"] },
    { title:"Handcraft Workshop Teacher", emoji:"🏫", income:"₹3,000–12,000/mo", steps:["Teach in community centers","Weekend batches of 8–15 students","₹300–700 per student per session","Offer beginner & advanced levels"], materials:["Teaching materials ₹500","Certificate paper ₹200","Social media photos"], where:["Community halls","Schools & colleges","NGO collaborations","Online Zoom classes"] },
    { title:"Gift & Wedding Hampers", emoji:"🎁", income:"₹10,000–50,000 seasonal", steps:["Create themed gift sets","Focus on weddings & festivals","Personalization = premium prices","Minimum order of ₹500"], materials:["Craft items ₹800","Boxes & ribbons ₹400","Personalized tags ₹200"], where:["Wedding planners","Event companies","Instagram showcasing","Direct WhatsApp orders"] },
  ]},
};

const POINT_ACTIONS = [
  { action:"Complete a course", points:50, emoji:"📚" },
  { action:"Sell a product", points:30, emoji:"🛍️" },
  { action:"Receive a 5-star review", points:25, emoji:"⭐" },
  { action:"Post in community", points:10, emoji:"👭" },
  { action:"Refer a friend", points:20, emoji:"🤝" },
  { action:"Complete daily check-in", points:5, emoji:"✅" },
];

const TIPS = {
  en: ["Add your name to your product packaging — customers trust personal brands more!","A clear photo sells your product better than any description.","Start small, learn fast, grow steadily.","Your handmade product is unique — never undervalue it!"],
  hi: ["अपने उत्पाद की पैकेजिंग पर अपना नाम लगाएं — ग्राहक व्यक्तिगत ब्रांड पर अधिक भरोसा करते हैं!","एक स्पष्ट फोटो किसी भी विवरण से बेहतर बिकती है।","छोटे से शुरू करें, जल्दी सीखें, धीरे-धीरे बढ़ें।"],
  te: ["మీ ఉత్పత్తి ప్యాకేజింగ్‌పై మీ పేరు జోడించండి — కస్టమర్లు వ్యక్తిగత బ్రాండ్‌లను నమ్ముతారు!","స్పష్టమైన ఫోటో ఏ వివరణ కంటే మెరుగ్గా అమ్ముతుంది।","చిన్నగా ప్రారంభించండి, వేగంగా నేర్చుకోండి, స్థిరంగా పెరగండి."],
};

// ═══════════════════════════════════════════════════════════════════
// AI SAKHI SYSTEM PROMPT
// ═══════════════════════════════════════════════════════════════════
const buildSystemPrompt = (lang) => `You are AI Sakhi, a warm and encouraging digital business mentor for rural women in India.

PERSONALITY: You are like a trusted elder sister — supportive, practical, and always motivating. Never use discouraging language.

LANGUAGE RULE: 
- The user is communicating in ${lang === "hi" ? "Hindi" : lang === "te" ? "Telugu" : "English"}.
- ALWAYS respond in ${lang === "hi" ? "Hindi (Devanagari script)" : lang === "te" ? "Telugu script" : "simple English"}.
- Use very simple words. Avoid jargon or complex terms.
- If the user switches language mid-conversation, switch with them automatically.

CORE MISSION: Help rural Indian women:
1. Discover income opportunities from their skills
2. Start small businesses step-by-step
3. Sell products locally and online
4. Build confidence and financial independence

RESPONSE STYLE:
- Keep responses SHORT and CLEAR (3-5 sentences max unless asking for detailed guidance)
- Use numbered steps when giving instructions
- Use emojis sparingly for warmth 🌸
- Always end with an encouraging sentence or a question to keep the conversation going

BUSINESS ADVICE FORMAT (when asked about skills/business):
1. Suggest 2-3 business ideas with income potential
2. List 3-4 simple startup steps
3. Mention where they can sell
4. Give one quick tip

IMPORTANT: You are NOT just a chatbot — you are a mentor who cares about each woman's success. Treat every question with respect and warmth.`;

// ═══════════════════════════════════════════════════════════════════
// LANGUAGE DETECTION
// ═══════════════════════════════════════════════════════════════════
function detectLanguage(text) {
  const teluguRange = /[\u0C00-\u0C7F]/;
  const hindiRange = /[\u0900-\u097F]/;
  if (teluguRange.test(text)) return "te";
  if (hindiRange.test(text)) return "hi";
  return "en";
}

// ═══════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════════
function StatusBar() {
  return (
    <div style={{ background: T.saffron, color: "#fff", display:"flex", justifyContent:"space-between", padding:"5px 16px", fontSize:11, fontFamily:"sans-serif", letterSpacing:"0.3px" }}>
      <span style={{fontWeight:600}}>9:41</span>
      <span>●●● 📶 🔋</span>
    </div>
  );
}

function BottomNav({ active, setScreen, lang, extraTab }) {
  const t = TRANSLATIONS[lang];
  const baseTabs = [
    { id:"home",           emoji:"🏠", label:t.home },
    { id:"sakhi",          emoji:"🤖", label:t.aiSakhi },
    { id:"voiceAssistant", emoji:"🎙️", label:{en:"Voice",hi:"वॉइस",te:"వాయిస్"}[lang]||"Voice" },
    { id:"market",         emoji:"🛍️", label:t.market },
    { id:"learn",          emoji:"📚", label:t.learn },
  ];
  return (
    <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:T.white, borderTop:`2px solid ${T.border}`, display:"flex", zIndex:200, boxShadow:`0 -4px 24px ${T.shadow}` }}>
      {baseTabs.map(tab => (
        <button key={tab.id} onClick={() => setScreen(tab.id)} style={{ flex:1, padding:"9px 0 7px", border:"none", background:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2, transition:"all 0.2s" }}>
          <span style={{ fontSize:tab.id==="voiceAssistant"?20:22, filter:active===tab.id?"none":"grayscale(0.3)", transform:active===tab.id?"scale(1.15)":"scale(1)", transition:"transform 0.2s", display:"block" }}>{tab.emoji}</span>
          <span style={{ fontSize:9, fontFamily:"sans-serif", color:active===tab.id?T.saffron:T.inkSoft, fontWeight:active===tab.id?700:400, letterSpacing:"0.3px" }}>{tab.label}</span>
          {active===tab.id && <div style={{ width:22, height:3, background:`linear-gradient(90deg,${T.saffron},${T.gold})`, borderRadius:2 }} />}
        </button>
      ))}
    </div>
  );
}

function Card({ children, style={}, onClick }) {
  return (
    <div onClick={onClick} style={{ background:T.white, borderRadius:20, padding:18, boxShadow:`0 3px 16px ${T.shadow}`, border:`1px solid ${T.borderSoft}`, ...style }}>
      {children}
    </div>
  );
}

function PrimaryBtn({ children, onClick, style={}, disabled=false }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ background:disabled?T.border:`linear-gradient(135deg,${T.saffron},${T.terracotta})`, color:T.white, border:"none", borderRadius:14, padding:"15px 24px", fontSize:16, fontFamily:"sans-serif", fontWeight:700, cursor:disabled?"not-allowed":"pointer", width:"100%", boxShadow:disabled?"none":`0 4px 18px ${T.saffron}55`, transition:"all 0.2s", letterSpacing:"0.3px", ...style }}>
      {children}
    </button>
  );
}

function SecondaryBtn({ children, onClick, style={} }) {
  return (
    <button onClick={onClick} style={{ background:T.cream, color:T.saffron, border:`2px solid ${T.saffron}`, borderRadius:14, padding:"13px 22px", fontSize:15, fontFamily:"sans-serif", fontWeight:700, cursor:"pointer", width:"100%", transition:"all 0.2s", ...style }}>
      {children}
    </button>
  );
}

function Chip({ text, color, filled=false }) {
  return (
    <span style={{ background:filled?color:(color+"22"), color:filled?T.white:color, border:`1.5px solid ${color}55`, borderRadius:20, padding:"4px 12px", fontSize:11, fontFamily:"sans-serif", fontWeight:700, letterSpacing:"0.3px" }}>
      {text}
    </span>
  );
}

function BackBtn({ onClick, label="← Back" }) {
  return (
    <button onClick={onClick} style={{ background:"rgba(255,255,255,0.25)", border:"none", color:T.white, borderRadius:20, padding:"7px 16px", fontSize:13, cursor:"pointer", fontFamily:"sans-serif", fontWeight:600, backdropFilter:"blur(8px)" }}>
      {label}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 1: WELCOME
// ═══════════════════════════════════════════════════════════════════
function WelcomeScreen({ setScreen, lang }) {
  const t = TRANSLATIONS[lang];
  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(165deg, ${T.saffron} 0%, ${T.terracotta} 40%, ${T.earth} 100%)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, position:"relative", overflow:"hidden" }}>
      {/* Decorative rangoli rings */}
      {[1,2,3,4].map(i => (
        <div key={i} style={{ position:"absolute", borderRadius:"50%", border:`1.5px solid rgba(255,255,255,${0.08+i*0.04})`, width:60+i*90, height:60+i*90, top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
      ))}
      {/* Decorative dots */}
      {["10% 20%","90% 15%","5% 80%","95% 75%","50% 5%"].map((pos,i) => (
        <div key={i} style={{ position:"absolute", width:6+i%3*4, height:6+i%3*4, background:`rgba(255,255,255,${0.3+i*0.1})`, borderRadius:"50%", top:pos.split(" ")[1], left:pos.split(" ")[0], pointerEvents:"none" }} />
      ))}
      <div style={{ textAlign:"center", zIndex:2, maxWidth:360 }}>
        <div style={{ fontSize:76, marginBottom:12, filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.25))" }}>🌸</div>
        <h1 style={{ fontSize:44, color:T.white, margin:0, fontFamily:"Georgia, 'Noto Serif Devanagari', serif", letterSpacing:-1, textShadow:"0 3px 24px rgba(0,0,0,0.3)", lineHeight:1.1 }}>{t.appName}</h1>
        <p style={{ color:"rgba(255,255,255,0.92)", fontSize:16, marginTop:8, fontFamily:"sans-serif", fontStyle:"italic", letterSpacing:"0.5px" }}>{t.tagline}</p>
        <p style={{ color:"rgba(255,255,255,0.8)", fontSize:14, marginTop:16, fontFamily:"sans-serif", lineHeight:1.7 }}>{t.welcomeSub}</p>
        <div style={{ background:"rgba(255,255,255,0.14)", backdropFilter:"blur(12px)", borderRadius:20, padding:"18px 20px", margin:"28px 0", border:"1.5px solid rgba(255,255,255,0.25)" }}>
          {["🌿 Discover income from your skills","💡 Get AI business guidance","🛍️ Sell products nationwide","👭 Join a sisterhood of entrepreneurs"].map((item,i) => (
            <p key={i} style={{ color:T.white, margin:"6px 0", fontSize:14, fontFamily:"sans-serif", textAlign:"left" }}>{item}</p>
          ))}
        </div>
        <PrimaryBtn onClick={() => setScreen("langSelect")} style={{ background:T.white, color:T.saffron, fontSize:17, padding:"17px" }}>
          {t.getStarted} →
        </PrimaryBtn>
        <p style={{ color:"rgba(255,255,255,0.6)", fontSize:11, marginTop:14, fontFamily:"sans-serif" }}>Free • Hindi • Telugu • English</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 2: LANGUAGE SELECTION
// ═══════════════════════════════════════════════════════════════════
function LangSelectScreen({ setScreen, lang, setLang }) {
  const t = TRANSLATIONS[lang];
  const options = [
    { code:"en", label:"English", native:"English", emoji:"🇮🇳" },
    { code:"hi", label:"Hindi", native:"हिंदी", emoji:"🙏" },
    { code:"te", label:"Telugu", native:"తెలుగు", emoji:"🌺" },
  ];
  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(135deg, ${T.cream} 0%, ${T.creamWarm} 100%)`, padding:"40px 20px 80px" }}>
      <div style={{ textAlign:"center", marginBottom:36 }}>
        <div style={{ fontSize:52, marginBottom:12 }}>🌐</div>
        <h2 style={{ fontSize:26, color:T.inkDark, margin:0, fontFamily:"Georgia,serif" }}>{t.chooseLanguage}</h2>
        <p style={{ color:T.inkSoft, fontSize:14, marginTop:8, fontFamily:"sans-serif" }}>{t.languageSub}</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:14, maxWidth:380, margin:"0 auto 32px" }}>
        {options.map(opt => (
          <button key={opt.code} onClick={() => setLang(opt.code)} style={{ padding:"20px 24px", borderRadius:18, border:`2.5px solid ${lang===opt.code?T.saffron:T.border}`, background:lang===opt.code?`linear-gradient(135deg,${T.saffron}18,${T.gold}10)`:T.white, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:lang===opt.code?`0 4px 20px ${T.saffron}30`:"none", transition:"all 0.2s" }}>
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <span style={{ fontSize:32 }}>{opt.emoji}</span>
              <div style={{ textAlign:"left" }}>
                <p style={{ margin:0, fontSize:18, fontWeight:700, color:lang===opt.code?T.saffron:T.inkDark, fontFamily:"sans-serif" }}>{opt.native}</p>
                <p style={{ margin:0, fontSize:12, color:T.inkSoft, fontFamily:"sans-serif" }}>{opt.label}</p>
              </div>
            </div>
            <div style={{ width:24, height:24, borderRadius:"50%", border:`2.5px solid ${lang===opt.code?T.saffron:T.border}`, background:lang===opt.code?T.saffron:"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {lang===opt.code && <span style={{ color:T.white, fontSize:14, fontWeight:700 }}>✓</span>}
            </div>
          </button>
        ))}
      </div>
      <PrimaryBtn onClick={() => setScreen("login")}>{t.continue}</PrimaryBtn>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 3: LOGIN
// ═══════════════════════════════════════════════════════════════════
function LoginScreen({ setScreen, lang }) {
  const t = TRANSLATIONS[lang];
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["","","",""]);
  const refs = useRef([]);

  const handleOtp = (val, i) => {
    const n = [...otp]; n[i] = val.slice(-1); setOtp(n);
    if (val && i < 3) refs.current[i+1]?.focus();
  };

  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(135deg, ${T.cream}, ${T.creamWarm})` }}>
      <div style={{ background:`linear-gradient(135deg,${T.saffron},${T.terracotta})`, padding:"48px 24px 64px", borderRadius:"0 0 48px 48px", marginBottom:-28 }}>
        <div style={{ fontSize:44, marginBottom:10 }}>🌸</div>
        <h2 style={{ color:T.white, margin:0, fontSize:28, fontFamily:"Georgia,serif" }}>{step==="phone"?"Welcome Back":t.enterOTP}</h2>
        <p style={{ color:"rgba(255,255,255,0.82)", margin:"6px 0 0", fontSize:14, fontFamily:"sans-serif" }}>
          {step==="phone"?t.mobileNumber:`${t.otpSent} +91 ${phone}`}
        </p>
      </div>
      <Card style={{ margin:"0 18px", position:"relative", zIndex:1, padding:24 }}>
        {step==="phone" ? (
          <>
            <label style={{ fontSize:13, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:700, letterSpacing:"0.5px", textTransform:"uppercase" }}>{t.mobileNumber}</label>
            <div style={{ display:"flex", gap:10, marginTop:10, marginBottom:22 }}>
              <div style={{ padding:"14px 16px", background:T.cream, borderRadius:12, fontSize:16, fontFamily:"sans-serif", color:T.inkDark, border:`1.5px solid ${T.border}`, fontWeight:700 }}>+91</div>
              <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/,"").slice(0,10))} placeholder={t.enterMobile} type="tel" style={{ flex:1, padding:"14px 16px", borderRadius:12, border:`1.5px solid ${T.border}`, fontSize:16, fontFamily:"sans-serif", outline:"none", background:T.cream, color:T.inkDark }} />
            </div>
            <PrimaryBtn onClick={() => phone.length===10 && setStep("otp")} disabled={phone.length!==10}>{t.sendOTP}</PrimaryBtn>
          </>
        ) : (
          <>
            <label style={{ fontSize:13, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:700, letterSpacing:"0.5px", textTransform:"uppercase" }}>{t.enterOTP}</label>
            <div style={{ display:"flex", gap:14, marginTop:14, marginBottom:8, justifyContent:"center" }}>
              {otp.map((v,i) => (
                <input key={i} ref={el => refs.current[i]=el} value={v} onChange={e => handleOtp(e.target.value,i)} maxLength={1} inputMode="numeric" style={{ width:60, height:64, textAlign:"center", fontSize:28, fontWeight:800, borderRadius:14, border:`2.5px solid ${v?T.saffron:T.border}`, outline:"none", background:v?T.saffron+"18":T.cream, fontFamily:"sans-serif", color:T.inkDark, transition:"all 0.2s" }} />
              ))}
            </div>
            <p style={{ textAlign:"center", fontSize:12, color:T.inkSoft, fontFamily:"sans-serif", marginBottom:20 }}>{t.demoHint}</p>
            <PrimaryBtn onClick={() => setScreen("profileSetup")}>{t.verify}</PrimaryBtn>
          </>
        )}
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 4: PROFILE SETUP
// ═══════════════════════════════════════════════════════════════════
function ProfileSetupScreen({ setScreen, lang, setUser }) {
  const t = TRANSLATIONS[lang];
  const [name, setName] = useState("");
  const [loc, setLoc] = useState("");
  const [skills, setSkills] = useState([]);
  const skillOpts = [
    { key:"cooking", en:"Cooking 🍳", hi:"खाना बनाना 🍳", te:"వంట 🍳" },
    { key:"tailoring", en:"Tailoring 🧵", hi:"सिलाई 🧵", te:"కుట్టుపని 🧵" },
    { key:"handicrafts", en:"Handicrafts 🎨", hi:"हस्तकला 🎨", te:"హస్తకళలు 🎨" },
    { key:"embroidery", en:"Embroidery 🪡", hi:"कढ़ाई 🪡", te:"ఎంబ్రాయిడరీ 🪡" },
    { key:"farming", en:"Farming 🌾", hi:"खेती 🌾", te:"వ్యవసాయం 🌾" },
    { key:"beauty", en:"Beauty 💄", hi:"सौंदर्य 💄", te:"అందం 💄" },
  ];
  const toggle = s => setSkills(p => p.includes(s)?p.filter(x=>x!==s):[...p,s]);
  const skillLabel = (opt) => lang==="hi"?opt.hi:lang==="te"?opt.te:opt.en;

  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(135deg, ${T.cream}, ${T.creamWarm})`, paddingBottom:40 }}>
      <div style={{ background:`linear-gradient(135deg,${T.saffron},${T.terracotta})`, padding:"40px 24px 56px", borderRadius:"0 0 40px 40px", marginBottom:-24 }}>
        <div style={{ fontSize:40, marginBottom:8 }}>🌸</div>
        <h2 style={{ color:T.white, margin:0, fontSize:26, fontFamily:"Georgia,serif" }}>{t.profileSetup}</h2>
      </div>
      <Card style={{ margin:"0 16px", position:"relative", zIndex:1 }}>
        {[{label:t.yourName, val:name, set:setName, ph:"e.g. Meena Devi"},{label:t.yourLocation, val:loc, set:setLoc, ph:"e.g. Varanasi, UP"}].map((f,i) => (
          <div key={i} style={{ marginBottom:18 }}>
            <label style={{ fontSize:13, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.5px" }}>{f.label}</label>
            <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} style={{ width:"100%", padding:"14px 16px", marginTop:8, borderRadius:12, border:`1.5px solid ${T.border}`, fontSize:16, fontFamily:"sans-serif", outline:"none", background:T.cream, boxSizing:"border-box", color:T.inkDark }} />
          </div>
        ))}
        <label style={{ fontSize:13, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.5px" }}>{t.yourSkills}</label>
        <p style={{ margin:"4px 0 12px", fontSize:12, color:T.inkSoft, fontFamily:"sans-serif" }}>{t.selectSkills}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:24 }}>
          {skillOpts.map(opt => (
            <button key={opt.key} onClick={()=>toggle(opt.key)} style={{ padding:"10px 16px", borderRadius:22, border:`2px solid ${skills.includes(opt.key)?T.saffron:T.border}`, background:skills.includes(opt.key)?T.saffron+"20":T.white, color:skills.includes(opt.key)?T.saffron:T.inkSoft, fontFamily:"sans-serif", fontSize:14, cursor:"pointer", fontWeight:skills.includes(opt.key)?700:400, transition:"all 0.2s" }}>
              {skillLabel(opt)}
            </button>
          ))}
        </div>
        <PrimaryBtn onClick={() => { setUser({ name:name||"Meena Devi", location:loc||"Varanasi, UP", skills, lang, points:450, badges:3 }); setScreen("home"); }}>
          {t.saveProfile} 🌸
        </PrimaryBtn>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 5: HOME DASHBOARD
// ═══════════════════════════════════════════════════════════════════
function HomeScreen({ setScreen, user, lang }) {
  const t = TRANSLATIONS[lang];
  const tips = TIPS[lang] || TIPS.en;
  const tip = tips[Math.floor(Date.now()/86400000) % tips.length];
  const pct = 68;

  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(180deg, ${T.cream} 0%, ${T.creamWarm}50 100%)` }}>
      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${T.saffron},${T.terracotta})`, padding:"18px 20px 48px", borderRadius:"0 0 40px 40px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-20, right:-20, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.08)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-30, left:-30, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", position:"relative" }}>
          <div>
            <p style={{ color:"rgba(255,255,255,0.82)", margin:0, fontSize:13, fontFamily:"sans-serif" }}>{t.goodMorning} 🌅</p>
            <h2 style={{ color:T.white, margin:"4px 0 2px", fontSize:24, fontFamily:"Georgia,serif" }}>{t.namaste}, {user?.name?.split(" ")[0]||"Sakhi"} 🙏</h2>
            <p style={{ color:"rgba(255,255,255,0.75)", margin:0, fontSize:12, fontFamily:"sans-serif" }}>📍 {user?.location||"India"}</p>
          </div>
          <button onClick={()=>setScreen("profile")} style={{ background:"rgba(255,255,255,0.22)", border:"2.5px solid rgba(255,255,255,0.45)", borderRadius:"50%", width:50, height:50, fontSize:24, cursor:"pointer", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center" }}>👤</button>
        </div>
        <div style={{ background:"rgba(255,255,255,0.18)", borderRadius:16, padding:"14px 18px", marginTop:18, backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.28)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ color:T.white, fontSize:13, fontFamily:"sans-serif", fontWeight:600 }}>⭐ {t.journeyProgress}</span>
            <span style={{ color:T.white, fontSize:13, fontFamily:"sans-serif", fontWeight:800 }}>{pct}%</span>
          </div>
          <div style={{ background:"rgba(255,255,255,0.3)", borderRadius:10, height:8 }}>
            <div style={{ width:`${pct}%`, background:"linear-gradient(90deg,#fff,#FFD580)", borderRadius:10, height:"100%", transition:"width 1.2s ease" }} />
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:10 }}>
            <span style={{ color:"rgba(255,255,255,0.9)", fontSize:12, fontFamily:"sans-serif" }}>🏆 {user?.points||450} {t.points}</span>
            <span style={{ color:"rgba(255,255,255,0.9)", fontSize:12, fontFamily:"sans-serif" }}>🎖️ {user?.badges||3} {t.badges}</span>
          </div>
        </div>
      </div>

      <div style={{ padding:"12px 16px 0", marginTop:-18, position:"relative" }}>
        {/* Quick Actions */}
        <Card style={{ marginBottom:14 }}>
          <h3 style={{ margin:"0 0 14px", fontSize:14, color:T.inkDark, fontFamily:"sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.5px" }}>{t.quickActions}</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:10 }}>
            {[
              { emoji:"🤖", label:t.askSakhi, screen:"sakhi", color:T.saffron },
              { emoji:"💡", label:t.businessIdeas, screen:"skill", color:T.jade },
              { emoji:"🛍️", label:t.exploreMarket, screen:"market", color:T.rose },
              { emoji:"📚", label:t.learn, screen:"learn", color:T.turmeric },
            ].map(a => (
              <button key={a.screen} onClick={()=>setScreen(a.screen)} style={{ background:a.color+"18", borderRadius:16, padding:"14px 4px", border:`1.5px solid ${a.color}30`, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:5, transition:"all 0.2s" }}>
                <span style={{ fontSize:26 }}>{a.emoji}</span>
                <span style={{ fontSize:10, fontFamily:"sans-serif", color:a.color, fontWeight:700, textAlign:"center", lineHeight:1.2 }}>{a.label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* AI Sakhi Banner */}
        <div onClick={()=>setScreen("sakhi")} style={{ background:`linear-gradient(135deg,${T.earth},${T.clay})`, borderRadius:20, padding:"18px 20px", marginBottom:14, cursor:"pointer", display:"flex", alignItems:"center", gap:16, boxShadow:`0 6px 24px ${T.earth}44`, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", right:-20, top:-20, width:100, height:100, background:"rgba(255,255,255,0.06)", borderRadius:"50%" }} />
          <div style={{ fontSize:50, lineHeight:1 }}>🤖</div>
          <div>
            <h3 style={{ color:T.white, margin:0, fontSize:17, fontFamily:"Georgia,serif" }}>AI Sakhi is here! 🌸</h3>
            <p style={{ color:"rgba(255,255,255,0.82)", margin:"5px 0 0", fontSize:13, fontFamily:"sans-serif" }}>Ask about business, skills, or pricing →</p>
          </div>
        </div>

        {/* Daily Tip */}
        <Card style={{ marginBottom:14, background:`linear-gradient(135deg,${T.jade}18,${T.jadeLight}10)`, border:`1.5px solid ${T.jade}33` }}>
          <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
            <span style={{ fontSize:26 }}>💡</span>
            <div>
              <p style={{ margin:0, fontSize:11, color:T.jade, fontFamily:"sans-serif", fontWeight:800, letterSpacing:"0.8px", textTransform:"uppercase" }}>{t.todayTip}</p>
              <p style={{ margin:"5px 0 0", fontSize:14, color:T.inkMid, fontFamily:"sans-serif", lineHeight:1.6 }}>{tip}</p>
            </div>
          </div>
        </Card>

        {/* Marketplace Preview */}
        <h3 style={{ margin:"0 0 10px", fontSize:14, color:T.inkDark, fontFamily:"sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.5px" }}>🛍️ {t.marketplace}</h3>
        <div style={{ display:"flex", gap:12, overflowX:"auto", paddingBottom:6, WebkitOverflowScrolling:"touch" }}>
          {PRODUCTS.slice(0,5).map(p => (
            <div key={p.id} onClick={()=>setScreen("market")} style={{ minWidth:130, background:T.white, borderRadius:18, padding:14, boxShadow:`0 3px 14px ${T.shadow}`, cursor:"pointer", border:`1.5px solid ${T.borderSoft}`, flexShrink:0 }}>
              <div style={{ fontSize:40, textAlign:"center", background:T.cream, borderRadius:12, padding:"10px 0", marginBottom:10 }}>{p.emoji}</div>
              <p style={{ margin:0, fontSize:12, fontWeight:700, color:T.inkDark, fontFamily:"sans-serif", lineHeight:1.3 }}>{p.name}</p>
              <p style={{ margin:"5px 0 0", fontSize:15, color:T.saffron, fontFamily:"sans-serif", fontWeight:800 }}>₹{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// WAKE-WORD ENGINE  ("Sakhi" / "Hey Sakhi" / "सखी" / "సఖి")
// Uses a always-on continuous recognition session in the background.
// When the wake-word is detected, calls onWake(queryAfterWakeWord).
// ═══════════════════════════════════════════════════════════════════
const WAKE_WORDS = [
  "sakhi","hey sakhi","hei sakhi","सखी","hey सखी","సఖి","హేయ్ సఖి",
  "sakhee","hey sakhee","saki","hey saki",
];

function isWakeWord(text) {
  const lower = text.toLowerCase().trim();
  return WAKE_WORDS.some(w => lower.startsWith(w));
}

function stripWakeWord(text) {
  const lower = text.toLowerCase().trim();
  for (const w of WAKE_WORDS) {
    if (lower.startsWith(w)) {
      const rest = text.slice(w.length).replace(/^[,،.।\s]+/, "").trim();
      return rest;
    }
  }
  return text.trim();
}

// Global singleton so only one recognition stream runs at a time
let _wakeRecog = null;

function useWakeWord({ enabled, lang, onWake }) {
  const [listening, setListening] = useState(false);
  const [detected, setDetected] = useState(false);
  const enabledRef = useRef(enabled);
  const onWakeRef  = useRef(onWake);
  useEffect(() => { enabledRef.current = enabled; }, [enabled]);
  useEffect(() => { onWakeRef.current  = onWake;  }, [onWake]);

  const start = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR || _wakeRecog) return;

    const recog = new SR();
    recog.continuous      = true;
    recog.interimResults  = true;
    recog.lang            = { en:"en-IN", hi:"hi-IN", te:"te-IN" }[lang] || "en-IN";
    recog.maxAlternatives = 1;
    _wakeRecog = recog;

    recog.onstart  = () => setListening(true);
    recog.onerror  = ()  => { setListening(false); _wakeRecog = null; };
    recog.onend    = ()  => {
      setListening(false); _wakeRecog = null;
      // Auto-restart after 1 s if still enabled
      if (enabledRef.current) setTimeout(start, 1000);
    };

    recog.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcript = e.results[i][0].transcript;
        if (isWakeWord(transcript)) {
          const query = stripWakeWord(transcript);
          setDetected(true);
          setTimeout(() => setDetected(false), 3000);
          recog.stop(); _wakeRecog = null;
          if (enabledRef.current) onWakeRef.current(query);
          return;
        }
      }
    };
    try { recog.start(); } catch(e) { _wakeRecog = null; }
  }, [lang]);

  const stop = useCallback(() => {
    if (_wakeRecog) { try { _wakeRecog.stop(); } catch(e){} _wakeRecog = null; }
    setListening(false);
  }, []);

  useEffect(() => {
    if (enabled) start(); else stop();
    return stop;
  }, [enabled, lang]);

  return { wakeListening: listening, wakeDetected: detected };
}

// ═══════════════════════════════════════════════════════════════════
// VOICE HOOK — Speech Recognition + Text-to-Speech
// ═══════════════════════════════════════════════════════════════════
function useVoice({ lang, onTranscript, onSpeakEnd }) {
  const [isListening,  setIsListening]  = useState(false);
  const [isSpeaking,   setIsSpeaking]   = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [ttsSupported,   setTtsSupported]   = useState(false);
  const [transcript,   setTranscript]   = useState("");
  const [interimText,  setInterimText]  = useState("");
  const recogRef  = useRef(null);
  const synthRef  = useRef(null);
  const utterRef  = useRef(null);
  const langCode  = { en:"en-IN", hi:"hi-IN", te:"te-IN" }[lang] || "en-IN";

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) setVoiceSupported(true);
    if (window.speechSynthesis) setTtsSupported(true);
    synthRef.current = window.speechSynthesis;
    return () => { stopListening(); stopSpeaking(); };
  }, []);

  useEffect(() => {
    if (isListening) { stopListening(); startListening(); }
  }, [lang]);

  const startListening = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    stopSpeaking();
    const recog = new SR();
    recog.continuous     = false;
    recog.interimResults = true;
    recog.lang           = langCode;
    recog.maxAlternatives = 1;

    recog.onstart  = () => { setIsListening(true); setTranscript(""); setInterimText(""); };
    recog.onresult = (e) => {
      let interim = "", final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      setInterimText(interim);
      if (final) { setTranscript(final); setInterimText(""); }
    };
    recog.onend   = () => {
      setIsListening(false); setInterimText("");
      setTranscript(prev => { if (prev) onTranscript(prev); return ""; });
    };
    recog.onerror = () => { setIsListening(false); setInterimText(""); };
    recogRef.current = recog;
    recog.start();
  }, [langCode, onTranscript]);

  const stopListening = useCallback(() => {
    if (recogRef.current) { try { recogRef.current.stop(); } catch(e){} recogRef.current = null; }
    setIsListening(false); setInterimText("");
  }, []);

  const speak = useCallback((text, langOverride) => {
    if (!synthRef.current) return;
    stopSpeaking();
    const clean = text.replace(/\*\*/g,"").replace(/\*/g,"").replace(/#{1,3}\s/g,"").slice(0,600);
    const utt   = new SpeechSynthesisUtterance(clean);
    utt.lang    = { en:"en-IN", hi:"hi-IN", te:"te-IN" }[langOverride||lang] || "en-IN";
    utt.rate    = 0.92; utt.pitch = 1.08; utt.volume = 1;
    const voices = synthRef.current.getVoices();
    const preferred = voices.find(v => v.lang.startsWith(utt.lang.split("-")[0]) && v.name.toLowerCase().includes("female"))
      || voices.find(v => v.lang.startsWith(utt.lang.split("-")[0]))
      || voices.find(v => v.lang.startsWith("en"));
    if (preferred) utt.voice = preferred;
    utt.onstart = () => setIsSpeaking(true);
    utt.onend   = () => { setIsSpeaking(false); if (onSpeakEnd) onSpeakEnd(); };
    utt.onerror = () => setIsSpeaking(false);
    utterRef.current = utt;
    synthRef.current.speak(utt);
  }, [lang, onSpeakEnd]);

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) synthRef.current.cancel();
    setIsSpeaking(false);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) stopListening(); else startListening();
  }, [isListening, startListening, stopListening]);

  return { isListening, isSpeaking, voiceSupported, ttsSupported, transcript, interimText, toggleListening, stopListening, speak, stopSpeaking };
}

// ═══════════════════════════════════════════════════════════════════
// WAKE-WORD TOAST — shown globally when "Sakhi" is heard
// ═══════════════════════════════════════════════════════════════════
function WakeWordToast({ visible, lang, query }) {
  const label = {
    en: query ? `"${query}"` : "Listening for your question...",
    hi: query ? `"${query}"` : "आपका सवाल सुन रही हूँ...",
    te: query ? `"${query}"` : "మీ ప్రశ్న వింటున్నాను...",
  }[lang] || "";

  return (
    <div style={{
      position:"fixed", top:60, left:"50%", transform:`translateX(-50%) translateY(${visible?0:-80}px)`,
      zIndex:9999, transition:"transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s",
      opacity: visible ? 1 : 0, pointerEvents:"none",
    }}>
      <div style={{
        background:`linear-gradient(135deg,${T.earth},${T.clay})`,
        borderRadius:30, padding:"10px 22px 10px 14px",
        display:"flex", alignItems:"center", gap:10,
        boxShadow:`0 8px 32px rgba(0,0,0,0.35)`,
        border:`1.5px solid rgba(255,255,255,0.2)`,
        backdropFilter:"blur(12px)",
      }}>
        <div style={{ width:34, height:34, background:`linear-gradient(135deg,${T.saffron},${T.gold})`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0, animation:"micpulse 1.2s ease-in-out infinite" }}>🤖</div>
        <div>
          <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.7)", fontFamily:"sans-serif", fontWeight:600 }}>
            {lang==="hi"?"वेक वर्ड मिला!":lang==="te"?"వేక్ వర్డ్ వినబడింది!":"Wake word detected!"}
          </p>
          <p style={{ margin:0, fontSize:13, color:T.white, fontFamily:"sans-serif", fontWeight:700, maxWidth:240, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{label}</p>
        </div>
        <div style={{ width:8, height:8, borderRadius:"50%", background:"#4CAF50", boxShadow:"0 0 8px #4CAF50", marginLeft:4 }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DEDICATED VOICE ASSISTANT SCREEN  (Screen 6 — standalone)
// ═══════════════════════════════════════════════════════════════════
function VoiceAssistantScreen({ lang, setLang, setScreen, onWakeQuery }) {
  const t = TRANSLATIONS[lang];
  const getGreeting = (l) => ({
    en:"Namaste! 🙏 Say 'Sakhi' anytime to wake me up. Or tap the mic and ask me anything!",
    hi:"नमस्ते! 🙏 कभी भी 'सखी' कहकर मुझे जगा सकती हैं। या माइक दबाएं और कुछ भी पूछें!",
    te:"నమస్తే! 🙏 ఎప్పుడైనా 'సఖి' అని పిలవండి. లేదా మైక్ నొక్కి ఏదైనా అడగండి!",
  })[l] || "";

  const [messages, setMessages]     = useState([{ role:"ai", text: getGreeting(lang) }]);
  const [chatLang, setChatLang]      = useState(lang);
  const [loading,  setLoading]       = useState(false);
  const [autoSpeak, setAutoSpeak]    = useState(true);
  const [lastAIText, setLastAIText]  = useState(getGreeting(lang));
  const [wakeEnabled, setWakeEnabled] = useState(true);
  const [showWakeToast, setShowWakeToast] = useState(false);
  const [wakeQuery, setWakeQuery]    = useState("");
  const endRef   = useRef(null);
  const historyRef = useRef([]);

  // --- core send ---
  const sendMessage = useCallback(async (text) => {
    if (!text?.trim() || loading) return;
    const dl = detectLanguage(text);
    if (dl !== chatLang) { setChatLang(dl); setLang(dl); }
    setMessages(p => [...p, { role:"user", text }]);
    historyRef.current = [...historyRef.current, { role:"user", content: text }];
    setLoading(true); stopSpeaking();
    try {
      const res  = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:buildSystemPrompt(dl), messages:historyRef.current })
      });
      const data = await res.json();
      const aiText = data.content?.map(c=>c.text||"").join("") || getGreeting(dl);
      historyRef.current = [...historyRef.current, { role:"assistant", content: aiText }];
      setMessages(p => [...p, { role:"ai", text:aiText }]);
      setLastAIText(aiText);
      if (autoSpeak && ttsSupported) speak(aiText, dl);
    } catch { setMessages(p => [...p, { role:"ai", text:"Connection error 🙏" }]); }
    setLoading(false);
  }, [loading, chatLang, setLang, autoSpeak]);

  const handleTranscript = useCallback((txt) => { sendMessage(txt); }, [sendMessage]);

  const handleWake = useCallback((query) => {
    setShowWakeToast(true); setWakeQuery(query);
    setTimeout(() => setShowWakeToast(false), 3500);
    // Short delay so user can see the toast then start listening for their question
    setTimeout(() => {
      if (query) sendMessage(query);
      else toggleListening();
    }, 600);
  }, [sendMessage]);

  const { isListening, isSpeaking, voiceSupported, ttsSupported, interimText,
          toggleListening, stopListening, speak, stopSpeaking } = useVoice({
    lang: chatLang, onTranscript: handleTranscript,
    onSpeakEnd: () => { /* don't auto-loop in standalone screen */ },
  });

  const { wakeListening, wakeDetected } = useWakeWord({ enabled: wakeEnabled, lang: chatLang, onWake: handleWake });

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);
  useEffect(() => { if (onWakeQuery) sendMessage(onWakeQuery); }, []);

  // Phase label
  const phaseLabel = isSpeaking
    ? { en:"AI Sakhi is speaking...", hi:"AI सखी बोल रही हैं...", te:"AI సఖి మాట్లాడుతోంది..." }[chatLang]
    : isListening
    ? { en:"Listening... speak now", hi:"सुन रही हूँ... बोलिए", te:"వింటున్నాను... మాట్లాడండి" }[chatLang]
    : wakeListening
    ? { en:'Waiting for "Sakhi"...', hi:'"सखी" का इंतज़ार...', te:'"సఖి" కోసం వేచి ఉంది...' }[chatLang]
    : { en:"Tap mic to speak", hi:"माइक दबाएं", te:"మైక్ నొక్కండి" }[chatLang];

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 20px)", paddingBottom:72, background:T.inkDark, position:"relative" }}>
      <WakeWordToast visible={showWakeToast} lang={chatLang} query={wakeQuery} />

      {/* ── Immersive header ── */}
      <div style={{ background:`linear-gradient(135deg,${T.earth},${T.inkDark})`, padding:"16px 18px 20px", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            {/* Animated avatar */}
            <div style={{
              width:52, height:52, borderRadius:"50%",
              background: isSpeaking ? `linear-gradient(135deg,${T.jade},${T.jadeLight})` : isListening ? `linear-gradient(135deg,${T.saffron},${T.gold})` : `linear-gradient(135deg,${T.clay},${T.earth})`,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:28,
              boxShadow: isListening ? `0 0 0 4px ${T.saffron}55, 0 0 20px ${T.saffron}88` : isSpeaking ? `0 0 0 4px ${T.jade}55` : "none",
              transition:"all 0.3s",
            }}>🤖</div>
            <div>
              <h2 style={{ color:T.white, margin:0, fontSize:19, fontFamily:"Georgia,serif" }}>AI Sakhi</h2>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:2 }}>
                <div style={{ width:7, height:7, borderRadius:"50%",
                  background: isSpeaking?"#26A69A":isListening?"#FFB300":wakeListening?"#4CAF50":"#888",
                  boxShadow:`0 0 6px ${isSpeaking?"#26A69A":isListening?"#FFB300":wakeListening?"#4CAF50":"#888"}`,
                  transition:"all 0.3s"
                }} />
                <span style={{ color:"rgba(255,255,255,0.72)", fontSize:11, fontFamily:"sans-serif" }}>{phaseLabel}</span>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            {/* Wake-word toggle */}
            <button onClick={()=>setWakeEnabled(p=>!p)} title='Toggle "Hey Sakhi" wake word' style={{ padding:"6px 12px", background:wakeEnabled?"rgba(76,175,80,0.25)":"rgba(255,255,255,0.1)", border:`1.5px solid ${wakeEnabled?"#4CAF5066":"rgba(255,255,255,0.2)"}`, borderRadius:20, color:wakeEnabled?"#4CAF50":"rgba(255,255,255,0.5)", fontSize:11, fontFamily:"sans-serif", cursor:"pointer", fontWeight:700 }}>
              {wakeEnabled?"🎙️ Wake ON":"🎙️ Wake OFF"}
            </button>
            {/* TTS toggle */}
            <button onClick={()=>{ setAutoSpeak(p=>!p); if(isSpeaking) stopSpeaking(); }} style={{ padding:"6px 12px", background:"rgba(255,255,255,0.1)", border:"1.5px solid rgba(255,255,255,0.2)", borderRadius:20, color:"rgba(255,255,255,0.7)", fontSize:11, cursor:"pointer", fontFamily:"sans-serif", fontWeight:600 }}>
              {autoSpeak?"🔊":"🔇"}
            </button>
          </div>
        </div>

        {/* Wake-word badge */}
        {wakeListening && (
          <div style={{ marginTop:10, display:"flex", alignItems:"center", gap:8, background:"rgba(76,175,80,0.15)", borderRadius:12, padding:"6px 14px", border:"1px solid rgba(76,175,80,0.3)" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#4CAF50", animation:"micpulse 1.4s infinite" }} />
            <span style={{ color:"#81C784", fontSize:12, fontFamily:"sans-serif", fontWeight:600 }}>
              {chatLang==="hi"?'"सखी" या "हे सखी" बोलें':chatLang==="te"?'"సఖి" లేదా "హేయ్ సఖి" అని చెప్పండి':'Say "Sakhi" or "Hey Sakhi" to activate'}
            </span>
          </div>
        )}

        {/* Waveform */}
        {(isListening || isSpeaking) && (
          <div style={{ marginTop:10 }}>
            <VoiceWaveform active={isListening} speaking={isSpeaking} bars={28} />
          </div>
        )}
      </div>

      {/* ── Messages ── */}
      <div style={{ flex:1, overflowY:"auto", padding:"14px 14px 8px", display:"flex", flexDirection:"column", gap:12, background:`linear-gradient(180deg, ${T.inkDark} 0%, #2A1505 100%)`, WebkitOverflowScrolling:"touch" }}>
        {messages.map((m,i) => (
          <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start", gap:10, alignItems:"flex-end" }}>
            {m.role==="ai" && <div style={{ width:34, height:34, background:`linear-gradient(135deg,${T.earth},${T.clay})`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>🤖</div>}
            <div style={{ maxWidth:"78%", position:"relative" }}>
              <div style={{
                background:m.role==="user"?`linear-gradient(135deg,${T.saffron},${T.terracotta})`:"rgba(255,255,255,0.08)",
                color:T.white, border:m.role==="ai"?"1px solid rgba(255,255,255,0.12)":"none",
                borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",
                padding:"12px 16px", boxShadow:`0 3px 12px rgba(0,0,0,0.3)`, backdropFilter:m.role==="ai"?"blur(8px)":"none",
              }}>
                <p style={{ margin:0, fontSize:14, fontFamily:"sans-serif", lineHeight:1.65, whiteSpace:"pre-wrap" }}>{m.text}</p>
              </div>
              {m.role==="ai" && ttsSupported && (
                <button onClick={() => isSpeaking?stopSpeaking():speak(m.text, chatLang)} style={{ position:"absolute", bottom:-2, right:-2, width:22, height:22, borderRadius:"50%", background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.2)", fontSize:10, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {isSpeaking&&lastAIText===m.text?"⏹":"🔊"}
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <div style={{ width:34, height:34, background:`linear-gradient(135deg,${T.earth},${T.clay})`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🤖</div>
            <div style={{ background:"rgba(255,255,255,0.08)", borderRadius:"18px 18px 18px 4px", padding:"14px 18px", border:"1px solid rgba(255,255,255,0.12)" }}>
              <div style={{ display:"flex", gap:5 }}>
                {[0,1,2].map(i=><div key={i} style={{ width:8, height:8, background:T.saffron, borderRadius:"50%", animation:`sakhibounce 1.2s ${i*0.2}s infinite` }}/>)}
              </div>
            </div>
          </div>
        )}
        {isListening && interimText && (
          <div style={{ display:"flex", justifyContent:"flex-end" }}>
            <div style={{ background:`${T.saffron}33`, border:`1.5px dashed ${T.saffron}`, borderRadius:"18px 18px 4px 18px", padding:"10px 14px", maxWidth:"70%" }}>
              <p style={{ margin:0, fontSize:13, fontFamily:"sans-serif", color:"rgba(255,255,255,0.75)", fontStyle:"italic" }}>🎤 "{interimText}"</p>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* ── Big Voice Input Bar ── */}
      <div style={{ padding:"12px 14px", background:`linear-gradient(135deg,${T.earth},${T.inkDark})`, flexShrink:0, borderTop:"1px solid rgba(255,255,255,0.1)" }}>
        {/* Central big mic button */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:12 }}>
          <button onClick={toggleListening} style={{
            width:72, height:72, borderRadius:"50%", border:"none", cursor:voiceSupported?"pointer":"not-allowed",
            background: isListening ? `linear-gradient(135deg,${T.rose},${T.terracotta})` : `linear-gradient(135deg,${T.saffron},${T.gold})`,
            fontSize:30, display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow: isListening ? `0 0 0 8px ${T.rose}33, 0 8px 24px ${T.rose}88` : `0 8px 24px ${T.saffron}88`,
            transition:"all 0.3s", animation: isListening?"micglow 1.4s ease-in-out infinite":"none",
            opacity: voiceSupported?1:0.4,
          }}>
            {isListening ? "⏹" : "🎤"}
          </button>
        </div>
        <p style={{ color:"rgba(255,255,255,0.55)", fontSize:11, fontFamily:"sans-serif", textAlign:"center", marginBottom:10 }}>
          {!voiceSupported
            ? (chatLang==="hi"?"इस ब्राउज़र में वॉइस सपोर्ट नहीं":chatLang==="te"?"ఈ బ్రౌజర్‌లో వాయిస్ లేదు":"Voice not supported in this browser")
            : (chatLang==="hi"?'"हे सखी" बोलें':chatLang==="te"?'"హేయ్ సఖి" అని చెప్పండి':'Or say "Hey Sakhi" hands-free')
          }
        </p>
        {/* Quick suggestions */}
        <div style={{ display:"flex", gap:8, overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
          {([
            { en:"Start a cooking business", hi:"खाना व्यापार शुरू करें", te:"వంట వ్యాపారం ప్రారంభించండి" },
            { en:"How to price my product?", hi:"कीमत कैसे लगाएं?", te:"ధర ఎలా నిర్ణయించాలి?" },
            { en:"What is UPI?", hi:"UPI क्या है?", te:"UPI అంటే ఏమిటి?" },
          ]).map(s => (
            <button key={s.en} onClick={()=>sendMessage(s[chatLang]||s.en)} style={{ whiteSpace:"nowrap", padding:"8px 16px", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.18)", borderRadius:20, fontSize:12, color:"rgba(255,255,255,0.8)", cursor:"pointer", fontFamily:"sans-serif", flexShrink:0 }}>
              {s[chatLang]||s.en}
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes sakhibounce{0%,80%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-8px) scale(1.2)}}
        @keyframes micglow{0%,100%{box-shadow:0 0 0 8px ${T.rose}33, 0 8px 24px ${T.rose}88}50%{box-shadow:0 0 0 14px ${T.rose}18, 0 8px 32px ${T.rose}cc}}
        @keyframes micpulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// VOICE WAVEFORM VISUALIZER
// ═══════════════════════════════════════════════════════════════════
function VoiceWaveform({ active, color = T.saffron, bars = 16, speaking = false }) {
  const [heights, setHeights] = useState(Array(bars).fill(4));
  const frameRef = useRef(null);

  useEffect(() => {
    if (!active && !speaking) { setHeights(Array(bars).fill(4)); return; }
    const animate = () => {
      setHeights(Array(bars).fill(0).map((_, i) => {
        const center = bars / 2;
        const dist = Math.abs(i - center) / center;
        const base = speaking ? 8 : 6;
        const amp = speaking ? 28 : 36;
        return base + Math.random() * amp * (1 - dist * 0.6);
      }));
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, speaking, bars]);

  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:3, height:56 }}>
      {heights.map((h, i) => (
        <div key={i} style={{
          width: 3.5, height: h, borderRadius: 4,
          background: speaking
            ? `linear-gradient(180deg, ${T.jade}, ${T.jadeLight})`
            : `linear-gradient(180deg, ${color}, ${color}99)`,
          transition: active||speaking ? "height 0.08s ease" : "height 0.4s ease",
          opacity: 0.85 + (i % 3) * 0.05,
        }} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// VOICE MODE OVERLAY
// ═══════════════════════════════════════════════════════════════════
function VoiceModeOverlay({ isListening, isSpeaking, interimText, lastAIText, onClose, onToggle, voiceSupported, lang }) {
  const stateLabel = isSpeaking
    ? { en:"AI Sakhi is speaking...", hi:"AI सखी बोल रही है...", te:"AI సఖి మాట్లాడుతోంది..." }[lang]
    : isListening
    ? { en:"Listening... speak now", hi:"सुन रही हूँ... बोलिए", te:"వింటున్నాను... మాట్లాడండి" }[lang]
    : { en:"Tap mic to speak", hi:"बोलने के लिए माइक दबाएं", te:"మాట్లాడటానికి మైక్ నొక్కండి" }[lang];

  return (
    <div style={{ position:"fixed", inset:0, zIndex:500, background:`linear-gradient(160deg, ${T.earth}F5 0%, ${T.inkDark}F8 100%)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32 }}>
      {/* Animated rings */}
      {[1,2,3].map(i => (
        <div key={i} style={{
          position:"absolute", borderRadius:"50%",
          width: 80 + i * 80, height: 80 + i * 80,
          border: `1.5px solid rgba(244,162,40,${isListening ? 0.35-i*0.08 : 0.12})`,
          animation: isListening ? `voicering ${1.2+i*0.4}s ${i*0.2}s ease-in-out infinite` : "none",
          transition:"all 0.5s",
        }} />
      ))}
      {/* Speaking rings */}
      {isSpeaking && [1,2].map(i => (
        <div key={"s"+i} style={{
          position:"absolute", borderRadius:"50%",
          width: 80 + i * 100, height: 80 + i * 100,
          border: `1.5px solid rgba(46,125,107,${0.4-i*0.15})`,
          animation: `voicering ${0.9+i*0.3}s ${i*0.15}s ease-in-out infinite`,
        }} />
      ))}

      {/* Avatar */}
      <div style={{ position:"relative", zIndex:2, marginBottom:20 }}>
        <div style={{
          width:100, height:100, borderRadius:"50%",
          background: isSpeaking
            ? `linear-gradient(135deg,${T.jade},${T.jadeLight})`
            : isListening
            ? `linear-gradient(135deg,${T.saffron},${T.terracotta})`
            : `linear-gradient(135deg,${T.clay},${T.earth})`,
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:50,
          boxShadow: isListening
            ? `0 0 0 8px ${T.saffron}44, 0 0 40px ${T.saffron}66`
            : isSpeaking
            ? `0 0 0 8px ${T.jade}44, 0 0 40px ${T.jade}66`
            : `0 8px 32px rgba(0,0,0,0.4)`,
          transition:"all 0.4s ease",
        }}>🤖</div>
      </div>

      {/* Waveform */}
      <div style={{ marginBottom:16, width:"100%", maxWidth:300 }}>
        <VoiceWaveform active={isListening} speaking={isSpeaking} bars={20} />
      </div>

      {/* Status label */}
      <p style={{ color:T.white, fontSize:16, fontFamily:"sans-serif", fontWeight:600, marginBottom:8, textAlign:"center", opacity:0.92 }}>{stateLabel}</p>

      {/* Interim transcript */}
      {(interimText||lastAIText) && (
        <div style={{ background:"rgba(255,255,255,0.12)", backdropFilter:"blur(12px)", borderRadius:16, padding:"12px 18px", marginBottom:20, maxWidth:320, border:"1px solid rgba(255,255,255,0.2)" }}>
          <p style={{ color:T.white, fontSize:13, fontFamily:"sans-serif", margin:0, textAlign:"center", lineHeight:1.6, fontStyle: interimText?"italic":"normal", opacity: interimText?0.8:1 }}>
            {interimText ? `"${interimText}"` : lastAIText?.slice(0,120)+(lastAIText?.length>120?"...":"")}
          </p>
        </div>
      )}

      {/* Controls */}
      <div style={{ display:"flex", gap:20, alignItems:"center", marginBottom:24 }}>
        {/* Big mic button */}
        <button onClick={onToggle} style={{
          width:76, height:76, borderRadius:"50%", border:"none", cursor:"pointer",
          background: isListening
            ? `linear-gradient(135deg,${T.rose},${T.terracotta})`
            : `linear-gradient(135deg,${T.saffron},${T.gold})`,
          fontSize:32, display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow: isListening
            ? `0 0 0 6px ${T.rose}55, 0 8px 28px ${T.rose}88`
            : `0 8px 28px ${T.saffron}88`,
          transition:"all 0.3s",
          animation: isListening ? "micpulse 1.5s ease-in-out infinite" : "none",
        }}>
          {isListening ? "⏹" : "🎤"}
        </button>
      </div>

      <p style={{ color:"rgba(255,255,255,0.5)", fontSize:12, fontFamily:"sans-serif", marginBottom:20 }}>
        {isListening ? { en:"Tap to stop", hi:"रोकने के लिए दबाएं", te:"ఆపడానికి నొక్కండి" }[lang] : { en:"Tap mic to start", hi:"माइक दबाएं", te:"మైక్ నొక్కండి" }[lang]}
      </p>

      {/* Close */}
      <button onClick={onClose} style={{ padding:"10px 28px", background:"rgba(255,255,255,0.15)", border:"1.5px solid rgba(255,255,255,0.3)", borderRadius:22, color:T.white, fontSize:14, fontFamily:"sans-serif", cursor:"pointer", backdropFilter:"blur(8px)", fontWeight:600 }}>
        ✕ { { en:"Close", hi:"बंद करें", te:"మూసివేయి" }[lang] }
      </button>

      <style>{`
        @keyframes voicering { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.08);opacity:1} }
        @keyframes micpulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.07)} }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 6: AI SAKHI CHAT (LIVE CLAUDE API + FULL VOICE)
// ═══════════════════════════════════════════════════════════════════
function AISakhiScreen({ lang, setLang }) {
  const t = TRANSLATIONS[lang];
  const getGreeting = (l) => l==="hi"
    ? "नमस्ते! 🙏 मैं AI सखी हूँ — आपकी डिजिटल बिज़नेस मेंटर। आज आप मुझसे क्या पूछना चाहती हैं?"
    : l==="te"
    ? "నమస్తే! 🙏 నేను AI సఖిని — మీ డిజిటల్ బిజినెస్ మెంటర్. ఈరోజు మీరు నన్ను ఏమి అడగాలనుకుంటున్నారు?"
    : "Namaste! 🙏 I'm AI Sakhi — your digital business mentor. What would you like help with today?";

  const [messages, setMessages] = useState([{ role:"ai", text: getGreeting(lang) }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatLang, setChatLang] = useState(lang);
  const [voiceMode, setVoiceMode] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [lastAIText, setLastAIText] = useState(getGreeting(lang));
  const endRef = useRef(null);
  const historyRef = useRef([]);

  const SUGGESTIONS = {
    en: ["I know cooking, how to earn money?", "How to price my products?", "How to sell on WhatsApp?", "What is UPI?"],
    hi: ["मुझे खाना बनाना आता है, पैसे कैसे कमाऊं?", "अपने उत्पाद की कीमत कैसे लगाएं?", "WhatsApp पर कैसे बेचें?"],
    te: ["నాకు వంట వస్తుంది, డబ్బులు ఎలా సంపాదించాలి?", "నా ఉత్పత్తికి ధర ఎలా నిర్ణయించాలి?"],
  };

  // When voice sends a transcript, fire sendMessage
  const handleTranscript = useCallback((text) => {
    if (text.trim()) sendMessageFn(text);
  }, []);

  const { isListening, isSpeaking, voiceSupported, ttsSupported, interimText,
          toggleListening, stopListening, speak, stopSpeaking } = useVoice({
    lang: chatLang,
    onTranscript: handleTranscript,
    onSpeakEnd: () => { if (voiceMode) setTimeout(toggleListening, 400); },
  });

  // Core send function (defined as ref to break circular dep)
  const sendMessageRef = useRef(null);
  const sendMessageFn = useCallback(async (text) => {
    if (!text || !text.trim() || loading) return;
    const detectedLang = detectLanguage(text);
    if (detectedLang !== chatLang) { setChatLang(detectedLang); setLang(detectedLang); }
    setMessages(p => [...p, { role:"user", text }]);
    historyRef.current = [...historyRef.current, { role:"user", content: text }];
    setInput("");
    setLoading(true);
    stopSpeaking();

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: buildSystemPrompt(detectedLang),
          messages: historyRef.current,
        })
      });
      const data = await res.json();
      const aiText = data.content?.map(c=>c.text||"").join("")
        || (detectedLang==="hi" ? "माफ़ करें, कनेक्शन में समस्या है। कृपया पुनः प्रयास करें। 🙏"
          : detectedLang==="te" ? "క్షమించండి, కనెక్షన్ సమస్య. దయచేసి మళ్లీ ప్రయత్నించండి. 🙏"
          : "Sorry, I couldn't respond. Please try again. 🙏");
      historyRef.current = [...historyRef.current, { role:"assistant", content: aiText }];
      setMessages(p => [...p, { role:"ai", text:aiText }]);
      setLastAIText(aiText);
      if (autoSpeak && ttsSupported) speak(aiText, detectedLang);
    } catch {
      const errMsg = detectedLang==="hi" ? "कनेक्शन में समस्या है। 🙏" : detectedLang==="te" ? "కనెక్షన్ సమస్య. 🙏" : "Connection error. Please try again. 🙏";
      setMessages(p => [...p, { role:"ai", text:errMsg }]);
      setLastAIText(errMsg);
    }
    setLoading(false);
  }, [loading, chatLang, setLang, autoSpeak, ttsSupported, speak, stopSpeaking]);

  sendMessageRef.current = sendMessageFn;

  const sendMessage = useCallback((text = input) => sendMessageFn(text), [input, sendMessageFn]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  // Speak greeting on first open if autoSpeak is on
  useEffect(() => {
    if (autoSpeak && ttsSupported) {
      setTimeout(() => speak(getGreeting(lang), lang), 600);
    }
  }, []);

  return (
    <>
      {/* Voice Mode Full-Screen Overlay */}
      {voiceMode && (
        <VoiceModeOverlay
          isListening={isListening}
          isSpeaking={isSpeaking}
          interimText={interimText}
          lastAIText={lastAIText}
          lang={chatLang}
          onClose={() => { setVoiceMode(false); stopListening(); stopSpeaking(); }}
          onToggle={toggleListening}
          voiceSupported={voiceSupported}
        />
      )}

    <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 20px)", paddingBottom:72, background:T.cream }}>
      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${T.earth},${T.clay})`, padding:"14px 18px", flexShrink:0, borderRadius:"0 0 24px 24px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:48, height:48, background:"rgba(255,255,255,0.22)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, boxShadow: isSpeaking ? `0 0 0 3px ${T.jade}88, 0 0 14px ${T.jade}` : "none", transition:"box-shadow 0.3s" }}>🤖</div>
            <div>
              <h2 style={{ color:T.white, margin:0, fontSize:20, fontFamily:"Georgia,serif" }}>AI Sakhi</h2>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginTop:2 }}>
                <div style={{ width:8, height:8, background: isSpeaking?"#26A69A":isListening?"#FFB300":"#4CAF50", borderRadius:"50%", boxShadow:`0 0 6px ${isSpeaking?"#26A69A":isListening?"#FFB300":"#4CAF50"}`, transition:"all 0.3s" }} />
                <span style={{ color:"rgba(255,255,255,0.82)", fontSize:11, fontFamily:"sans-serif" }}>
                  {isSpeaking ? (chatLang==="hi"?"बोल रही हूँ...":chatLang==="te"?"మాట్లాడుతోంది...":"Speaking...") : isListening ? (chatLang==="hi"?"सुन रही हूँ...":chatLang==="te"?"వింటోంది...":"Listening...") : (chatLang==="hi"?"ऑनलाइन • भाषा स्वतः पहचान":chatLang==="te"?"ఆన్‌లైన్ • భాష స్వయంగా గుర్తించబడుతుంది":"Online • Auto language detect")}
                </span>
              </div>
            </div>
          </div>
          {/* TTS toggle */}
          <button onClick={() => { setAutoSpeak(p=>!p); if(isSpeaking) stopSpeaking(); }} style={{ background:"rgba(255,255,255,0.15)", border:"1.5px solid rgba(255,255,255,0.3)", borderRadius:20, padding:"6px 12px", color:T.white, fontSize:12, cursor:"pointer", fontFamily:"sans-serif", fontWeight:600 }}>
            {autoSpeak ? "🔊 On" : "🔇 Off"}
          </button>
        </div>

        {/* Waveform strip when speaking/listening */}
        {(isListening || isSpeaking) && (
          <div style={{ marginTop:10, paddingTop:8, borderTop:"1px solid rgba(255,255,255,0.15)" }}>
            <VoiceWaveform active={isListening} speaking={isSpeaking} bars={24} />
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div style={{ padding:"10px 12px 0", display:"flex", gap:8, overflowX:"auto", flexShrink:0, WebkitOverflowScrolling:"touch" }}>
        {(SUGGESTIONS[chatLang]||SUGGESTIONS.en).map(s => (
          <button key={s} onClick={()=>sendMessage(s)} style={{ whiteSpace:"nowrap", padding:"7px 14px", background:T.white, border:`1.5px solid ${T.border}`, borderRadius:20, fontSize:12, color:T.inkSoft, cursor:"pointer", fontFamily:"sans-serif", boxShadow:`0 2px 8px ${T.shadow}`, flexShrink:0 }}>{s}</button>
        ))}
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:"auto", padding:"14px 14px 8px", display:"flex", flexDirection:"column", gap:14, WebkitOverflowScrolling:"touch" }}>
        {messages.map((m,i) => (
          <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start", gap:10, alignItems:"flex-end" }}>
            {m.role==="ai" && <div style={{ width:36, height:36, background:`linear-gradient(135deg,${T.earth},${T.clay})`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0, boxShadow:`0 2px 8px ${T.shadow}` }}>🤖</div>}
            <div style={{ maxWidth:"78%", position:"relative" }}>
              <div style={{ background:m.role==="user"?`linear-gradient(135deg,${T.saffron},${T.terracotta})`:T.white, color:m.role==="user"?T.white:T.inkDark, borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px", padding:"12px 16px", boxShadow:`0 3px 12px ${T.shadow}`, border:m.role==="ai"?`1px solid ${T.borderSoft}`:"none" }}>
                <p style={{ margin:0, fontSize:14, fontFamily:"sans-serif", lineHeight:1.65, whiteSpace:"pre-wrap" }}>{m.text}</p>
              </div>
              {/* Speak this message button */}
              {m.role==="ai" && ttsSupported && (
                <button onClick={() => isSpeaking ? stopSpeaking() : speak(m.text, chatLang)} style={{ position:"absolute", bottom:-2, right:-2, width:24, height:24, borderRadius:"50%", background:T.creamWarm, border:`1px solid ${T.border}`, fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 1px 4px ${T.shadow}` }}>
                  {isSpeaking && lastAIText===m.text ? "⏹" : "🔊"}
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <div style={{ width:36, height:36, background:`linear-gradient(135deg,${T.earth},${T.clay})`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🤖</div>
            <div style={{ background:T.white, borderRadius:"18px 18px 18px 4px", padding:"14px 18px", border:`1px solid ${T.borderSoft}`, boxShadow:`0 3px 12px ${T.shadow}` }}>
              <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                {[0,1,2].map(i => <div key={i} style={{ width:9, height:9, background:T.saffron, borderRadius:"50%", animation:`sakhibounce 1.2s ${i*0.2}s infinite` }} />)}
              </div>
            </div>
          </div>
        )}
        {/* Live interim transcript bubble */}
        {isListening && interimText && (
          <div style={{ display:"flex", justifyContent:"flex-end" }}>
            <div style={{ background:T.saffron+"44", border:`1.5px dashed ${T.saffron}`, borderRadius:"18px 18px 4px 18px", padding:"10px 14px", maxWidth:"70%" }}>
              <p style={{ margin:0, fontSize:13, fontFamily:"sans-serif", color:T.inkMid, fontStyle:"italic" }}>🎤 "{interimText}"</p>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input bar */}
      <div style={{ padding:"10px 12px", background:T.white, borderTop:`1.5px solid ${T.border}`, display:"flex", gap:8, flexShrink:0, alignItems:"center" }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()} placeholder={isListening ? (chatLang==="hi"?"सुन रही हूँ...":chatLang==="te"?"వింటున్నాను...":"Listening...") : t.typeMessage} style={{ flex:1, padding:"13px 16px", borderRadius:26, border:`1.5px solid ${isListening?T.saffron:T.border}`, fontSize:14, fontFamily:"sans-serif", outline:"none", background:isListening?T.saffron+"10":T.cream, color:T.inkDark, transition:"all 0.3s" }} />

        {/* Mic button — inline quick-listen */}
        {voiceSupported && (
          <button onClick={toggleListening} title={t.voiceInput} style={{ padding:"13px", background: isListening?`linear-gradient(135deg,${T.rose},${T.terracotta})`:`linear-gradient(135deg,${T.saffron},${T.gold})`, border:"none", borderRadius:"50%", cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", boxShadow: isListening?`0 0 0 3px ${T.rose}44`:`0 3px 10px ${T.saffron}55`, transition:"all 0.3s", animation: isListening?"micglow 1.4s ease-in-out infinite":"none" }}>
            {isListening ? "⏹" : "🎤"}
          </button>
        )}

        {/* Voice Mode button */}
        {voiceSupported && (
          <button onClick={()=>{ setVoiceMode(true); setTimeout(toggleListening, 300); }} title="Full Voice Mode" style={{ padding:"13px", background:`linear-gradient(135deg,${T.jade},${T.jadeLight})`, border:"none", borderRadius:"50%", cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 3px 10px ${T.jade}55` }}>
            🎙️
          </button>
        )}

        {/* Send */}
        <button onClick={()=>sendMessage()} disabled={!input.trim()||loading} style={{ padding:"13px 18px", background:input.trim()&&!loading?`linear-gradient(135deg,${T.saffron},${T.terracotta})`:"#ddd", border:"none", borderRadius:26, cursor:input.trim()&&!loading?"pointer":"not-allowed", fontSize:20, opacity:input.trim()&&!loading?1:0.5, transition:"all 0.2s" }}>➤</button>
      </div>

      <style>{`
        @keyframes sakhibounce{0%,80%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-8px) scale(1.2)}}
        @keyframes micglow{0%,100%{box-shadow:0 0 0 3px ${T.rose}44}50%{box-shadow:0 0 0 8px ${T.rose}22, 0 0 18px ${T.rose}66}}
      `}</style>
    </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 7: SKILL INPUT
// ═══════════════════════════════════════════════════════════════════
function SkillInputScreen({ setScreen, setResults, lang }) {
  const t = TRANSLATIONS[lang];
  const [skill, setSkill] = useState("");
  const [custom, setCustom] = useState("");
  const presets = [
    { key:"cooking", label:lang==="hi"?"खाना बनाना 🍳":lang==="te"?"వంట 🍳":"Cooking 🍳" },
    { key:"tailoring", label:lang==="hi"?"सिलाई 🧵":lang==="te"?"కుట్టుపని 🧵":"Tailoring 🧵" },
    { key:"handicrafts", label:lang==="hi"?"हस्तकला 🎨":lang==="te"?"హస్తకళలు 🎨":"Handicrafts 🎨" },
  ];

  const generate = () => {
    const key = skill || "cooking";
    const data = SKILL_DATA[key] || SKILL_DATA.cooking;
    setResults({ key, ...data });
    setScreen("results");
  };

  return (
    <div style={{ padding:"24px 16px 80px", background:`linear-gradient(135deg,${T.cream},${T.creamWarm})`, minHeight:"100vh" }}>
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <div style={{ fontSize:52, marginBottom:8 }}>💡</div>
        <h2 style={{ fontSize:26, color:T.inkDark, margin:0, fontFamily:"Georgia,serif" }}>{t.skillBusiness}</h2>
        <p style={{ color:T.inkSoft, fontSize:14, marginTop:8, fontFamily:"sans-serif" }}>Select your skill and get personalized business ideas</p>
      </div>
      <Card style={{ marginBottom:16 }}>
        <p style={{ margin:"0 0 14px", fontSize:14, color:T.inkMid, fontFamily:"sans-serif", fontWeight:700 }}>Choose your skill:</p>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {presets.map(p => (
            <button key={p.key} onClick={()=>setSkill(p.key)} style={{ padding:"16px 20px", borderRadius:16, border:`2.5px solid ${skill===p.key?T.saffron:T.border}`, background:skill===p.key?`linear-gradient(135deg,${T.saffron}18,${T.gold}10)`:T.white, textAlign:"left", cursor:"pointer", fontSize:16, fontFamily:"sans-serif", color:skill===p.key?T.saffron:T.inkDark, fontWeight:skill===p.key?700:400, display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:skill===p.key?`0 4px 16px ${T.saffron}28`:"none", transition:"all 0.2s" }}>
              {p.label}
              {skill===p.key && <span style={{ fontSize:18 }}>✓</span>}
            </button>
          ))}
        </div>
      </Card>
      <Card style={{ marginBottom:24 }}>
        <p style={{ margin:"0 0 10px", fontSize:14, color:T.inkMid, fontFamily:"sans-serif", fontWeight:700 }}>Or type your skill:</p>
        <input value={custom} onChange={e=>setCustom(e.target.value)} placeholder="e.g. pottery, mehendi, dairy farming..." style={{ width:"100%", padding:"14px 16px", borderRadius:12, border:`1.5px solid ${T.border}`, fontSize:15, fontFamily:"sans-serif", outline:"none", background:T.cream, boxSizing:"border-box", color:T.inkDark }} />
      </Card>
      <PrimaryBtn onClick={generate}>{t.generateIdeas} ✨</PrimaryBtn>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 8: BUSINESS IDEA RESULTS
// ═══════════════════════════════════════════════════════════════════
function ResultsScreen({ setScreen, results, lang }) {
  const t = TRANSLATIONS[lang];
  const [sel, setSel] = useState(0);
  if (!results) { setScreen("skill"); return null; }
  const idea = results.ideas[sel];

  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(135deg,${T.cream},${T.creamWarm})` }}>
      <div style={{ background:`linear-gradient(135deg,${T.jade},${T.jadeLight})`, padding:"22px 18px 44px", borderRadius:"0 0 36px 36px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-30, top:-30, width:150, height:150, borderRadius:"50%", background:"rgba(255,255,255,0.08)" }} />
        <BackBtn onClick={()=>setScreen("skill")} label={t.backToSkill} />
        <h2 style={{ color:T.white, margin:"14px 0 4px", fontSize:24, fontFamily:"Georgia,serif" }}>{t.businessIdeasFor}</h2>
        <div style={{ display:"inline-flex", background:"rgba(255,255,255,0.25)", borderRadius:20, padding:"5px 16px" }}>
          <span style={{ color:T.white, fontSize:15, fontFamily:"sans-serif", fontWeight:700 }}>{results[lang]||results.en}</span>
        </div>
      </div>

      <div style={{ padding:"16px", marginTop:-18 }}>
        {/* Idea selector */}
        <div style={{ display:"flex", gap:10, marginBottom:16, overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
          {results.ideas.map((idea,i) => (
            <button key={i} onClick={()=>setSel(i)} style={{ minWidth:120, padding:"14px 10px", borderRadius:18, border:`2.5px solid ${sel===i?T.jade:T.border}`, background:sel===i?`linear-gradient(135deg,${T.jade}18,${T.jadeLight}10)`:T.white, cursor:"pointer", textAlign:"center", flexShrink:0, boxShadow:sel===i?`0 4px 16px ${T.jade}30`:"none", transition:"all 0.2s" }}>
              <div style={{ fontSize:32 }}>{idea.emoji}</div>
              <p style={{ margin:"7px 0 0", fontSize:11, color:sel===i?T.jade:T.inkSoft, fontFamily:"sans-serif", fontWeight:700, lineHeight:1.3 }}>{idea.title}</p>
            </button>
          ))}
        </div>

        {/* Idea detail */}
        <Card style={{ marginBottom:14 }}>
          <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:16 }}>
            <span style={{ fontSize:44 }}>{idea.emoji}</span>
            <div>
              <h3 style={{ margin:0, fontSize:19, color:T.inkDark, fontFamily:"Georgia,serif" }}>{idea.title}</h3>
              <div style={{ background:T.jade+"22", color:T.jade, borderRadius:20, padding:"5px 14px", display:"inline-block", fontSize:13, fontFamily:"sans-serif", fontWeight:700, marginTop:6 }}>💰 {idea.income}</div>
            </div>
          </div>

          <div style={{ marginBottom:16 }}>
            <p style={{ margin:"0 0 10px", fontSize:12, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:800, letterSpacing:"0.6px", textTransform:"uppercase" }}>{t.howToStart}</p>
            {idea.steps.map((s,i) => (
              <div key={i} style={{ display:"flex", gap:12, marginBottom:9, alignItems:"flex-start" }}>
                <div style={{ width:24, height:24, background:`linear-gradient(135deg,${T.saffron},${T.terracotta})`, borderRadius:"50%", color:T.white, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"sans-serif", fontWeight:800, flexShrink:0 }}>{i+1}</div>
                <p style={{ margin:0, fontSize:14, color:T.inkMid, fontFamily:"sans-serif", lineHeight:1.55 }}>{s}</p>
              </div>
            ))}
          </div>

          <div style={{ background:T.cream, borderRadius:14, padding:14, marginBottom:14 }}>
            <p style={{ margin:"0 0 8px", fontSize:12, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.6px" }}>🛒 {t.materialsNeeded}</p>
            {idea.materials.map((m,i) => (
              <div key={i} style={{ display:"flex", gap:8, marginBottom:5 }}>
                <span style={{ color:T.saffron, fontWeight:700 }}>•</span>
                <span style={{ fontSize:13, color:T.inkMid, fontFamily:"sans-serif" }}>{m}</span>
              </div>
            ))}
          </div>

          <div style={{ background:T.jade+"14", borderRadius:14, padding:14 }}>
            <p style={{ margin:"0 0 8px", fontSize:12, color:T.jade, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.6px" }}>📍 {t.whereToSell}</p>
            {idea.where.map((w,i) => (
              <div key={i} style={{ display:"flex", gap:8, marginBottom:5 }}>
                <span style={{ color:T.jade, fontWeight:700 }}>→</span>
                <span style={{ fontSize:13, color:T.inkMid, fontFamily:"sans-serif" }}>{w}</span>
              </div>
            ))}
          </div>
        </Card>

        <PrimaryBtn onClick={()=>setScreen("sakhi")} style={{ marginBottom:10 }}>{t.askSakhiMore} 🤖</PrimaryBtn>
        <SecondaryBtn onClick={()=>setScreen("market")}>Sell in Marketplace 🛍️</SecondaryBtn>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 9: MARKETPLACE
// ═══════════════════════════════════════════════════════════════════
function MarketplaceScreen({ setScreen, lang }) {
  const t = TRANSLATIONS[lang];
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const cats = [t.allCategories, "Food", "Textiles", "Handicraft", "Home Decor", "Clothing", "Jewellery"];
  const filtered = PRODUCTS.filter(p => (filter===t.allCategories||filter==="All"||p.cat===filter) && p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(135deg,${T.cream},${T.creamWarm})` }}>
      <div style={{ background:`linear-gradient(135deg,${T.rose},${T.roseSoft})`, padding:"18px 18px 28px", borderRadius:"0 0 32px 32px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div>
            <h2 style={{ color:T.white, margin:0, fontSize:22, fontFamily:"Georgia,serif" }}>🛍️ {t.marketplace}</h2>
            <p style={{ color:"rgba(255,255,255,0.82)", margin:"3px 0 0", fontSize:12, fontFamily:"sans-serif" }}>{PRODUCTS.length} products from women entrepreneurs</p>
          </div>
          <button onClick={()=>setScreen("addProduct")} style={{ background:T.white, color:T.rose, border:"none", borderRadius:22, padding:"9px 16px", fontSize:13, fontFamily:"sans-serif", fontWeight:700, cursor:"pointer", boxShadow:"0 3px 12px rgba(0,0,0,0.15)" }}>{t.addProduct}</button>
        </div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.searchProducts} style={{ width:"100%", padding:"12px 16px", borderRadius:14, border:"none", fontSize:14, fontFamily:"sans-serif", outline:"none", boxSizing:"border-box", boxShadow:"0 2px 10px rgba(0,0,0,0.1)" }} />
      </div>

      <div style={{ padding:"12px 14px 0", display:"flex", gap:8, overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
        {cats.map(c => (
          <button key={c} onClick={()=>setFilter(c)} style={{ whiteSpace:"nowrap", padding:"8px 18px", borderRadius:22, border:`1.5px solid ${filter===c?T.rose:T.border}`, background:filter===c?T.rose:T.white, color:filter===c?T.white:T.inkSoft, fontSize:12, cursor:"pointer", fontFamily:"sans-serif", fontWeight:filter===c?700:400, transition:"all 0.2s" }}>{c}</button>
        ))}
      </div>

      <div style={{ padding:"12px 12px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        {filtered.map(p => (
          <div key={p.id} onClick={()=>setScreen("product_"+p.id)} style={{ background:T.white, borderRadius:20, padding:14, boxShadow:`0 3px 14px ${T.shadow}`, cursor:"pointer", border:`1.5px solid ${T.borderSoft}`, transition:"all 0.2s" }}>
            <div style={{ fontSize:50, textAlign:"center", background:`linear-gradient(135deg,${T.cream},${T.creamWarm})`, borderRadius:14, padding:"14px 0", marginBottom:12 }}>{p.emoji}</div>
            <Chip text={p.cat} color={T.rose} />
            <p style={{ margin:"8px 0 2px", fontSize:13, fontWeight:700, color:T.inkDark, fontFamily:"sans-serif", lineHeight:1.3 }}>{p.name}</p>
            <p style={{ margin:0, fontSize:11, color:T.inkSoft, fontFamily:"sans-serif" }}>{t.byLabel} {p.seller}</p>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10 }}>
              <span style={{ fontSize:17, fontWeight:800, color:T.saffron, fontFamily:"sans-serif" }}>₹{p.price}</span>
              <span style={{ fontSize:11, color:T.gold, fontFamily:"sans-serif" }}>⭐ {p.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 10: ADD PRODUCT
// ═══════════════════════════════════════════════════════════════════
function AddProductScreen({ setScreen, lang }) {
  const t = TRANSLATIONS[lang];
  const [cat, setCat] = useState("Food");
  const cats = ["Food","Textiles","Handicraft","Home Decor","Clothing","Jewellery"];

  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(135deg,${T.cream},${T.creamWarm})` }}>
      <div style={{ background:`linear-gradient(135deg,${T.rose},${T.roseSoft})`, padding:"18px 18px 32px", borderRadius:"0 0 32px 32px" }}>
        <BackBtn onClick={()=>setScreen("market")} label={t.backToSkill} />
        <h2 style={{ color:T.white, margin:"14px 0 0", fontSize:24, fontFamily:"Georgia,serif" }}>{t.addYourProduct}</h2>
      </div>
      <div style={{ padding:"16px", marginTop:-12 }}>
        <Card>
          {/* Photo Upload */}
          <div style={{ border:`2.5px dashed ${T.border}`, borderRadius:18, padding:"28px 20px", textAlign:"center", marginBottom:20, cursor:"pointer", background:T.creamWarm, transition:"all 0.2s" }}>
            <div style={{ fontSize:44, marginBottom:10 }}>📷</div>
            <p style={{ margin:0, fontSize:15, color:T.inkMid, fontFamily:"sans-serif", fontWeight:600 }}>{t.uploadPhoto}</p>
            <p style={{ margin:"5px 0 0", fontSize:12, color:T.inkSoft, fontFamily:"sans-serif" }}>{t.photoHint}</p>
          </div>

          {[{label:t.productName, ph:"e.g. Mango Pickle 500g"}, {label:t.productPrice, ph:"e.g. 200"}].map((f,i) => (
            <div key={i} style={{ marginBottom:16 }}>
              <label style={{ fontSize:12, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.5px" }}>{f.label}</label>
              <input placeholder={f.ph} style={{ width:"100%", padding:"14px 16px", marginTop:7, borderRadius:12, border:`1.5px solid ${T.border}`, fontSize:15, fontFamily:"sans-serif", outline:"none", background:T.cream, boxSizing:"border-box", color:T.inkDark }} />
            </div>
          ))}

          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:12, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.5px" }}>{t.productCategory}</label>
            <div style={{ display:"flex", flexWrap:"wrap", gap:9, marginTop:10 }}>
              {cats.map(c => <button key={c} onClick={()=>setCat(c)} style={{ padding:"8px 16px", borderRadius:22, border:`1.5px solid ${cat===c?T.rose:T.border}`, background:cat===c?T.rose+"20":T.white, color:cat===c?T.rose:T.inkSoft, fontSize:13, cursor:"pointer", fontFamily:"sans-serif", fontWeight:cat===c?700:400, transition:"all 0.2s" }}>{c}</button>)}
            </div>
          </div>

          <div style={{ marginBottom:22 }}>
            <label style={{ fontSize:12, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.5px" }}>{t.productDesc}</label>
            <textarea placeholder="Describe your product — what makes it special?" rows={3} style={{ width:"100%", padding:"14px 16px", marginTop:7, borderRadius:12, border:`1.5px solid ${T.border}`, fontSize:14, fontFamily:"sans-serif", outline:"none", background:T.cream, boxSizing:"border-box", resize:"none", color:T.inkDark }} />
          </div>

          <PrimaryBtn onClick={()=>setScreen("market")}>{t.listProduct}</PrimaryBtn>
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 11: PRODUCT DETAILS
// ═══════════════════════════════════════════════════════════════════
function ProductDetailScreen({ setScreen, productId, lang }) {
  const t = TRANSLATIONS[lang];
  const p = PRODUCTS.find(x=>x.id===productId)||PRODUCTS[0];
  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(135deg,${T.cream},${T.creamWarm})` }}>
      <div style={{ background:`linear-gradient(135deg,${T.cream},${T.creamWarm})`, padding:"14px 16px 20px" }}>
        <BackBtn onClick={()=>setScreen("market")} label={t.backToSkill} style={{ color:T.inkSoft, background:T.white, boxShadow:`0 2px 8px ${T.shadow}` }} />
      </div>
      <div style={{ padding:"0 16px 16px" }}>
        <Card style={{ textAlign:"center", marginBottom:16, padding:28 }}>
          <div style={{ fontSize:90, marginBottom:12, lineHeight:1 }}>{p.emoji}</div>
          <Chip text={p.cat} color={T.rose} />
        </Card>
        <Card style={{ marginBottom:16 }}>
          <h2 style={{ margin:"0 0 8px", fontSize:22, color:T.inkDark, fontFamily:"Georgia,serif" }}>{p.name}</h2>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
            <span style={{ fontSize:28, fontWeight:800, color:T.saffron, fontFamily:"sans-serif" }}>₹{p.price}</span>
            <div style={{ display:"flex", gap:4, alignItems:"center" }}>
              {"⭐⭐⭐⭐⭐".slice(0,Math.round(p.rating)*2-1).split("").map((s,i)=><span key={i}>{s}</span>)}
              <span style={{ fontSize:14, color:T.inkSoft, fontFamily:"sans-serif", marginLeft:4 }}>{p.rating} ({p.reviews})</span>
            </div>
          </div>
          <div style={{ background:T.cream, borderRadius:14, padding:14, marginBottom:16 }}>
            <p style={{ margin:0, fontSize:14, color:T.inkMid, fontFamily:"sans-serif" }}>🏪 <strong>{t.byLabel} {p.seller}</strong></p>
            <p style={{ margin:"6px 0 0", fontSize:14, color:T.inkMid, fontFamily:"sans-serif" }}>📍 {p.loc}</p>
          </div>
          <p style={{ fontSize:14, color:T.inkSoft, fontFamily:"sans-serif", lineHeight:1.7, marginBottom:18 }}>
            Handmade with love and traditional expertise. Every piece is unique, crafted with skills passed through generations. Your purchase directly supports this rural woman entrepreneur.
          </p>
          <div style={{ display:"flex", gap:10 }}>
            <PrimaryBtn style={{ flex:1 }}>{t.buyNow} 🛒</PrimaryBtn>
            <SecondaryBtn style={{ flex:1 }}>{t.contactSeller} 💬</SecondaryBtn>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 12: LEARNING HUB
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// SCREEN 13: COMMUNITY
// ═══════════════════════════════════════════════════════════════════
function CommunityScreen({ lang }) {
  const t = TRANSLATIONS[lang];
  const [liked, setLiked] = useState([]);
  const [postText, setPostText] = useState("");

  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(135deg,${T.cream},${T.creamWarm})` }}>
      <div style={{ background:`linear-gradient(135deg,${T.earth},${T.clay})`, padding:"18px 18px 28px", borderRadius:"0 0 28px 28px" }}>
        <h2 style={{ color:T.white, margin:0, fontSize:24, fontFamily:"Georgia,serif" }}>👭 {t.communityTitle}</h2>
        <p style={{ color:"rgba(255,255,255,0.85)", margin:"5px 0 0", fontSize:14, fontFamily:"sans-serif" }}>{t.communitySub} 🌸</p>
      </div>
      <div style={{ padding:"14px 14px" }}>
        {/* Post Composer */}
        <Card style={{ marginBottom:14 }}>
          <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
            <div style={{ width:42, height:42, background:T.saffron+"30", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>🌸</div>
            <div style={{ flex:1 }}>
              <textarea value={postText} onChange={e=>setPostText(e.target.value)} placeholder={t.shareSomething} rows={2} style={{ width:"100%", padding:"10px 14px", borderRadius:14, border:`1.5px solid ${T.border}`, fontSize:14, fontFamily:"sans-serif", outline:"none", background:T.cream, resize:"none", boxSizing:"border-box", color:T.inkDark }} />
              <div style={{ display:"flex", justifyContent:"flex-end", marginTop:8 }}>
                <button onClick={()=>setPostText("")} style={{ padding:"8px 22px", background:`linear-gradient(135deg,${T.saffron},${T.terracotta})`, color:T.white, border:"none", borderRadius:22, cursor:"pointer", fontFamily:"sans-serif", fontSize:13, fontWeight:700, opacity:postText.trim()?1:0.5 }}>{t.post} →</button>
              </div>
            </div>
          </div>
        </Card>

        {POSTS.map(post => (
          <Card key={post.id} style={{ marginBottom:14 }}>
            <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
              <div style={{ width:44, height:44, background:T.creamWarm, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{post.avatar}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <strong style={{ fontSize:14, color:T.inkDark, fontFamily:"sans-serif" }}>{post.author}</strong>
                  <span style={{ fontSize:11, color:T.inkSoft, fontFamily:"sans-serif" }}>{post.time}</span>
                </div>
                <Chip text={post.tag} color={post.tagColor} />
              </div>
            </div>
            <p style={{ margin:"0 0 14px", fontSize:14, color:T.inkMid, fontFamily:"sans-serif", lineHeight:1.65 }}>{post.text}</p>
            <div style={{ display:"flex", gap:20, borderTop:`1.5px solid ${T.borderSoft}`, paddingTop:12 }}>
              <button onClick={()=>setLiked(p=>p.includes(post.id)?p.filter(x=>x!==post.id):[...p,post.id])} style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, color:liked.includes(post.id)?T.rose:T.inkSoft, fontFamily:"sans-serif", display:"flex", alignItems:"center", gap:5, fontWeight:liked.includes(post.id)?700:400 }}>
                {liked.includes(post.id)?"❤️":"🤍"} {post.likes+(liked.includes(post.id)?1:0)}
              </button>
              <button style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, color:T.inkSoft, fontFamily:"sans-serif", display:"flex", alignItems:"center", gap:5 }}>💬 {post.comments}</button>
              <button style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, color:T.inkSoft, fontFamily:"sans-serif", display:"flex", alignItems:"center", gap:5 }}>↗️ Share</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 14: ACHIEVEMENTS
// ═══════════════════════════════════════════════════════════════════
function AchievementsScreen({ lang }) {
  const t = TRANSLATIONS[lang];
  const earned = ALL_BADGES.filter(b=>b.earned);
  const locked = ALL_BADGES.filter(b=>!b.earned);

  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(135deg,${T.cream},${T.creamWarm})` }}>
      <div style={{ background:`linear-gradient(135deg,${T.gold},${T.turmeric})`, padding:"22px 18px 36px", borderRadius:"0 0 36px 36px", textAlign:"center" }}>
        <div style={{ fontSize:52, marginBottom:8 }}>🏆</div>
        <h2 style={{ color:T.white, margin:0, fontSize:26, fontFamily:"Georgia,serif" }}>{t.achievements}</h2>
        <p style={{ color:"rgba(255,255,255,0.88)", margin:"6px 0 0", fontSize:14, fontFamily:"sans-serif" }}>{t.achieveSub}</p>
        <div style={{ display:"flex", gap:24, justifyContent:"center", marginTop:18 }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:28, fontWeight:800, color:T.white, fontFamily:"sans-serif" }}>{earned.length}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.8)", fontFamily:"sans-serif" }}>{t.earnedBadges}</div>
          </div>
          <div style={{ width:1, background:"rgba(255,255,255,0.3)" }} />
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:28, fontWeight:800, color:T.white, fontFamily:"sans-serif" }}>{locked.length}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.8)", fontFamily:"sans-serif" }}>Remaining</div>
          </div>
        </div>
      </div>

      <div style={{ padding:"16px 14px" }}>
        <h3 style={{ margin:"0 0 14px", fontSize:13, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.6px" }}>✅ {t.earnedBadges}</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:24 }}>
          {earned.map(b => (
            <div key={b.id} style={{ background:T.white, borderRadius:18, padding:"18px 14px", textAlign:"center", boxShadow:`0 4px 16px ${b.color}22`, border:`2px solid ${b.color}44` }}>
              <div style={{ fontSize:44, marginBottom:8 }}>{b.emoji}</div>
              <p style={{ margin:0, fontSize:13, fontWeight:800, color:b.color, fontFamily:"sans-serif" }}>{b.name}</p>
              <p style={{ margin:"4px 0 0", fontSize:11, color:T.inkSoft, fontFamily:"sans-serif", lineHeight:1.4 }}>{b.desc}</p>
              <div style={{ marginTop:8 }}>
                <Chip text="✓ Earned" color={b.color} filled />
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ margin:"0 0 14px", fontSize:13, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.6px" }}>🔒 {t.lockedBadges}</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {locked.map(b => (
            <div key={b.id} style={{ background:T.white, borderRadius:18, padding:"18px 14px", textAlign:"center", opacity:0.55, border:`2px dashed ${T.border}` }}>
              <div style={{ fontSize:44, marginBottom:8, filter:"grayscale(0.8)" }}>{b.emoji}</div>
              <p style={{ margin:0, fontSize:13, fontWeight:700, color:T.inkSoft, fontFamily:"sans-serif" }}>{b.name}</p>
              <p style={{ margin:"4px 0 0", fontSize:11, color:T.inkSoft, fontFamily:"sans-serif", lineHeight:1.4 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 15: REWARD POINTS
// ═══════════════════════════════════════════════════════════════════
function RewardPointsScreen({ user, lang }) {
  const t = TRANSLATIONS[lang];
  const pts = user?.points||450;
  const levels = [
    { name:"Bronze Sakhi", min:0, max:200, color:T.clay, emoji:"🥉" },
    { name:"Silver Sakhi", min:200, max:500, color:T.inkSoft, emoji:"🥈" },
    { name:"Gold Sakhi", min:500, max:1000, color:T.gold, emoji:"🥇" },
    { name:"Diamond Sakhi", min:1000, max:Infinity, color:T.rose, emoji:"💎" },
  ];
  const currentLevel = levels.find(l=>pts>=l.min&&pts<l.max)||levels[0];
  const nextLevel = levels[levels.indexOf(currentLevel)+1];
  const pct = nextLevel ? Math.round(((pts-currentLevel.min)/(nextLevel.min-currentLevel.min))*100) : 100;

  const HISTORY = [
    { action:"Completed UPI Course", pts:50, emoji:"📚", date:"Today" },
    { action:"Sold Mango Pickle", pts:30, emoji:"🛍️", date:"Yesterday" },
    { action:"Received 5-star review", pts:25, emoji:"⭐", date:"2 days ago" },
    { action:"Community post", pts:10, emoji:"👭", date:"3 days ago" },
    { action:"Daily check-in streak x7", pts:35, emoji:"🔥", date:"Last week" },
  ];

  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(135deg,${T.cream},${T.creamWarm})` }}>
      <div style={{ background:`linear-gradient(135deg,${T.gold},${T.saffron})`, padding:"22px 18px 44px", borderRadius:"0 0 40px 40px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        {[...Array(3)].map((_,i)=><div key={i} style={{ position:"absolute", borderRadius:"50%", border:"1px solid rgba(255,255,255,0.15)", width:100+i*100, height:100+i*100, top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />)}
        <div style={{ position:"relative" }}>
          <div style={{ fontSize:56, marginBottom:6 }}>{currentLevel.emoji}</div>
          <h2 style={{ color:T.white, margin:0, fontSize:28, fontFamily:"Georgia,serif" }}>{pts}</h2>
          <p style={{ color:"rgba(255,255,255,0.9)", margin:"4px 0 0", fontSize:15, fontFamily:"sans-serif" }}>{t.rewardPoints}</p>
          <div style={{ display:"inline-flex", background:"rgba(255,255,255,0.25)", borderRadius:20, padding:"5px 18px", marginTop:10 }}>
            <span style={{ color:T.white, fontSize:14, fontFamily:"sans-serif", fontWeight:700 }}>{currentLevel.name}</span>
          </div>
        </div>
      </div>

      <div style={{ padding:"16px 14px", marginTop:-16 }}>
        {/* Progress to next level */}
        {nextLevel && (
          <Card style={{ marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
              <span style={{ fontSize:14, fontWeight:700, color:T.inkDark, fontFamily:"sans-serif" }}>Progress to {nextLevel.name}</span>
              <span style={{ fontSize:14, color:T.gold, fontFamily:"sans-serif", fontWeight:700 }}>{pts}/{nextLevel.min}</span>
            </div>
            <div style={{ background:T.creamWarm, borderRadius:10, height:10 }}>
              <div style={{ width:`${pct}%`, background:`linear-gradient(90deg,${T.gold},${T.saffron})`, borderRadius:10, height:"100%", transition:"width 1s" }} />
            </div>
            <p style={{ margin:"8px 0 0", fontSize:12, color:T.inkSoft, fontFamily:"sans-serif" }}>{nextLevel.min-pts} more points to reach {nextLevel.name} {nextLevel.emoji}</p>
          </Card>
        )}

        {/* How to earn */}
        <Card style={{ marginBottom:16 }}>
          <h3 style={{ margin:"0 0 14px", fontSize:14, color:T.inkDark, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.5px" }}>💡 {t.howToEarn}</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {POINT_ACTIONS.map((a,i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 14px", background:T.creamWarm, borderRadius:12 }}>
                <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                  <span style={{ fontSize:22 }}>{a.emoji}</span>
                  <span style={{ fontSize:13, color:T.inkMid, fontFamily:"sans-serif" }}>{a.action}</span>
                </div>
                <span style={{ fontSize:14, fontWeight:800, color:T.jade, fontFamily:"sans-serif" }}>+{a.points}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* History */}
        <Card>
          <h3 style={{ margin:"0 0 14px", fontSize:14, color:T.inkDark, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.5px" }}>📋 Recent Activity</h3>
          {HISTORY.map((h,i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:i<HISTORY.length-1?`1px solid ${T.borderSoft}`:"none" }}>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <span style={{ fontSize:20 }}>{h.emoji}</span>
                <div>
                  <p style={{ margin:0, fontSize:13, color:T.inkMid, fontFamily:"sans-serif", fontWeight:600 }}>{h.action}</p>
                  <p style={{ margin:"2px 0 0", fontSize:11, color:T.inkSoft, fontFamily:"sans-serif" }}>{h.date}</p>
                </div>
              </div>
              <span style={{ fontSize:15, fontWeight:800, color:T.jade, fontFamily:"sans-serif" }}>+{h.pts}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 16: PROFILE & SETTINGS
// ═══════════════════════════════════════════════════════════════════
function ProfileScreen({ setScreen, user, lang, setLang }) {
  const t = TRANSLATIONS[lang];
  const [showLang, setShowLang] = useState(false);
  const earned = ALL_BADGES.filter(b=>b.earned);
  const langOpts = [{ code:"en", label:"English 🇮🇳" },{ code:"hi", label:"हिंदी 🙏" },{ code:"te", label:"తెలుగు 🌺" }];

  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(135deg,${T.cream},${T.creamWarm})` }}>
      <div style={{ background:`linear-gradient(135deg,${T.saffron},${T.terracotta},${T.earth})`, padding:"28px 18px 52px", borderRadius:"0 0 44px 44px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", bottom:-40, left:-40, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
        <div style={{ width:86, height:86, background:"rgba(255,255,255,0.26)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:44, margin:"0 auto 12px", border:"3.5px solid rgba(255,255,255,0.5)", boxShadow:"0 4px 20px rgba(0,0,0,0.2)" }}>👩</div>
        <h2 style={{ color:T.white, margin:0, fontSize:24, fontFamily:"Georgia,serif" }}>{user?.name||"Meena Devi"}</h2>
        <p style={{ color:"rgba(255,255,255,0.82)", margin:"5px 0 0", fontSize:13, fontFamily:"sans-serif" }}>📍 {user?.location||"India"}</p>
        <div style={{ display:"flex", gap:28, justifyContent:"center", marginTop:18 }}>
          {[{ label:t.points, val:user?.points||450 },{ label:t.badges, val:earned.length },{ label:"Products", val:2 }].map(s => (
            <div key={s.label}>
              <div style={{ fontSize:22, fontWeight:800, color:T.white, fontFamily:"sans-serif" }}>{s.val}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.72)", fontFamily:"sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:"14px 14px 0", marginTop:-20 }}>
        {/* Skills */}
        <Card style={{ marginBottom:14 }}>
          <h3 style={{ margin:"0 0 12px", fontSize:13, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.5px" }}>🌟 {t.skills}</h3>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {(user?.skills?.length?user.skills:["cooking","tailoring"]).map(s => (
              <Chip key={s} text={SKILL_DATA[s]?.[lang]||s} color={T.saffron} />
            ))}
          </div>
        </Card>

        {/* Badges Preview */}
        <Card style={{ marginBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <h3 style={{ margin:0, fontSize:13, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.5px" }}>🏆 {t.badges}</h3>
            <button onClick={()=>setScreen("achievements")} style={{ background:"none", border:"none", color:T.saffron, fontSize:12, cursor:"pointer", fontFamily:"sans-serif", fontWeight:700 }}>See All →</button>
          </div>
          <div style={{ display:"flex", gap:12, overflowX:"auto" }}>
            {ALL_BADGES.map(b => (
              <div key={b.id} style={{ textAlign:"center", padding:"10px 8px", borderRadius:14, background:b.earned?b.color+"18":"#f5f5f5", border:`1.5px solid ${b.earned?b.color+"44":T.border}`, opacity:b.earned?1:0.45, flexShrink:0, width:64 }}>
                <div style={{ fontSize:28, filter:b.earned?"none":"grayscale(0.9)" }}>{b.emoji}</div>
                <div style={{ fontSize:9, color:b.earned?b.color:T.inkSoft, fontFamily:"sans-serif", fontWeight:700, marginTop:4, lineHeight:1.3 }}>{b.name}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Settings */}
        <Card style={{ marginBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <h3 style={{ margin:0, fontSize:13, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.5px" }}>⚙️ {t.settings}</h3>
            <button onClick={()=>setScreen("settings")} style={{ background:`linear-gradient(135deg,${T.saffron},${T.terracotta})`, border:"none", color:T.white, borderRadius:20, padding:"6px 14px", fontSize:12, cursor:"pointer", fontFamily:"sans-serif", fontWeight:700 }}>Full Settings →</button>
          </div>

          {/* Reward Points link */}
          <button onClick={()=>setScreen("rewards")} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"13px 16px", background:T.creamWarm, borderRadius:12, border:`1px solid ${T.border}`, cursor:"pointer", marginBottom:10 }}>
            <span style={{ fontFamily:"sans-serif", fontSize:14, color:T.inkDark, fontWeight:600 }}>⭐ {t.rewardPoints}</span>
            <span style={{ color:T.saffron, fontWeight:700, fontSize:16 }}>›</span>
          </button>

          {/* Language */}
          <button onClick={()=>setShowLang(!showLang)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"13px 16px", background:T.creamWarm, borderRadius:12, border:`1px solid ${T.border}`, cursor:"pointer", marginBottom:showLang?8:10 }}>
            <span style={{ fontFamily:"sans-serif", fontSize:14, color:T.inkDark, fontWeight:600 }}>🌐 {t.language}: {lang==="en"?"English":lang==="hi"?"हिंदी":"తెలుగు"}</span>
            <span style={{ color:T.saffron, fontWeight:700, fontSize:16 }}>{showLang?"∧":"›"}</span>
          </button>
          {showLang && (
            <div style={{ marginBottom:10, padding:"8px", background:T.cream, borderRadius:12, border:`1px solid ${T.border}` }}>
              {langOpts.map(o => (
                <button key={o.code} onClick={()=>{setLang(o.code);setShowLang(false)}} style={{ width:"100%", padding:"10px 14px", borderRadius:10, border:"none", background:lang===o.code?T.saffron+"20":"transparent", color:lang===o.code?T.saffron:T.inkMid, fontFamily:"sans-serif", fontSize:14, cursor:"pointer", textAlign:"left", fontWeight:lang===o.code?700:400, marginBottom:2 }}>
                  {o.label} {lang===o.code?"✓":""}
                </button>
              ))}
            </div>
          )}

          <button onClick={()=>setScreen("welcome")} style={{ width:"100%", padding:"13px 16px", background:"transparent", border:`1.5px solid ${T.border}`, borderRadius:12, color:T.rose, fontFamily:"sans-serif", fontSize:14, cursor:"pointer", fontWeight:700, textAlign:"left" }}>
            🚪 {t.signOut}
          </button>
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// COURSE VIEWER (sub-screen)
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// LOCALIZED COURSE CONTENT
// ═══════════════════════════════════════════════════════════════════
const COURSE_CONTENT = {
  1: { // Starting Your Business
    en: [
      { title:"What is a Small Business?", content:"A small business is when you make or sell something and earn money from it. You are the boss! You decide what to make, who to sell to, and how much to charge.", tip:"Even selling 5 products a day is a real business." },
      { title:"Finding Your First Customers", content:"Your first customers are the people around you. Start with family, neighbors, and friends. Ask them to tell others. One happy customer brings five more!", tip:"Word of mouth is the most powerful marketing tool." },
      { title:"Keeping Simple Accounts", content:"Write down every rupee you spend and every rupee you earn. Use a small notebook. Check at the end of each week. If you earn more than you spend — your business is working!", tip:"A ₹20 notebook can save your business." },
      { title:"Pricing Your Products Right", content:"Price = cost of materials + your time + a little profit. If materials cost ₹50 and you spend 2 hours, charge at least ₹120–150. Never sell at a loss!", tip:"Customers pay for quality AND trust." },
      { title:"Growing Step by Step", content:"Do not rush. Grow one step at a time. First: 5 customers. Then: 10. Then: 20. Each step teaches you something new.", tip:"Slow growth is strong growth." },
    ],
    hi: [
      { title:"छोटा व्यापार क्या है?", content:"छोटा व्यापार तब होता है जब आप कुछ बनाती या बेचती हैं और उससे पैसे कमाती हैं। आप खुद मालकिन हैं! आप तय करती हैं कि क्या बनाना है, किसे बेचना है, और कितने में बेचना है।", tip:"रोज़ 5 उत्पाद बेचना भी एक सच्चा व्यापार है।" },
      { title:"पहले ग्राहक कहाँ से लाएं?", content:"आपके पहले ग्राहक आपके आसपास के लोग हैं — परिवार, पड़ोसी, दोस्त। उनसे कहें कि दूसरों को भी बताएं। एक खुश ग्राहक पाँच और ग्राहक लाता है!", tip:"मुँह से बात सबसे अच्छा मार्केटिंग टूल है।" },
      { title:"सरल हिसाब-किताब रखें", content:"हर रुपया जो खर्च हो और हर रुपया जो आए — लिख लें। एक छोटी नोटबुक में। हर हफ्ते जाँचें। अगर आमदनी ज़्यादा है तो आपका व्यापार चल रहा है!", tip:"₹20 की नोटबुक आपका व्यापार बचा सकती है।" },
      { title:"सही कीमत लगाएं", content:"कीमत = सामान का खर्च + आपका समय + थोड़ा मुनाफा। अगर सामान में ₹50 लगे और 2 घंटे लगे तो कम से कम ₹120-150 लें। कभी घाटे में मत बेचें!", tip:"ग्राहक गुणवत्ता और भरोसे के लिए पैसे देते हैं।" },
      { title:"धीरे-धीरे बढ़ें", content:"जल्दबाज़ी मत करें। एक-एक कदम बढ़ें। पहले: 5 ग्राहक। फिर: 10। फिर: 20। हर कदम पर कुछ नया सीखेंगी।", tip:"धीरे बढ़ना, मज़बूत बढ़ना है।" },
    ],
    te: [
      { title:"చిన్న వ్యాపారం అంటే ఏమిటి?", content:"చిన్న వ్యాపారం అంటే మీరు ఏదైనా తయారు చేసి లేదా అమ్మి డబ్బు సంపాదించడం. మీరే యజమాని! ఏం తయారు చేయాలో, ఎవరికి అమ్మాలో, ఎంత తీసుకోవాలో మీరు నిర్ణయిస్తారు.", tip:"రోజుకు 5 ఉత్పత్తులు అమ్మడం కూడా నిజమైన వ్యాపారమే." },
      { title:"మొదటి కస్టమర్లను ఎక్కడ వెతకాలి?", content:"మీ మొదటి కస్టమర్లు మీ చుట్టుపక్కల ఉన్న వారే — కుటుంబం, పొరుగువారు, స్నేహితులు. వారికి ఇతరులకు చెప్పమని చెప్పండి. ఒక సంతోషకరమైన కస్టమర్ ఐదు మంది తీసుకొస్తారు!", tip:"నోటి ద్వారా వచ్చే ప్రచారం అత్యుత్తమ మార్కెటింగ్." },
      { title:"సరళమైన లెక్కలు ఉంచండి", content:"ఖర్చయిన ప్రతి రూపాయి, వచ్చిన ప్రతి రూపాయి రాయండి. చిన్న నోట్‌బుక్‌లో. ప్రతి వారం చెక్ చేయండి. సంపాదన ఎక్కువగా ఉంటే మీ వ్యాపారం నడుస్తోంది!", tip:"₹20 నోట్‌బుక్ మీ వ్యాపారాన్ని కాపాడవచ్చు." },
      { title:"సరైన ధర నిర్ణయించండి", content:"ధర = సామగ్రి ఖర్చు + మీ సమయం + కొంత లాభం. సామగ్రికి ₹50 అయి, 2 గంటలు పట్టినా కనీసం ₹120-150 తీసుకోండి. నష్టంలో అమ్మకండి!", tip:"కస్టమర్లు నాణ్యత మరియు నమ్మకానికి డబ్బు చెల్లిస్తారు." },
      { title:"అడుగు అడుగున పెరగండి", content:"హడావిడి వద్దు. ఒక్కో అడుగు వేయండి. మొదట: 5 కస్టమర్లు. తర్వాత: 10. తర్వాత: 20. ప్రతి అడుగులో కొత్తది నేర్చుకుంటారు.", tip:"నెమ్మదిగా పెరగడం బలంగా పెరగడమే." },
    ],
  },
  5: { // UPI & Digital Payments
    en: [
      { title:"What is UPI?", content:"UPI stands for Unified Payments Interface. It lets you send and receive money using your phone — no need for cash or ATM! It is safe, free, and works 24 hours a day.", tip:"Over 300 million Indians use UPI every day." },
      { title:"Setting Up PhonePe / Google Pay", content:"Download PhonePe or Google Pay from the app store. Link your bank account using your debit card. Create a UPI ID — something like yourname@upi. That is your digital address for money!", tip:"Your UPI ID is like your home address for money." },
      { title:"Receiving Payments from Customers", content:"Show your QR code to customers. They scan it and enter the amount. Money comes directly to your bank account in seconds! You can also share your UPI ID on WhatsApp.", tip:"Save a screenshot of your QR code to share easily." },
      { title:"Keeping Payment Records", content:"Every UPI payment comes with a confirmation message. Save these messages. You can use them as receipts for customers and for your own records.", tip:"Digital records are safer than paper." },
    ],
    hi: [
      { title:"UPI क्या है?", content:"UPI का मतलब है यूनिफाइड पेमेंट्स इंटरफेस। इससे आप फोन से पैसे भेज और पा सकती हैं — कैश या ATM की ज़रूरत नहीं! यह सुरक्षित, मुफ़्त और 24 घंटे काम करता है।", tip:"30 करोड़ से ज़्यादा भारतीय रोज़ UPI इस्तेमाल करते हैं।" },
      { title:"PhonePe / Google Pay कैसे बनाएं?", content:"App Store से PhonePe या Google Pay डाउनलोड करें। अपने डेबिट कार्ड से बैंक अकाउंट जोड़ें। UPI ID बनाएं — जैसे आपकानाम@upi। यह आपका डिजिटल पता है!", tip:"आपकी UPI ID पैसों के लिए आपका घर का पता है।" },
      { title:"ग्राहकों से पेमेंट कैसे लें?", content:"ग्राहकों को अपना QR code दिखाएं। वे स्कैन करके रकम डालते हैं। पैसे सीधे आपके बैंक में आ जाते हैं! WhatsApp पर भी UPI ID शेयर कर सकती हैं।", tip:"अपने QR code का screenshot सेव करें।" },
      { title:"पेमेंट का हिसाब रखें", content:"हर UPI पेमेंट का कन्फर्मेशन मैसेज आता है। इन्हें सेव करें। ये ग्राहकों के लिए रसीद और अपने रिकॉर्ड के काम आते हैं।", tip:"डिजिटल रिकॉर्ड कागज़ से ज़्यादा सुरक्षित हैं।" },
    ],
    te: [
      { title:"UPI అంటే ఏమిటి?", content:"UPI అంటే యూనిఫైడ్ పేమెంట్స్ ఇంటర్‌ఫేస్. దీని ద్వారా మీరు ఫోన్ ద్వారా డబ్బు పంపవచ్చు మరియు అందుకోవచ్చు — నగదు లేదా ATM అవసరం లేదు! సురక్షితం, ఉచితం మరియు 24 గంటలు పని చేస్తుంది.", tip:"30 కోట్లకు పైగా భారతీయులు రోజూ UPI ఉపయోగిస్తున్నారు." },
      { title:"PhonePe / Google Pay ఎలా సెటప్ చేయాలి?", content:"App Store నుండి PhonePe లేదా Google Pay డౌన్‌లోడ్ చేయండి. మీ డెబిట్ కార్డ్‌తో బ్యాంక్ అకౌంట్ లింక్ చేయండి. UPI ID సృష్టించండి — మీరు@upi లాంటిది. ఇది డబ్బుకు మీ డిజిటల్ చిరునామా!", tip:"మీ UPI ID డబ్బుకు మీ ఇంటి చిరునామా లాంటిది." },
      { title:"కస్టమర్ల నుండి పేమెంట్ ఎలా అందుకోవాలి?", content:"కస్టమర్లకు మీ QR కోడ్ చూపించండి. వారు స్కాన్ చేసి మొత్తం నమోదు చేస్తారు. డబ్బు నేరుగా మీ బ్యాంక్‌కు వస్తుంది! WhatsApp లో కూడా UPI ID షేర్ చేయవచ్చు.", tip:"మీ QR కోడ్ స్క్రీన్‌షాట్ సేవ్ చేయండి." },
      { title:"పేమెంట్ రికార్డులు ఉంచండి", content:"ప్రతి UPI పేమెంట్‌కు నిర్ధారణ సందేశం వస్తుంది. వీటిని సేవ్ చేయండి. కస్టమర్లకు రశీదుగా మరియు మీ రికార్డులకు ఉపయోగపడతాయి.", tip:"డిజిటల్ రికార్డులు కాగితం కంటే సురక్షితం." },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════
// BUSINESS EXPANSION PLATFORMS DATA
// ═══════════════════════════════════════════════════════════════════
const PLATFORMS = [
  {
    id:"meesho", name:"Meesho", emoji:"🛍️", category:"Fashion & Crafts",
    color:"#9C27B0", desc:"Sell clothing, sarees, jewellery & crafts. 10 crore+ buyers.",
    commission:"0% commission", minProduct:"Min ₹50", bestFor:"Tailoring, Handicrafts, Jewellery",
    steps:["Create Meesho seller account","Upload product photos","Set your price","Meesho handles delivery"],
    connected:false,
  },
  {
    id:"myntra", name:"Myntra", emoji:"👗", category:"Fashion",
    color:"#E91E63", desc:"Premium fashion platform. Higher prices possible for quality products.",
    commission:"25-35% commission", minProduct:"Min ₹200", bestFor:"Designer Clothes, Embroidery",
    steps:["Apply as Myntra seller","Pass quality check","List products","Myntra promotes your items"],
    connected:false,
  },
  {
    id:"ajio", name:"Ajio", emoji:"✨", category:"Ethnic Wear",
    color:"#FF5722", desc:"Great for ethnic wear, sarees, and traditional clothing.",
    commission:"20-30% commission", minProduct:"Min ₹150", bestFor:"Sarees, Blouses, Ethnic Wear",
    steps:["Apply to Ajio Seller Hub","Submit quality samples","Get onboarded","Start selling"],
    connected:false,
  },
  {
    id:"swiggy", name:"Swiggy", emoji:"🍽️", category:"Food",
    color:"#FF5733", desc:"Food delivery for home cooks. Reach customers in your city.",
    commission:"15-25% commission", minProduct:"Min ₹80", bestFor:"Home-cooked Food, Tiffin, Snacks",
    steps:["Register as home chef","Get FSSAI certificate","List your menu","Accept orders via app"],
    connected:false,
  },
  {
    id:"zomato", name:"Zomato", emoji:"🥗", category:"Food",
    color:"#E23744", desc:"India's largest food platform. Massive customer base.",
    commission:"18-30% commission", minProduct:"Min ₹60", bestFor:"Packaged Food, Pickles, Home Food",
    steps:["Apply to Zomato Hyperpure","Get food safety cert","Submit menu & photos","Go live!"],
    connected:false,
  },
  {
    id:"amazon", name:"Amazon", emoji:"📦", category:"All Products",
    color:"#FF9900", desc:"Sell anything — food, crafts, clothing. Biggest marketplace in India.",
    commission:"10-20% commission", minProduct:"Min ₹100", bestFor:"Packaged Products, All Categories",
    steps:["Register on Amazon Seller Central","Add GST number","List products","Amazon handles shipping"],
    connected:false,
  },
];

const SALES_DATA = {
  weekly: [
    { day:"Mon", sales:1240 },{ day:"Tue", sales:980 },{ day:"Wed", sales:1560 },
    { day:"Thu", sales:720 },{ day:"Fri", sales:2100 },{ day:"Sat", sales:1890 },{ day:"Sun", sales:1430 },
  ],
  products: [
    { name:"Mango Pickle", sold:23, revenue:4255, emoji:"🫙" },
    { name:"Embroidered Cushion", sold:8, revenue:4160, emoji:"🪡" },
    { name:"Handwoven Saree", sold:3, revenue:4200, emoji:"🧣" },
    { name:"Ghee 1kg", sold:12, revenue:7800, emoji:"🍯" },
  ],
  total:{ revenue:20415, orders:46, rating:4.8, growth:"+23%" },
};

const AI_ANALYSIS_RESPONSES = {
  en: {
    pricing:"💰 Pricing: Based on similar products, price this between ₹180–₹250. Your handmade quality justifies a premium!",
    packaging:"📦 Packaging: Use a clear plastic pouch with a handwritten label. Add your name and village — customers love authenticity!",
    branding:"✨ Branding: Create a simple logo using your name. 'Made with love by [Your Name], [Village]' adds great trust.",
    quality:"⭐ Quality Tip: Take photos in natural daylight. Show the product from 3 angles. A white background makes colors pop!",
    platform:"🛍️ Best Platform: This product would do well on Meesho and Amazon for wider reach. Start with local WhatsApp first!",
  },
  hi: {
    pricing:"💰 कीमत: इसी तरह के उत्पादों के आधार पर, ₹180–₹250 के बीच रखें। आपकी हस्तनिर्मित गुणवत्ता प्रीमियम की हकदार है!",
    packaging:"📦 पैकेजिंग: एक साफ पॉलीथीन पाउच में हाथ से लिखा लेबल लगाएं। नाम और गाँव लिखें — ग्राहकों को असली चीज़ पसंद है!",
    branding:"✨ ब्रांडिंग: अपने नाम से एक साधारण लोगो बनाएं। '[आपका नाम], [गाँव] द्वारा प्यार से बनाया गया' — यह विश्वास जोड़ता है।",
    quality:"⭐ गुणवत्ता: दिन की रोशनी में फोटो लें। 3 कोणों से दिखाएं। सफेद पृष्ठभूमि रंग को निखारती है!",
    platform:"🛍️ सबसे अच्छा प्लेटफ़ॉर्म: Meesho और Amazon पर अच्छी बिक्री होगी। पहले WhatsApp से शुरुआत करें!",
  },
  te: {
    pricing:"💰 ధర: ఇలాంటి ఉత్పత్తుల ఆధారంగా ₹180–₹250 మధ్య ఉంచండి. మీ చేతిపని నాణ్యత ప్రీమియంకు అర్హత పొందుతుంది!",
    packaging:"📦 ప్యాకేజింగ్: పారదర్శక పొలిథిన్ పౌచ్‌లో చేతితో రాసిన లేబుల్ వేయండి. మీ పేరు మరియు గ్రామం రాయండి — కస్టమర్లు అసలైన దాన్ని ఇష్టపడతారు!",
    branding:"✨ బ్రాండింగ్: మీ పేరుతో సరళమైన లోగో తయారు చేయండి. '[మీ పేరు], [గ్రామం] ప్రేమతో తయారుచేసింది' — ఇది నమ్మకాన్ని పెంచుతుంది.",
    quality:"⭐ నాణ్యత: సహజ పగటివెలుతురులో ఫోటో తీయండి. 3 కోణాల నుండి చూపించండి. తెల్ల నేపథ్యం రంగులను మెరిపిస్తుంది!",
    platform:"🛍️ ఉత్తమ వేదిక: Meesho మరియు Amazon లో బాగా అమ్ముడవుతుంది. ముందు WhatsApp తో ప్రారంభించండి!",
  },
};

// ═══════════════════════════════════════════════════════════════════
// SCREEN: AI PRODUCT ANALYZER
// ═══════════════════════════════════════════════════════════════════
function ProductAnalyzerScreen({ setScreen, lang }) {
  const t = TRANSLATIONS[lang];
  const [phase, setPhase] = useState("upload"); // upload | analyzing | result
  const [uploadedName, setUploadedName] = useState("");
  const resp = AI_ANALYSIS_RESPONSES[lang] || AI_ANALYSIS_RESPONSES.en;

  const simulate = () => {
    setPhase("analyzing");
    setTimeout(() => setPhase("result"), 2800);
  };

  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(135deg,${T.cream},${T.creamWarm})`, minHeight:"100vh" }}>
      <div style={{ background:`linear-gradient(135deg,${T.turmeric},${T.gold})`, padding:"18px 18px 36px", borderRadius:"0 0 32px 32px" }}>
        <button onClick={()=>setScreen("home")} style={{ background:"rgba(255,255,255,0.25)", border:"none", color:T.white, borderRadius:20, padding:"7px 16px", fontSize:13, cursor:"pointer", fontFamily:"sans-serif", marginBottom:12 }}>← {t.backToSkill}</button>
        <h2 style={{ color:T.white, margin:0, fontSize:24, fontFamily:"Georgia,serif" }}>🔍 {t.analyzeProduct}</h2>
        <p style={{ color:"rgba(255,255,255,0.88)", margin:"5px 0 0", fontSize:13, fontFamily:"sans-serif" }}>{t.analyzeSub}</p>
      </div>

      <div style={{ padding:"16px 14px" }}>
        {phase === "upload" && (
          <>
            <Card style={{ marginBottom:16 }}>
              <div onClick={simulate} style={{ border:`2.5px dashed ${T.gold}`, borderRadius:18, padding:"36px 20px", textAlign:"center", cursor:"pointer", background:`linear-gradient(135deg,${T.gold}08,${T.turmeric}06)`, transition:"all 0.2s" }}>
                <div style={{ fontSize:56, marginBottom:12 }}>📸</div>
                <p style={{ margin:0, fontSize:16, color:T.inkMid, fontFamily:"sans-serif", fontWeight:600 }}>{t.uploadForAnalysis}</p>
                <p style={{ margin:"6px 0 0", fontSize:12, color:T.inkSoft, fontFamily:"sans-serif" }}>{t.analysisTip}</p>
              </div>
              <div style={{ display:"flex", gap:10, marginTop:14 }}>
                {["📷 Camera","🖼️ Gallery","🔗 URL"].map(opt => (
                  <button key={opt} onClick={simulate} style={{ flex:1, padding:"10px 6px", borderRadius:12, border:`1.5px solid ${T.border}`, background:T.white, color:T.inkSoft, fontSize:12, fontFamily:"sans-serif", cursor:"pointer" }}>{opt}</button>
                ))}
              </div>
            </Card>
            <PrimaryBtn onClick={simulate} style={{ background:`linear-gradient(135deg,${T.turmeric},${T.gold})` }}>{t.analyzeBtn}</PrimaryBtn>
          </>
        )}

        {phase === "analyzing" && (
          <Card style={{ textAlign:"center", padding:40 }}>
            <div style={{ fontSize:64, marginBottom:20 }}>🤖</div>
            <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:16 }}>
              {[0,1,2,3,4].map(i => <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:T.turmeric, animation:`sakhibounce 1.2s ${i*0.18}s infinite` }} />)}
            </div>
            <p style={{ fontSize:16, color:T.inkMid, fontFamily:"sans-serif", fontWeight:600 }}>AI is analyzing your product...</p>
            <p style={{ fontSize:13, color:T.inkSoft, fontFamily:"sans-serif", marginTop:6 }}>Checking pricing, packaging & branding ideas</p>
          </Card>
        )}

        {phase === "result" && (
          <>
            <Card style={{ marginBottom:14, border:`2px solid ${T.gold}44`, background:`linear-gradient(135deg,${T.gold}08,${T.cream})` }}>
              <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:16 }}>
                <span style={{ fontSize:36 }}>🤖</span>
                <div>
                  <h3 style={{ margin:0, fontSize:17, color:T.inkDark, fontFamily:"Georgia,serif" }}>{t.analysisResult}</h3>
                  <p style={{ margin:"3px 0 0", fontSize:11, color:T.jade, fontFamily:"sans-serif", fontWeight:700 }}>✓ Analysis Complete</p>
                </div>
              </div>
              {Object.values(resp).map((suggestion, i) => (
                <div key={i} style={{ background:T.white, borderRadius:12, padding:"12px 14px", marginBottom:10, border:`1px solid ${T.borderSoft}`, boxShadow:`0 2px 8px ${T.shadow}` }}>
                  <p style={{ margin:0, fontSize:14, color:T.inkMid, fontFamily:"sans-serif", lineHeight:1.65 }}>{suggestion}</p>
                </div>
              ))}
            </Card>
            <PrimaryBtn onClick={()=>setScreen("addProduct")}>List This Product Now 🚀</PrimaryBtn>
            <div style={{ height:10 }} />
            <SecondaryBtn onClick={()=>setPhase("upload")}>Analyze Another Product</SecondaryBtn>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN: BUSINESS EXPANSION
// ═══════════════════════════════════════════════════════════════════
function BusinessExpansionScreen({ setScreen, lang }) {
  const t = TRANSLATIONS[lang];
  const [category, setCategory] = useState("All");
  const cats = ["All","Fashion & Crafts","Food","Fashion","Ethnic Wear"];
  const [platforms, setPlatforms] = useState(PLATFORMS);
  const [selected, setSelected] = useState(null);

  const filtered = platforms.filter(p => category==="All" || p.category===category);

  if (selected) {
    return <PlatformConnectScreen platform={selected} setScreen={setScreen} lang={lang} onBack={()=>setSelected(null)} onConnect={(id)=>{ setPlatforms(prev=>prev.map(p=>p.id===id?{...p,connected:true}:p)); setSelected(null); }} />;
  }

  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(135deg,${T.cream},${T.creamWarm})` }}>
      <div style={{ background:`linear-gradient(135deg,#1565C0,#1976D2,#42A5F5)`, padding:"18px 18px 36px", borderRadius:"0 0 32px 32px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-30, top:-30, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.08)", pointerEvents:"none" }} />
        <button onClick={()=>setScreen("home")} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:T.white, borderRadius:20, padding:"7px 16px", fontSize:13, cursor:"pointer", fontFamily:"sans-serif", marginBottom:12 }}>← {t.backToSkill}</button>
        <div style={{ fontSize:44, marginBottom:8 }}>🚀</div>
        <h2 style={{ color:T.white, margin:0, fontSize:24, fontFamily:"Georgia,serif" }}>{t.expand}</h2>
        <p style={{ color:"rgba(255,255,255,0.88)", margin:"5px 0 0", fontSize:13, fontFamily:"sans-serif" }}>{t.expandSub}</p>
        <div style={{ display:"flex", gap:16, marginTop:16 }}>
          {[{v:platforms.filter(p=>p.connected).length,l:"Connected"},{v:"10Cr+",l:"Customers"},{v:"Free",l:"Listing"}].map(s=>(
            <div key={s.l} style={{ background:"rgba(255,255,255,0.18)", borderRadius:12, padding:"10px 16px", backdropFilter:"blur(8px)" }}>
              <div style={{ fontSize:18, fontWeight:800, color:T.white, fontFamily:"sans-serif" }}>{s.v}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.8)", fontFamily:"sans-serif" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sales Dashboard link */}
      <div style={{ padding:"14px 14px 0" }}>
        <div onClick={()=>setScreen("salesDash")} style={{ background:`linear-gradient(135deg,${T.jade},${T.jadeLight})`, borderRadius:16, padding:"16px 18px", marginBottom:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <span style={{ fontSize:32 }}>📊</span>
            <div>
              <p style={{ margin:0, fontSize:15, fontWeight:700, color:T.white, fontFamily:"sans-serif" }}>{t.salesDash}</p>
              <p style={{ margin:"2px 0 0", fontSize:12, color:"rgba(255,255,255,0.82)", fontFamily:"sans-serif" }}>₹{SALES_DATA.total.revenue.toLocaleString()} total • {SALES_DATA.total.growth}</p>
            </div>
          </div>
          <span style={{ color:"rgba(255,255,255,0.8)", fontSize:20 }}>›</span>
        </div>

        {/* Category filter */}
        <div style={{ display:"flex", gap:8, overflowX:"auto", marginBottom:14, WebkitOverflowScrolling:"touch" }}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setCategory(c)} style={{ whiteSpace:"nowrap", padding:"8px 18px", borderRadius:22, border:`1.5px solid ${category===c?"#1976D2":T.border}`, background:category===c?"#1976D2":T.white, color:category===c?T.white:T.inkSoft, fontSize:12, cursor:"pointer", fontFamily:"sans-serif", fontWeight:category===c?700:400, transition:"all 0.2s" }}>{c}</button>
          ))}
        </div>

        {filtered.map(platform => (
          <Card key={platform.id} style={{ marginBottom:14, border:`1.5px solid ${platform.connected?platform.color+"55":T.borderSoft}`, background:platform.connected?platform.color+"08":T.white }}>
            <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
              <div style={{ width:52, height:52, background:platform.color+"18", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0, border:`1.5px solid ${platform.color}33` }}>{platform.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <h3 style={{ margin:0, fontSize:16, color:T.inkDark, fontFamily:"sans-serif", fontWeight:800 }}>{platform.name}</h3>
                    <span style={{ background:platform.color+"22", color:platform.color, fontSize:10, padding:"2px 8px", borderRadius:10, fontFamily:"sans-serif", fontWeight:700 }}>{platform.category}</span>
                  </div>
                  {platform.connected
                    ? <span style={{ background:T.jade+"22", color:T.jade, fontSize:11, padding:"5px 12px", borderRadius:20, fontFamily:"sans-serif", fontWeight:700, border:`1px solid ${T.jade}33` }}>{t.connected}</span>
                    : <button onClick={()=>setSelected(platform)} style={{ padding:"8px 16px", background:`linear-gradient(135deg,${platform.color},${platform.color}cc)`, color:T.white, border:"none", borderRadius:20, fontSize:12, cursor:"pointer", fontFamily:"sans-serif", fontWeight:700, boxShadow:`0 3px 10px ${platform.color}44` }}>{t.connectPlatform}</button>
                  }
                </div>
                <p style={{ margin:"8px 0 6px", fontSize:13, color:T.inkSoft, fontFamily:"sans-serif", lineHeight:1.5 }}>{platform.desc}</p>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  <span style={{ background:T.jade+"18", color:T.jade, fontSize:10, padding:"3px 10px", borderRadius:10, fontFamily:"sans-serif", fontWeight:700 }}>{platform.commission}</span>
                  <span style={{ background:T.saffron+"18", color:T.saffron, fontSize:10, padding:"3px 10px", borderRadius:10, fontFamily:"sans-serif", fontWeight:700 }}>{platform.minProduct}</span>
                </div>
                <p style={{ margin:"6px 0 0", fontSize:11, color:T.inkSoft, fontFamily:"sans-serif" }}>✅ Best for: {platform.bestFor}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN: PLATFORM CONNECTION
// ═══════════════════════════════════════════════════════════════════
function PlatformConnectScreen({ platform, setScreen, lang, onBack, onConnect }) {
  const t = TRANSLATIONS[lang];
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const handleNext = () => {
    if (step < platform.steps.length - 1) setStep(s=>s+1);
    else { setDone(true); setTimeout(()=>onConnect(platform.id), 1200); }
  };

  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(135deg,${T.cream},${T.creamWarm})`, minHeight:"100vh" }}>
      <div style={{ background:`linear-gradient(135deg,${platform.color},${platform.color}cc)`, padding:"18px 18px 36px", borderRadius:"0 0 32px 32px" }}>
        <button onClick={onBack} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:T.white, borderRadius:20, padding:"7px 16px", fontSize:13, cursor:"pointer", fontFamily:"sans-serif", marginBottom:12 }}>← Back</button>
        <div style={{ display:"flex", gap:14, alignItems:"center" }}>
          <div style={{ width:60, height:60, background:"rgba(255,255,255,0.25)", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontSize:34 }}>{platform.emoji}</div>
          <div>
            <h2 style={{ color:T.white, margin:0, fontSize:24, fontFamily:"Georgia,serif" }}>Connect to {platform.name}</h2>
            <p style={{ color:"rgba(255,255,255,0.85)", margin:"4px 0 0", fontSize:13, fontFamily:"sans-serif" }}>Follow these simple steps</p>
          </div>
        </div>
      </div>

      <div style={{ padding:"16px 14px" }}>
        {done ? (
          <Card style={{ textAlign:"center", padding:40 }}>
            <div style={{ fontSize:64, marginBottom:12 }}>🎉</div>
            <h3 style={{ fontSize:22, color:T.jade, fontFamily:"Georgia,serif", margin:"0 0 8px" }}>Connected!</h3>
            <p style={{ fontSize:15, color:T.inkMid, fontFamily:"sans-serif" }}>Your account is linked to {platform.name}. Start listing your products!</p>
          </Card>
        ) : (
          <>
            {/* Step progress */}
            <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:20 }}>
              {platform.steps.map((_,i) => (
                <div key={i} style={{ width:32, height:6, borderRadius:6, background:i<=step?platform.color:T.border, transition:"all 0.3s" }} />
              ))}
            </div>

            <Card style={{ marginBottom:16, border:`2px solid ${platform.color}44` }}>
              <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:14 }}>
                <div style={{ width:40, height:40, background:`linear-gradient(135deg,${platform.color},${platform.color}cc)`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:T.white, fontSize:18, fontWeight:800, fontFamily:"sans-serif" }}>{step+1}</div>
                <p style={{ margin:0, fontSize:16, fontWeight:700, color:T.inkDark, fontFamily:"sans-serif" }}>Step {step+1} of {platform.steps.length}</p>
              </div>
              <p style={{ margin:0, fontSize:15, color:T.inkMid, fontFamily:"sans-serif", lineHeight:1.7 }}>{platform.steps[step]}</p>
            </Card>

            {/* Form fields per step */}
            <Card style={{ marginBottom:16 }}>
              {step===0 && <>
                <label style={{ fontSize:12, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:700, textTransform:"uppercase" }}>Mobile / Email</label>
                <input placeholder="Enter your phone or email" style={{ width:"100%", padding:"13px 15px", marginTop:8, borderRadius:12, border:`1.5px solid ${T.border}`, fontSize:15, fontFamily:"sans-serif", outline:"none", background:T.cream, boxSizing:"border-box" }} />
              </>}
              {step===1 && <>
                <label style={{ fontSize:12, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:700, textTransform:"uppercase" }}>Business Name</label>
                <input placeholder="Your shop name" style={{ width:"100%", padding:"13px 15px", marginTop:8, borderRadius:12, border:`1.5px solid ${T.border}`, fontSize:15, fontFamily:"sans-serif", outline:"none", background:T.cream, boxSizing:"border-box" }} />
              </>}
              {step===2 && <>
                <label style={{ fontSize:12, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:700, textTransform:"uppercase" }}>Bank Account</label>
                <input placeholder="Account number" style={{ width:"100%", padding:"13px 15px", marginTop:8, marginBottom:10, borderRadius:12, border:`1.5px solid ${T.border}`, fontSize:15, fontFamily:"sans-serif", outline:"none", background:T.cream, boxSizing:"border-box" }} />
                <input placeholder="IFSC code" style={{ width:"100%", padding:"13px 15px", borderRadius:12, border:`1.5px solid ${T.border}`, fontSize:15, fontFamily:"sans-serif", outline:"none", background:T.cream, boxSizing:"border-box" }} />
              </>}
              {step>=3 && <div style={{ textAlign:"center", padding:16 }}>
                <div style={{ fontSize:48 }}>✅</div>
                <p style={{ margin:"10px 0 0", fontSize:15, color:T.jade, fontFamily:"sans-serif", fontWeight:700 }}>Ready to connect!</p>
              </div>}
            </Card>

            <PrimaryBtn onClick={handleNext} style={{ background:`linear-gradient(135deg,${platform.color},${platform.color}cc)` }}>
              {step < platform.steps.length-1 ? "Next Step →" : "Connect Now 🚀"}
            </PrimaryBtn>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN: SALES DASHBOARD
// ═══════════════════════════════════════════════════════════════════
function SalesDashboardScreen({ setScreen, lang }) {
  const t = TRANSLATIONS[lang];
  const [period, setPeriod] = useState("weekly");
  const maxSale = Math.max(...SALES_DATA.weekly.map(d=>d.sales));

  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(135deg,${T.cream},${T.creamWarm})` }}>
      <div style={{ background:`linear-gradient(135deg,${T.jade},${T.jadeLight})`, padding:"18px 18px 44px", borderRadius:"0 0 36px 36px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-40, bottom:-40, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,0.08)", pointerEvents:"none" }} />
        <button onClick={()=>setScreen("expand")} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:T.white, borderRadius:20, padding:"7px 16px", fontSize:13, cursor:"pointer", fontFamily:"sans-serif", marginBottom:14 }}>← {t.backToSkill}</button>
        <h2 style={{ color:T.white, margin:"0 0 4px", fontSize:24, fontFamily:"Georgia,serif" }}>📊 {t.salesDash}</h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginTop:14 }}>
          {[
            { v:`₹${(SALES_DATA.total.revenue/1000).toFixed(1)}k`, l:t.revenue, emoji:"💰" },
            { v:SALES_DATA.total.orders, l:t.ordersToday, emoji:"📦" },
            { v:`⭐ ${SALES_DATA.total.rating}`, l:"Rating", emoji:"" },
          ].map(s=>(
            <div key={s.l} style={{ background:"rgba(255,255,255,0.2)", borderRadius:14, padding:"12px 10px", backdropFilter:"blur(8px)", textAlign:"center" }}>
              <div style={{ fontSize:22, fontWeight:800, color:T.white, fontFamily:"sans-serif" }}>{s.v}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.8)", fontFamily:"sans-serif", marginTop:2 }}>{s.l}</div>
              <div style={{ fontSize:11, color:T.goldLight, fontFamily:"sans-serif" }}>{SALES_DATA.total.growth}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:"14px 14px", marginTop:-16 }}>
        {/* Chart */}
        <Card style={{ marginBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <h3 style={{ margin:0, fontSize:14, color:T.inkDark, fontFamily:"sans-serif", fontWeight:800 }}>📈 Weekly Sales (₹)</h3>
            <div style={{ display:"flex", gap:6 }}>
              {["weekly"].map(p=>(
                <button key={p} style={{ padding:"5px 12px", borderRadius:14, border:"none", background:T.jade, color:T.white, fontSize:11, cursor:"pointer", fontFamily:"sans-serif", fontWeight:700 }}>This Week</button>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:100, padding:"0 4px" }}>
            {SALES_DATA.weekly.map((d,i)=>(
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <div style={{ width:"100%", background:`linear-gradient(180deg,${T.jade},${T.jadeLight})`, borderRadius:"4px 4px 0 0", height:`${(d.sales/maxSale)*90}px`, transition:`height ${0.3+i*0.05}s ease`, minHeight:4, boxShadow:`0 2px 8px ${T.jade}44` }} />
                <span style={{ fontSize:9, color:T.inkSoft, fontFamily:"sans-serif" }}>{d.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Products */}
        <Card style={{ marginBottom:14 }}>
          <h3 style={{ margin:"0 0 14px", fontSize:14, color:T.inkDark, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.5px" }}>🏆 {t.topProduct}</h3>
          {SALES_DATA.products.map((p,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:i<SALES_DATA.products.length-1?`1px solid ${T.borderSoft}`:"none" }}>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <div style={{ width:36, height:36, background:T.creamWarm, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{p.emoji}</div>
                <div>
                  <p style={{ margin:0, fontSize:13, fontWeight:700, color:T.inkDark, fontFamily:"sans-serif" }}>{p.name}</p>
                  <p style={{ margin:"2px 0 0", fontSize:11, color:T.inkSoft, fontFamily:"sans-serif" }}>{p.sold} sold</p>
                </div>
              </div>
              <span style={{ fontSize:15, fontWeight:800, color:T.jade, fontFamily:"sans-serif" }}>₹{p.revenue.toLocaleString()}</span>
            </div>
          ))}
        </Card>

        {/* Platform breakdown */}
        <Card>
          <h3 style={{ margin:"0 0 14px", fontSize:14, color:T.inkDark, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.5px" }}>🌐 Sales by Platform</h3>
          {[{name:"SakhiRise",pct:45,color:T.saffron,v:"₹9,187"},{name:"Meesho",pct:32,color:"#9C27B0",v:"₹6,533"},{name:"WhatsApp",pct:23,color:T.jade,v:"₹4,695"}].map(p=>(
            <div key={p.name} style={{ marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                <span style={{ fontSize:13, color:T.inkMid, fontFamily:"sans-serif", fontWeight:600 }}>{p.name}</span>
                <span style={{ fontSize:13, color:p.color, fontFamily:"sans-serif", fontWeight:800 }}>{p.v}</span>
              </div>
              <div style={{ background:T.creamWarm, borderRadius:8, height:8 }}>
                <div style={{ width:`${p.pct}%`, background:`linear-gradient(90deg,${p.color},${p.color}99)`, borderRadius:8, height:"100%", transition:"width 1s" }} />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ENHANCED LEARNING HUB WITH MULTILINGUAL CONTENT
// ═══════════════════════════════════════════════════════════════════
function LearnScreen({ setScreen, lang }) {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState("courses");

  const FEATURED_LESSONS = {
    en: [
      { id:"tl1", title:"Tailoring Basics", emoji:"🧵", type:"video", duration:"8 min", lang:"English", color:T.saffron },
      { id:"tl2", title:"Cooking Business Tips", emoji:"🍳", type:"guide", duration:"5 min", lang:"English", color:T.jade },
      { id:"tl3", title:"UPI Payments Demo", emoji:"💳", type:"listen", duration:"4 min", lang:"English", color:T.turmeric },
    ],
    hi: [
      { id:"tl4", title:"सिलाई की बुनियादी बातें", emoji:"🧵", type:"video", duration:"8 मिनट", lang:"हिंदी", color:T.saffron },
      { id:"tl5", title:"खाना व्यापार की सलाह", emoji:"🍳", type:"guide", duration:"5 मिनट", lang:"हिंदी", color:T.jade },
      { id:"tl6", title:"UPI पेमेंट का तरीका", emoji:"💳", type:"listen", duration:"4 मिनट", lang:"हिंदी", color:T.turmeric },
    ],
    te: [
      { id:"tl7", title:"కుట్టుపని ప్రాథమికాలు", emoji:"🧵", type:"video", duration:"8 నిమి", lang:"తెలుగు", color:T.saffron },
      { id:"tl8", title:"వంట వ్యాపార చిట్కాలు", emoji:"🍳", type:"guide", duration:"5 నిమి", lang:"తెలుగు", color:T.jade },
      { id:"tl9", title:"UPI చెల్లింపు డెమో", emoji:"💳", type:"listen", duration:"4 నిమి", lang:"తెలుగు", color:T.turmeric },
    ],
  };

  const lessons = FEATURED_LESSONS[lang] || FEATURED_LESSONS.en;
  const typeIcon = { video:"▶️", guide:"📖", listen:"🎧" };
  const typeLabel = {
    en:{ video:t.watchLesson, guide:t.readGuide, listen:t.listenLesson },
    hi:{ video:"वीडियो देखें", guide:"पढ़ें", listen:"सुनें" },
    te:{ video:"చూడండి", guide:"చదవండి", listen:"వినండి" },
  }[lang]||{ video:t.watchLesson, guide:t.readGuide, listen:t.listenLesson };

  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(135deg,${T.cream},${T.creamWarm})` }}>
      <div style={{ background:`linear-gradient(135deg,${T.turmeric},${T.gold})`, padding:"18px 18px 32px", borderRadius:"0 0 32px 32px" }}>
        <h2 style={{ color:T.white, margin:0, fontSize:24, fontFamily:"Georgia,serif" }}>📚 {t.learningHub}</h2>
        <p style={{ color:"rgba(255,255,255,0.88)", margin:"5px 0 0", fontSize:14, fontFamily:"sans-serif" }}>{t.learnSub}</p>
        {/* Language badge */}
        <div style={{ display:"inline-flex", gap:8, alignItems:"center", background:"rgba(255,255,255,0.2)", borderRadius:20, padding:"6px 14px", marginTop:10, border:"1px solid rgba(255,255,255,0.3)" }}>
          <span style={{ fontSize:14 }}>🌐</span>
          <span style={{ color:T.white, fontSize:12, fontFamily:"sans-serif", fontWeight:700 }}>{t.learnInLang}: {lang==="hi"?"हिंदी":lang==="te"?"తెలుగు":"English"}</span>
        </div>
      </div>

      <div style={{ padding:"14px 14px" }}>
        {/* Tabs */}
        <div style={{ display:"flex", background:T.white, borderRadius:14, padding:4, marginBottom:16, border:`1px solid ${T.border}` }}>
          {[{ id:"courses", label:{en:"Courses",hi:"कोर्स",te:"కోర్సులు"}[lang]||"Courses" },{ id:"lessons", label:{en:"Quick Lessons",hi:"त्वरित पाठ",te:"త్వరిత పాఠాలు"}[lang]||"Quick Lessons" }].map(tab=>(
            <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{ flex:1, padding:"10px", borderRadius:12, border:"none", background:activeTab===tab.id?`linear-gradient(135deg,${T.turmeric},${T.gold})`:T.white, color:activeTab===tab.id?T.white:T.inkSoft, fontFamily:"sans-serif", fontSize:13, fontWeight:700, cursor:"pointer", transition:"all 0.2s" }}>{tab.label}</button>
          ))}
        </div>

        {activeTab==="lessons" && (
          <>
            <div style={{ background:`linear-gradient(135deg,${T.jade}15,${T.jadeLight}10)`, borderRadius:16, padding:"12px 14px", marginBottom:14, border:`1px solid ${T.jade}33` }}>
              <p style={{ margin:0, fontSize:13, color:T.jade, fontFamily:"sans-serif", fontWeight:700 }}>🌐 {t.learnInLang}</p>
              <p style={{ margin:"4px 0 0", fontSize:12, color:T.inkSoft, fontFamily:"sans-serif" }}>All lessons are in {lang==="hi"?"Hindi (हिंदी)":lang==="te"?"Telugu (తెలుగు)":"English"}. Change in settings.</p>
            </div>
            {lessons.map(lesson=>(
              <Card key={lesson.id} style={{ marginBottom:12, cursor:"pointer" }}>
                <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                  <div style={{ width:52, height:52, background:lesson.color+"20", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 }}>{lesson.emoji}</div>
                  <div style={{ flex:1 }}>
                    <h3 style={{ margin:"0 0 4px", fontSize:15, color:T.inkDark, fontFamily:"sans-serif", fontWeight:700 }}>{lesson.title}</h3>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      <span style={{ fontSize:11, color:T.inkSoft, fontFamily:"sans-serif" }}>⏱ {lesson.duration}</span>
                      <span style={{ background:lesson.color+"20", color:lesson.color, fontSize:10, padding:"2px 8px", borderRadius:10, fontFamily:"sans-serif", fontWeight:700 }}>{lesson.lang}</span>
                    </div>
                  </div>
                  <button style={{ padding:"8px 14px", background:`linear-gradient(135deg,${lesson.color},${lesson.color}cc)`, color:T.white, border:"none", borderRadius:12, cursor:"pointer", fontFamily:"sans-serif", fontSize:12, fontWeight:700 }}>
                    {typeIcon[lesson.type]} {typeLabel[lesson.type]}
                  </button>
                </div>
              </Card>
            ))}
          </>
        )}

        {activeTab==="courses" && COURSES.map(c => {
          const pct = Math.round((c.done/c.modules)*100);
          const done = pct===100;
          return (
            <div key={c.id} onClick={()=>setScreen("course_"+c.id)} style={{ background:T.white, borderRadius:20, padding:18, marginBottom:14, boxShadow:`0 3px 14px ${T.shadow}`, border:`1.5px solid ${done?c.color+"44":T.borderSoft}`, cursor:"pointer" }}>
              <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                <div style={{ width:56, height:56, background:c.color+"20", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, flexShrink:0 }}>{c.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <h3 style={{ margin:0, fontSize:15, color:T.inkDark, fontFamily:"sans-serif", fontWeight:700, lineHeight:1.3 }}>{c.title}</h3>
                    {done && <span style={{ fontSize:20 }}>🏆</span>}
                  </div>
                  <div style={{ display:"flex", gap:8, alignItems:"center", margin:"3px 0 8px" }}>
                    <span style={{ fontSize:11, color:T.inkSoft, fontFamily:"sans-serif" }}>{c.modules} modules • {c.time}</span>
                    <span style={{ background:T.saffron+"18", color:T.saffron, fontSize:10, padding:"2px 8px", borderRadius:10, fontFamily:"sans-serif", fontWeight:700 }}>🌐 {lang==="hi"?"हिंदी":lang==="te"?"తెలుగు":"English"}</span>
                  </div>
                  <div style={{ background:T.creamWarm, borderRadius:10, height:7 }}>
                    <div style={{ width:`${pct}%`, background:`linear-gradient(90deg,${c.color},${c.color}99)`, borderRadius:10, height:"100%", transition:"width 0.8s" }} />
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
                    <span style={{ fontSize:10, color:T.inkSoft, fontFamily:"sans-serif" }}>{c.done}/{c.modules} {t.completed}</span>
                    <span style={{ fontSize:11, color:c.color, fontFamily:"sans-serif", fontWeight:700 }}>{pct}%</span>
                  </div>
                </div>
              </div>
              {done
                ? <div style={{ background:c.color+"18", border:`1px solid ${c.color}33`, borderRadius:12, padding:"10px 14px", marginTop:14, display:"flex", gap:10, alignItems:"center" }}>
                    <span style={{ fontSize:22 }}>{c.badgeEmoji}</span>
                    <span style={{ fontSize:13, color:c.color, fontFamily:"sans-serif", fontWeight:700 }}>{t.badgeEarned} {c.badge}</span>
                  </div>
                : <button style={{ marginTop:14, padding:"10px 20px", background:`linear-gradient(135deg,${c.color},${c.color}cc)`, color:T.white, border:"none", borderRadius:12, cursor:"pointer", fontFamily:"sans-serif", fontSize:13, fontWeight:700, boxShadow:`0 4px 14px ${c.color}44` }}>
                    {c.done>0?t.continueCourse+" →":t.startCourse+" →"}
                  </button>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ENHANCED COURSE VIEWER WITH LOCALIZED CONTENT
// ═══════════════════════════════════════════════════════════════════
function CourseViewerScreen({ setScreen, courseId, lang }) {
  const t = TRANSLATIONS[lang];
  const course = COURSES.find(c=>c.id===courseId)||COURSES[0];
  const [moduleIdx, setModuleIdx] = useState(Math.max(0, course.done));
  const [speaking, setSpeaking] = useState(false);

  // Get localized content if available
  const localContent = COURSE_CONTENT[courseId]?.[lang] || COURSE_CONTENT[courseId]?.en;
  const genericModules = [
    { title:"Introduction", content:"Welcome to this course! In this module, you will learn the basics of what we will cover.", tip:"Every big journey begins with a single step." },
    { title:"Core Concepts", content:"Now let's dive into the main ideas. Take your time — there is no rush. Learning happens step by step.", tip:"Understanding the why makes the how easier." },
    { title:"Practical Examples", content:"Here are real examples from women who have used these skills to build successful small businesses.", tip:"Real stories inspire real action." },
    { title:"Your Action Plan", content:"Time to create your own plan! Follow these steps and you will be ready to take action.", tip:"A plan written down is 10x more likely to happen." },
    { title:"Final Assessment", content:"Let's review what you've learned! Answer these simple questions to complete the course and earn your badge.", tip:"Reflection is the key to retention." },
  ].slice(0, course.modules);

  const modules = localContent || genericModules;

  const speakContent = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(modules[moduleIdx].content);
    utt.lang = { en:"en-IN", hi:"hi-IN", te:"te-IN" }[lang] || "en-IN";
    utt.rate = 0.9; utt.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices();
    const v = voices.find(v=>v.lang.startsWith(utt.lang.split("-")[0]));
    if (v) utt.voice = v;
    utt.onstart = ()=>setSpeaking(true);
    utt.onend = ()=>setSpeaking(false);
    window.speechSynthesis.speak(utt);
  };

  const stopSpeak = () => { window.speechSynthesis.cancel(); setSpeaking(false); };

  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(135deg,${T.cream},${T.creamWarm})` }}>
      <div style={{ background:`linear-gradient(135deg,${course.color},${course.color}cc)`, padding:"18px 18px 32px", borderRadius:"0 0 28px 28px" }}>
        <BackBtn onClick={()=>setScreen("learn")} label={t.backToSkill} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginTop:12 }}>
          <div>
            <h2 style={{ color:T.white, margin:"0 0 4px", fontSize:22, fontFamily:"Georgia,serif" }}>{course.emoji} {course.title}</h2>
            <p style={{ color:"rgba(255,255,255,0.85)", margin:0, fontSize:13, fontFamily:"sans-serif" }}>Module {moduleIdx+1} of {course.modules} • {course.time}</p>
          </div>
          <span style={{ background:"rgba(255,255,255,0.25)", borderRadius:12, padding:"5px 12px", color:T.white, fontSize:11, fontFamily:"sans-serif", fontWeight:700 }}>🌐 {lang==="hi"?"हिंदी":lang==="te"?"తెలుగు":"English"}</span>
        </div>
      </div>

      <div style={{ padding:"16px 14px" }}>
        <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:18 }}>
          {modules.map((_,i) => <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:i<=moduleIdx?course.color:T.border, transition:"all 0.3s" }} />)}
        </div>

        <Card style={{ marginBottom:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
            <h3 style={{ margin:0, fontSize:18, color:T.inkDark, fontFamily:"Georgia,serif", flex:1 }}>{modules[moduleIdx]?.title}</h3>
            <button onClick={speaking?stopSpeak:speakContent} style={{ padding:"8px 14px", background:speaking?T.rose+22:`linear-gradient(135deg,${course.color},${course.color}cc)`, color:T.white, border:"none", borderRadius:12, cursor:"pointer", fontSize:12, fontFamily:"sans-serif", fontWeight:700, flexShrink:0, marginLeft:10, boxShadow:`0 3px 10px ${course.color}44` }}>
              {speaking ? "⏹ Stop" : "🔊 Listen"}
            </button>
          </div>
          <p style={{ fontSize:15, color:T.inkMid, fontFamily:"sans-serif", lineHeight:1.8 }}>{modules[moduleIdx]?.content}</p>
          {modules[moduleIdx]?.tip && (
            <div style={{ background:`linear-gradient(135deg,${course.color}15,${course.color}08)`, borderRadius:14, padding:14, marginTop:16, border:`1px solid ${course.color}33` }}>
              <p style={{ margin:0, fontSize:13, color:T.inkSoft, fontFamily:"sans-serif" }}>💡 <strong>Key Takeaway:</strong> {modules[moduleIdx].tip}</p>
            </div>
          )}
        </Card>

        <div style={{ display:"flex", gap:10 }}>
          {moduleIdx>0 && <SecondaryBtn onClick={()=>setModuleIdx(i=>i-1)} style={{ flex:1 }}>← Previous</SecondaryBtn>}
          {moduleIdx < modules.length-1
            ? <PrimaryBtn onClick={()=>{ stopSpeak(); setModuleIdx(i=>i+1); }} style={{ flex:1 }}>Next Module →</PrimaryBtn>
            : <PrimaryBtn onClick={()=>setScreen("achievements")} style={{ flex:1, background:`linear-gradient(135deg,${T.gold},${T.saffron})` }}>Complete & Earn {course.badgeEmoji}</PrimaryBtn>
          }
        </div>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// ENHANCED HOME SCREEN — adds Expand + Analyzer quick actions
// ═══════════════════════════════════════════════════════════════════
function HomeScreenEnhanced({ setScreen, user, lang }) {
  const t = TRANSLATIONS[lang];
  const tips = TIPS[lang] || TIPS.en;
  const tip = tips[Math.floor(Date.now()/86400000) % tips.length];
  const pct = 68;

  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(180deg, ${T.cream} 0%, ${T.creamWarm}50 100%)` }}>
      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${T.saffron},${T.terracotta})`, padding:"18px 20px 48px", borderRadius:"0 0 40px 40px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-20, right:-20, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.08)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-30, left:-30, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", position:"relative" }}>
          <div>
            <p style={{ color:"rgba(255,255,255,0.82)", margin:0, fontSize:13, fontFamily:"sans-serif" }}>{t.goodMorning} 🌅</p>
            <h2 style={{ color:T.white, margin:"4px 0 2px", fontSize:24, fontFamily:"Georgia,serif" }}>{t.namaste}, {user?.name?.split(" ")[0]||"Sakhi"} 🙏</h2>
            <p style={{ color:"rgba(255,255,255,0.75)", margin:0, fontSize:12, fontFamily:"sans-serif" }}>📍 {user?.location||"India"}</p>
          </div>
          <button onClick={()=>setScreen("profile")} style={{ background:"rgba(255,255,255,0.22)", border:"2.5px solid rgba(255,255,255,0.45)", borderRadius:"50%", width:50, height:50, fontSize:24, cursor:"pointer", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center" }}>👤</button>
        </div>
        <div style={{ background:"rgba(255,255,255,0.18)", borderRadius:16, padding:"14px 18px", marginTop:18, backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.28)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ color:T.white, fontSize:13, fontFamily:"sans-serif", fontWeight:600 }}>⭐ {t.journeyProgress}</span>
            <span style={{ color:T.white, fontSize:13, fontFamily:"sans-serif", fontWeight:800 }}>{pct}%</span>
          </div>
          <div style={{ background:"rgba(255,255,255,0.3)", borderRadius:10, height:8 }}>
            <div style={{ width:`${pct}%`, background:"linear-gradient(90deg,#fff,#FFD580)", borderRadius:10, height:"100%", transition:"width 1.2s ease" }} />
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:10 }}>
            <span style={{ color:"rgba(255,255,255,0.9)", fontSize:12, fontFamily:"sans-serif" }}>🏆 {user?.points||450} {t.points}</span>
            <span style={{ color:"rgba(255,255,255,0.9)", fontSize:12, fontFamily:"sans-serif" }}>🎖️ {user?.badges||3} {t.badges}</span>
          </div>
        </div>
      </div>

      <div style={{ padding:"12px 16px 0", marginTop:-18, position:"relative" }}>
        {/* Quick Actions — 6 tiles */}
        <Card style={{ marginBottom:14 }}>
          <h3 style={{ margin:"0 0 14px", fontSize:14, color:T.inkDark, fontFamily:"sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.5px" }}>{t.quickActions}</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
            {[
              { emoji:"🤖", label:t.askSakhi,      screen:"sakhi",    color:T.saffron },
              { emoji:"💡", label:t.businessIdeas,  screen:"skill",    color:T.jade },
              { emoji:"🛍️", label:t.exploreMarket,  screen:"market",   color:T.rose },
              { emoji:"📚", label:t.learn,           screen:"learn",    color:T.turmeric },
              { emoji:"🚀", label:t.expand,          screen:"expand",   color:"#1976D2" },
              { emoji:"🔍", label:t.analyzeProduct,  screen:"analyzer", color:T.turmeric },
            ].map(a => (
              <button key={a.screen} onClick={()=>setScreen(a.screen)} style={{ background:a.color+"18", borderRadius:16, padding:"14px 4px", border:`1.5px solid ${a.color}30`, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:5, transition:"all 0.2s" }}>
                <span style={{ fontSize:26 }}>{a.emoji}</span>
                <span style={{ fontSize:10, fontFamily:"sans-serif", color:a.color, fontWeight:700, textAlign:"center", lineHeight:1.2 }}>{a.label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* AI Sakhi Banner */}
        <div onClick={()=>setScreen("sakhi")} style={{ background:`linear-gradient(135deg,${T.earth},${T.clay})`, borderRadius:20, padding:"18px 20px", marginBottom:14, cursor:"pointer", display:"flex", alignItems:"center", gap:16, boxShadow:`0 6px 24px ${T.earth}44`, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", right:-20, top:-20, width:100, height:100, background:"rgba(255,255,255,0.06)", borderRadius:"50%" }} />
          <div style={{ fontSize:50, lineHeight:1 }}>🤖</div>
          <div>
            <h3 style={{ color:T.white, margin:0, fontSize:17, fontFamily:"Georgia,serif" }}>AI Sakhi is here! 🌸</h3>
            <p style={{ color:"rgba(255,255,255,0.82)", margin:"5px 0 0", fontSize:13, fontFamily:"sans-serif" }}>Tap to speak or type — in any language →</p>
          </div>
        </div>

        {/* Daily Tip */}
        <Card style={{ marginBottom:14, background:`linear-gradient(135deg,${T.jade}18,${T.jadeLight}10)`, border:`1.5px solid ${T.jade}33` }}>
          <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
            <span style={{ fontSize:26 }}>💡</span>
            <div>
              <p style={{ margin:0, fontSize:11, color:T.jade, fontFamily:"sans-serif", fontWeight:800, letterSpacing:"0.8px", textTransform:"uppercase" }}>{t.todayTip}</p>
              <p style={{ margin:"5px 0 0", fontSize:14, color:T.inkMid, fontFamily:"sans-serif", lineHeight:1.6 }}>{tip}</p>
            </div>
          </div>
        </Card>

        {/* Expand business promo */}
        <div onClick={()=>setScreen("expand")} style={{ background:"linear-gradient(135deg,#1565C0,#1976D2)", borderRadius:18, padding:"16px 18px", marginBottom:14, cursor:"pointer", display:"flex", alignItems:"center", gap:14, boxShadow:"0 6px 20px #1976D244" }}>
          <span style={{ fontSize:40 }}>🚀</span>
          <div>
            <h3 style={{ color:T.white, margin:0, fontSize:15, fontFamily:"sans-serif", fontWeight:700 }}>{t.expand}</h3>
            <p style={{ color:"rgba(255,255,255,0.82)", margin:"4px 0 0", fontSize:12, fontFamily:"sans-serif" }}>Meesho • Myntra • Swiggy • Zomato →</p>
          </div>
        </div>

        {/* Marketplace Preview */}
        <h3 style={{ margin:"0 0 10px", fontSize:14, color:T.inkDark, fontFamily:"sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.5px" }}>🛍️ {t.marketplace}</h3>
        <div style={{ display:"flex", gap:12, overflowX:"auto", paddingBottom:6, WebkitOverflowScrolling:"touch" }}>
          {PRODUCTS.slice(0,5).map(p => (
            <div key={p.id} onClick={()=>setScreen("market")} style={{ minWidth:130, background:T.white, borderRadius:18, padding:14, boxShadow:`0 3px 14px ${T.shadow}`, cursor:"pointer", border:`1.5px solid ${T.borderSoft}`, flexShrink:0 }}>
              <div style={{ fontSize:40, textAlign:"center", background:T.cream, borderRadius:12, padding:"10px 0", marginBottom:10 }}>{p.emoji}</div>
              <p style={{ margin:0, fontSize:12, fontWeight:700, color:T.inkDark, fontFamily:"sans-serif", lineHeight:1.3 }}>{p.name}</p>
              <p style={{ margin:"5px 0 0", fontSize:15, color:T.saffron, fontFamily:"sans-serif", fontWeight:800 }}>₹{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 21: SETTINGS
// ═══════════════════════════════════════════════════════════════════
function SettingsScreen({ setScreen, lang, setLang, wakeEnabled, setWakeEnabled, autoSpeak, setAutoSpeak }) {
  const t = TRANSLATIONS[lang];
  const [showLangPicker, setShowLangPicker] = useState(false);
  const langOpts = [
    { code:"en", label:"English", native:"English", emoji:"🇮🇳" },
    { code:"hi", label:"Hindi", native:"हिंदी", emoji:"🙏" },
    { code:"te", label:"Telugu", native:"తెలుగు", emoji:"🌺" },
  ];

  const SettingRow = ({ emoji, title, subtitle, action, right }) => (
    <div onClick={action} style={{ display:"flex", alignItems:"center", gap:14, padding:"15px 0", borderBottom:`1px solid ${T.borderSoft}`, cursor:action?"pointer":"default" }}>
      <div style={{ width:42, height:42, background:T.creamWarm, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{emoji}</div>
      <div style={{ flex:1 }}>
        <p style={{ margin:0, fontSize:14, fontWeight:700, color:T.inkDark, fontFamily:"sans-serif" }}>{title}</p>
        {subtitle && <p style={{ margin:"2px 0 0", fontSize:11, color:T.inkSoft, fontFamily:"sans-serif" }}>{subtitle}</p>}
      </div>
      {right || (action && <span style={{ color:T.inkSoft, fontSize:18, fontFamily:"sans-serif" }}>›</span>)}
    </div>
  );

  const Toggle = ({ on, onToggle }) => (
    <div onClick={onToggle} style={{ width:46, height:26, borderRadius:13, background:on?T.jade:T.border, cursor:"pointer", position:"relative", transition:"background 0.3s", flexShrink:0 }}>
      <div style={{ position:"absolute", width:22, height:22, borderRadius:"50%", background:T.white, top:2, left:on?22:2, transition:"left 0.3s", boxShadow:"0 2px 6px rgba(0,0,0,0.2)" }} />
    </div>
  );

  return (
    <div style={{ paddingBottom:90, background:`linear-gradient(135deg,${T.cream},${T.creamWarm})`, minHeight:"100vh" }}>
      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${T.earth},${T.clay})`, padding:"18px 18px 36px", borderRadius:"0 0 32px 32px" }}>
        <button onClick={()=>setScreen("profile")} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:T.white, borderRadius:20, padding:"7px 16px", fontSize:13, cursor:"pointer", fontFamily:"sans-serif", marginBottom:14 }}>← Back</button>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ fontSize:44 }}>⚙️</div>
          <div>
            <h2 style={{ color:T.white, margin:0, fontSize:26, fontFamily:"Georgia,serif" }}>{t.settings}</h2>
            <p style={{ color:"rgba(255,255,255,0.8)", margin:"4px 0 0", fontSize:13, fontFamily:"sans-serif" }}>Customize your SakhiRise experience</p>
          </div>
        </div>
      </div>

      <div style={{ padding:"16px 14px" }}>
        {/* Language */}
        <Card style={{ marginBottom:14 }}>
          <h3 style={{ margin:"0 0 4px", fontSize:12, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.6px" }}>🌐 Language / भाषा / భాష</h3>
          <SettingRow emoji="🌐" title={t.language} subtitle={lang==="en"?"English":lang==="hi"?"हिंदी":"తెలుగు"} action={()=>setShowLangPicker(p=>!p)} />
          {showLangPicker && (
            <div style={{ background:T.creamWarm, borderRadius:14, padding:8, marginTop:4 }}>
              {langOpts.map(opt => (
                <button key={opt.code} onClick={()=>{ setLang(opt.code); setShowLangPicker(false); }} style={{ width:"100%", display:"flex", alignItems:"center", gap:14, padding:"12px 14px", borderRadius:12, border:"none", background:lang===opt.code?T.saffron+"20":"transparent", cursor:"pointer", marginBottom:2 }}>
                  <span style={{ fontSize:24 }}>{opt.emoji}</span>
                  <div style={{ textAlign:"left" }}>
                    <p style={{ margin:0, fontSize:15, fontWeight:700, color:lang===opt.code?T.saffron:T.inkDark, fontFamily:"sans-serif" }}>{opt.native}</p>
                    <p style={{ margin:0, fontSize:11, color:T.inkSoft, fontFamily:"sans-serif" }}>{opt.label}</p>
                  </div>
                  {lang===opt.code && <span style={{ marginLeft:"auto", color:T.saffron, fontWeight:800, fontSize:16 }}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </Card>

        {/* Voice Settings */}
        <Card style={{ marginBottom:14 }}>
          <h3 style={{ margin:"0 0 4px", fontSize:12, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.6px" }}>🎙️ Voice Assistant</h3>
          <SettingRow emoji="🎙️" title='"Hey Sakhi" Wake Word' subtitle={wakeEnabled?"Always listening for your voice command":"Wake word detection off"} right={<Toggle on={wakeEnabled} onToggle={()=>setWakeEnabled(p=>!p)} />} />
          <SettingRow emoji="🔊" title="Auto-Speak Replies" subtitle={autoSpeak?"AI Sakhi reads her answers aloud":"Text-only mode"} right={<Toggle on={autoSpeak} onToggle={()=>setAutoSpeak(p=>!p)} />} />
          <SettingRow emoji="🤖" title="Voice Mode" subtitle='Open dedicated voice screen' action={()=>setScreen("voiceAssistant")} />
        </Card>

        {/* App Info */}
        <Card style={{ marginBottom:14 }}>
          <h3 style={{ margin:"0 0 4px", fontSize:12, color:T.inkSoft, fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.6px" }}>📱 App</h3>
          <SettingRow emoji="🏆" title="My Achievements" subtitle="View badges & rewards" action={()=>setScreen("achievements")} />
          <SettingRow emoji="⭐" title="Reward Points" subtitle="Check your points balance" action={()=>setScreen("rewards")} />
          <SettingRow emoji="🚀" title="Business Expansion" subtitle="Connect to Meesho, Swiggy & more" action={()=>setScreen("expand")} />
          <SettingRow emoji="📊" title="Sales Dashboard" subtitle="View your sales & revenue" action={()=>setScreen("salesDash")} />
        </Card>

        {/* Technical Stack Card */}
        <Card style={{ marginBottom:14, background:`linear-gradient(135deg,${T.inkDark},#2A1505)`, border:"none" }}>
          <h3 style={{ margin:"0 0 14px", fontSize:12, color:"rgba(255,255,255,0.5)", fontFamily:"sans-serif", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.6px" }}>🔧 Tech Stack (Hackathon MVP)</h3>
          {[
            ["🤖","AI","Claude claude-sonnet-4 API"],
            ["🎙️","Voice","Web Speech API (STT + TTS)"],
            ["🌐","Wake Word","Continuous SpeechRecognition"],
            ["📱","Frontend","React (deployable as PWA)"],
            ["🔥","Backend","Node.js + Firebase"],
            ["💳","Payments","Razorpay UPI"],
            ["🌍","Languages","EN / HI / TE auto-detect"],
          ].map(([e,k,v])=>(
            <div key={k} style={{ display:"flex", gap:10, marginBottom:8, alignItems:"center" }}>
              <span style={{ fontSize:16 }}>{e}</span>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.45)", fontFamily:"sans-serif", fontWeight:700, width:70, flexShrink:0 }}>{k}:</span>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.8)", fontFamily:"sans-serif" }}>{v}</span>
            </div>
          ))}
        </Card>

        {/* Sign out */}
        <button onClick={()=>setScreen("welcome")} style={{ width:"100%", padding:"15px", background:"transparent", border:`2px solid ${T.rose}55`, borderRadius:14, color:T.rose, fontFamily:"sans-serif", fontSize:15, cursor:"pointer", fontWeight:700 }}>
          🚪 {t.signOut}
        </button>
        <p style={{ textAlign:"center", fontSize:11, color:T.inkSoft, fontFamily:"sans-serif", marginTop:14 }}>SakhiRise v3.0 • Built with ❤️ for rural women entrepreneurs</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN APP — 21 screens + global wake-word detection
// ═══════════════════════════════════════════════════════════════════
export default function App() {
  const [screen,  setScreen]  = useState("welcome");
  const [lang,    setLang]    = useState("en");
  const [user,    setUser]    = useState(null);
  const [results, setResults] = useState(null);
  const [wakeQuery, setWakeQuery] = useState("");
  const [wakeEnabledState, setWakeEnabledState] = useState(true);
  const [autoSpeakState,   setAutoSpeakState]   = useState(true);

  // ── Global wake-word: active on every screen except onboarding ──
  const onboardingScreens = ["welcome","langSelect","login","profileSetup"];
  const wakeEnabled = wakeEnabledState && !onboardingScreens.includes(screen);

  const [globalToastVisible, setGlobalToastVisible] = useState(false);
  const [globalToastQuery,   setGlobalToastQuery]   = useState("");

  const handleGlobalWake = useCallback((query) => {
    setGlobalToastVisible(true);
    setGlobalToastQuery(query);
    setTimeout(() => setGlobalToastVisible(false), 3500);
    setWakeQuery(query);
    // Navigate to the dedicated voice screen
    setScreen("voiceAssistant");
  }, []);

  const { wakeListening: globalWakeListening, wakeDetected } = useWakeWord({
    enabled: wakeEnabled,
    lang,
    onWake: handleGlobalWake,
  });

  const mainTabs  = ["home","sakhi","voiceAssistant","market","learn","community"];
  const showNav   = mainTabs.includes(screen);
  const navigate  = useCallback((s) => setScreen(s), []);

  const renderScreen = () => {
    // ── Onboarding ──────────────────────────────────────────
    if (screen==="welcome")        return <WelcomeScreen      setScreen={navigate} lang={lang} />;
    if (screen==="langSelect")     return <LangSelectScreen   setScreen={navigate} lang={lang} setLang={setLang} />;
    if (screen==="login")          return <LoginScreen        setScreen={navigate} lang={lang} />;
    if (screen==="profileSetup")   return <ProfileSetupScreen setScreen={navigate} lang={lang} setUser={setUser} />;

    // ── Main tabs ───────────────────────────────────────────
    if (screen==="home")           return <HomeScreenEnhanced setScreen={navigate} user={user} lang={lang} />;
    if (screen==="sakhi")          return <AISakhiScreen      lang={lang} setLang={setLang} />;
    if (screen==="voiceAssistant") return <VoiceAssistantScreen lang={lang} setLang={setLang} setScreen={navigate} onWakeQuery={wakeQuery} />;
    if (screen==="market")         return <MarketplaceScreen  setScreen={navigate} lang={lang} />;
    if (screen==="learn")          return <LearnScreen        setScreen={navigate} lang={lang} />;
    if (screen==="community")      return <CommunityScreen    lang={lang} />;

    // ── Skill & Business ────────────────────────────────────
    if (screen==="skill")          return <SkillInputScreen   setScreen={navigate} setResults={setResults} lang={lang} />;
    if (screen==="results")        return <ResultsScreen      setScreen={navigate} results={results} lang={lang} />;

    // ── Marketplace ─────────────────────────────────────────
    if (screen==="addProduct")     return <AddProductScreen   setScreen={navigate} lang={lang} />;
    if (screen==="analyzer")       return <ProductAnalyzerScreen setScreen={navigate} lang={lang} />;

    // ── Business Expansion ───────────────────────────────────
    if (screen==="expand")         return <BusinessExpansionScreen setScreen={navigate} lang={lang} />;
    if (screen==="salesDash")      return <SalesDashboardScreen    setScreen={navigate} lang={lang} />;

    // ── Gamification & Profile ───────────────────────────────
    if (screen==="achievements")   return <AchievementsScreen  lang={lang} />;
    if (screen==="rewards")        return <RewardPointsScreen  user={user} lang={lang} />;
    if (screen==="profile")        return <ProfileScreen       setScreen={navigate} user={user} lang={lang} setLang={setLang} />;
    if (screen==="settings")       return <SettingsScreen      setScreen={navigate} lang={lang} setLang={setLang} wakeEnabled={wakeEnabledState} setWakeEnabled={setWakeEnabledState} autoSpeak={autoSpeakState} setAutoSpeak={setAutoSpeakState} />;

    // ── Dynamic routes ───────────────────────────────────────
    if (screen.startsWith("product_")) return <ProductDetailScreen  setScreen={navigate} productId={parseInt(screen.split("_")[1])} lang={lang} />;
    if (screen.startsWith("course_"))  return <CourseViewerScreen   setScreen={navigate} courseId={parseInt(screen.split("_")[1])}  lang={lang} />;

    return <HomeScreenEnhanced setScreen={navigate} user={user} lang={lang} />;
  };

  return (
    <div style={{ fontFamily:"Georgia,'Noto Serif',serif", background:T.creamWarm, minHeight:"100vh", maxWidth:430, margin:"0 auto", position:"relative", boxShadow:"0 0 80px rgba(0,0,0,0.18)", overflow:"hidden" }}>
      <StatusBar />

      {/* ── Global Wake-Word Toast (shows on any screen) ── */}
      <WakeWordToast visible={globalToastVisible} lang={lang} query={globalToastQuery} />

      {/* ── Global "Hey Sakhi" mic indicator pill ── */}
      {wakeEnabled && globalWakeListening && screen!=="voiceAssistant" && (
        <div onClick={()=>setScreen("voiceAssistant")} style={{
          position:"absolute", bottom:80, right:14, zIndex:300,
          background:`linear-gradient(135deg,${T.earth},${T.clay})`,
          borderRadius:30, padding:"8px 14px 8px 10px",
          display:"flex", alignItems:"center", gap:8,
          boxShadow:`0 6px 20px rgba(0,0,0,0.4)`, cursor:"pointer",
          border:"1.5px solid rgba(255,255,255,0.18)",
        }}>
          <div style={{ width:28, height:28, background:`linear-gradient(135deg,${T.saffron},${T.gold})`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>🎙️</div>
          <div>
            <p style={{ margin:0, fontSize:10, color:"rgba(255,255,255,0.65)", fontFamily:"sans-serif" }}>
              {lang==="hi"?'"हे सखी" बोलें':lang==="te"?'"హేయ్ సఖి" అను':'Say "Hey Sakhi"'}
            </p>
            <div style={{ display:"flex", gap:3, marginTop:2 }}>
              {[1,2,3,4].map(i => <div key={i} style={{ width:2.5, height:4+i%3*3, background:`rgba(244,162,40,0.7)`, borderRadius:2, animation:`sakhibounce 1.2s ${i*0.2}s infinite` }} />)}
            </div>
          </div>
        </div>
      )}

      <div style={{ height:"calc(100vh - 22px)", overflowY:"auto", WebkitOverflowScrolling:"touch", scrollBehavior:"smooth" }}>
        {renderScreen()}
      </div>

      {showNav && (
        <BottomNav
          active={screen}
          setScreen={(s) => { setWakeQuery(""); navigate(s); }}
          lang={lang}
          extraTab={{ id:"voiceAssistant", emoji:"🎙️", label:{en:"Voice",hi:"वॉइस",te:"వాయిస్"}[lang]||"Voice" }}
        />
      )}
      <style>{`@keyframes sakhibounce{0%,80%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-6px) scale(1.2)}}`}</style>
    </div>
  );
}
