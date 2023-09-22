const std = @import("std");
const zap = @import("zap");

fn on_request(r: zap.SimpleRequest) void {
    r.setStatus(.not_found);
    r.sendBody("<html><body><h1>404 - File not found</h1></body></html>") catch return;
}

pub fn main() !void {
    std.debug.print("Starting chessbuddy\n", .{});
    var listener = zap.SimpleHttpListener.init(.{
        .port = 80,
        .on_request = on_request,
        .public_folder = "build",
        .log = true,
    });
    try listener.listen();

    std.debug.print("Listening on 0.0.0.0:80\n", .{});

    // start worker threads
    zap.start(.{
        .threads = 2,
        .workers = 2,
    });
}
