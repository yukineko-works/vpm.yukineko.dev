---
title: WIM 拡張モジュール Vol.1 | 更新履歴
---

# 更新履歴 (WIM 拡張モジュール Vol.1)
## v1.1.0
`2024/11/25`  
- Feat: Persistenceに対応 (ライティング設定モジュール, サウンド設定モジュール, スイッチモジュール)
  - 各モジュールの設定から、項目の値を永続化するかどうかを選択することができます。
- Fix: UnityEditor上で、サウンド設定モジュールなどで行える項目の並び替えが正常に行えなかった問題を修正
- Fix: UnityEditor上で、スイッチモジュール設定のセクション欄の高さが異なっていた問題を修正

::: warning 重要なおしらせ
v1.1.0以前から以下のモジュールを使用している場合は、アップデート後に各モジュールの設定画面(Inspector)を開く必要があります。   
- サウンド設定モジュール
- スイッチモジュール  

設定画面を開かないと正常に動作しない可能性がありますので、お手数をお掛けしますが操作をお願いいたします。  
:::

## v1.0.2
`2024/11/07`  
- Chore: 依存関係のバージョン指定を調整

## v1.0.0
`2024/11/01`
  
リリース