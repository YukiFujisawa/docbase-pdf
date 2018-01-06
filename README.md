# docbase-pdf

[![Dependency Status](https://beta.gemnasium.com/badges/github.com/YukiFujisawa/docbase-pdf.svg)](https://beta.gemnasium.com/projects/github.com/YukiFujisawa/docbase-pdf)

## Overview

docbase-pdf is a library for DocBase (https://docbase.io/).
You can download the article as a PDF file.

docbase-pdfは、情報共有サービスDocBase (https://docbase.io/) 用のライブラリです。
記事をPDFファイルでダウンロードすることができます。


## Installation

```bash
$ npm install docbase-pdf --save
```

## Usage with TypeScript

### Client

Your app will interact with the Web API through the `DocBasePdf` object, 
which a top level export from this package. 

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
