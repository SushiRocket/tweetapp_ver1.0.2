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
    channels-redis \
    Pillow

# 作業ディレクトリを /app に設定
WORKDIR /app

# 環境変数の設定（環境変数をコンテナ内で永続化）
ENV PYTHONUNBUFFERED 1

# 依存関係のインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションのコードをコンテナにコピー
COPY . .

# ポートを公開
EXPOSE 8000

# アプリケーションを起動
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]



# 必要に応じてnpmでグローバルインストールするものがあればここで
# たとえば、create-react-appとかyarnとか
# RUN npm install -g yarn

# ホントはここで "COPY ./frontend/package*.json /tmp/frontend/" して
# RUN cd /tmp/frontend && npm install 
# みたいな記述を入れることもあるけど、
# DevContainer内で直接 "cd frontend && npm install" でもOK。(僕はこれ)