// 加载js
export function loadJS(url: string, async = true) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = async;
    script.onload = resolve;
    script.onerror = reject;
    document.getElementsByTagName('head')[0].appendChild(script);
  });
}

// 加载css
export function loadCSS(url: string) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = resolve;
    link.onerror = reject;
    document.getElementsByTagName('head')[0].appendChild(link);
  });
}

// 下载文件-blob
export const downloadBlobFile = (blob: Blob, filename: string) => {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// 下载文件-url
export function downloadFileByUrl(url: string, filename: string) {
  const link = document.createElement('a');
  link.target = '_blank';
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Blob 转化为 base64
export const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      resolve(e.target.result);
    };
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'));
    };

    fileReader.readAsDataURL(blob);
  });
};

// arrayBuffer 转 Blob
export function bufferToBlob(arrayBuffer: Buffer, type: string) {
  return new Blob([arrayBuffer], { type });
}
