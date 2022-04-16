# Build container
```bash
docker build . -t pdf-server
```

# Run container
```bash
docker run --rm --name=pdf-server -p 3000:3000 pdf-server
```
Backend URI at `http://localhost:3000/`
