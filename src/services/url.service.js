// local url
// export const url = "http://localhost:4066";
// 
// live url
// export const url = "https://www.aahilya.com/api/";
export const url = "/api";

export const InstagramApiUrl = "http://aahilyamail.ebslonaws.com/api/instagram-feed"

export const generateImageUrl = (path) => {
  return `${url}/uploads/${path}`;
};
