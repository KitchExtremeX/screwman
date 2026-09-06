'use strict';
const SM = window.SM = {};
SM.C = {width:1120,height:630,worldW:7100,worldH:1000,speed:285,accel:2000,friction:2300,gravity:1650,jump:700,dashSpeed:800,dashTime:.18,fireRate:.17,boltDamage:12,chargeDamage:42,chargeCost:20,drillCost:22,drillDps:90,bossHealth:620,extractionTime:35,enemyHP:{crawler:36,sentry:50,brute:100},enemyDamage:{crawler:10,sentry:9,brute:18},waves:[['crawler','sentry'],['crawler','crawler','brute'],['sentry','brute','crawler']]};
SM.clamp=(n,a,b)=>Math.max(a,Math.min(b,n));SM.overlap=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
SM.rect=(x,y,w,h,extra={})=>({x,y,w,h,...extra});

