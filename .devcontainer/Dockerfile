# .devcontainer/Dockerfile

FROM mcr.microsoft.com/vscode/devcontainers/python:3.10
# DevContainer用のPython3.10イメージをベースにする

# apt-get で必要なものを入れる
RUN apt-get update && apt-get install -y \
    curl \
    iputils-ping \
    # Redisなどを使うならここでredis-serverもインストール可
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Pythonパッケージをインストール
RUN pip install --upgrade pip
RUN pip install django \
    djangorestframework \
    django-cors-headers \
    djangorestframework-simplejwt \
    channels \
    channels-redis

# 必要に応じてnpmでグローバルインストールするものがあればここで
# たとえば、create-react-appとかyarnとか
# RUN npm install -g yarn

# ホントはここで "COPY ./frontend/package*.json /tmp/frontend/" して
# RUN cd /tmp/frontend && npm install 
# みたいな記述を入れることもあるけど、
# DevContainer内で直接 "cd frontend && npm install" でもOK。(僕はこれ)