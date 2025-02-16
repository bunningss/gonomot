"use server";
import { siteSettings } from "@/lib/constants";
import { getEnv } from "./get-env";
import { getCookie, setCookie } from "./cookie";
import { redirect } from "next/navigation";

const apiUrl = getEnv("API_URL");

export async function postData(url: string, data: Record<string, unknown>) {
  const token = await getCookie(siteSettings.cookieName);

  const res = await fetch(apiUrl + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (res.headers.get("set-cookie")?.split("=")[1]) {
    await setCookie(
      siteSettings.cookieName,
      res.headers
        .get("set-cookie")
        ?.split("=")[1]
        ?.replace("; Path", "") as string
    );
  }

  if (res.ok && res.headers.get("Location")) {
    redirect(res.headers.get("Location")!);
  }

  const resData = await res.json();

  if (!res.ok) {
    return {
      error: true,
      response: resData,
    };
  }

  return {
    error: false,
    response: resData,
  };
}

export async function fetchData(url: string, revalidate: number = 600) {
  const token = await getCookie(siteSettings.cookieName);

  const res = await fetch(apiUrl + url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "auth-token": `Bearer ${token}`,
    },
    next: { revalidate },
  });

  const resData = await res.json();

  if (!res.ok) {
    return {
      error: true,
      response: resData,
    };
  }

  return {
    error: false,
    response: resData,
  };
}

export async function updateData(url: string, data: Record<string, unknown>) {
  const token = await getCookie(siteSettings.cookieName);

  const res = await fetch(apiUrl + url, {
    method: "PUT",
    headers: {
      "auth-token": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  if (!res.ok) {
    return {
      error: true,
      response: resData,
    };
  }

  return {
    error: false,
    response: resData,
  };
}

export async function deleteData(url: string) {
  const token = await getCookie(siteSettings.cookieName);

  const res = await fetch(apiUrl + url, {
    method: "DELETE",
    headers: {
      "auth-token": `Bearer ${token}`,
    },
  });

  const resData = await res.json();

  if (!res.ok) {
    return {
      error: true,
      response: resData,
    };
  }

  return {
    error: false,
    response: resData,
  };
}
