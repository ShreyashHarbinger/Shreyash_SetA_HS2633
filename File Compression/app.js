// //definition of class
class HuffmanTreeNode {
    constructor(char, frequency) {
      this.char = char;
      this.frequency = frequency;
      this.left = null;
      this.right = null;
    }
  }
 //iterate over each character in the tree
  function buildFrequencyTable(str) {
    const frequencyTable = new Map();
    for (let char of str) {
      if (!frequencyTable.has(char)) {
        frequencyTable.set(char, 0);
      }
      frequencyTable.set(char, frequencyTable.get(char) + 1);
    }
    return frequencyTable;
  }
   //converts the frequency table into an array of HuffmanTreeNode objects then it repeatedly extracts the two nodes with the lowest frequencies from the priority queue, merges them into a parent node, and inserts the parent node back into the queue.
  function buildHuffmanTree(frequencyTable) {
    const priorityQueue = Array.from(frequencyTable.entries()).map(([char, frequency]) => new HuffmanTreeNode(char, frequency));
    while (priorityQueue.length > 1) {
      priorityQueue.sort((a, b) => a.frequency - b.frequency);
      const leftChild = priorityQueue.shift();
      const rightChild = priorityQueue.shift();
      const parent = new HuffmanTreeNode(null, leftChild.frequency + rightChild.frequency);
      parent.left = leftChild;
      parent.right = rightChild;
      priorityQueue.push(parent);
    }
    return priorityQueue[0];
  }
// //assigns the Huffman codes to each character
  function buildCodeTable(root, currentCode, codeTable) {
    if (root.char !== null) {
      codeTable.set(root.char, currentCode);
      return;
    }
    buildCodeTable(root.left, currentCode + "0", codeTable);
    buildCodeTable(root.right, currentCode + "1", codeTable);
  }
  // //compress function takes an input string str and performs the Huffman compression
  function compress(str) {
    const frequencyTable = buildFrequencyTable(str);
    const huffmanTree = buildHuffmanTree(frequencyTable);
    const codeTable = new Map();
    buildCodeTable(huffmanTree, "", codeTable);
    let compressedStr = "";
    for (let char of str) {
      compressedStr += codeTable.get(char);
    }
    const compressedSize = Buffer.byteLength(compressedStr, "utf8");
    return { compressedStr, compressedSize };
  }
  // //decompress function  it iterates over each bit in the compressed string. If the bit is "0", it moves to the left child of the current node; if the bit is "1", it moves to the right child. When it reaches a leaf node (character node), it appends the corresponding character to the decompressedStr and resets current back to the root of the Huffman tree.
  function decompress(compressedStr, huffmanTree) {
    let current = huffmanTree;
    let decompressedStr = "";
    for (let bit of compressedStr) {
      if (bit === "0") {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current.char !== null) {
        decompressedStr += current.char;
        current = huffmanTree;
      }
    }
    const decompressedSize = Buffer.byteLength(decompressedStr, "utf8");
    return { decompressedStr, decompressedSize };
  }
  // eg:
  const originalStr = "aabcahhshs";
  console.log("Original string:", originalStr);
  const { compressedStr, compressedSize } = compress(originalStr);
  console.log("Compressed string:", compressedStr);
  console.log("Compressed size (bytes):", compressedSize);
  const huffmanTree = buildHuffmanTree(buildFrequencyTable(originalStr));
  const { decompressedStr, decompressedSize } = decompress(compressedStr, huffmanTree);
  console.log("Decompressed string:", decompressedStr);
  console.log("Decompressed size (bytes):", decompressedSize);