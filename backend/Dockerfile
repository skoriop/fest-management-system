FROM python:3.9

WORKDIR /api

COPY ./requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./app ./app

CMD uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload