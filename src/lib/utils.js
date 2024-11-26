
export const urls = {
  register:'auth/register',
  login:'auth/login',
  logout:'auth/logout',
  cvs:'cvs',
  recommandations:'recommandations'
};

export async function getData(url) {
    return fetch(url, {
      method: "GET", headers: {
        "Content-Type": "application/json",
      }, credentials: "include",
    },
    ).then((res) => res.json())
  }
  
  export async function postData(url, data, options=undefined) {
    return fetch(url, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
  
      body: JSON.stringify(data),
    }).then((res) => res.json())
  }
  
  
  export async function postDataV2(url, data, options=undefined) {
    return fetch(url, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
  
      body: JSON.stringify(data),
    })
  }