const std = @import("std");

pub fn build(b: *std.build.Builder) !void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});
    const zap = b.dependency("zap", .{
        .target = target,
        .optimize = optimize,
        .openssl = false, // set to true to enable TLS support
    });

    inline for ([_]struct {
        name: []const u8,
        src: []const u8,
    }{
        .{ .name = "chessbuddy", .src = "chessbuddy.zig" },
    }) |excfg| {
        const ex_name = excfg.name;
        const ex_src = excfg.src;
        const ex_build_desc = try std.fmt.allocPrint(
            b.allocator,
            "build the {s} exe",
            .{ex_name},
        );
        const ex_run_stepname = try std.fmt.allocPrint(
            b.allocator,
            "run-{s}",
            .{ex_name},
        );
        const ex_run_stepdesc = try std.fmt.allocPrint(
            b.allocator,
            "run the {s} exe",
            .{ex_name},
        );
        const ex_run_step = b.step(ex_run_stepname, ex_run_stepdesc);
        const ex_step = b.step(ex_name, ex_build_desc);

        var exe = b.addExecutable(.{
            .name = ex_name,
            .root_source_file = .{ .path = ex_src },
            .target = target,
            .optimize = optimize,
        });

        exe.linkLibrary(zap.artifact("facil.io"));
        exe.addModule("zap", zap.module("zap"));

        // const ex_run = exe.run();
        const ex_run = b.addRunArtifact(exe);
        ex_run_step.dependOn(&ex_run.step);

        // install the artifact - depending on the "exe"
        const ex_build_step = b.addInstallArtifact(exe, .{});
        ex_step.dependOn(&ex_build_step.step);
    }
}