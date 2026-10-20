declare module "qrcode" {
  const QRCode: {
    toDataURL: (
      text: string,
      opts?: { width?: number; margin?: number },
    ) => Promise<string>;
    toString: (text: string, opts?: { type?: string }) => Promise<string>;
  };
  export default QRCode;
}
