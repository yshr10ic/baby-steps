#!/bin/bash
dirname="/home/vagrant/workspace/niconico-ranking-rss"
mkdir -p $dirname
filename="${dirname}/hourly-ranking-`date +'%Y%m%d%H%M'`.xml"
echo "Svae to $filename"
curl -s -o $filename -H "User-Agent: CrawlBot; yiida10ic@gmail.com" https://www.nicovideo.jp/ranking/genre/all?rss=2.0&lang=ja-jp