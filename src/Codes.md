### Codes

#### Prepare
```json
{
  "/":{
    "supportedLanguages": [
      {
        "id": "en_US",
        "text": "English"
      },
      {
        "id": "zh_CN",
        "text": "Chinese"
      }
    ]
  }
}
```

#### API
| Method | Example | Remark |
| -- | -- | -- |
| `static get(code, path = SK.getCurrentPath())` | `'supportedLanguages'` -> `[{"id": "en_US","text": "English"},{"id": "zh_CN","text": "Chinese"}]` | |
| `static load(path = SK.getCurrentPath(), async = true)` | `'/'` -> `{"supportedLanguages":👆}` | the remote json file like : `Codes.SERVER_URL` + `Codes.PATH_PREFIX` + `Mesgs.PART_OF_HASH_PATH` + `SK.getCurrentLanguage()` + `SK.FILE_TYPE_JSON_WITH_POINT`, default `/json/codes_Hash_en_US.json`, if not exist, then load `/json/codes_en_US.json` |
| `static mesg(key, path = SK.getCurrentPath())` | `supportedLanguages__en_US` -> `English` | |
| `static unload(path)` | | `'/a'` -> will delete /a**/* |