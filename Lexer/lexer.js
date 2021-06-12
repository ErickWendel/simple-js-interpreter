const WHITESPACE = " \n\t";
const DIGITS = "0123456789";

class Lexer {
    constructor(text) {
        this.currentChar = "";
        this.index = 0;
        this.text = text;
        this.advance();
        this.tokens = [];
    }

    advance() {
        try {
            this.currentChar = this.text[this.index++];
            console.log(this.currentChar);
        } catch (e) {
            console.log(e);
            this.currentChar = undefined;
        }
    }

    generateTokens() {
        while (this.currentChar !== undefined) {
            if (WHITESPACE.includes(this.currentChar)) this.advance();
            else if (
                this.currentChar === "." ||
                DIGITS.includes(this.currentChar)
            )
                this.tokens.push(this.generateNumber());
        }

        return this.tokens;
    }

    generateNumber() {
        var decimalPointCount = 0;
        var currentNumber = this.currentChar;

        this.advance();

        while (
            this.currentChar !== undefined &&
            (this.currentChar === "." || DIGITS.includes(this.currentChar))
        ) {
            if (this.currentChar === ".") {
                decimalPointCount++;
                if (decimalPointCount > 1) break;
            }

            currentNumber += this.currentChar;
            this.advance();
        }

        if (currentNumber.startsWith(".")) currentNumber = "0" + currentNumber;
        if (currentNumber.endsWith(".")) currentNumber += "0";

        return {
            TokenType: "Number",
            TokenValue: parseFloat(currentNumber),
        };
    }
}

module.exports = Lexer;
