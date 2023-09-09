// export interface Token {
//     tokenGUID: string;
//     type: string;
//     href?: string;
//     hrefMobile?: string;
//     id?: string;
//     teamId?: string;
//     position?: string;
//     name?: string;
//     seoName?: string;
// }

// export interface Contributor {
//     contributors: Contributor2[];
//     source: string;
// }

// export interface Contributor2 {
//     name: string;
//     twitter: string;
// }

// export interface KeywordsDisplay {
//     type: string;
//     value: string;
//     displayName: string;
// }

// export interface KeywordsAll {
//     type: string;
//     value: string;
//     displayName: string;
// }

// export interface PrimaryKeyword {
//     type: string;
//     value: string;
//     displayName: string;
// }


// export interface Resolution {
//     aspectRatio: string;
//     width: number;
//     height: number;
//     src: string;
//     at2x: string;
//     at3x: string;
// }

// export interface Game {
//     copyright: string;
//     link: string;
//     editorial: Editorial;


//     [tokenGUID: string]: Token;
    

//     contributor: Contributor;
//     contributor2: Contributor2;
//     keywordsDisplay: KeywordsDisplay;
//     keywordsAll: KeywordsAll;
//     primaryKeyword: PrimaryKeyword;

//     Resolution: Resolutions // array of these?
    

    
// // got to here in making json response a typed object

//     export interface Image {
//         title: string;
//         altText: string;
//         cuts: Cuts;
//     }

//     export interface Media {
//         type: string;
//         image: Image;
//     }

//     export interface Item {
//         type: string;
//         state: string;
//         date: Date;
//         id: string;
//         headline: string;
//         subhead: string;
//         seoTitle: string;
//         seoDescription: string;
//         seoKeywords: string;
//         slug: string;
//         commenting: boolean;
//         tagline: string;
//         tokenData: TokenData;
//         contributor: Contributor;
//         keywordsDisplay: KeywordsDisplay[];
//         keywordsAll: KeywordsAll[];
//         approval: string;
//         url: string;
//         dataURI: string;
//         primaryKeyword: PrimaryKeyword;
//         shareImage: string;
//         media: Media;
//         preview: string;
//     }

//     export interface Preview {
//         title: string;
//         topicList: string;
//         items: Item[];
//     }

//     export interface Articles {
//         title: string;
//         topicList: string;
//         items: any[];
//     }

//     export interface TokenA00B97EEEF76F5C729B8E {
//         tokenGUID: string;
//         type: string;
//         id: string;
//         teamId: string;
//         position: string;
//         name: string;
//         seoName: string;
//     }

//     export interface Tag {
//         @type: string;
//         @value: any;
//         @displayName: any;
//     }

//     export interface 1136x6403 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 1024x5763 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 960x5403 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 768x4323 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 640x3603 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 568x3203 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 372x2103 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 320x1803 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 248x1403 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 124x703 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface Cuts2 {
//         1136x640: 1136x6403;
//         1024x576: 1024x5763;
//         960x540: 960x5403;
//         768x432: 768x4323;
//         640x360: 640x3603;
//         568x320: 568x3203;
//         372x210: 372x2103;
//         320x180: 320x1803;
//         248x140: 248x1403;
//         124x70: 124x703;
//     }

//     export interface Image2 {
//         cuts: Cuts2;
//     }

//     export interface MediaURLS {
//         FLASH_192K_320X180: string;
//         FLASH_450K_384x216: string;
//         FLASH_1200K_640X360: string;
//         FLASH_1800K_896x504: string;
//         HTTP_CLOUD_MOBILE: string;
//         HTTP_CLOUD_TABLET: string;
//         HTTP_CLOUD_TABLET_60: string;
//         HTTP_CLOUD_WIRED: string;
//         HTTP_CLOUD_WIRED_60: string;
//         HTTP_CLOUD_WIRED_WEB: string;
//     }

//     export interface TokenA277B56ED189551EF278F {
//         tokenGUID: string;
//         type: string;
//         videoId: string;
//         href: string;
//         tags: Tag[];
//         date: Date;
//         headline: string;
//         duration: string;
//         blurb: string;
//         bigBlurb: string;
//         mediaPlaybackId: string;
//         image: Image2;
//         mediaURLS: MediaURLS;
//     }

//     export interface Tag2 {
//         @type: string;
//         @value: any;
//         @displayName: any;
//     }

//     export interface 1136x6404 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 1024x5764 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 960x5404 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 768x4324 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 640x3604 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 568x3204 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 372x2104 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 320x1804 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 248x1404 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 124x704 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface Cuts3 {
//         1136x640: 1136x6404;
//         1024x576: 1024x5764;
//         960x540: 960x5404;
//         768x432: 768x4324;
//         640x360: 640x3604;
//         568x320: 568x3204;
//         372x210: 372x2104;
//         320x180: 320x1804;
//         248x140: 248x1404;
//         124x70: 124x704;
//     }

//     export interface Image3 {
//         cuts: Cuts3;
//     }

//     export interface MediaURLS2 {
//         FLASH_192K_320X180: string;
//         FLASH_450K_384x216: string;
//         FLASH_1200K_640X360: string;
//         FLASH_1800K_896x504: string;
//         HTTP_CLOUD_MOBILE: string;
//         HTTP_CLOUD_TABLET: string;
//         HTTP_CLOUD_TABLET_60: string;
//         HTTP_CLOUD_WIRED: string;
//         HTTP_CLOUD_WIRED_60: string;
//         HTTP_CLOUD_WIRED_WEB: string;
//     }

//     export interface Token03845A2A8A604D3B128A6 {
//         tokenGUID: string;
//         type: string;
//         videoId: string;
//         href: string;
//         tags: Tag2[];
//         date: Date;
//         headline: string;
//         duration: string;
//         blurb: string;
//         bigBlurb: string;
//         mediaPlaybackId: string;
//         image: Image3;
//         mediaURLS: MediaURLS2;
//     }

//     export interface Tag3 {
//         @type: string;
//         @value: any;
//         @displayName: any;
//     }

//     export interface 1136x6405 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 1024x5765 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 960x5405 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 768x4325 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 640x3605 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 568x3205 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 372x2105 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 320x1805 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 248x1405 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface 124x705 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//     }

//     export interface Cuts4 {
//         1136x640: 1136x6405;
//         1024x576: 1024x5765;
//         960x540: 960x5405;
//         768x432: 768x4325;
//         640x360: 640x3605;
//         568x320: 568x3205;
//         372x210: 372x2105;
//         320x180: 320x1805;
//         248x140: 248x1405;
//         124x70: 124x705;
//     }

//     export interface Image4 {
//         cuts: Cuts4;
//     }

//     export interface MediaURLS3 {
//         FLASH_192K_320X180: string;
//         FLASH_450K_384x216: string;
//         FLASH_1200K_640X360: string;
//         FLASH_1800K_896x504: string;
//         HTTP_CLOUD_MOBILE: string;
//         HTTP_CLOUD_TABLET: string;
//         HTTP_CLOUD_TABLET_60: string;
//         HTTP_CLOUD_WIRED: string;
//         HTTP_CLOUD_WIRED_60: string;
//         HTTP_CLOUD_WIRED_WEB: string;
//     }

//     export interface Token4ECDF7A3B929233811290 {
//         tokenGUID: string;
//         type: string;
//         videoId: string;
//         href: string;
//         tags: Tag3[];
//         date: Date;
//         headline: string;
//         duration: string;
//         blurb: string;
//         bigBlurb: string;
//         mediaPlaybackId: string;
//         image: Image4;
//         mediaURLS: MediaURLS3;
//     }

//     export interface TokenB539747B34A59ECB36EA6 {
//         tokenGUID: string;
//         type: string;
//         href: string;
//         hrefMobile: string;
//     }

//     export interface TokenC89171E87229B988E2980 {
//         tokenGUID: string;
//         type: string;
//         id: string;
//         teamId: string;
//         position: string;
//         name: string;
//         seoName: string;
//     }

//     export interface Token0E809C1DA7CCF3B661FA7 {
//         tokenGUID: string;
//         type: string;
//         id: string;
//         teamId: string;
//         position: string;
//         name: string;
//         seoName: string;
//     }

//     export interface Token3D3F01B7DACE4C4FA47A1 {
//         tokenGUID: string;
//         type: string;
//         id: string;
//         teamId: string;
//         position: string;
//         name: string;
//         seoName: string;
//     }

