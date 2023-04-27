import CONFIG from "../config/config.js"
const Assets = {
  //----------------------------------Default Placeholders----------------------------------
  defaultPlaceholders: {
    userProfile: {
      img: require('./images/userDefaultIcon.png').default,
      alt: "pickzon_user"
    },
    pageNotFound: {
      img: require('./images/404.svg').default,
      alt: "pickzon_404_page_not_found"
    },
    comingSoon: {
      img: require('./images/comingSoon.svg').default,
      alt: "pickzon_coming_soon"
    },
    noData: {
      img: require('./images/noData.svg').default,
      alt: "pickzon_no_data_found"
    },
    landscape: {
      img: require('./images/pickzon_landscape_placeholder.jpg').default,
      alt: "pickzon_banner_default"
    },
    portrait: {
      img: require('./images/pickzon_portrait_placeholder.jpg').default,
      alt: "pickzon_image_default"
    },
    appInstallQR: {
      img: require('./images/qrPickzon.jpg').default,
      alt: "downlaod_pickzon_app"
    },
    waterMarkSq: {
      img: require('./images/pickzonWaterMark.svg').default,
      alt: "pickzon"
    },
    favicon: {
      img: require('./images/pickzonBlueLogo.png').default,
      alt: "pickzon"
    },
    headerLogo: {
      img: require('./images/header-logo.png').default,
      alt: "pickzon logo"
    },
    footerLogo: {
      img: require('./images/footer-logo.png').default,
      alt: "pickzon logo"
    },
    tradeMark: {
      img: require('./images/trademark_logo.png').default,
      alt: "pickzon logo"
    }
  },
  //----------------------------------Blog Page----------------------------------
  blog: {
    blogBanner: {
      img: `${CONFIG.cdnUrl}blogs/in/pickzon_hero_blog.jpg`,
      alt: "pickzon blog hero banner"
    }
  },
  //----------------------------------Pop-up Page----------------------------------
  popUp: {
    onlyMobilePopUp: {
      img: `${CONFIG.cdnUrl}pop-up/in/pickzon_pop-up.jpg`,
      alt: "pickzon download"
    },
  },
  //----------------------------------Feature Page----------------------------------
  // features: {
  //   topBanner: {
  //     img: `${CONFIG.cdnUrl}features/in/pickzon-hero-banner.png`,
  //     alt: "One Click. Many Features."
  //   },
  //   middleLeft: {
  //     img: `${CONFIG.cdnUrl}features/in/pickzon-connet-friends.png`,
  //     alt: "Connect without limits with your loved ones!"
  //   },
  //   middleRight: {
  //     img: `${CONFIG.cdnUrl}features/in/pickzon-smart-seller.png`,
  //     alt: "pickzon smart seller"
  //   },
  //   bottomRight: {
  //     img: `${CONFIG.cdnUrl}features/in/pickzon-business-banner.png`,
  //     alt: "pickzon business banner"
  //   },
  //   particleOrange: {
  //     img: `${CONFIG.cdnUrl}features/in/pickzon-particle-orange.png`,
  //     alt: "pickzon particle orange"
  //   },
  //   particleBlue: {
  //     img: `${CONFIG.cdnUrl}features/in/pickzon-particle-blue.png`,
  //     alt: "pickzon particle blue"
  //   },
  //   particleYellow: {
  //     img: `${CONFIG.cdnUrl}features/in/pickzon-particle-yellow.png`,
  //     alt: "pickzon particle yellow"
  //   },
  //   particleArrow: {
  //     img: `${CONFIG.cdnUrl}features/in/pickzon-arrow.jpg`,
  //     alt: "pickzon arrow"
  //   },
  // },
  //----------------------------------About Page----------------------------------
  about: {
    leftArea: {
      img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-entertainment.png`,
      alt: "Pickzon People have joined us"
    },
    middleLeft: {
      img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-middle.jpg`,
      alt: "About Us"
    },
    middleRight: {
      img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-discover.png`,
      alt: "Pickzon Discover More"
    },
    users: [
      {
        img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-face_1.png`,
        alt: "Pickzon Participants face 1"
      },
      {
        img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-face_2.png`,
        alt: "Pickzon Participants face 2"
      },
      {
        img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-face_3.png`,
        alt: "Pickzon Participants face 3"
      },
      {
        img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-face_4.png`,
        alt: "Pickzon Participants face 4"
      },
      {
        img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-face_5.png`,
        alt: "Pickzon Participants face 5"
      },
    ],
    sectionBg: {
      img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-make_us_pickzon.png`,
      alt: "What makes us PickZoner's"
    },
    teamWork1: {
      img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-teamwork.png`,
      alt: "About-Us-Teamwork"
    },
    teamWork4: {
      img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus_creativity.png`,
      alt: "About- Us-Succeed"
    },
    teamWork2: {
      img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-fulfiling_environment.png`,
      alt: "About-Us-Fulfilling Environment"
    },
    teamWork3: {
      img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-employee_growth.png`,
      alt: "About-Us-Fun Environment"
    },
    leftInput: {
      img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-make_us_pickzon_particles.png`,
      alt: "pickzon Fantastic posts"
    },
    assignEarning: {
      img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-assign_earning.png`,
      alt: "Pickzon Fantastic posts are always the first choice"
    },
    backgroundRight: {
      img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-trendy_collection_particles_1.png`,
      alt: "aboutus-trendy_collection_particles_1"
    },
    backgroundLeft: {
      img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-trendy_collection_particles_2.png`,
      alt: "pickzon-aboutus-trendy_collection_particles_2"
    },
    trendyCollection: {
      img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-trendy_collection.png`,
      alt: "pickzon aboutus trendy collection"
    },
    aboutClip: {
      img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-clips.png`,
      alt: "Pickzon Create Clips"
    },
    aboutClipLastBg: {
      img: `${CONFIG.cdnUrl}about/in/pickzon-aboutus-particles.png`,
      alt: "Bring out your hidden talent on Pickzon"
    }
  },
  //----------------------------------Clip Page----------------------------------
  clip: {
    secBg: {
      img: `${CONFIG.cdnUrl}clip-content/in/pickzon-hero-banner-particle_1.png`,
      alt: "pickzon-hero-banner-particle_1"
    },
    googlePayNormal: {
      img: `${CONFIG.cdnUrl}clip-content/in/pickzon-android-hero-btn.png`,
      alt: "pickzon android app"
    },
    appStoreNormal: {
      img: `${CONFIG.cdnUrl}clip-content/in/pickzon-ios-hero-btn.png`,
      alt: "pickzon ios app"
    },
    rightSlider: {
      img: `${CONFIG.cdnUrl}clip-content/in/pickzon-hero.png`,
      alt: "Show your Talent to the world!"
    },
    sectionbg2: {
      img: `${CONFIG.cdnUrl}clip-content/in/pickzon-hero-banner-particle_2.png`,
      alt: "pickzon hero banner particle 3"
    },
    section1: {
      img: `${CONFIG.cdnUrl}clip-content/in/pickzon-reach-engagement_face_1.png`,
      alt: "pickzon More Reach & More Engagement 1"
    },
    section2: {
      img: `${CONFIG.cdnUrl}clip-content/in/pickzon-reach-engagement_face_2.png`,
      alt: "pickzon More Reach & More Engagement 2"
    },
    section3: {
      img: `${CONFIG.cdnUrl}clip-content/in/pickzon-reach-engagement_face_3.png`,
      alt: "pickzon More Reach & More Engagement 3"
    },
    section4: {
      img: `${CONFIG.cdnUrl}clip-content/in/pickzon-reach-engagement.png`,
      alt: "pickzon More Reach & More Engagement Rington"
    },
    googlePayBlack: {
      img: `${CONFIG.cdnUrl}clip-content/in/pickzon-android-btn.png`,
      alt: "pickzon android app 2"
    },
    appStoreBlack: {
      img: `${CONFIG.cdnUrl}clip-content/in/pickzon-ios-btn.png`,
      alt: "pickzon ios app 2"
    },
    section5StarBg: {
      img: `${CONFIG.cdnUrl}clip-content/in/pickzon-creators.png`,
      alt: "pickzon Connect with your favorite creators"
    },
    createClips: {
      img: `${CONFIG.cdnUrl}clip-content/in/pickzon-create-clip.png`,
      alt: "pickzon create clip"
    },
    Audios: {
      img: `${CONFIG.cdnUrl}clip-content/in/pickzon-add-different-songs.png`,
      alt: "pickzon add different songs"
    },
    SaveShare: {
      img: `${CONFIG.cdnUrl}clip-content/in/pickzon-save-&-share.png`,
      alt: "pickzon Save your favorite or the clips"
    },

    slider: [
      {
        img: `${CONFIG.cdnUrl}clip-content/in/pickzon-clip_1.png`,
        alt: "clip-content pickzon-clip_1"
      },
      {
        img: `${CONFIG.cdnUrl}clip-content/in/pickzon-clip_2.png`,
        alt: "clip-content/in/pickzon-clip_2"
      },
      {
        img: `${CONFIG.cdnUrl}clip-content/in/pickzon-clip_3.png`,
        alt: "clip-content pickzon-clip_3"
      },
      {
        img: `${CONFIG.cdnUrl}clip-content/in/pickzon-clip_14.png`,
        alt: "clip-content pickzon-clip_4"
      },
      {
        img: `${CONFIG.cdnUrl}clip-content/in/pickzon-clip_5.png`,
        alt: "clip-content pickzon-clip_5"
      },
      {
        img: `${CONFIG.cdnUrl}clip-content/in/pickzon-clip_6.png`,
        alt: "clip-content pickzon-clip_6"
      },
    ]
  },
  //----------------------------------Home Page----------------------------------
  // home: {
  //   appStore1: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-ios-label.png`,
  //     alt: "pickzon-ios-label"
  //   },
  //   appStore2: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-android-label.png`,
  //     alt: "pickzon-android-label"
  //   },
  //   appStoreRight: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-hero-banner.png`,
  //     alt: "Best Social Media App"
  //   },
  //   slide1: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-clip-user_1.png`,
  //     alt: "pickzon-clip-user_1"
  //   },
  //   slide2: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-clip-user_2.png`,
  //     alt: "pickzon-clip-user_2"
  //   },
  //   slide3: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-clip-user_3.png`,
  //     alt: "pickzon-clip-user_3"
  //   },
  //   slide4: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-clip-user_4.png`,
  //     alt: "pickzon-clip-user_4"
  //   },
  //   slide5: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-clip-user_5.png`,
  //     alt: "pickzon-clip-user_5"
  //   },
  //   socialTopLeft: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-social-media-app.png`,
  //     alt: "pickzon Know the Absolute Worth!"
  //   },
  //   productMall1: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-mall-product_1.jpg`,
  //     alt: "pickzon Women’s Fashion Kit"
  //   },
  //   productMall2: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-mall-product_2.jpg`,
  //     alt: "pickzon Women’s Purse"
  //   },
  //   productMall3: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-mall-product_3.jpg`,
  //     alt: "pickzon Women’s Bodylotion"
  //   },
  //   productMall4: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-mall-product_4.jpg`,
  //     alt: "pickzon Unisex sneaker"
  //   },
  //   cardUser1: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-feed-user-profile_1.jpg`,
  //     alt: "pickzon-feed-user-profile_1"
  //   },
  //   card1: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-feed-post_1.jpg`,
  //     alt: "pickzon-feed-post_1"
  //   },
  //   cardUser2: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-feed-user-profile_2.jpg`,
  //     alt: "pickzon-feed-user-profile_2"
  //   },
  //   card2: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-feed-post_2.jpg`,
  //     alt: "pickzon-feed-post_2"
  //   },
  //   cardUser3: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-feed-user-profile_3.jpg`,
  //     alt: "pickzon-feed-user-profile_3"
  //   },
  //   card3: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-feed-post_3.jpg`,
  //     alt: "pickzon-feed-post_3"
  //   },
  //   cardUser4: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-feed-user-profile_4.jpg`,
  //     alt: "pickzon-feed-user-profile_4"
  //   },
  //   card4: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-feed-post_4.jpg`,
  //     alt: "pickzon-feed-post_4"
  //   },
  //   saveYourTime: {
  //     img: `${CONFIG.cdnUrl}home/in/pickzon-social-media-app-facts.jpg`,
  //     alt: "Create Memories"
  //   },
  // },
  // --------------------------------- Feeds Page -------------------------
  feeds: {
    rightTopBg: {
      img: `${CONFIG.cdnUrl}feed-content/in/pickzon-particle-hero.png`,
      alt: "Make Endless Contacts on Social Media! background"
    },
    sectionRight: {
      img: `${CONFIG.cdnUrl}feed-content/in/pickzon-hero-banner.png`,
      alt: "Make Endless Contacts on Social Media! banner"
    },
    sectionLeft: {
      img: `${CONFIG.cdnUrl}feed-content/in/pickzon-best-social-media-app.png`,
      alt: "Pickzon is the best short video maker app"
    },
    rightFeed1: {
      img: `${CONFIG.cdnUrl}feed-content/in/pickzon-smile-emoji.png`,
      alt: "pickzon Social Media Engagement Share Interests"
    },
    rightFeed2: {
      img: `${CONFIG.cdnUrl}feed-content/in/pickzon-fillers-emoji.png`,
      alt: "Social Media Engagement Commendations"
    },
    rightFeed3: {
      img: `${CONFIG.cdnUrl}feed-content/in/pickzon-hand-emoji.png`,
      alt: "Tag People Social Media Engagement"
    },
    options: [
      {
        img: `${CONFIG.cdnUrl}feed-content/in/pickzon-clip-icon-blue.png`,
        imgWhite: `${CONFIG.cdnUrl}feed-content/in/pickzon-clip-icon-white.png`,
        alt: "Clip Fun & Beneficial Factors",
        text: "Clip"
      },
      {
        img: `${CONFIG.cdnUrl}feed-content/in/pickzon-feed-icon-blue.png`,
        imgWhite: `${CONFIG.cdnUrl}feed-content/in/pickzon-feed-icon-white.png`,
        alt: "Feed Fun & Beneficial Factors",
        text: "Feed"
      },
      {
        img: `${CONFIG.cdnUrl}feed-content/in/pickzon-entertaiment-icon-blue.png`,
        imgWhite: `${CONFIG.cdnUrl}feed-content/in/pickzon-entertaiment-icon-white.png`,
        alt: "ENTERTAINMENT Fun & Beneficial Factors",
        text: "ENTERTAINMENT"
      },
      {
        img: `${CONFIG.cdnUrl}feed-content/in/pickzon-interact-icon-blue.png`,
        imgWhite: `${CONFIG.cdnUrl}feed-content/in/pickzon-interact-icon-white.png`,
        alt: "Interact Fun & Beneficial Factors",
        text: "Interact"
      },
      {
        img: `${CONFIG.cdnUrl}feed-content/in/pickzon-explore-icon-blue.png`,
        imgWhite: `${CONFIG.cdnUrl}feed-content/in/pickzon-explore-icon-white.png`,
        alt: "Explore Fun & Beneficial Factors",
        text: "Explore"
      },
      {
        img: `${CONFIG.cdnUrl}feed-content/in/pickzon-shopping-icon-blue.png`,
        imgWhite: `${CONFIG.cdnUrl}feed-content/in/pickzon-shopping-icon-white.png`,
        alt: "Shopping Fun & Beneficial Factors",
        text: "Shopping"
      },
      {
        img: `${CONFIG.cdnUrl}feed-content/in/pickzon-promote-icon-blue.png`,
        imgWhite: `${CONFIG.cdnUrl}feed-content/in/pickzon-promote-icon-white.png`,
        alt: "Promote Fun & Beneficial Factors",
        text: "Promote"
      },
      {
        img: `${CONFIG.cdnUrl}feed-content/in/pickzon-marketplace-icon-blue.png`,
        imgWhite: `${CONFIG.cdnUrl}feed-content/in/pickzon-marketplace-icon-white.png`,
        alt: "MARKETPLACE Fun & Beneficial Factors",
        text: "MARKETPLACE"
      },
      {
        img: `${CONFIG.cdnUrl}feed-content/in/pickzon-retail-icon-blue.png`,
        imgWhite: `${CONFIG.cdnUrl}feed-content/in/pickzon-retail-icon-retail.png`,
        alt: "Retail Fun & Beneficial Factors",
        text: "Retail"
      },
      {
        img: `${CONFIG.cdnUrl}feed-content/in/pickzon-traffic-icon-blue.png`,
        imgWhite: `${CONFIG.cdnUrl}feed-content/in/pickzon-traffic-icon-white.png`,
        alt: "Traffic Fun & Beneficial Factors",
        text: "Traffic"
      },
    ],
    bestShortRight: {
      img: `${CONFIG.cdnUrl}feed-content/in/pickzon-best-short-video-making-app.png`,
      alt: "Best Short Video Making App"
    }
  },
  // --------------------------------- Security Page -------------------------
  security: {
    right1: {
      img: `${CONFIG.cdnUrl}security/in/pickzon-hero-banner.png`,
      alt: "pickzon Secure your data with powerful access"
    },
    topLeft1: {
      img: `${CONFIG.cdnUrl}security/in/pickzon-community-safety.png`,
      alt: "pickzon Community Safety"
    },
    topRight1: {
      img: `${CONFIG.cdnUrl}security/in/pickzon-profile-page.png`,
      alt: "pickzon Community Safety 2"
    },
    chatingArea: {
      img: `${CONFIG.cdnUrl}security/in/pickzon-blue-circle.svg`,
      alt: "Users Satisfaction is Our Priority 1"
    },
    reachTop: {
      img: `${CONFIG.cdnUrl}security/in/pickzon-worldwide-reach.png`,
      alt: "Users Satisfaction is Our Priority 2"
    },
    reachLeft: {
      img: `${CONFIG.cdnUrl}security/in/pickzon-reach-us.png`,
      alt: "Users Satisfaction is Our Priority 3"
    },
    reachRight: {
      img: `${CONFIG.cdnUrl}security/in/pickzon-customer-satisfaction.png`,
      alt: "Users Satisfaction is Our Priority 4"
    },
    secure: {
      img: `${CONFIG.cdnUrl}security/in/pickzon-secure-user-authentication.png`,
      alt: "pickzon secure user authentication"
    },
    safeguard: {
      img: `${CONFIG.cdnUrl}security/in/pickzon-user-data-shield-icon.png`,
      alt: "pickzon Safeguard user sessions"
    },
    encyp: {
      img: `${CONFIG.cdnUrl}security/in/pickzon-data-encyp-icon.png`,
      alt: "pickzon Data Encryption"
    },
    encryption: {
      img: `${CONFIG.cdnUrl}security/in/pickzon-user-talk.png`,
      alt: "pickzon user talk Group"
    },
    backgroundcircles: {
      img: `${CONFIG.cdnUrl}security/in/pickzon-background-circles.png`,
      alt: "pickzon background circles"
    },
    saferbg: {
      img: `${CONFIG.cdnUrl}security/in/pickzon-orange-circle.svg`,
      alt: "pickzon background circles orange"
    },
    yellowCircle: {
      img: `${CONFIG.cdnUrl}security/in/pickzon-yellow-circle.svg`,
      alt: "pickzon background circles yellow"
    },
    spinnyCircle: {
      img: `${CONFIG.cdnUrl}security/in/pickzon_spinny-circles.png`,
      alt: "pickzon background circles ring line",
    },
    spinny_user_1: {
      img: `${CONFIG.cdnUrl}security/in/pickzon_user_1.png`,
      alt: "pickzon ring user 1",
    },
    spinny_user_2: {
      img: `${CONFIG.cdnUrl}security/in/pickzon_user_2.png`,
      alt: "pickzon ring user 2",
    },
    spinny_user_3: {
      img: `${CONFIG.cdnUrl}security/in/pickzon_user_3.png`,
      alt: "pickzon ring user 3",
    },
    spinny_user_4: {
      img: `${CONFIG.cdnUrl}security/in/pickzon_user_4.png`,
      alt: "pickzon ring user 4",
    },
    spinny_user_5: {
      img: `${CONFIG.cdnUrl}security/in/pickzon_user_5.png`,
      alt: "pickzon ring user 5",
    },
    spinny_user_6: {
      img: `${CONFIG.cdnUrl}security/in/pickzon_user_6.png`,
      alt: "pickzon ring user 6",
    },
    spinny_user_7: {
      img: `${CONFIG.cdnUrl}security/in/pickzon_user_7.png`,
      alt: "pickzon ring user 7",
    }
  },
  // --------------------------------- Mall Page -------------------------
  mall: {
    mallrightside: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-mall-purchase.png`,
      alt: "Every purchase will be made with pleasure"
    },
    leftUpper: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-seller.png`,
      alt: "pickzon seller"
    },
    sceptical01: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-product-analysis.png`,
      alt: "pickzon product analysis"
    },
    sceptical02: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-mall.png`,
      alt: "pickzon mall product"
    },
    sceptiCal03: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-posted-product.png`,
      alt: "pickzon posted product"
    },
    modern1: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-modern-furniture.jpg`,
      alt: "pickzon modern furniture"
    },
    modern2: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-ratings.jpg`,
      alt: "Pickzon Ratings"
    },
    card0: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-women-icon.png`,
      alt: "pickzon women user"
    },
    sofaDesignGroup: [
      {
        img: `${CONFIG.cdnUrl}mall-content/in/pickzon-sofa-yellow.png`,
        alt: "pickzon Retro Sofa",
      },
      {
        img: `${CONFIG.cdnUrl}mall-content/in/pickzon-sofa-blue.png`,
        alt: "pickzon Roman Sofa"
      },
      {
        img: `${CONFIG.cdnUrl}mall-content/in/pickzon-sofa-beige.png`,
        alt: "pickzon-sofa-beige",
      },
    ],

    newCollection1: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-moisturizing-cream.jpg`,
      alt: "pickzon Moisturizing Cream"
    },
    newCollection2: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-conditioner.jpg`,
      alt: "pickzon shield conditioner"
    },
    newCollection3: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-new-collection.jpg`,
      alt: "pickzon new collection"
    },
    user1: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-customer_1.png`,
      alt: "pickzon customer 1"
    },
    user2: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-customer_2.png`,
      alt: "pickzon customer 2"
    },
    user3: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-customer_3.png`,
      alt: "pickzon customer 3"
    },
    Fantasy1: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-rayban.png`,
      alt: "pickzon dress fantastic rayban"
    },
    Fantasy2: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-horbour.png`,
      alt: "pickzon dress fantastic horbour"
    },
    Fantasy3: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-victoria.png`,
      alt: "pickzon dress fantastic victoria"
    },
    Fantasy4: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-zara.png`,
      alt: "pickzon dress fantastic zara"
    },

    boots: [
      {
        img: `${CONFIG.cdnUrl}mall-content/in/pickzon-boot-pink.png`,
        alt: "pickzon boot pink"
      },
      {
        img: `${CONFIG.cdnUrl}mall-content/in/pickzon-boot-brown.png`,
        alt: "pickzon boot brown"
      },
      {
        img: `${CONFIG.cdnUrl}mall-content/in/pickzon-boot-green.png`,
        alt: "pickzon boot green"
      }
    ],

    newCollection4: {
      img: `${CONFIG.cdnUrl}mall-content/in/pickzon-flower.png`,
      alt: "pickzon flower"
    },

    skinCare: [
      {
        img: `${CONFIG.cdnUrl}mall-content/in/pickzon-cosmetic-moisturizer.png`,
        alt: "pickzon cosmetic moisturizer"
      },
      {
        img: `${CONFIG.cdnUrl}mall-content/in/pickzon-cosmetic-skin-care.png`,
        alt: "pickzon cosmetic skin care"
      },
      {
        img: `${CONFIG.cdnUrl}mall-content/in/pickzon-nature-oil.png`,
        alt: "pickzon nature oil"
      },
      {
        img: `${CONFIG.cdnUrl}mall-content/in/pickzon-cosmetic-skin-care.png`,
        alt: "pickzon cosmetic skin care"
      },
    ],
    Sofa: [
      {
        img: `${CONFIG.cdnUrl}mall-content/in/pickzon-armchair.jpg`,
        alt: "pickzon nomad armchair"
      },
      {
        img: `${CONFIG.cdnUrl}mall-content/in/pickzon-chair.jpg`,
        alt: "pickzon Velvet Armchair"
      },
      {
        img: `${CONFIG.cdnUrl}mall-content/in/pickzon-wooden-lamp.jpg`,
        alt: "pickzon wooden bright lamp"
      },
      {
        img: `${CONFIG.cdnUrl}mall-content/in/pickzon-sofa.jpg`,
        alt: "pickzon nomad armchair"
      },
    ]
  },
  // --------------------------------- Footer Page -------------------------
  footer: {
    footerLogoPickzon: {
      img: `${CONFIG.cdnUrl}home/in/pickZon-icon.png`,
      alt: "pickZon-icon"
    },
    facebook: {
      img: `${CONFIG.cdnUrl}home/in/pickzon-facebook-icon.png`,
      alt: "pickzon-facebook-icon"
    },
    youtube: {
      img: `${CONFIG.cdnUrl}home/in/pickzon-youtube-icon.png`,
      alt: "pickzon-youtube-icon"
    },
    insta: {
      img: `${CONFIG.cdnUrl}home/in/pickzon-instagram-icon.png`,
      alt: "pickzon-instagram-icon"
    },
    linkdin: {
      img: `${CONFIG.cdnUrl}home/in/pickzon-linkedin-icon.png`,
      alt: "pickzon-linkedin-icon"
    },
  },
  // --------------------------------- Earn-money Page -------------------------
  EarnMoney: {
    referRight: {
      img: `${CONFIG.cdnUrl}earn-money/in/pickzon_refer_&_earn.png`,
      alt: "best short video app to earn money"
    },
    bgfirst: {
      img: `${CONFIG.cdnUrl}earn-money/in/pickzon_grey.png`,
      alt: "pickzon_grey"
    },
    bgsec: {
      img: `${CONFIG.cdnUrl}earn-money/in/pickzon_yellow.png`,
      alt: "pickzon_yellow"
    },
    bgthird: {
      img: `${CONFIG.cdnUrl}earn-money/in/pickzon_blue.png`,
      alt: "pickzon_blue"
    },
    friend1: {
      img: `${CONFIG.cdnUrl}earn-money/in/pickzon_receiver.png`,
      alt: "pickzon_receiver"
    },
    friend2: {
      img: `${CONFIG.cdnUrl}earn-money/in/pickzon_sender.png`,
      alt: "pickzon_sender"
    },
    friend3: {
      img: `${CONFIG.cdnUrl}earn-money/in/pickzon_money.png`,
      alt: "pickzon_money"
    },
    lastbg: {
      img: `${CONFIG.cdnUrl}earn-money/in/pickzon_bg.png`,
      alt: "pickzon_bg"
    },
    sectionleft: {
      img: `${CONFIG.cdnUrl}earn-money/in/pickzon_earn_money.png`,
      alt: "pickzon_earn_money"
    },
    centerImage: {
      img: `${CONFIG.cdnUrl}earn-money/in/pickzon_refer_&_win.png`,
      alt: "pickzon_refer_&_win"
    },
    sectionright: {
      img: `${CONFIG.cdnUrl}earn-money/in/pickzon_refer_money.png`,
      alt: "pickzon_refer_money"
    },
  },
  // --------------------------------- Login Page -------------------------
  Login: {
    loginBg: {
      img: `${CONFIG.cdnUrl}login/in/pickzon_login_bg.png`,
      alt: "pickzon_login_bg"
    },
    loginDevice: {
      img: `${CONFIG.cdnUrl}login/in/pickzon_QR.png`,
      alt: "pickzon_QR"
    },
    loginReloadQR: {
      img: `${CONFIG.cdnUrl}login/in/pickzon_reload_QR.jpg`,
      alt: "pickzon_reload_QR"
    }
  },
  // --------------------------------- Why-pickzon Page -------------------------
  whyPickzon: {
    topBg: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_hero_banner.png`,
      alt: "new short video apps"
    },
    userList1: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_person_smile.png`,
      alt: "pickzon_person_smile"
    },
    userList2: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_wow_user.png`,
      alt: "pickzon_wow_user"
    },
    userList3: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_blink_girl.png`,
      alt: "pickzon_blink_girl"
    },
    pickzonGirl: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_girl.png`,
      alt: "pickzon_girl"
    },
    EarnMoney: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_earn_money_by_refer.png`,
      alt: "pickzon_earn_money_by_refer"
    },
    VerifiedUser: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_verified.png`,
      alt: "pickzon_verified"
    },
    TrustworthySeller: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_trustworthy_seller.png`,
      alt: "pickzon_trustworthy_seller"
    },
    PromoteBusiness: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_promote_your_business.png`,
      alt: "pickzon_promote_your_business"
    },
    photosvideos: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_post_photo_video.png`,
      alt: "pickzon_post_photo_video"
    },
    CreateClip: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_create_clip.png`,
      alt: "pickzon_create_clip"
    },
    left1: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_photo_post.png`,
      alt: "pickzon_photo_post"
    },
    left2: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_surprise.png`,
      alt: "pickzon_surprise"
    },
    left3: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_story_icon.png`,
      alt: "pickzon_logo"
    },
    right1: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_logo.png`,
      alt: "pickzon_logo"
    },
    right2: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_person.png`,
      alt: "pickzon_person"
    },
    right3: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_videos.png`,
      alt: "pickzon_videos"
    },
    lastleft1: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/pickzon_man_with_table.jpg`,
      alt: "pickzon_man_with_table"
    },
    chat: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/Chat.png`,
      alt: "pickzon_Chat"
    },
    signup: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/Signup.png`,
      alt: "pickzon_Signup"
    },
    feed_Icon: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/feed_icon.png`,
      alt: "pickzon_feed_icon"
    },
    Profile_Icon: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/Profile_Icon.png`,
      alt: "pickzon_Profile_Icon"
    },
    Group_pages: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/Group_pages.png`,
      alt: "pickzon_Group_pages"
    },
    connection: {
      img: `${CONFIG.cdnUrl}why-pickzon/in/connection_icon.png`,
      alt: "pickzon_connection_icon"
    },

  },
  // --------------------------------- FAQ Page -------------------------
  faq: {
    topright1: {
      img: `${CONFIG.cdnUrl}faq/in/pickzon_hero_background.png`,
      alt: "pickzon_hero_background"
    },
    service1: {
      img: `${CONFIG.cdnUrl}faq/in/pickzon_no_middle_man.png`,
      alt: "pickzon_no_middle_man"
    },
    service2: {
      img: `${CONFIG.cdnUrl}faq/in/pickzon_business_promotion.png`,
      alt: "pickzon_business_promotion"
    },
    service3: {
      img: `${CONFIG.cdnUrl}faq/in/pickzon_earn_money.png`,
      alt: "pickzon_earn_money"
    },
    iconc: {
      img: `${CONFIG.cdnUrl}faq/in/pickzon_c.png`,
      alt: "pickzon_c"
    },
    iconbg: {
      img: `${CONFIG.cdnUrl}faq/in/pickzon_background.png`,
      alt: "pickzon_background"
    },
    pickzondownload: {
      img: `${CONFIG.cdnUrl}faq/in/pickzon_login_qr_code.jpg`,
      alt: "pickzon_login_qr_code"
    },
  }
};
export default Assets;