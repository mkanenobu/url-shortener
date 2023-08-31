mod axum_context;
mod redis;

use crate::axum_context::Context;
use axum::handler::Handler;
use axum::http::StatusCode;
use axum::{
    extract::State,
    routing::{get, post},
    Json, Router,
};
use serde_derive::{Deserialize, Serialize};
use std::sync::Arc;

#[tokio::main]
async fn main() {
    up_server().await;
}

async fn up_server() {
    let redis_connection_poll = redis::RedisConnectionPool::new(20).await;

    let ctx = Arc::new(Context::new(redis_connection_poll));

    let app = Router::new()
        .route("/health", get(|| async { "OK" }))
        .route("/", post(register_handler))
        .with_state(ctx);

    axum::Server::bind(&"0.0.0.0:8800".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn register_handler(
    Json(params): Json<RegisterHandlerBodyExtractor>,
    State(state): State<Arc<Context>>,
) -> (StatusCode, Json<RegisterHandlerResponseBody>) {
    let _ = state.redis_connection_pool.get_connection_from_pool();

    println!("url: {}", params.input_url);
    let res = RegisterHandlerResponseBody {
        id: "hoge".to_string(),
    };

    (StatusCode::CREATED, Json(res))
}

#[derive(Deserialize)]
struct RegisterHandlerBodyExtractor {
    input_url: String,
}

#[derive(Serialize)]
struct RegisterHandlerResponseBody {
    id: String,
}