//     export interface TokenFABA6694847E32AA6FDB7 {
//         tokenGUID: string;
//         type: string;
//         id: string;
//         teamId: string;
//         position: string;
//         name: string;
//         seoName: string;
//     }

//     export interface Token963F64D3C345563868B80 {
//         tokenGUID: string;
//         type: string;
//         id: string;
//         teamId: string;
//         position: string;
//         name: string;
//         seoName: string;
//     }

//     export interface TokenC198FDE464553EBDB6A84 {
//         tokenGUID: string;
//         type: string;
//         id: string;
//         teamId: string;
//         position: string;
//         name: string;
//         seoName: string;
//     }

//     export interface Token888865A1385A2248258A6 {
//         tokenGUID: string;
//         type: string;
//         id: string;
//         teamId: string;
//         position: string;
//         name: string;
//         seoName: string;
//     }

//     export interface Token6A610D27792C0E357268D {
//         tokenGUID: string;
//         type: string;
//         id: string;
//         teamId: string;
//         position: string;
//         name: string;
//         seoName: string;
//     }

//     export interface TokenE6784A5AA2C8378933386 {
//         tokenGUID: string;
//         type: string;
//         id: string;
//         teamId: string;
//         position: string;
//         name: string;
//         seoName: string;
//     }

//     export interface Token10FC0FA723F0215D68AA8 {
//         tokenGUID: string;
//         type: string;
//         id: string;
//         teamId: string;
//         position: string;
//         name: string;
//         seoName: string;
//     }

//     export interface Token0292994E65370244AE5A7 {
//         tokenGUID: string;
//         type: string;
//         id: string;
//         teamId: string;
//         position: string;
//         name: string;
//         seoName: string;
//     }

//     export interface Token672A64443600591409783 {
//         tokenGUID: string;
//         type: string;
//         id: string;
//         teamId: string;
//         position: string;
//         name: string;
//         seoName: string;
//     }

//     export interface TokenData2 {
//         token-A00B97EEEF76F5C729B8E: TokenA00B97EEEF76F5C729B8E;
//         token-A277B56ED189551EF278F: TokenA277B56ED189551EF278F;
//         token-03845A2A8A604D3B128A6: Token03845A2A8A604D3B128A6;
//         token-4ECDF7A3B929233811290: Token4ECDF7A3B929233811290;
//         token-B539747B34A59ECB36EA6: TokenB539747B34A59ECB36EA6;
//         token-C89171E87229B988E2980: TokenC89171E87229B988E2980;
//         token-0E809C1DA7CCF3B661FA7: Token0E809C1DA7CCF3B661FA7;
//         token-3D3F01B7DACE4C4FA47A1: Token3D3F01B7DACE4C4FA47A1;
//         token-FABA6694847E32AA6FDB7: TokenFABA6694847E32AA6FDB7;
//         token-963F64D3C345563868B80: Token963F64D3C345563868B80;
//         token-C198FDE464553EBDB6A84: TokenC198FDE464553EBDB6A84;
//         token-888865A1385A2248258A6: Token888865A1385A2248258A6;
//         token-6A610D27792C0E357268D: Token6A610D27792C0E357268D;
//         token-E6784A5AA2C8378933386: TokenE6784A5AA2C8378933386;
//         token-10FC0FA723F0215D68AA8: Token10FC0FA723F0215D68AA8;
//         token-0292994E65370244AE5A7: Token0292994E65370244AE5A7;
//         token-672A64443600591409783: Token672A64443600591409783;
//     }

//     export interface Contributor4 {
//         name: string;
//         twitter: string;
//     }

//     export interface Contributor3 {
//         contributors: Contributor4[];
//         source: string;
//     }

//     export interface KeywordsDisplay2 {
//         type: string;
//         value: string;
//         displayName: string;
//     }

//     export interface KeywordsAll2 {
//         type: string;
//         value: string;
//         displayName: string;
//     }

//     export interface PrimaryKeyword2 {
//         type: string;
//         value: string;
//         displayName: string;
//     }

//     export interface Keyword {
//         type: string;
//         value: string;
//         displayName: string;
//     }

