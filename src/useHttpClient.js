const server = process.env.REACT_APP_BASE_SERVER;

async function sendRequest(url, options) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${server}${url}`, {
    ...options,
    headers,
  });

  return response;
}

export function useFetch() {
  async function useGet(route) {
    return sendRequest(route, {
      method: "GET",
    });
  }

  async function usePost(route, body) {
    return sendRequest(route, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async function usePut(route, body) {
    return sendRequest(route, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  async function useDelete(route) {
    return sendRequest(route, {
      method: "DELETE",
    });
  }

  return { useGet, usePost, usePut, useDelete };
}
