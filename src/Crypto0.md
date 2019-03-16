### Crypto0

#### Prepare
```java
REF：https://github.com/ShaneKing/org.shaneking.skava/blob/mirror/src/main/java/org/shaneking/skava/crypto/AES.java
```

#### API
| Method | Example | Remark |
| -- | -- | -- |
| `static aesDecrypt(cipherText, salt = Crypto0.DEFAULT_SALT, iv = salt.substr(0, salt.length / 2), passPhrase = salt, iterations = salt.length, keySize = (salt.length * 2) / 32)` | `'plainText'` -> `'2SZ/de9I0rvxO7s9wdCohQ=='` | |
| `static aesEncrypt(plainText, salt = Crypto0.DEFAULT_SALT, iv = salt.substr(0, salt.length / 2), passPhrase = salt, iterations = salt.length, keySize = (salt.length * 2) / 32)` | `'2SZ/de9I0rvxO7s9wdCohQ=='` -> `'plainText'` | |