//     export interface 1136x6406 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 1024x5766 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 960x5406 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 768x4326 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 640x3606 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 568x3206 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 372x2106 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 320x1806 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 248x1406 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 124x706 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface Cuts5 {
//         1136x640: 1136x6406;
//         1024x576: 1024x5766;
//         960x540: 960x5406;
//         768x432: 768x4326;
//         640x360: 640x3606;
//         568x320: 568x3206;
//         372x210: 372x2106;
//         320x180: 320x1806;
//         248x140: 248x1406;
//         124x70: 124x706;
//     }

//     export interface Image5 {
//         title: string;
//         altText: string;
//         cuts: Cuts5;
//     }

//     export interface Playback {
//         name: string;
//         width: string;
//         height: string;
//         url: string;
//     }

//     export interface Media2 {
//         type: string;
//         id: string;
//         date: Date;
//         title: string;
//         blurb: string;
//         description: string;
//         duration: string;
//         authFlow: boolean;
//         mediaPlaybackId: string;
//         mediaState: string;
//         keywords: Keyword[];
//         image: Image5;
//         playbacks: Playback[];
//     }

//     export interface Item2 {
//         type: string;
//         state: string;
//         date: Date;
//         id: string;
//         headline: string;
//         subhead: string;
//         seoTitle: string;
//         seoDescription: string;
//         seoKeywords: string;
//         slug: string;
//         commenting: boolean;
//         tagline: string;
//         tokenData: TokenData2;
//         contributor: Contributor3;
//         keywordsDisplay: KeywordsDisplay2[];
//         keywordsAll: KeywordsAll2[];
//         approval: string;
//         url: string;
//         dataURI: string;
//         primaryKeyword: PrimaryKeyword2;
//         shareImage: string;
//         media: Media2;
//         preview: string;
//     }

//     export interface Recap {
//         title: string;
//         topicList: string;
//         items: Item2[];
//     }

//     export interface Editorial {
//         preview: Preview;
//         articles: Articles;
//         recap: Recap;
//     }

//     export interface Keyword2 {
//         type: string;
//         value: string;
//         displayName: string;
//     }

//     export interface 1136x6407 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 1024x5767 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 960x5407 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 768x4327 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 640x3607 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 568x3207 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 372x2107 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 320x1807 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 248x1407 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 124x707 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface Cuts6 {
//         1136x640: 1136x6407;
//         1024x576: 1024x5767;
//         960x540: 960x5407;
//         768x432: 768x4327;
//         640x360: 640x3607;
//         568x320: 568x3207;
//         372x210: 372x2107;
//         320x180: 320x1807;
//         248x140: 248x1407;
//         124x70: 124x707;
//     }

//     export interface Image6 {
//         title: string;
//         altText: string;
//         cuts: Cuts6;
//     }

//     export interface Playback2 {
//         name: string;
//         width: string;
//         height: string;
//         url: string;
//     }

//     export interface Item3 {
//         guid: string;
//         mediaState: string;
//         mediaPlaybackId: string;
//         mediaFeedType: string;
//         callLetters: string;
//         eventId: string;
//         language: string;
//         freeGame: boolean;
//         feedName: string;
//         gamePlus: boolean;
//         type: string;
//         id: string;
//         date?: Date;
//         title: string;
//         blurb: string;
//         description: string;
//         duration: string;
//         authFlow?: boolean;
//         keywords: Keyword2[];
//         image: Image6;
//         playbacks: Playback2[];
//     }

//     export interface Epg {
//         title: string;
//         platform: string;
//         items: Item3[];
//         topicList: string;
//     }

//     export interface Keyword3 {
//         type: string;
//         value: string;
//         displayName: string;
//     }

//     export interface 1136x6408 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 1024x5768 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 960x5408 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 768x4328 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 640x3608 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 568x3208 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 372x2108 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 320x1808 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 248x1408 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 124x708 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface Cuts7 {
//         1136x640: 1136x6408;
//         1024x576: 1024x5768;
//         960x540: 960x5408;
//         768x432: 768x4328;
//         640x360: 640x3608;
//         568x320: 568x3208;
//         372x210: 372x2108;
//         320x180: 320x1808;
//         248x140: 248x1408;
//         124x70: 124x708;
//     }

