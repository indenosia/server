export class Header {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}

export class HeaderManager {
  protected headers: Header[];
  constructor() {
    this.headers = [];
  }

  add(key: string, value: string) {
    if (this.has(key)) {
      this.headers.forEach((header) => {
        if (header.key === key) {
          header.value = value;
        }
      });
    }
    this.headers.push(new Header(key, value));
  }

  has(key: string) {
    return this.headers.filter((header) => header.key === key).length >= 1;
  }

  get parsedHeader(): string[][] {
    const headers: string[][] = [];
    this.headers.forEach((header) => {
      headers.push([header.key, header.value]);
    });
    return headers;
  }
}
