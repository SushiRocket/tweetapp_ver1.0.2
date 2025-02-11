# Python 3.10 の公式イメージを使用
FROM python:3.10

# 作業ディレクトリを /app に設定
WORKDIR /app

# 環境変数の設定
ENV PYTHONUNBUFFERED 1

# システムの依存関係をインストール
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 依存関係のインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションのコードをコンテナにコピー
COPY . .

# ポートを公開
EXPOSE 8000

# アプリケーションを起動
CMD ["sh", "-c", "
  python manage.py migrate --noinput &&
  python manage.py collectstatic --noinput &&
  gunicorn backend.wsgi:application --bind 0.0.0.0:8000
"]