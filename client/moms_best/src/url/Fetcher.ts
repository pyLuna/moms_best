export class Fetcher {
  public static BASE_URL = import.meta.env.VITE_SERVER_URL;
  _path: string;
  _options: {
    headers: HeadersInit;
  };

  constructor(path: string, headers?: HeadersInit) {
    this._path = path;
    this._options = {
      headers: headers || {
        "Content-Type": "application/json",
      },
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
