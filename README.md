push-server
====

## Usage

### Send push for stickers site

* request body(optional)
  * default
    * 新しいスタンプが追加されました。

```bash
TOKEN=xxxxx

curl -k -i "https://mid0111-push.herokuapp.com/stickers/sendNotification" \
    -XPOST \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Content-type: application/json" \
    -d '{
        "message": "test push message"
    }'
```
