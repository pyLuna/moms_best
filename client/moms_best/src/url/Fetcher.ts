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

  public getUrl(): URL {
    return new URL(this._path, Fetcher.BASE_URL);
  }

  public getFullUrl(): string {
    return this.getUrl().toString();
  }

  // Add instance methods to access _path and _options
  public get(): Promise<Response> {
    return fetch(this.getFullUrl(), {
      method: "GET",
      headers: this._options.headers,
    });
  }

  public post(body: any): Promise<Response> {
    return fetch(this.getFullUrl(), {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify(body),
    });
  }

  public put(body: any): Promise<Response> {
    return fetch(this.getFullUrl(), {
      method: "PUT",
      headers: this._options.headers,
      body: JSON.stringify(body),
    });
  }

  public patch(body: any): Promise<Response> {
    return fetch(this.getFullUrl(), {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify(body),
    });
  }
}
