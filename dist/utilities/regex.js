"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchWord = void 0;
function matchWord(words, word) {
    const re = new RegExp('\\b' + word + '\\b');
    return words.match(re);
}
exports.matchWord = matchWord;
//# sourceMappingURL=regex.js.map