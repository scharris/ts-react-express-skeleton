## Build
Build complete server package which includes client app
and resources into `dist` output directory:
```
npm run build
```

## Run
Run server (requires prior build as above):
```
npm run start
```

## Try via command line

The below are Windows PowerShell commands for exercising the api,
which should be run in a separate terminal while the server is
running as described above. Here `iwr` is a short name for
PowerShell's "Invoke-WebRequest".

Get all items.
```
iwr http://localhost:3001/api/foos
```

Get item 2.
```
iwr http://localhost:3001/api/foos/2
```

Add a new third item.
```
iwr http://localhost:3001/api/foos -Method POST `
   -Headers @{"Content-Type"="application/json"} `
   -Body '{"item":{"id": 3, "name": "third item"}}'
```

Update third item.
```
iwr http://localhost:3001/api/foos/3 -Method PUT `
   -Headers @{"Content-Type"="application/json"} `
   -Body '{"item":{"id": 3, "name": "third item updated"}}'
```

View updated third item.
```
iwr http://localhost:3001/api/foos/3
```

Delete third item.
```
iwr http://localhost:3001/api/foos/3 -Method DELETE
```
