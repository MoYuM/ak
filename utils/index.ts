
export const requireSync = (path: string) => {
  return new Promise<{ success: boolean, data: any, error: any }>((resolve, reject) => {
    try {
      const res = require(path);
      resolve({
        success: true,
        data: res,
        error: null,
      });
    } catch (e) {
      reject({
        success: false,
        data: null,
        error: e,
      })
    }
  })
}

export const safeRequire = async (path: string) => {
  return requireSync(path).then(e => e).catch(e => e);
}
