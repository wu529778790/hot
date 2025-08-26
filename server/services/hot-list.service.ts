import { getWeiboHotList } from "~/server/sources/weibo";
import { getZhihuHotList } from "~/server/sources/zhihu";
import { get36krHotList } from "~/server/sources/_36kr";
import { getBaiduHotList } from "~/server/sources/baidu";
import {
  getBilibiliHotSearch,
  getBilibiliHotVideo,
  getBilibiliRanking,
} from "~/server/sources/bilibili";
import { getGithubHotList } from "~/server/sources/github";
import { getIthomeHotList } from "~/server/sources/ithome";
import getCankaoxiaoxiHotList from "~/server/sources/cankaoxiaoxi";

import getDouyinHotList from "~/server/sources/douyin";
import getFastbullHotList from "~/server/sources/fastbull";
import getGelonghuiHotList from "~/server/sources/gelonghui";

import getHackernewsHotList from "~/server/sources/hackernews";
import getHupuHotList from "~/server/sources/hupu";
import getIfengHotList from "~/server/sources/ifeng";
import getJin10HotList from "~/server/sources/jin10";
import getJuejinHotList from "~/server/sources/juejin";
import getKaopuHotList from "~/server/sources/kaopu";
import getKuaishouHotList from "~/server/sources/kuaishou";

import getNowcoderHotList from "~/server/sources/nowcoder";
import getPcbetaHotList from "~/server/sources/pcbeta";

import getSolidotHotList from "~/server/sources/solidot";
import getSputniknewscnHotList from "~/server/sources/sputniknewscn";
import getSspaiHotList from "~/server/sources/sspai";
import getThepaperHotList from "~/server/sources/thepaper";
import getTiebaHotList from "~/server/sources/tieba";
import getToutiaoHotList from "~/server/sources/toutiao";

import getWallstreetcnHotList from "~/server/sources/wallstreetcn";
import getXueqiuHotList from "~/server/sources/xueqiu";
import getZaobaoHotList from "~/server/sources/zaobao";

import getCoolapkHotList from "~/server/sources/coolapk";
import type { HotItem } from "../models/hot-item.model";

const fetcherMap: Record<string, () => Promise<HotItem[]>> = {
  weibo: getWeiboHotList,
  zhihu: getZhihuHotList,
  "36kr": get36krHotList,
  baidu: getBaiduHotList,
  "bilibili-hot-search": getBilibiliHotSearch,
  "bilibili-hot-video": getBilibiliHotVideo,
  "bilibili-ranking": getBilibiliRanking,
  github: getGithubHotList,
  ithome: getIthomeHotList,
  cankaoxiaoxi: getCankaoxiaoxiHotList,

  douyin: getDouyinHotList,
  fastbull: getFastbullHotList.fastbull,

  "fastbull-news": getFastbullHotList["fastbull-news"],
  gelonghui: getGelonghuiHotList,

  hackernews: getHackernewsHotList,
  hupu: getHupuHotList,
  ifeng: getIfengHotList,
  jin10: getJin10HotList,
  juejin: getJuejinHotList,
  kuaishou: getKuaishouHotList,

  nowcoder: getNowcoderHotList,
  "pcbeta-windows11": getPcbetaHotList["pcbeta-windows11"],

  solidot: getSolidotHotList,
  sputniknewscn: getSputniknewscnHotList,
  sspai: getSspaiHotList,
  thepaper: getThepaperHotList,
  tieba: getTiebaHotList,
  toutiao: getToutiaoHotList,

  wallstreetcn: getWallstreetcnHotList.wallstreetcn,

  "wallstreetcn-news": getWallstreetcnHotList["wallstreetcn-news"],
  "wallstreetcn-hot": getWallstreetcnHotList["wallstreetcn-hot"],
  xueqiu: getXueqiuHotList.xueqiu,

  zaobao: getZaobaoHotList,

  coolapk: getCoolapkHotList.coolapk,
};

export async function getHotList(id: string): Promise<HotItem[]> {
  const fetcher = fetcherMap[id];
  if (!fetcher) {
    throw new Error("Invalid source id");
  }
  return await fetcher();
}
