# 概要
Nuxtで作った簡単なECサイトです。
> https://d21iuqrezm3div.cloudfront.net/
# 機能
> ユーザー認証
> stripe決済
> 商品検索

# 使った技術
> CSS Framework: Vuetify

> フロントエンド: Nuxt

> バックエンド: Express

> インフラ: AWS / Serverless Framework

# インフラ構成

CloudFront => s3 ( static / _nuxt )
           => API-GW => Lambda

[参考URL](https://mya-ake.com/posts/nuxtjs-on-aws-lambda/)

 # 参考記事
 [セキュリティ](Nuxt AuthModuleを捨ててCookieで実装し直した。)
 [インフラ](Mya-ake)
