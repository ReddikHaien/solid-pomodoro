FROM denoland/deno:2.9.4 AS build

WORKDIR /app

COPY deno.json .
COPY deno.lock .
RUN deno install

COPY . .
RUN deno task build

FROM devforth/spa-to-http:1.2.0
WORKDIR /code/
EXPOSE 8080
COPY --from=build /app/dist/ .
