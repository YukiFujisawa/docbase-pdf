"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const DocBase_1 = require("node-docbase-sdk/lib/DocBase");
const HttpStatus_1 = require("node-docbase-sdk/lib/enums/HttpStatus");
const sanitize = require("sanitize-filename");
const path = require('path');
const markdownPdf = require('markdown-pdf');
const CSS_PATH = path.join(__dirname, '../css', 'style.css');
class DocBasePdf {
    constructor(apiToken, domain) {
        this.apiToken = apiToken;
        this.domain = domain;
        this.docBase = new DocBase_1.DocBase(this.apiToken, this.domain);
    }
    getByMemoId(memoId, outputPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const memo = yield this.findMemo(memoId);
                return yield this.convert([memo], outputPath);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getByCondition(condition, outputPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const memos = yield this.searchMemos(condition);
                return yield this.convert(memos, outputPath);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // メモ詳細取得API
    findMemo(memoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.docBase.memos.find(memoId);
            if (response.status === HttpStatus_1.HttpStatus.OK) {
                return response.body;
            }
            throw new Error(response.body);
        });
    }
    // 複数メモ取得API
    searchMemos(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.docBase.memos.list(condition);
            if (response.status === HttpStatus_1.HttpStatus.OK) {
                return response.body.posts;
            }
            throw new Error(response.body);
        });
    }
    convert(memos, outputPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const memo of memos) {
                    const filePath = `${outputPath}/${sanitize(memo.id + '_' + memo.title)}.pdf`;
                    const content = `# ${memo.title + '\n'} ${memo.body}`;
                    markdownPdf({ cssPath: CSS_PATH }).from.string(content).to(filePath, (error) => {
                        if (error) {
                            throw error;
                        }
                        console.log(`Created ${filePath}`);
                    });
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.DocBasePdf = DocBasePdf;
//# sourceMappingURL=DocBasePdf.js.map