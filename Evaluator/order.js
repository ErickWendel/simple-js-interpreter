const Node = require("./../Parser/nodes");

function orderOfEvaluation(tree = {}) {
    if (tree.nodeType === Node.ADD) {
        return (
            "(" +
            orderOfEvaluation(tree.node1) +
            " + " +
            orderOfEvaluation(tree.node2) +
            ")"
        );
    } else if (tree.nodeType === Node.SUB) {
        return (
            "(" +
            orderOfEvaluation(tree.node1) +
            " - " +
            orderOfEvaluation(tree.node2) +
            ")"
        );
    } else if (tree.nodeType === Node.MUL) {
        return (
            "(" +
            orderOfEvaluation(tree.node1) +
            " * " +
            orderOfEvaluation(tree.node2) +
            ")"
        );
    } else if (tree.nodeType === Node.DIV) {
        return (
            "(" +
            orderOfEvaluation(tree.node1) +
            " / " +
            orderOfEvaluation(tree.node2) +
            ")"
        );
    } else if (tree.nodeType === Node.NUMBER) {
        return tree.value;
    }
}

module.exports = orderOfEvaluation;
