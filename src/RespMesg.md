### RespMesg

#### Prepare
```json
{
  "args":"Array: Mesgs.get(this.code).skFmtArr(this.args); PlainObject: Mesgs.get(this.code).skFmt(this.args); undefined: code is message",
  "code":"code or message",
  "type":"Success: just prompt; Info: just prompt; Warning: business continue, but must prompt; Error: Unknown Exception(done == false), UI will prompt details; Business Stop(done == true), process by component"
}
```

#### API
| Method | Example | Remark |
| -- | -- | -- |
| `constructor(mesg)` | | build message by response json data |
| `getMessage()` | | get message |
| `getType()` | | get message type |
