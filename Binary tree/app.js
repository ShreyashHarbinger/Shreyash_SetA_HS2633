class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  class BinarySearchTree {
    constructor() {
      this.root = null;
    }
    insert(value) {
      const newNode = new Node(value);
      if (this.root === null) {
        this.root = newNode;
      } else {
        this.insertNode(this.root, newNode);
      }
    }
    insertNode(node, newNode) {
      if (newNode.value < node.value) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          this.insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          this.insertNode(node.right, newNode);
        }
      }
    }
    remove(value) {
      this.root = this.removeNode(this.root, value);
    }
    removeNode(node, value) {
      if (node === null) {
        return null;
      } else if (value < node.value) {
        node.left = this.removeNode(node.left, value);
        return node;
      } else if (value > node.value) {
        node.right = this.removeNode(node.right, value);
        return node;
      } else {
        if (node.left === null && node.right === null) {
          node = null;
          return node;
        }
        if (node.left === null) {
          node = node.right;
          return node;
        } else if (node.right === null) {
          node = node.left;
          return node;
        }
        const minNode = this.findMinNode(node.right);
        node.value = minNode.value;
        node.right = this.removeNode(node.right, minNode.value);
        return node;
      }
    }
    findMinNode(node) {
      if (node.left === null) {
        return node;
      } else {
        return this.findMinNode(node.left);
      }
    }
    search(value) {
      return this.searchNode(this.root, value);
    }
    searchNode(node, value) {
      if (node === null) {
        return false;
      } else if (value < node.value) {
        return this.searchNode(node.left, value);
      } else if (value > node.value) {
        return this.searchNode(node.right, value);
      } else {
        return true;
      }
    }
  }
  const bst = new BinarySearchTree();
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(2);
bst.insert(4);
console.log(bst.search(4)); // Output: true
bst.remove(3);
console.log(bst.search(3)); // Output: false