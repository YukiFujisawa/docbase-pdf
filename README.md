# docbase-pdf

[![Dependency Status](https://beta.gemnasium.com/badges/github.com/YukiFujisawa/docbase-pdf.svg)](https://beta.gemnasium.com/projects/github.com/YukiFujisawa/docbase-pdf)

## Overview

docbase-pdf is a library for DocBase (https://docbase.io/).
You can download the article as a PDF file.

docbase-pdfは、情報共有サービスDocBase (https://docbase.io/) 用のライブラリです。
DocBase記事のPDFファイルでダウンロードすることができます。

### 出力サンプル

- [Markdown(元記事)](https://yukifujisawa.github.io/docbase-pdf/sample.md)
- [PDF(出力した記事)](https://yukifujisawa.github.io/docbase-pdf/347796_DOCBASE_API_TEST.pdf)


## Installation

```bash
$ npm install docbase-pdf --save
```

## Usage with TypeScript

### DocBasePdfオブジェクト

- `DocBasePdf`オブジェクトを使ってをDocBaseから記事を取得し、PDFを出力します
- `const docBasePdf: DocBasePdf = new DocBasePdf(DOC_BASE_API_TOKEN, TEAM_NAME);`で`DocBasePdf`オブジェクトを準備してください。
- `DOC_BASE_API_TOKEN`には、DocBaseのアクセストークンを設定してください。アクセスートークンの取得方法は、以下、公式マニュアルを参照してください。
  - [アクセストークンについて](https://help.docbase.io/posts/45703#%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3)
- `process.env.DOC_BASE_API_TOKEN`を取得するには、コマンド実行時に環境変数として`DOC_BASE_API_TOKEN`を設定してください。
    - コマンド実行例: ```$ DOC_BASE_API_TOKEN=*** node .```
- `TEAM_NAME`は、domainを指定してください
    - 例えば、`https://hoge.docbase.io`というURLでDocBaseを利用している場合、```const TEAM_NAME='hoge'```です。

```typescript
// An access token
const DOC_BASE_API_TOKEN = process.env.DOC_BASE_API_TOKEN;
const TEAM_NAME = 'TEAM_NAME';

const docBasePdf: DocBasePdf = new DocBasePdf(DOC_BASE_API_TOKEN, TEAM_NAME);
```

## Sample Code For TypeScript / サンプルコード

```typescript
import { DocBasePdf } from './DocBasePdf';
import { MemoCondition } from 'node-docbase-sdk/lib/conditions/MemoCondition';

// Get DocBaseAPI Token from cli.
// ex.
//   $ DOC_BASE_API_TOKEN=<DOC_BASE_API_TOKEN> node .
const DOC_BASE_API_TOKEN = process.env.DOC_BASE_API_TOKEN;
const TEAM_NAME = 'TEAM_NAME';

// クライアント生成
const docBasePdf: DocBasePdf = new DocBasePdf(DOC_BASE_API_TOKEN, TEAM_NAME);

// メモの検索キーワード
const KEYWORD = 'DOCBASE_API_TEST';

// PDF出力先ディレクトリ
const outputPath = 'docs';

// 取得するメモID
// https://${TEAM_NAME}.docbase.io/posts/${memoId}
const memoId = 347796;

async function main() {

  // メモIDを指定してPDFを取得します。
  await docBasePdf.getByMemoId(memoId, outputPath);

  // 検索条件を指定してPDFを取得します。
  const condition: MemoCondition = <MemoCondition>{};
  condition.q = KEYWORD;
  await docBasePdf.getByCondition(condition, outputPath);
}

// == Main ==
main().catch((error) => {
  console.log(error);
});

```
