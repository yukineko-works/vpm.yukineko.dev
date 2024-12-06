---
title: 移行ガイド
---

# 移行ガイド
旧バージョン(`v1.x.x`)とは互換性がないため、[導入方法](./getting-started)から再度ギミックの導入、再設定をお願いします。  
v1からの詳細な変更点は[更新履歴](./changelog#v2-0-0)をご覧ください。  

[[toc]]

## 移行手順
1. [導入方法](./getting-started)に従って、v2の天候システムとリアルタイム太陽システムの導入を行います。
2. v2のギミックの配置を行い、以下の変更点を確認してv1から設定を移行します。
3. v1のギミックおよびアセットを削除します。

## リアルタイム太陽システムの変更点
### Directional Lightが別途必要になりました
v1ではDirectional Lightにリアルタイム太陽システムが設定されていましたが、v2からは Prefab `Day Cycle System` とDirectional Lightを個別にHierarchyに配置した上で、[設定からDirectional Lightを指定](./settings#directional-light-sun)する必要があります。

## 天候システムの変更点
### 天気に応じて有効にするGameObjectの設定方法が変わりました
v1では `WeatherSystem/WeatherAssets/{天気名}`の子にGameObjectを配置することで、天気に応じて有効にするGameObjectを設定していましたが、v2からは[個別にGameObjectを指定](./settings#weather-assets)できるようになりました。  
なお、デフォルト状態ではこれまで通り`WeatherSystem/{天気名}`の子にGameObjectを配置することで、天気に応じて有効にするGameObjectを設定することも可能です。

### 天気の変更頻度設定が変わりました
天気を変更する間隔が時間単位から分単位に変更されました。  
v1の初期値は3時間でしたが、v2からは60分に変更されています。  

### 確率設定に関する変更
v1ではデフォルトの降水確率を設定した上で、月別降水確率を相対的な値で設定する必要がありましたが、v2からはデフォルトの降水確率設定が廃止され、**月別晴天確率**を設定するようになりました。
