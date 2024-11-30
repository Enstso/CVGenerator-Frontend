
export const urls = {
  register:'auth/register',
  login:'auth/login',
  logout:'auth/logout',
  user:'users',
  cvs:'cvs',
  recommendations:'recommendations',
  myCvs:'cvs/user/myCvs'
};

export const urlApi = import.meta.env.VITE_API_URL;

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

  export async function putData(url, data, options=undefined) {
    return fetch(url, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
  
      body: JSON.stringify(data),
    }).then((res) => res.json())
  }
  
  
  export async function putDataV2(url, data, options=undefined) {
    return fetch(url, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
  
      body: JSON.stringify(data),
    })
  }

  export async function deleteData(url) {
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      }).then((res) => res.json())
  }
  
  
  export async function deleteDataV2(url, data, options=undefined) {
    return fetch(url, {
      ...options,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
  
      body: JSON.stringify(data),
    })
  }