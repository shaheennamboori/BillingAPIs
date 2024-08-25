![image](https://github.com/user-attachments/assets/14dfe6bb-a17d-483a-9d25-9f0f85cf051d)

Steps to run the server:
1. Install mongo DB from https://www.mongodb.com/try/download/community -> https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.12-signed.msi
2. Launch MongoDB Compass and make sure that it is able to connect with the installed database server. (Note down the connection string)
3. Go to index.js and edit the MongoDB_URI constant to match your connection string and db name (PS: do not use localhost instead 127.0.0.1 as it causes connection issues ipv4 vs ipv6, I didn't spend much time on fixing it, So don't use it. If you are smart enough to fix that issue go on)
4. Run node index.js and the server will be started in localhost:3000
