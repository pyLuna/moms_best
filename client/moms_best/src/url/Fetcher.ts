class Fetcher {
  public static BASE_URL = import.meta.env.VITE_SERVER_URL;
  _path: string;
  _options: {
    headers: HeadersInit;
  };

  // Accept key as a constructor argument
  constructor(path: string, key?: string | null, headers?: HeadersInit) {
    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...(key ? { "x-api-key": key } : {}),
    };
    this._path = path;
    this._options = {
      headers: headers || defaultHeaders,
    };
  }

  private _getRequestInit(method: string, body?: any) {
    let requestInit: RequestInit = {
      method: method,
      headers: this._options.headers,
      credentials: "include",
    };

    if (body) {
      requestInit.body = JSON.stringify(body);
    }
    return requestInit;
  }

  public getUrl(): URL {
    return new URL(this._path, Fetcher.BASE_URL);
  }

  public getFullUrl(): string {
    return this.getUrl().toString();
  }

  // Add instance methods to access _path and _options
  public get(): Promise<Response> {
    return fetch(this.getFullUrl(), this._getRequestInit("GET"));
  }

  public post(body: any): Promise<Response> {
    return fetch(this.getFullUrl(), this._getRequestInit("POST", body));
  }

  public put(body: any): Promise<Response> {
    return fetch(this.getFullUrl(), this._getRequestInit("PUT", body));
  }

  public patch(body: any): Promise<Response> {
    return fetch(this.getFullUrl(), this._getRequestInit("PATCH", body));
  }
}

export function useFetcher(path: string, options?: { headers?: HeadersInit }) {
  const key = sessionStorage.getItem("apiKey");
  return new Fetcher(path, key, options?.headers);
}