//     export interface Image7 {
//         title: string;
//         altText: string;
//         cuts: Cuts7;
//     }

//     export interface Playback3 {
//         name: string;
//         width: string;
//         height: string;
//         url: string;
//     }

//     export interface Highlight {
//         type: string;
//         id: string;
//         date?: Date;
//         title: string;
//         blurb: string;
//         description: string;
//         duration: string;
//         authFlow?: boolean;
//         mediaPlaybackId: string;
//         mediaState: string;
//         keywords: Keyword3[];
//         image: Image7;
//         playbacks: Playback3[];
//     }

//     export interface Item4 {
//         title: string;
//         description: string;
//         type: string;
//         timeAbsolute: Date;
//         timeOffset: string;
//         period: string;
//         statsEventId: string;
//         teamId: string;
//         playerId: string;
//         periodTime: string;
//         ordinalNum: string;
//         highlight: Highlight;
//     }

//     export interface Milestones {
//         title: string;
//         streamStart: Date;
//         items: Item4[];
//     }

//     export interface Media3 {
//         epg: Epg[];
//         milestones: Milestones;
//     }

//     export interface Keyword4 {
//         type: string;
//         value: string;
//         displayName: string;
//     }

//     export interface 1136x6409 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 1024x5769 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 960x5409 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 768x4329 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 640x3609 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 568x3209 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 372x2109 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 320x1809 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 248x1409 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 124x709 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface Cuts8 {
//         1136x640: 1136x6409;
//         1024x576: 1024x5769;
//         960x540: 960x5409;
//         768x432: 768x4329;
//         640x360: 640x3609;
//         568x320: 568x3209;
//         372x210: 372x2109;
//         320x180: 320x1809;
//         248x140: 248x1409;
//         124x70: 124x709;
//     }

//     export interface Image8 {
//         title: string;
//         altText: string;
//         cuts: Cuts8;
//     }

//     export interface Playback4 {
//         name: string;
//         width: string;
//         height: string;
//         url: string;
//     }

//     export interface Item5 {
//         type: string;
//         id: string;
//         date: Date;
//         title: string;
//         blurb: string;
//         description: string;
//         duration: string;
//         authFlow: boolean;
//         mediaPlaybackId: string;
//         mediaState: string;
//         keywords: Keyword4[];
//         image: Image8;
//         playbacks: Playback4[];
//     }

//     export interface Scoreboard {
//         title: string;
//         topicList: string;
//         items: Item5[];
//     }

//     export interface Keyword5 {
//         type: string;
//         value: string;
//         displayName: string;
//     }

//     export interface 1136x64010 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 1024x57610 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 960x54010 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 768x43210 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 640x36010 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 568x32010 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 372x21010 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 320x18010 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 248x14010 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface 124x7010 {
//         aspectRatio: string;
//         width: number;
//         height: number;
//         src: string;
//         at2x: string;
//         at3x: string;
//     }

//     export interface Cuts9 {
//         1136x640: 1136x64010;
//         1024x576: 1024x57610;
//         960x540: 960x54010;
//         768x432: 768x43210;
//         640x360: 640x36010;
//         568x320: 568x32010;
//         372x210: 372x21010;
//         320x180: 320x18010;
//         248x140: 248x14010;
//         124x70: 124x7010;
//     }

//     export interface Image9 {
//         title: string;
//         altText: string;
//         cuts: Cuts9;
//     }

//     export interface Playback5 {
//         name: string;
//         width: string;
//         height: string;
//         url: string;
//     }

//     export interface Item6 {
//         type: string;
//         id: string;
//         date: Date;
//         title: string;
//         blurb: string;
//         description: string;
//         duration: string;
//         authFlow: boolean;
//         mediaPlaybackId: string;
//         mediaState: string;
//         keywords: Keyword5[];
//         image: Image9;
//         playbacks: Playback5[];
//     }

//     export interface GameCenter {
//         title: string;
//         topicList: string;
//         items: Item6[];
//     }

//     export interface Highlights {
//         scoreboard: Scoreboard;
//         gameCenter: GameCenter;
//     }

//     export interface RootObject {
//         copyright: string;
//         link: string;
//         editorial: Editorial;
//         media: Media3;
//         highlights: Highlights;
//     }

// }

