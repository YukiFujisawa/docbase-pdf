import { Memo } from 'node-docbase-sdk/lib/entities/Memo';
import { DocBase } from 'node-docbase-sdk/lib/DocBase';
import { DocBaseResponse } from 'node-docbase-sdk/lib/DocBaseResponse';
import { HttpStatus } from 'node-docbase-sdk/lib/enums/HttpStatus';
import { MemoCondition } from 'node-docbase-sdk/lib/conditions/MemoCondition';
import * as sanitize from 'sanitize-filename';

const path = require('path');
const markdownPdf = require('markdown-pdf');
const CSS_PATH = path.join(__dirname, '../css', 'style.css');

export class DocBasePdf {
  private docBase: DocBase;

  constructor(private apiToken: string, private domain: string) {
    this.docBase = new DocBase(this.apiToken, this.domain);
  }

  async getByMemoId(memoId: number, outputPath: string) {
    try {
      const memo: Memo = await this.findMemo(memoId);
      return await this.convert([memo], outputPath);
    } catch (error) {
      throw error;
    }
  }

  async getByCondition(condition: MemoCondition, outputPath: string) {
    try {
      const memos: Memo[] = await this.searchMemos(condition);
      return await this.convert(memos, outputPath);
    } catch (error) {
      throw error;
    }
  }

  // メモ詳細取得API
  private async findMemo(memoId: number): Promise<Memo> {
    const response: DocBaseResponse = await this.docBase.memos.find(memoId);
    if (response.status === HttpStatus.OK) {
      return response.body;
    }
    throw new Error(response.body);
  }

  // 複数メモ取得API
  private async searchMemos(condition: MemoCondition): Promise<Memo[]> {
    const response: DocBaseResponse = await this.docBase.memos.list(condition);
    if (response.status === HttpStatus.OK) {
      return response.body.posts;
    }
    throw new Error(response.body);
  }

  private async convert(memos: Memo[], outputPath: string) {
    try {
      for (const memo of memos) {
        const filePath = `${outputPath}/${sanitize(memo.id + '_' + memo.title)}.pdf`;

        const content = `# ${memo.title + '\n'} ${memo.body}`;
        markdownPdf({ cssPath: CSS_PATH }).from.string(content).to(filePath, (error: any) => {
          if (error) {
            throw error;
          }
          console.log(`Created ${filePath}`);
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
