FROM rust:1-slim-bullseye

WORKDIR /usr/src/url-shortener
COPY . /usr/src/url-shortener
RUN cargo build --release

CMD ["./target/release/url-shortener"]
