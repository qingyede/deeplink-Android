# 使用 Nginx 镜像作为基础镜像
FROM nginx:stable-alpine

# 将打包好的前端应用静态文件拷贝到 Nginx 容器中
COPY ./dist /usr/share/nginx/html

# 用本地的nginx配置文件覆盖镜像的Nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

# 将 SSL 证书和密钥文件复制到 Nginx 容器中
COPY ./fullchain.pem /etc/nginx/ssl/fullchain.pem
COPY ./privkey.key /etc/nginx/ssl/privkey.key

# 暴露 80 443端口
EXPOSE 80 443

# 启动 Nginx 服务器
CMD ["nginx", "-g", "daemon off;"]
