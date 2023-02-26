use salvo::prelude::*;
use salvo::serve_static::StaticDir;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt().init();

    let router = Router::with_path("<**path>").get(
        StaticDir::new([
            "./build/",
            "../build/",
            "../../build/",
        ])
        .with_defaults("index.html")
        .with_listing(true),
    );
    tracing::info!("Listening on http://0.0.0.0:80");
    Server::new(TcpListener::bind("0.0.0.0:80")).serve(router).await;
}

