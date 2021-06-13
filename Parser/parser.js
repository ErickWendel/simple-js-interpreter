const Token = require("../Lexer/token");
const Node = require("./nodes");

class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.index = 0;
        this.currentToken = undefined;
        this.advance();
    }

    advance() {
        try {
            this.currentToken = this.tokens[this.index++];
        } catch (e) {
            console.log(e);
            this.currentToken = undefined;
        }
    }

    raiseError() {
        throw new Error("Invalid Syntax");
    }

    parse() {
        if (this.currentToken === undefined) return undefined;
        let result = this.expr();
        if (this.currentToken !== undefined) this.raiseError();

        return result;
    }

    expr() {
        let result = this.term();

        while (
            this.currentToken !== undefined &&
            [Token.PLUS, Token.MINUS].includes(this.currentToken.TokenType)
        ) {
            if (this.currentToken.TokenType === Token.PLUS) {
                this.advance();
                result = {
                    nodeType: Node.ADD,
                    node1: result,
                    node2: this.term(),
                };
            } else if (this.currentToken.TokenType === Token.MINUS) {
                this.advance();
                result = {
                    nodeType: Node.SUB,
                    node1: result,
                    node2: this.term(),
                };
            }
        }

        return result;
    }

    term() {
        let result = this.factor();

        while (
            this.currentToken !== undefined &&
            [Token.MULTIPLY, Token.DIVIDE].includes(this.currentToken.TokenType)
        ) {
            if (this.currentToken.TokenType === Token.MULTIPLY) {
                this.advance();
                result = {
                    nodeType: Node.MUL,
                    node1: result,
                    node2: this.factor(),
                };
            } else if (this.currentToken.TokenType === Token.DIVIDE) {
                this.advance();
                result = {
                    nodeType: Node.DIV,
                    node1: result,
                    node2: this.factor(),
                };
            }
        }

        return result;
    }

    factor() {
        if (this.currentToken.TokenType === Token.LPAREN) {
            this.advance();
            let result = this.expr();
            if (this.currentToken.TokenType !== Token.RPAREN) this.raiseError();
            this.advance();

            return result;
        } else if (this.currentToken.TokenType === Token.NUMBER) {
            let value = this.currentToken.TokenValue;
            this.advance();
            return {
                nodeType: Node.NUMBER,
                value: value,
            };
        } else if (this.currentToken.TokenType === Token.PLUS) {
            this.advance();
            return {
                nodeType: Node.PLUS,
                node: this.factor(),
            };
        } else if (this.currentToken.TokenType === Token.MINUS) {
            this.advance();
            return {
                nodeType: Node.MINUS,
                node: this.factor(),
            };
        }

        this.raiseError();
    }
}

module.exports = Parser;
