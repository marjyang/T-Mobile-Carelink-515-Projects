import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export async function fetchLatestReportUrl(reportPath: string): Promise<string | null> {
  const reportsRef = ref(storage, reportPath);
  const listResult = await listAll(reportsRef);
  if (listResult.items.length === 0) return null;
  // 假设文件名带有时间戳或可排序，按名字排序取最新
  const sortedItems = listResult.items.sort((a, b) => (a.name < b.name ? 1 : -1));
  const latestRef = sortedItems[0];
  return await getDownloadURL(latestRef);
} 