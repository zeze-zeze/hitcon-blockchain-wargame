# Challenges
## How to play
### Help
```
help()
 player: current player address
 web3: web3 object
 contract: current level contract instance (if connected)
```

### Example
以範例題目的 `retrieve`、`store` 函數為例
```
await contract.methods.retrieve().call();
await contract.methods.store(70).send({from: player});
```

## Develop
1. 建立 chal 檔案放合約的原始碼
2. 建立 info 檔案放合約的資訊，必須要有 address 與 abi
3. 在 index.tsx 中引入上述兩個檔案，並使用 `setChal`、`setInfo` 設定題目
