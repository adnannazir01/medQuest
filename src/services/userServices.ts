import {API} from '../api';

export type userDataType = {
  nickName?: string;
  name?: string;
  email: string;
  cognitoId: string;
  gender?: string;
  dateOfBirth?: string;
};

export type createConnectionType = {
  privacy?: string;
  followingId: string;
  followerId: string;
  type?: string;
  requestId?: string;
  actionType?: string;
  postId?: string;
  postLikeId?: string;
};

export type createReportType = {
  reportedId: string;
  reporterId: string;
  reportType: 'USER' | 'POST';
  reasons: string[];
  postId?: string;
};

const getUserData = async (id: string) => {
  const {data} = await API.get(`user?cognitoId=${id}`);


  console.log("WE HERE", data);
  
  return data;
};
const getUserDataBySearch = async (page: number, value: string, id: string) => {
  const {data} = await API.get(`user/all/${id}?page=${page}&limit=10&name=${value}`);
  return data;
};

const getFollowers = async (id: string, userId: string, page: number) => {
  console.log('USER ID in get followers', id);
  console.log('Current USER ID in get followers', userId);

  const {data} = await API.get(`connection/followers/${id}/${userId}?page=${page}&limit=10`);

  return data;
};
const getFollowings = async (id: string, page: number, userId: string) => {
  console.log('User id in followings', id);
  console.log('CurrentUser id in followings', userId);

  const {data} = await API.get(`connection/followings/${id}/${userId}?page=${page}&limit=10`);
  return data;
};

const checkConnection = async (followerId: string, followingId: string) => {
  const {data} = await API.get(`connection?followerId=${followerId}&followingId=${followingId}`);
  return data;
};

const createConnection = async (body: createConnectionType) => {
  const {data} = await API.post(`connection`, body);
  return data;
};

const updateConnection = async (followingId: string, requestId: string, body: {connectionStatus: string}) => {
  const {data} = await API.patch(`connection/request/${followingId}/${requestId}`, body);
  return data;
};

const deleteConnection = async (followingId: string, followerId: string) => {
  const {data} = await API.delete(`connection/${followingId}/${followerId}`);
  return data;
};

const createUserProfile = async (body: userDataType) => {
  const {data} = await API.post(`user`, body);
  return data;
};
const updateUserProfile = async (id: string, body: userDataType) => {
  const {data} = await API.patch(`user/${id}`, body);
  return data;
};
const updateUserFCM = async (id: string, params: {FCMtoken: string}) => {
  console.log('Token received in service:', params);
  console.log('ID received in service:', id);

  // Uncomment and handle the actual API call here
  const {data} = await API.patch(`user/fcm/${id}`, params);

  console.log('DATA IN SERVICE', data);

  return data;
};
const updateUserProfilePicture = async (id: string, body: any) => {
  console.debug('🚀 ~ file: userServices.ts:28 ~ updateUserProfilePicture ~ data:', id, body);
  const data = await API.post(`user/signed-url/${id}`, body);
  return data;
};

const getAllRequest = async (id: string, page: number) => {
  const {data} = await API.get(`connection/request/${id}?page=${page}&limit=10`);
  return data;
};

const searchFollowings = async (page: number, value: string, id: string) => {
  console.debug('🚀 ~ file: userServices.ts:90 ~ searchFollowings ~ value:', value);
  const {data} = await API.get(`connection/search/followings/${id}?page=${page}&limit=10&nickName=${value}`);
  return data;
};

const createUserReport = async (body: createReportType) => {
  const {data} = await API.post(`report`, body);
  return data;
};

const toggleBlockedUser = async (id: string, body: {blockedId: string}) => {
  const {data} = await API.post(`user/block/${id}`, body);
  return data;
};

const getUser = async (id: string) => {
  const {data} = await API.get(`user?userId=${id}`);
  return data;
};

const getAllBlockedAcc = async (id: string) => {
  const {data} = await API.get(`user/block/${id}`);
  return data;
};
const getUserMapPosts = async (userId: string, authorId: string, boundingBox: string) => {
  console.log('USER ID IN API', userId);
  console.log('AUTHOR ID IN API', authorId);

  const encodedLocation = encodeURIComponent(JSON.stringify({type: 'Polygon', coordinates: boundingBox}));

  const url = `/post/user/${authorId}?userId=${userId}&location=${encodedLocation}`;
  // & location=${ encodedLocation }`;
  const data = await API.get(url);
  console.log('THIS DATA NEW.data', data.data);

  return data?.data || [];
};

const getUserPostsOnMap = async (userId: string, boundingBox: string, filters?: {name: string; type: string}) => {
  console.log('API CALLED with bounds', boundingBox);

  // console.log('Filters in API122223', filters);
  // console.log('USER MAP POSTS BOunding box123', boundingBox);

  const encodedLocation = encodeURIComponent(JSON.stringify({type: 'Polygon', coordinates: boundingBox}));

  // Check if filters exist before encoding
  const encodedFilter = filters ? encodeURIComponent(JSON.stringify({name: 'PUBLIC', type: 'OFF'})) : '';

  // Build the URL dynamically based on the presence of filters
  const url = `/post?userId=${userId}&location=${encodedLocation}${encodedFilter ? `&filter=${encodedFilter}` : ''}`;

  const data = await API.get(url);

  // console.log('POSTS DATA description', data?.data);

  return data?.data || [];
};

const getUserPosts = async (userId: string, authorId: string, pageParam: number) => {
  console.log('Getting user Gallery Posts123', userId);
  console.log('Getting user Gallery Posts123 author', authorId);

  // const encodedLocation = encodeURIComponent(JSON.stringify({type: 'Polygon', coordinates: boundingBox}));

  const url = `/post/user/${authorId}?page=${pageParam}&rows=6&userId=${userId}&pagination=true`;
  // & location=${ encodedLocation }`;
  const data = await API.get(url);

  return data || [];
};

const deleteUser = async (id: string) => {
  const {data} = await API.delete(`user/${id}`);
  console.debug('🚀 ~ file: userServices.ts:165 ~ deleteUser ~ data:', data);
  return data;
};

export {
  checkConnection,
  createConnection,
  createUserProfile,
  createUserReport,
  deleteConnection,
  getAllBlockedAcc,
  getAllRequest,
  getFollowers,
  getFollowings,
  getUser,
  updateUserFCM,
  getUserData,
  getUserDataBySearch,
  getUserMapPosts,
  getUserPosts,
  getUserPostsOnMap,
  toggleBlockedUser,
  updateConnection,
  updateUserProfile,
  updateUserProfilePicture,
  searchFollowings,
  deleteUser,
};
