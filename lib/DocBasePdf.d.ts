import { MemoCondition } from 'node-docbase-sdk/lib/conditions/MemoCondition';
export declare class DocBasePdf {
    private apiToken;
    private domain;
    private docBase;
    constructor(apiToken: string, domain: string);
    getByMemoId(memoId: number, outputPath: string): Promise<void>;
    getByCondition(condition: MemoCondition, outputPath: string): Promise<void>;
    private findMemo;
    private searchMemos;
    private convert;
}
