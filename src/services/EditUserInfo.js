import {BACK_END_POINTS} from '../apiconstants/apiConstants';

export const updateUserInfo = async (username, metadata) => {
  
    const body = { username, metadata};
    try {
    const response = await fetch(BACK_END_POINTS.USER_INFO.EDIT, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',         
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      console.error('Failed to update user info');
      return;
    }
    console.log('User info updated');

} catch(error) {
    console.log(error);
    throw new Error('User info failed to update')

}
}