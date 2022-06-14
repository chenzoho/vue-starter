import { useAppStore } from "@/store/modules/app";
export const setUrlConfig = (): Readonly<UrlConfig> => {
  const appStore = useAppStore();
  if (import.meta.env.MODE === "development") {
    const urlConfig = {
      mode: import.meta.env.MODE,
      baseUrl: "http://api.sc.staging.donvv.com",
      system: `http://api.sc.staging.donvv.com/api1/admin/2.0/`,
      commodity: `http://api.sc.staging.donvv.com/api2/admin/2.0/`,
      customer: `http://api.sc.staging.donvv.com/api3/admin/2.0/`,
      order: `http://api.sc.staging.donvv.com/api4/admin/2.0/`,
      file: `http://api.sc.staging.donvv.com/api5/api/2.0/`,
      lucene: `http://api.sc.staging.donvv.com/api6/admin/2.0/`,
      supply: `http://api.sc.staging.donvv.com/api7/admin/2.0/`,
      upload: `http://api.sc.staging.donvv.com/api5/api/1.0/upload/post`,
      uploadPart: `http://api.sc.staging.donvv.com/api5/api/1.0/upload/uploadByWeb`,
      mergeChunks: `http://api.sc.staging.donvv.com/api5/api/1.0/upload/merge-chunks`,
    };
    appStore.updateUrl(urlConfig);
    return urlConfig;
  } else {
    const domainConfig = import.meta.env.VITE_BASE_API;
    const urlConfig = {
      mode: import.meta.env.MODE,
      baseUrl: domainConfig,
      system: `${domainConfig}/api1/admin/2.0/`,
      commodity: `${domainConfig}/api2/admin/2.0/`,
      customer: `${domainConfig}/api3/admin/2.0/`,
      order: `${domainConfig}/api4/admin/2.0/`,
      file: `${domainConfig}/api5/api/2.0/`,
      lucene: `${domainConfig}/api6/admin/2.0/`,
      supply: `${domainConfig}/api7/admin/2.0/`,
      upload: `${domainConfig}/api5/api/1.0/upload/post`,
      uploadPart: `${domainConfig}/api5/api/1.0/upload/uploadByWeb`,
      mergeChunks: `${domainConfig}/api5/api/1.0/upload/merge-chunks`,
    };
    appStore.updateUrl(urlConfig);
    return urlConfig;
  }
};

export interface UrlConfig {
  mode: string;
  baseUrl: string;
  system: string;
  commodity: string;
  customer: string;
  order: string;
  file: string;
  lucene: string;
  supply: string;
  upload: string;
  uploadPart: string;
  mergeChunks: string;
}
